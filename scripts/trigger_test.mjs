#!/usr/bin/env node
/**
 * design-garden trigger tests — does the SKILL.md description attract the requests
 * it should and repel the ones it shouldn't?
 *
 * Protocol distilled from docs/darwin-benchmark.md (item 5):
 *   - half the queries should trigger the skill, half should not;
 *   - at least 2 should-trigger queries contain none of the description's trigger
 *     words (the description must attract semantically, not only by keyword);
 *   - every should-not query is a job a real neighbor skill owns, or the
 *     description's negative boundary covers;
 *   - the dispatch kit shows neighbor descriptions too — real routing never
 *     happens against an empty skill list;
 *   - hit rate under 80% on should-trigger queries, or any should-not query that
 *     picks this skill (a misfire), means the description needs work;
 *   - a description change is judged on the holdout half only: keep when holdout
 *     hit rose or holdout misfires fell and the other did not worsen, else revert.
 *
 * Usage:
 *   node scripts/trigger_test.mjs check [file]
 *       Validate evals/trigger-tests.json against the protocol.
 *   node scripts/trigger_test.mjs kit [--out DIR] [--neighbor DIR]... [--skill FILE] [--file FILE]
 *       Build a manual dispatch kit: skills.txt (shuffled name: description list),
 *       one prompt file per query, votes.csv template. Neighbors default to sibling
 *       skills discovered under ~/.agents/skills, ~/.claude/skills, ~/.dsh/skills.
 *       Out defaults to evals/trigger-kit/<date>/.
 *   node scripts/trigger_test.mjs tally --votes DIR|FILE [--retest] [--baseline FILE] [--save-baseline FILE] [--file FILE]
 *       Score recorded votes against the queries, print a per-query table, the
 *       verdict, and the exact row to append to evals/results.tsv.
 *
 * Exit codes: 0 = ok / pass / keep · 1 = protocol violations (check) or
 * needs-work / revert (tally) · 2 = usage error or missing input.
 *
 * The script degrades with a message instead of crashing: missing neighbors build
 * a target-only kit (with a warning that hit-rate without neighbors overstates),
 * malformed vote rows are reported and excluded, and a missing baseline skips the
 * keep/revert verdict.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import os from "node:os";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_QUERIES = path.join(REPO_ROOT, "evals", "trigger-tests.json");
const DEFAULT_SKILL = path.join(REPO_ROOT, "SKILL.md");
const BASELINE_FALLBACK = path.join(REPO_ROOT, "evals", "trigger-baseline.json");
const HIT_LINE = 0.8; // description needs work below 80% hit rate on should-trigger queries
const EPS = 1e-9;

/* --------------------------------- usage ----------------------------------- */

function usage(exitCode = 2) {
  const out = exitCode ? console.error : console.log;
  out(`design-garden trigger tests — eval the SKILL.md description as a router.

Usage:
  node scripts/trigger_test.mjs check [file]
  node scripts/trigger_test.mjs kit [--out DIR] [--neighbor DIR]... [--skill FILE] [--file FILE]
  node scripts/trigger_test.mjs tally --votes DIR|FILE [--retest] [--baseline FILE] [--save-baseline FILE] [--file FILE]

  check   validate the query set (≥8 queries, ~half should-trigger, ≥2 keyword-clean
          should-trigger queries, every should-not query tagged with its reason)
  kit     build a manual dispatch kit: skills.txt, prompts/<id>.txt, votes.csv
  tally   score votes.csv, print per-query results + verdict + results.tsv row

Exit codes: 0 ok/pass/keep · 1 violations or needs-work/revert · 2 usage/missing input.`);
  process.exit(exitCode);
}

function parseFlags(argv, spec) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--help" || a === "-h") usage(0);
    if (!a.startsWith("-")) { args._.push(a); continue; }
    const known = spec[a];
    if (!known) { console.error(`Unknown option: ${a}`); usage(2); }
    const key = a.replace(/^--/, "");
    if (known === "bool") args[key] = true;
    else if (known === "array") args[key] = [...(args[key] || []), argv[++i]];
    else args[key] = argv[++i];
  }
  return args;
}

/* ------------------------------ small helpers ------------------------------ */

function readSkill(file) {
  try {
    if (!existsSync(file)) return null;
    const fm = parseFrontmatter(readFileSync(file, "utf-8"));
    if (!fm) return null;
    return {
      name: (fm.name || path.basename(path.dirname(file))).trim(),
      description: (fm.description || "").trim(),
      path: file,
    };
  } catch {
    return null;
  }
}

function parseFrontmatter(text) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  if (!m) return null;
  const lines = m[1].split(/\r?\n/);
  const out = {};
  for (let i = 0; i < lines.length; i++) {
    const km = /^([A-Za-z][\w-]*):\s*(.*)$/.exec(lines[i]);
    if (!km) continue;
    let val = km[2].trim();
    if (/^(>[-+]?\d*|\|[-+]?\d*)?$/.test(val)) {
      const cont = [];
      let j = i + 1;
      while (j < lines.length && (/^\s/.test(lines[j]) || lines[j] === "")) {
        cont.push(lines[j].replace(/^\s+/, ""));
        j++;
      }
      val = cont.join(" ").trim();
      i = j - 1;
    }
    out[km[1].toLowerCase()] = val.replace(/^["']|["']$/g, "");
  }
  return out;
}

function gitCommit() {
  try {
    return execSync("git rev-parse --short HEAD", { cwd: REPO_ROOT, stdio: ["ignore", "pipe", "ignore"] }).toString().trim() || "unknown";
  } catch {
    return "unknown";
  }
}

function todayLocal() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function fnv1a(str) {
  let h = 2166136261;
  for (const c of str) {
    h ^= c.codePointAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Deterministic Fisher-Yates: same seed → same order (seeded from the date, so
 *  a rerun today reproduces today's list, tomorrow reshuffles it). */
function shuffle(items, seed) {
  const rand = mulberry32(seed);
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/* --------------------------- trigger-word extractor ------------------------- */

// Function words dropped when deriving trigger words from the description's own
// text. Content words stay: anything the description says (design, visual, hero,
// look, better, review, …) counts as a trigger word for the clean-query rule.
const STOPWORDS = new Set(
  `use for any the a an and or but if then than else so because as at by from in into on onto to with without within
   of off over under about above below between during through before after up down out is are was were be been being am
   it its this that these those there here which who whom whose what when where why how not no nor even just only also
   very too most more some all both each every either neither s t don doesn didn can cannot could should would will won
   may might must shall let lets us we our ours your yours you i me my mine he she his her they them their theirs
   now then still yet again once does did doing done have has had having do go goes going gone get gets getting got
   give gives given gave make makes making made take takes taking took taken use uses used using want wants wanted
   need needs needed say says said tell tells told asking ask asks asked work works worked working task tasks
   run runs ran running keep keeps kept keeping top instead anything everything something someone somebody anyone
   anybody people person thing things user users like sure okay ok please thanks thank hi hello hey`
    .split(/\s+/)
);

/** Mechanical extraction of the description's trigger words:
 *  1. the explicit list after "Triggers on" (split on commas/slashes/dots);
 *  2. every other content word of the description (punctuation split, stopwords
 *     dropped, ≥3 chars — so phrases like "landing page" / "make it pop" stay
 *     whole from the explicit list while single words come from both sources). */
function extractTriggerWords(description) {
  const d = String(description || "");
  const explicit = [];
  const ex = /triggers?\s+on\s+(.*?)(?=\s+—|\s+--|\s+–|\.\s|\.$|$)/i.exec(d);
  if (ex) {
    for (const piece of ex[1].split(/[,;/·]+/)) {
      const w = piece.trim().toLowerCase();
      if (w) explicit.push(w);
    }
  }
  const derived = new Set();
  for (const tok of d.toLowerCase().split(/[^a-z0-9\u4e00-\u9fff]+/)) {
    if (!tok || STOPWORDS.has(tok)) continue;
    if (tok.length < 3 && !/[\u4e00-\u9fff]/.test(tok)) continue;
    if (!/[a-z\u4e00-\u9fff]/.test(tok)) continue; // digits alone are not trigger words
    derived.add(tok);
  }
  const all = [...new Set([...explicit, ...derived])];
  return { explicit, derived: [...derived], all };
}

/** Whole-word match for ASCII keywords (so "ui" doesn't hit "quit"), plain
 *  substring for anything non-ASCII (e.g. 设计). */
function makeMatcher(keyword) {
  const esc = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+");
  if (/^[a-z0-9\s-]+$/i.test(keyword)) return new RegExp(`\\b${esc}\\b`, "i");
  return new RegExp(esc, "i");
}

/* --------------------------------- loaders ---------------------------------- */

function loadQueries(file) {
  const resolved = path.resolve(file);
  if (!existsSync(resolved)) {
    console.error(`trigger tests: queries file not found: ${resolved}`);
    console.error("Create evals/trigger-tests.json first, or pass --file <path>.");
    process.exit(2);
  }
  let data;
  try {
    data = JSON.parse(readFileSync(resolved, "utf-8").replace(/^\uFEFF/, ""));
  } catch (e) {
    console.error(`trigger tests: ${path.basename(resolved)} is not valid JSON — ${e.message}`);
    process.exit(2);
  }
  if (!Array.isArray(data?.queries)) {
    console.error(`trigger tests: ${path.basename(resolved)} has no queries array — expected { target, queries: [...] }`);
    process.exit(2);
  }
  return { data, resolved };
}

function resolveVotesPath(p) {
  const abs = path.resolve(p);
  if (!existsSync(abs)) return null;
  try {
    if (statSync(abs).isDirectory()) {
      const inner = path.join(abs, "votes.csv");
      return existsSync(inner) ? inner : null;
    }
  } catch {
    /* fall through to file */
  }
  return abs;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQ = false;
  const src = String(text).replace(/^\uFEFF/, "");
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (inQ) {
      if (c === '"') {
        if (src[i + 1] === '"') { field += '"'; i++; }
        else inQ = false;
      } else field += c;
    } else if (c === '"') inQ = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && src[i + 1] === "\n") i++;
      row.push(field);
      field = "";
      if (row.some((f) => f !== "")) rows.push(row);
      row = [];
    } else field += c;
  }
  row.push(field);
  if (row.some((f) => f !== "")) rows.push(row);
  return rows;
}

function parseVotes(file) {
  const rows = parseCsv(readFileSync(file, "utf-8"));
  if (!rows.length) return { votes: new Map(), warnings: ["votes file is empty"] };
  const header = rows[0].map((h) => String(h).trim().toLowerCase());
  const idCol = header.indexOf("id");
  const choiceCol = header.indexOf("choice");
  if (idCol < 0 || choiceCol < 0) {
    console.error(`trigger tests: ${path.basename(file)} needs "id" and "choice" columns, found: ${header.join(", ") || "(no header)"}`);
    process.exit(2);
  }
  const votes = new Map();
  const warnings = [];
  for (const row of rows.slice(1)) {
    const id = String(row[idCol] ?? "").trim();
    if (!id) continue;
    const choice = String(row[choiceCol] ?? "").trim();
    if (votes.has(id)) warnings.push(`duplicate vote row for "${id}" — last one wins`);
    votes.set(id, choice);
  }
  return { votes, warnings };
}

function normalizeChoice(raw) {
  let s = String(raw ?? "").trim().toLowerCase().replace(/^["'`]+|["'.!]+$/g, "").trim();
  if (!s) return "";
  if (/^(none|no skill|no skills|none of (them|these|those|the above|the skills)|no match|n\/a)\b/.test(s)) return "none";
  return s;
}

/* ---------------------------------- check ----------------------------------- */

function cmdCheck(args) {
  const file = args._[0] || DEFAULT_QUERIES;
  const { data, resolved } = loadQueries(file);
  const queries = data.queries;
  const failures = [];
  const warnings = [];
  const info = [];

  if (queries.length < 8) failures.push(`need at least 8 queries, found ${queries.length}`);

  const seen = new Set();
  const trues = [];
  const falses = [];
  for (const [i, q] of queries.entries()) {
    const label = q && typeof q.id === "string" && q.id ? `query "${q.id}"` : `query #${i + 1}`;
    if (!q || typeof q !== "object" || Array.isArray(q)) { failures.push(`${label}: entry is not an object`); continue; }
    if (typeof q.id !== "string" || !q.id.trim()) failures.push(`${label}: missing id`);
    else if (seen.has(q.id)) failures.push(`query "${q.id}": duplicate id`);
    else seen.add(q.id);
    if (typeof q.query !== "string" || !q.query.trim()) failures.push(`${label}: missing query text`);
    if (typeof q.should_trigger !== "boolean") failures.push(`${label}: should_trigger must be true or false`);
    else (q.should_trigger ? trues : falses).push(q);
    if (!["dev", "holdout"].includes(q.split)) {
      failures.push(`${label}: split must be "dev" or "holdout" (a description change is judged on the holdout half only)`);
    }
    if (q.should_trigger === false && !(typeof q.reason === "string" && q.reason.trim())) {
      failures.push(`${label}: should-not query needs a "reason" naming the neighbor concern or boundary it belongs to`);
    }
  }

  const minSide = Math.min(trues.length, falses.length);
  if (queries.length && minSide / queries.length < 0.4) {
    failures.push(`should/should-not split is ${trues.length}/${falses.length} — roughly half/half means each side ≥ 40% of the set`);
  }

  // keyword-clean rule: read the target description mechanically, then count
  // should-trigger queries that contain none of its trigger words.
  const skillPath = args.skill ? path.resolve(args.skill) : DEFAULT_SKILL;
  const skill = readSkill(skillPath);
  if (skill?.description) {
    const kws = extractTriggerWords(skill.description);
    const matchers = kws.all.map(makeMatcher);
    const clean = trues.filter((q) => !matchers.some((m) => m.test(q.query))).map((q) => q.id);
    if (clean.length < 2) {
      failures.push(`only ${clean.length} should-trigger quer${clean.length === 1 ? "y" : "ies"} avoid every trigger word — need at least 2 (clean: ${clean.join(", ") || "none"})`);
    } else {
      info.push(`${clean.length} keyword-clean should-trigger queries: ${clean.join(", ")}`);
    }
    info.push(`trigger words from description: ${kws.explicit.length} explicit + ${kws.derived.length} derived = ${kws.all.length} total`);
    if (data.target && skill.name && data.target !== skill.name) {
      warnings.push(`json target "${data.target}" does not match SKILL.md name "${skill.name}"`);
    }
  } else {
    warnings.push(`no description readable at ${skillPath} — keyword-clean count skipped`);
  }

  const devCount = queries.filter((q) => q?.split === "dev").length;
  const holdoutCount = queries.filter((q) => q?.split === "holdout").length;

  console.log(`trigger tests check · ${path.relative(process.cwd(), resolved) || resolved}`);
  for (const f of failures) console.log(`FAIL  ${f}`);
  for (const w of warnings) console.log(`WARN  ${w}`);
  for (const line of info) console.log(`      ${line}`);
  if (!failures.length && !warnings.length && !info.length) console.log("      (nothing to report)");
  const status = failures.length ? "violations found" : "ok";
  console.log(`${status}: ${queries.length} queries · ${trues.length} should-trigger / ${falses.length} should-not · dev ${devCount} / holdout ${holdoutCount}`);
  process.exit(failures.length ? 1 : 0);
}

/* ----------------------------------- kit ------------------------------------ */

const DISCOVERY_ROOTS = [".agents", ".claude", ".dsh"].map((base) => path.join(os.homedir(), base, "skills"));

function collectNeighbors(explicitDirs, target) {
  const found = new Map();
  const notes = [];
  const roots = explicitDirs.map((d) => path.resolve(d)).concat(DISCOVERY_ROOTS);
  const add = (skillFile, dir, dirName) => {
    if (path.resolve(dir) === path.resolve(path.dirname(target.path))) return;
    const fm = parseFrontmatter(String(safeRead(skillFile)));
    if (!fm) { notes.push(`skipped ${skillFile} — unreadable frontmatter`); return; }
    const name = (fm.name || dirName || "").trim();
    const description = (fm.description || "").trim();
    if (!name || !description) { notes.push(`skipped ${skillFile} — no name/description frontmatter`); return; }
    if (name === target.name) return; // the target itself, installed elsewhere
    if (found.has(name)) return;
    found.set(name, { name, description });
  };
  for (const root of roots) {
    if (!existsSync(root)) continue;
    const direct = path.join(root, "SKILL.md");
    if (existsSync(direct)) { add(direct, path.dirname(direct), path.basename(root)); continue; }
    let entries;
    try {
      entries = readdirSync(root, { withFileTypes: true });
    } catch {
      notes.push(`cannot read ${root} — skipped`);
      continue;
    }
    for (const e of entries) {
      if (!e.isDirectory()) continue;
      const sf = path.join(root, e.name, "SKILL.md");
      if (existsSync(sf)) add(sf, path.join(root, e.name), e.name);
    }
  }
  return { neighbors: [...found.values()], notes };
}

function safeRead(file) {
  try {
    return readFileSync(file, "utf-8");
  } catch {
    return "";
  }
}

const PROMPT_TEMPLATE = (list, query) => `You are routing one user request to the right skill.

Here is the available skill list:

${list}

The user says: "${query}"

Which skill would you load for this request? Answer with only the skill name, or "none" if no skill in the list fits.
`;

function cmdKit(args) {
  const skillPath = args.skill ? path.resolve(args.skill) : DEFAULT_SKILL;
  const target = readSkill(skillPath);
  if (!target?.description) {
    console.error(`trigger tests: no readable name/description in ${skillPath} — the kit needs the target description`);
    process.exit(2);
  }
  const { data, resolved } = loadQueries(args.file || DEFAULT_QUERIES);
  const { neighbors, notes } = collectNeighbors(args.neighbor || [], target);
  const entries = [{ name: target.name, description: target.description }, ...neighbors];

  const date = todayLocal();
  const out = path.resolve(args.out || path.join(REPO_ROOT, "evals", "trigger-kit", date));
  try {
    mkdirSync(path.join(out, "prompts"), { recursive: true });
  } catch (e) {
    console.error(`trigger tests: cannot create ${out} — ${e.message}`);
    process.exit(2);
  }

  const shuffled = shuffle(entries, fnv1a(date));
  const list = shuffled.map((s) => `${s.name}: ${s.description}`).join("\n");
  const rel = (p) => path.relative(process.cwd(), p) || p;
  const skillsFile = path.join(out, "skills.txt");
  writeFileSync(skillsFile, list + "\n", "utf-8");
  for (const q of data.queries) {
    writeFileSync(path.join(out, "prompts", `${q.id}.txt`), PROMPT_TEMPLATE(list, q.query), "utf-8");
  }
  const votesFile = path.join(out, "votes.csv");
  writeFileSync(votesFile, "id,choice\n" + data.queries.map((q) => `${q.id},`).join("\n") + "\n", "utf-8");

  console.log(`trigger tests kit · ${rel(out)}`);
  console.log(`  target: ${target.name} (${rel(target.path)})`);
  console.log(`  skills in list: ${entries.length} (${neighbors.length} neighbor${neighbors.length === 1 ? "" : "s"}, shuffled by seed "${date}" — reproducible today, reshuffles tomorrow)`);
  console.log(`  prompts: ${data.queries.length} · votes template: ${rel(votesFile)}`);
  for (const n of notes) console.log(`  note: ${n}`);
  if (!neighbors.length) {
    console.log("  WARNING: no neighbor skills found — the kit tests against the target alone.");
    console.log("  Hit-rate without neighbors overstates: real routing competes with a crowded list.");
    console.log("  Pass --neighbor <skill-dir> (repeatable) to add rivals, or install skills under");
    console.log(`  ${DISCOVERY_ROOTS.join(", ")}.`);
  }
  console.log("Next steps:");
  console.log("  1. Open each prompts/<id>.txt, paste it verbatim into the agent or model under test, note the one-line answer.");
  console.log("  2. Record answers in votes.csv — one row per query: id,choice (choice = skill name, or none).");
  console.log(`  3. node scripts/trigger_test.mjs tally --votes ${rel(out)}`);
  console.log("  To judge a future description change against today's numbers, also save a baseline:");
  console.log(`     node scripts/trigger_test.mjs tally --votes ${rel(out)} --save-baseline ${rel(BASELINE_FALLBACK)}`);
  process.exit(0);
}

/* ---------------------------------- tally ----------------------------------- */

const VALID_RESULTS = ["hit", "miss-none", "miss-other", "misfire", "ok-none", "ok-other", "novote", "unparsed"];

function classify(q, rawChoice, targetName) {
  const choice = normalizeChoice(rawChoice);
  if (!choice) return { choice: "", result: "novote" };
  if (choice === targetName || choice.includes(targetName)) {
    return { choice, result: q.should_trigger ? "hit" : "misfire" };
  }
  if (choice === "none") return { choice, result: q.should_trigger ? "miss-none" : "ok-none" };
  if (/\s/.test(choice)) return { choice, result: "unparsed" };
  return { choice, result: q.should_trigger ? "miss-other" : "ok-other" };
}

function rateOf(rows, isTrue, want) {
  const pool = rows.filter((r) => r.should_trigger === isTrue);
  const parsed = pool.filter((r) => ["hit", "miss-none", "miss-other", "misfire", "ok-none", "ok-other"].includes(r.result));
  const good = pool.filter((r) => r.result === want);
  return { good: good.length, denom: parsed.length, pool: pool.length, rate: parsed.length ? good.length / parsed.length : null };
}

function fmtRate({ good, denom, rate }) {
  return denom ? `${good}/${denom} (${(rate * 100).toFixed(0)}%)` : "n/a";
}

function loadBaseline(args, votesDir) {
  if (args.baseline) {
    const p = path.resolve(args.baseline);
    if (!existsSync(p)) {
      console.error(`trigger tests: --baseline ${args.baseline} not found`);
      process.exit(2);
    }
    return { base: readJson(p), explicit: true, path: p };
  }
  for (const p of [votesDir ? path.join(votesDir, "baseline.json") : null, BASELINE_FALLBACK]) {
    if (p && existsSync(p)) return { base: readJson(p), explicit: false, path: p };
  }
  return { base: null, explicit: false, path: null };
}

function readJson(p) {
  try {
    return JSON.parse(readFileSync(p, "utf-8"));
  } catch {
    return null;
  }
}

function cmdTally(args) {
  if (!args.votes) usage(2);
  const votesPath = resolveVotesPath(args.votes);
  if (!votesPath) {
    console.error(`trigger tests: votes not found — pass --votes <dir with votes.csv> or <a csv file>`);
    process.exit(2);
  }
  const { data } = loadQueries(args.file || DEFAULT_QUERIES);
  const skill = readSkill(args.skill ? path.resolve(args.skill) : DEFAULT_SKILL);
  const targetName = (skill?.name || data.target || "design-garden").toLowerCase();

  const { votes, warnings } = parseVotes(votesPath);
  const rows = data.queries.map((q) => {
    const { choice, result } = classify(q, votes.get(q.id), targetName);
    votes.delete(q.id);
    return { ...q, choice, result };
  });
  for (const [id] of votes) warnings.push(`vote for "${id}" matches no query id — ignored`);

  console.log(`trigger tests tally · target ${targetName} · votes ${path.relative(process.cwd(), votesPath) || votesPath}`);
  const pad = (s, n) => String(s).padEnd(n);
  console.log(`  ${pad("id", 24)} ${pad("split", 8)} ${pad("expected", 9)} ${pad("choice", 26)} result`);
  for (const r of rows) {
    const expected = r.should_trigger ? "trigger" : "NOT";
    let result = r.result;
    if (result === "miss-none") result = "MISS (said none)";
    else if (result === "miss-other") result = `MISS (picked ${r.choice})`;
    else if (result === "misfire") result = "MISFIRE";
    else if (result === "ok-none") result = "ok (none)";
    else if (result === "ok-other") result = `ok (${r.choice})`;
    else if (result === "novote") result = "— no vote recorded";
    else if (result === "unparsed") result = "UNPARSED (multi-word answer)";
    console.log(`  ${pad(r.id, 24)} ${pad(r.split || "?", 8)} ${pad(expected, 9)} ${pad(r.choice || "—", 26)} ${result}`);
  }
  for (const w of warnings) console.log(`  WARN ${w}`);

  const noVote = rows.filter((r) => r.result === "novote").map((r) => r.id);
  const unparsed = rows.filter((r) => r.result === "unparsed").map((r) => r.id);
  if (noVote.length) console.log(`  WARN no vote recorded for: ${noVote.join(", ")} (excluded from rates)`);
  if (unparsed.length) console.log(`  WARN multi-word answers for: ${unparsed.join(", ")} (excluded from rates — record the bare skill name)`);

  const hit = rateOf(rows, true, "hit");
  const misfire = rateOf(rows, false, "misfire");
  console.log(`  hit rate (should-trigger):  ${fmtRate(hit)}`);
  console.log(`  misfires (should-not):      ${fmtRate(misfire)}`);

  let verdict = null;
  let verdictLine = null;
  let exitCode = 0;

  if (args.retest) {
    const hHit = rateOf(rows.filter((r) => r.split === "holdout"), true, "hit");
    const hMis = rateOf(rows.filter((r) => r.split === "holdout"), false, "misfire");
    console.log(`  holdout-only hit rate:      ${fmtRate(hHit)}`);
    console.log(`  holdout-only misfires:      ${fmtRate(hMis)}`);
    const dHit = rateOf(rows.filter((r) => r.split === "dev"), true, "hit");
    const dMis = rateOf(rows.filter((r) => r.split === "dev"), false, "misfire");
    console.log(`  (dev half, diagnosis only:  hit ${fmtRate(dHit)} · misfires ${fmtRate(dMis)})`);
    const { base, explicit, path: basePath } = loadBaseline(args, path.dirname(votesPath));
    if (!base || (!base.holdout && base.hit_rate === undefined)) {
      console.log(`  WARN no usable baseline ${basePath ? `at ${path.relative(process.cwd(), basePath) || basePath}` : "found"}${explicit ? "" : " — pass --baseline <file>"} — printing holdout numbers only, no keep/revert verdict`);
    } else if (!hHit.denom || !hMis.denom) {
      console.log("  WARN holdout half has no parsed votes — cannot judge keep/revert");
      exitCode = 2;
    } else {
      const b = base.holdout || base;
      const bHit = Number(b.hit_rate);
      const bMis = Number(b.misfires);
      if (!Number.isFinite(bHit) || !Number.isFinite(bMis)) {
        console.log(`  WARN baseline holdout numbers unreadable — no keep/revert verdict`);
      } else {
        const notWorseHit = hHit.rate >= bHit - EPS;
        const notWorseMis = hMis.good <= bMis + EPS;
        const improved = hHit.rate > bHit + EPS || hMis.good < bMis - EPS;
        verdict = notWorseHit && notWorseMis && improved ? "keep" : "revert";
        const why = [];
        if (hHit.rate > bHit + EPS) why.push(`holdout hit rose ${(bHit * 100).toFixed(0)}%→${(hHit.rate * 100).toFixed(0)}%`);
        else if (hHit.rate < bHit - EPS) why.push(`holdout hit fell ${(bHit * 100).toFixed(0)}%→${(hHit.rate * 100).toFixed(0)}%`);
        if (hMis.good < bMis - EPS) why.push(`holdout misfires fell ${bMis}→${hMis.good}`);
        else if (hMis.good > bMis + EPS) why.push(`holdout misfires rose ${bMis}→${hMis.good}`);
        if (!why.length) why.push("no holdout improvement (hit and misfires flat)");
        verdictLine = `verdict: ${verdict} — ${why.join("; ")}. A change is judged on the holdout half only: keep when holdout hit rose or misfires fell and the other did not worsen.`;
        exitCode = verdict === "keep" ? 0 : 1;
      }
    }
  } else {
    if (!hit.denom && !misfire.denom) {
      console.log("  WARN no votes parsed — fill choice in votes.csv, then re-run tally");
      process.exit(2);
    }
    const reasons = [];
    if (hit.denom && hit.rate < HIT_LINE - EPS) reasons.push(`hit rate ${(hit.rate * 100).toFixed(0)}% is under the ${HIT_LINE * 100}% line`);
    if (misfire.good > 0) reasons.push(`${misfire.good} should-not quer${misfire.good === 1 ? "y" : "ies"} picked ${targetName} (${rows.filter((r) => r.result === "misfire").map((r) => r.id).join(", ")})`);
    if ((hit.denom && hit.rate < HIT_LINE - EPS) || misfire.good > 0) verdict = "needs-work";
    else if (hit.denom) verdict = "pass";
    if (verdict === "needs-work") {
      verdictLine = `verdict: needs-work — ${reasons.join("; ")}. The description attracts too little or repels too little.`;
      exitCode = 1;
    } else if (verdict === "pass") {
      verdictLine = `verdict: pass — hit rate ${(hit.rate * 100).toFixed(0)}% at or above the ${HIT_LINE * 100}% line and zero misfires on should-not queries.`;
    } else {
      verdictLine = `verdict: unknown — no parsed should-trigger votes; misfires ${misfire.good}.`;
      exitCode = misfire.good ? 1 : 0;
    }
  }

  console.log("");
  if (verdictLine) console.log(verdictLine);

  // exact row to append to evals/results.tsv
  const evidenceBits = [];
  if (hit.denom) evidenceBits.push(`hit ${hit.good}/${hit.denom} (${(hit.rate * 100).toFixed(0)}%)`);
  if (misfire.denom) evidenceBits.push(`misfires ${misfire.good}/${misfire.denom}`);
  if (args.retest) {
    const hHit = rateOf(rows.filter((r) => r.split === "holdout"), true, "hit");
    const hMis = rateOf(rows.filter((r) => r.split === "holdout"), false, "misfire");
    evidenceBits.unshift(`retest holdout: hit ${hHit.good}/${hHit.denom} · misfires ${hMis.good}/${hMis.denom} (overall: ${evidenceBits.join(" · ") || "n/a"})`);
    evidenceBits.length = 1;
  }
  const evidence = evidenceBits.join(" · ") || "no votes parsed";
  const verdictCell = verdict || "unknown";
  console.log("");
  console.log(`# append to evals/results.tsv — columns: timestamp · commit · file · verdict · evidence · eval_mode`);
  console.log(`${new Date().toISOString()}\t${gitCommit()}\tSKILL.md\t${verdictCell}\t${evidence}\ttrigger`);

  if (args["save-baseline"]) {
    const holdoutRows = rows.filter((r) => r.split === "holdout");
    const payload = {
      saved: new Date().toISOString(),
      target: targetName,
      eval_mode: "trigger",
      overall: { hit_rate: hit.rate, hits: hit.good, should_trigger_parsed: hit.denom, misfires: misfire.good, should_not_parsed: misfire.denom },
      holdout: (() => {
        const hHit = rateOf(holdoutRows, true, "hit");
        const hMis = rateOf(holdoutRows, false, "misfire");
        return { hit_rate: hHit.rate, hits: hHit.good, should_trigger_parsed: hHit.denom, misfires: hMis.good, should_not_parsed: hMis.denom };
      })(),
    };
    const p = path.resolve(args["save-baseline"]);
    try {
      writeFileSync(p, JSON.stringify(payload, null, 2) + "\n", "utf-8");
      console.log(`# baseline saved to ${path.relative(process.cwd(), p) || p} (used by --retest)`);
    } catch (e) {
      console.log(`# WARN could not save baseline to ${p} — ${e.message}`);
    }
  }
  process.exit(exitCode);
}

/* ----------------------------------- main ------------------------------------ */

const argv = process.argv.slice(2);
const sub = argv[0];
const rest = argv.slice(1);
if (!sub || sub === "--help" || sub === "-h") usage(sub ? 0 : 2);

if (sub === "check") {
  cmdCheck(parseFlags(rest, { "--skill": "val" }));
} else if (sub === "kit") {
  cmdKit(parseFlags(rest, { "--out": "val", "--neighbor": "array", "--skill": "val", "--file": "val" }));
} else if (sub === "tally") {
  cmdTally(parseFlags(rest, { "--votes": "val", "--retest": "bool", "--baseline": "val", "--save-baseline": "val", "--skill": "val", "--file": "val" }));
} else {
  console.error(`Unknown subcommand: ${sub}`);
  usage(2);
}
