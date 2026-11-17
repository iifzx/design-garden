#!/usr/bin/env node
/**
 * design-garden eval automation harness — the ROADMAP v0.3 loop: plan → collect → tally.
 *
 * Turns the CONTRIBUTING promotion lifecycle into three commands:
 *   plan    declare the eval (one hypothesis, dev tasks, one holdout) and build the two
 *           variant skill dirs from the mirror (s0 = mirror without the candidate,
 *           s1 = mirror with it) plus paste-ready briefs. Guards run before anything
 *           is created.
 *   collect run each variant × task cell through an agent CLI (--exec template with
 *           {brief} {out} {skill_dir}), render deliverable HTML to PNG at the task's
 *           stated size, and build a per-judge blind kit (ab_harness pages with
 *           independent per-judge randomization + rubric score template +
 *           judge-invisible keys). Without --exec it prints paste-ready manual
 *           instructions instead — manual mode is first-class.
 *   tally   join each judge's filled scores.json with that judge's key and apply the
 *           evals/README.md verdict rules exactly: per-task dimension tally, the
 *           >0.5 drop guard, majority promotion over every dev task plus the holdout,
 *           close-call rerun on disagreement with a one-dimension margin, tie = fail
 *           unless the candidate file is shorter than the incumbent, and
 *           facts-before-votes (accusations verified by a human first).
 *
 * Usage:
 *   node scripts/eval_harness.mjs plan --candidate <knowledge-file-relative-path> \
 *        --hypothesis "one sentence" --dev <task-id,...> --holdout <task-id>
 *   node scripts/eval_harness.mjs collect --run <dir> [--exec "<command template>"]
 *        [--judge-count N] [--timeout SECONDS]
 *   node scripts/eval_harness.mjs tally --run <dir> [--judge j1,j2] [--facts-verified]
 *
 * The --exec template may use {brief} (brief file for the task), {out} (output dir
 * for the cell) and {skill_dir} (variant skill dir); the harness quotes expanded
 * paths, so the template should not add its own quotes. Cells run sequentially with
 * a hard timeout (default 120s): stdin is ignored, on expiry the whole process tree
 * is killed and the cell is marked missing. A failed cell is listed, never fatal.
 *
 * Exit codes: 0 = plan built / kit built / verdict promote · 1 = guard violation, or
 * verdict fail / close-call-rerun / facts-pending · 2 = usage error or missing input.
 *
 * Degradations (message instead of crash): missing outputs or renders are listed and
 * skipped; a judge with missing/incomplete scores is excluded from the tally with a
 * note; rubric dimension names fall back to built-ins if evals/rubric.md cannot be
 * parsed; a missing task file's deliverable size falls back to 1440x900; a git-less
 * checkout reports commit "unknown".
 *
 * Env overrides (defaults keep the documented layout; useful for tests):
 *   DESIGN_GARDEN_RUNS_DIR    run-dir root   (default <repo>/evals/runs)
 *   DESIGN_GARDEN_MIRROR_DIR  mirror source  (default <repo>/skills/design-garden)
 */
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { spawn, execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MIRROR = process.env.DESIGN_GARDEN_MIRROR_DIR
  ? path.resolve(process.env.DESIGN_GARDEN_MIRROR_DIR)
  : path.join(REPO_ROOT, "skills", "design-garden");
const RUNS_ROOT = process.env.DESIGN_GARDEN_RUNS_DIR
  ? path.resolve(process.env.DESIGN_GARDEN_RUNS_DIR)
  : path.join(REPO_ROOT, "evals", "runs");
const TASKS_DIR = path.join(REPO_ROOT, "evals", "tasks");
const RUBRIC_FILE = path.join(REPO_ROOT, "evals", "rubric.md");
const SHOOT = path.join(REPO_ROOT, "scripts", "shoot.mjs");
const AB = path.join(REPO_ROOT, "scripts", "ab_harness.mjs");
const FALLBACK_DIMS = ["brief_adherence", "concept_fit", "hierarchy_craft", "anti_slop", "accessibility_floors", "polish_delivery"];
const DEFAULT_SIZE = "1440x900";
const DEFAULT_TIMEOUT_S = 120;
const DEFAULT_JUDGES = 2;

/* --------------------------------- usage ----------------------------------- */

function usage(exitCode = 2) {
  const out = exitCode ? console.error : console.log;
  out(`design-garden eval automation harness — plan → collect → tally.

Usage:
  node scripts/eval_harness.mjs plan --candidate <file> --hypothesis "one sentence" --dev <id,...> --holdout <id>
  node scripts/eval_harness.mjs collect --run <dir> [--exec "<template>"] [--judge-count N] [--timeout S]
  node scripts/eval_harness.mjs tally --run <dir> [--judge j1,j2] [--facts-verified]

  plan     declare the eval and build s0/s1 variant skill dirs + briefs/<task>.md.
           Guards (holdout not in dev, no doc-derived holdout, candidate exists) run
           before anything is created.
  collect  --exec runs each variant × task cell ({brief} {out} {skill_dir} in the
           template) with a hard timeout; without it, manual instructions are printed.
           Renders deliverable HTML at the task's stated size, then builds per-judge
           blind pages + scores.template.json + judge-invisible keys.
  tally    join scores.json with keys, print the per-task table, the verdict
           (promote / fail / close-call-rerun), and the evals/results.tsv row.

Exit codes: 0 ok/promote · 1 guard violation or fail/close-call/facts-pending · 2 usage/missing input.`);
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
    else args[key] = argv[++i];
  }
  return args;
}

/* ------------------------------ small helpers ------------------------------ */

const isFile = (p) => { try { return existsSync(p) && statSync(p).isFile(); } catch { return false; } };
const isDir = (p) => { try { return existsSync(p) && statSync(p).isDirectory(); } catch { return false; } };
const q = (p) => `"${p}"`; // quote expanded paths — the template must not add its own quotes
const rel = (p) => path.relative(REPO_ROOT, p) || p;

function readJson(p) {
  try { return JSON.parse(readFileSync(p, "utf-8").replace(/^\uFEFF/, "")); } catch { return null; }
}

function gitCommit() {
  try {
    return execFileSync("git", ["rev-parse", "HEAD"], { cwd: REPO_ROOT, stdio: ["ignore", "pipe", "ignore"] }).toString().trim() || "unknown";
  } catch { return "unknown"; }
}

function listHtml(dir) {
  if (!isDir(dir)) return [];
  return readdirSync(dir).filter((f) => f.toLowerCase().endsWith(".html")).sort().map((f) => path.join(dir, f));
}

function pad(s, n) { return String(s).padEnd(n); }

/* --------------------- process runner with hard timeout -------------------- */

function killTree(pid) {
  try {
    if (process.platform === "win32") {
      spawn("taskkill", ["/pid", String(pid), "/T", "/F"], { stdio: "ignore", windowsHide: true });
    } else {
      try { process.kill(-pid, "SIGKILL"); } catch { try { process.kill(pid, "SIGKILL"); } catch { /* already gone */ } }
    }
  } catch { /* already gone */ }
}

/** Run one command string through the shell with stdin ignored and a hard timeout.
 *  Never throws, never hangs: on expiry the process tree is killed and the promise
 *  resolves with status "timeout". A cell that spawns nothing resolves "spawn-error". */
function runCell(cmd, timeoutMs) {
  return new Promise((resolve) => {
    let settled = false;
    let child;
    try {
      child = spawn(cmd, {
        shell: true,
        stdio: ["ignore", "pipe", "pipe"],
        cwd: REPO_ROOT,
        windowsHide: true,
        detached: process.platform !== "win32", // posix: own process group, so the tree dies together
      });
    } catch (e) {
      return resolve({ status: "spawn-error", detail: e.message, tail: "" });
    }
    let stdout = "";
    let stderr = "";
    const finish = (r) => { if (!settled) { settled = true; clearTimeout(timer); resolve(r); } };
    const timer = setTimeout(() => {
      killTree(child.pid);
      finish({ status: "timeout", detail: `killed after ${Math.round(timeoutMs / 1000)}s`, tail: "" });
    }, timeoutMs);
    child.stdout.on("data", (d) => { stdout += d; if (stdout.length > 20000) stdout = stdout.slice(-20000); });
    child.stderr.on("data", (d) => { stderr += d; if (stderr.length > 20000) stderr = stderr.slice(-20000); });
    child.on("error", (e) => finish({ status: "spawn-error", detail: e.message, tail: "" }));
    child.on("close", (code) => finish({ status: code === 0 ? "ok" : `exit-${code}`, detail: "", tail: (stderr || stdout).split(/\r?\n/).filter(Boolean).slice(-3).join(" | ").slice(0, 300) }));
  });
}

/* ------------------------------ task / rubric ------------------------------- */

function rubricDims() {
  try {
    const text = readFileSync(RUBRIC_FILE, "utf-8");
    const names = [...text.matchAll(/\*\*\d\s*·\s*([^*]+)\*\*/g)].map((m) => m[1].trim());
    if (names.length === 6) {
      return names.map((n) => n.toLowerCase().replace(/&/g, " ").replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/_{2,}/g, "_"));
    }
  } catch { /* fall through to built-ins */ }
  return FALLBACK_DIMS;
}

/** Deliverable meta line plus its indented continuation lines, joined to one line. */
function deliverableBlock(text) {
  const lines = text.split(/\r?\n/);
  const out = [];
  let on = false;
  for (const ln of lines) {
    if (!on) {
      if (/^-\s*deliverable:/.test(ln)) { on = true; out.push(ln.replace(/^-\s*deliverable:\s*/, "")); }
      continue;
    }
    if (/^\s+\S/.test(ln)) out.push(ln.trim());
    else break;
  }
  return out.join(" ").trim();
}

function briefSection(text) {
  const lines = text.split(/\r?\n/);
  const i = lines.findIndex((l) => /^## Brief\s*$/.test(l));
  if (i < 0) return "";
  const out = [];
  for (let j = i + 1; j < lines.length; j++) {
    if (/^## /.test(lines[j])) break;
    out.push(lines[j]);
  }
  return out.join("\n").trim();
}

function loadTask(taskId) {
  const file = path.join(TASKS_DIR, `${taskId}.md`);
  const text = readFileSync(file, "utf-8");
  return { file, text, deliverable: deliverableBlock(text), brief: briefSection(text) };
}

/** First WxH size in the task's deliverable line (covers "1080x1920" and "1080×1440"). */
function deliverableSize(taskId) {
  try {
    const s = /\b(\d{2,5})\s*[x×]\s*(\d{2,5})\b/i.exec(deliverableBlock(loadTask(taskId).text));
    if (s) return `${s[1]}x${s[2]}`;
  } catch { /* fall through to the default */ }
  return DEFAULT_SIZE;
}

/* ------------------------------ declaration --------------------------------- */

function loadDeclaration(runDir) {
  const runJson = readJson(path.join(runDir, "run.json"));
  if (runJson && Array.isArray(runJson.dev) && runJson.holdout && runJson.candidate) {
    return { ...runJson, tasks: [...runJson.dev, runJson.holdout] };
  }
  // fall back to parsing declaration.md (older or hand-written run dirs)
  const file = path.join(runDir, "declaration.md");
  if (!isFile(file)) return null;
  const text = readFileSync(file, "utf-8");
  const line = (re) => { const m = re.exec(text); return m ? m[1].trim() : null; };
  const candidate = line(/^- candidate:\s*(.+)$/m);
  const devLine = line(/^- dev:\s*(.+)$/m);
  const holdout = line(/^- holdout:\s*(.+)$/m);
  const hypothesis = line(/^- hypothesis:\s*(.+)$/m) || "";
  if (!candidate || !devLine || !holdout) return null;
  const dev = devLine.split(",").map((s) => s.trim()).filter(Boolean);
  return { createdAt: null, hypothesis, candidate, dev, holdout, tasks: [...dev, holdout] };
}

function resolveRun(p) {
  if (!p) usage(2);
  const abs = path.resolve(p);
  if (!isDir(abs) || !loadDeclaration(abs)) {
    console.error(`eval harness: not a run dir (no declaration.md/run.json): ${abs}`);
    process.exit(2);
  }
  return abs;
}

/* ---------------------------------- plan ------------------------------------ */

function runNote(variant) {
  return `design-garden eval variant ${variant}

This directory is a self-contained snapshot of the design-garden skill for a
blind A/B eval. Read SKILL.md in THIS directory and treat THIS directory as
the whole skill. Do not read or load any other design-garden copy (installed
skills, sibling checkouts, ~/.agents/skills, ...). Work only inside the output
directory you are told to use and write the deliverable HTML there. Do not
list or explore other directories of the eval run — the two variants must
stay blind to each other, and prompts never list directory contents.
`;
}

function cmdPlan(args) {
  for (const [flag, key] of [["--candidate", "candidate"], ["--hypothesis", "hypothesis"], ["--dev", "dev"], ["--holdout", "holdout"]]) {
    if (!args[key]) { console.error(`plan: missing ${flag}`); usage(2); }
  }
  const candidate = String(args.candidate).replace(/\\/g, "/").replace(/^\.\/+/, "").replace(/\/+$/, "");
  const hypothesis = String(args.hypothesis).trim();
  const dev = String(args.dev).split(",").map((s) => s.trim()).filter(Boolean);
  const holdout = String(args.holdout).trim();

  // ---- guards: everything that would make this eval dishonest or unrunnable,
  // ---- checked BEFORE creating anything
  const guards = [];
  if (candidate.startsWith("/") || /^[a-zA-Z]:/.test(candidate) || candidate.split("/").includes("..")) {
    guards.push(`candidate path must be relative to the skill root (no leading /, no ..): "${candidate}"`);
  }
  let candidateSource = null;
  let candidateFrom = null;
  if (!guards.length) {
    const rootTry = path.join(REPO_ROOT, candidate);
    const mirrorTry = path.join(MIRROR, candidate);
    if (isFile(rootTry)) { candidateSource = rootTry; candidateFrom = "working tree"; }
    else if (isFile(mirrorTry)) { candidateSource = mirrorTry; candidateFrom = "mirror"; }
    else guards.push(`candidate file not found — tried ${rel(rootTry)} and ${rel(mirrorTry)}`);
  }
  if (dev.includes(holdout)) guards.push(`holdout "${holdout}" is also a dev task — the acceptance task must sit outside the dev set`);
  if (!dev.length) guards.push("--dev needs at least one task id (comma-separated)");
  if (!hypothesis) guards.push("--hypothesis needs the one sentence being tested");
  if (!isDir(MIRROR)) guards.push(`mirror skill dir not found: ${rel(MIRROR)} (it is the source for both variants)`);

  const tasks = [...dev, holdout];
  const loaded = {};
  for (const t of new Set(tasks)) {
    if (!isFile(path.join(TASKS_DIR, `${t}.md`))) { guards.push(`task file not found: evals/tasks/${t}.md`); continue; }
    loaded[t] = loadTask(t);
    if (!loaded[t].brief) guards.push(`task ${t}: no "## Brief" section in evals/tasks/${t}.md`);
  }
  if (loaded[holdout] && /^-\s*doc-derived\s*:/m.test(loaded[holdout].text)) {
    guards.push(`holdout task "${holdout}" carries a "- doc-derived:" line — a doc-derived task can never be the holdout (testing a document with its own documentation finds only what the document already admits)`);
  }
  if (guards.length) {
    console.error(`eval harness plan — ${guards.length} guard violation${guards.length === 1 ? "" : "s"}, nothing created:`);
    for (const g of guards) console.error(`  GUARD  ${g}`);
    process.exit(1);
  }
  const warns = [];
  for (const t of dev) if (loaded[t] && /^\s*-\s*split:\s*holdout/m.test(loaded[t].text)) warns.push(`dev task "${t}" is marked split: holdout in its task file — dev tasks are the finding set and may be rerun freely`);
  if (loaded[holdout] && /^\s*-\s*split:\s*dev/m.test(loaded[holdout].text)) warns.push(`holdout task "${holdout}" is marked split: dev in its task file`);

  // ---- build the run dir
  const slug = candidate.replace(/\.[a-z]+$/i, "").split("/").pop().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "candidate";
  const d = new Date();
  const p2 = (n) => String(n).padStart(2, "0");
  const stamp = `${d.getFullYear()}${p2(d.getMonth() + 1)}${p2(d.getDate())}-${p2(d.getHours())}${p2(d.getMinutes())}`;
  let runDir;
  for (let n = 1; ; n++) {
    const trial = path.join(RUNS_ROOT, n === 1 ? `${stamp}-${slug}` : `${stamp}-${slug}-${n}`);
    if (!existsSync(trial)) { runDir = trial; break; }
  }
  mkdirSync(runDir, { recursive: true });

  for (const v of ["s0", "s1"]) {
    cpSync(MIRROR, path.join(runDir, v), { recursive: true });
    writeFileSync(path.join(runDir, v, "RUN-NOTE.txt"), runNote(v), "utf-8");
  }
  // s0 = the skill without the candidate file — remove it from the copy when the
  // mirror already carries it. Its bytes are snapshotted first, because the tie
  // rule (a tie promotes only when the candidate is shorter than the incumbent)
  // needs the incumbent's length even though s0 itself must not contain the file.
  const mirrorCand = path.join(MIRROR, candidate);
  let incumbentBytes = null;
  if (isFile(mirrorCand)) {
    const incSnap = path.join(runDir, "incumbent", candidate);
    mkdirSync(path.dirname(incSnap), { recursive: true });
    cpSync(mirrorCand, incSnap);
    incumbentBytes = statSync(mirrorCand).size;
  }
  const s0Cand = path.join(runDir, "s0", candidate);
  if (existsSync(s0Cand)) rmSync(s0Cand, { force: true });
  const s1Cand = path.join(runDir, "s1", candidate);
  mkdirSync(path.dirname(s1Cand), { recursive: true });
  cpSync(candidateSource, s1Cand); // s1 = the incumbent plus the candidate

  mkdirSync(path.join(runDir, "briefs"), { recursive: true });
  for (const t of tasks) {
    const t2 = loaded[t];
    writeFileSync(
      path.join(runDir, "briefs", `${t}.md`),
      `# Brief — ${t}\n\n${t2.deliverable ? `- deliverable: ${t2.deliverable}\n\n` : ""}## Brief\n\n${t2.brief}\n`,
      "utf-8",
    );
  }

  const dateLine = `${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())} ${p2(d.getHours())}:${p2(d.getMinutes())}`;
  writeFileSync(
    path.join(runDir, "declaration.md"),
    `# Eval declaration — ${slug}

- date: ${dateLine}
- hypothesis: ${hypothesis}
- candidate: ${candidate}
  (resolved from the ${candidateFrom}; s0 = mirror without it, s1 = mirror with it)
- incumbent: ${incumbentBytes != null ? `${incumbentBytes} bytes (snapshotted at incumbent/${candidate} for the tie rule)` : "none — the candidate is a new file; a tie will be a fail"}
- dev: ${dev.join(", ")}
- holdout: ${holdout}

One hypothesis, tested once. Procedure and verdict rules: evals/README.md step 5;
rubric: evals/rubric.md. The holdout runs once, at acceptance, after the dev set.
`,
    "utf-8",
  );
  writeFileSync(
    path.join(runDir, "run.json"),
    JSON.stringify({ createdAt: new Date().toISOString(), hypothesis, candidate, candidateFrom, incumbentBytes, dev, holdout, tasks, variants: ["s0", "s1"] }, null, 2) + "\n",
    "utf-8",
  );

  console.log(`plan · ${rel(runDir)}`);
  console.log(`  hypothesis: ${hypothesis}`);
  console.log(`  candidate: ${candidate} (from the ${candidateFrom})`);
  console.log(`  incumbent: ${incumbentBytes != null ? `${incumbentBytes} bytes, snapshotted at incumbent/${candidate}` : "none — new file; a tie will be a fail"}`);
  console.log(`  dev: ${dev.join(", ")} · holdout: ${holdout}`);
  for (const w of warns) console.log(`  WARN ${w}`);
  console.log(`  variants: s0 (mirror without the candidate), s1 (mirror with it) — each has RUN-NOTE.txt for the executing agent`);
  console.log(`  briefs: ${tasks.map((t) => `briefs/${t}.md`).join(", ")}`);
  console.log(`  cost: ${2 * tasks.length} agent runs + ${2 * tasks.length} renders + judges × ${tasks.length} × 12 dimension scores (2 judges → ${2 * tasks.length * 12})`);
  console.log(`  next: node scripts/eval_harness.mjs collect --run ${rel(runDir)}`);
  process.exit(0);
}

/* --------------------------------- collect ----------------------------------- */

function printManualInstructions(runDir, tasks, decl) {
  console.log(`manual mode — run each cell yourself, then re-run this same command to render + build the kit.`);
  console.log(``);
  console.log(`For every variant (s0 = mirror without the candidate, s1 = mirror with it) and every task:`);
  console.log(`  1. Prompt your agent CLI with the full text of ${rel(path.join(runDir, "briefs"))}/<task-id>.md and tell it`);
  console.log(`     to read SKILL.md in ${rel(path.join(runDir, "<variant>"))} and treat that directory as the whole skill`);
  console.log(`     (each variant dir carries RUN-NOTE.txt with these instructions).`);
  console.log(`  2. Have it write the deliverable HTML into ${rel(path.join(runDir, "outputs"))}/<variant>/<task-id>/ .`);
  console.log(`  Keep the two variants' outputs invisible to each other; prompts never list directory contents.`);
  console.log(`  Prefer a fresh session per cell so one cell cannot see another's output.`);
  console.log(`  3. When every cell has an .html (or you drop your own screenshots at`);
  console.log(`     ${rel(path.join(runDir, "renders"))}/<task-id>-A.png / <task-id>-B.png at the deliverable's stated size),`);
  console.log(`     re-run:  node scripts/eval_harness.mjs collect --run ${rel(runDir)}`);
}

function scanLeaks(runDir, decl) {
  const outputsRoot = path.join(runDir, "outputs");
  if (!isDir(outputsRoot)) return;
  const markers = [
    ["candidate filename", path.basename(decl.candidate)],
    ["run-dir name", path.basename(runDir)],
    ["variant token s0", /\bs0\b/],
    ["variant token s1", /\bs1\b/],
  ];
  const hits = [];
  const walk = (dir) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.toLowerCase().endsWith(".html")) {
        const text = readFileSync(p, "utf-8");
        for (const [label, m] of markers) {
          if (m instanceof RegExp ? m.test(text) : text.includes(m)) hits.push(`${rel(p)} → ${label}`);
        }
      }
    }
  };
  try { walk(outputsRoot); } catch { return; }
  if (hits.length) {
    console.log(`redaction check — provenance markers found in outputs (strip before judging: paths, watermarks, timestamps, variant tokens):`);
    for (const h of hits) console.log(`  LEAK?  ${h}`);
  } else {
    console.log(`redaction check: no provenance markers found in outputs`);
  }
}

function judgeKitReadme(runDir, tasks, judgeCount) {
  return `design-garden blind judging kit — ${path.basename(runDir)}

There are ${judgeCount} judge folder(s) here (j1..j${judgeCount}). Each judge uses ONE folder only.

For each task page <task-id>.html inside your folder:
  1. Open the page. The two sides are labeled Variant 1 and Variant 2. Score BOTH
     sides against evals/rubric.md (6 dimensions, 1-5 each) BEFORE clicking
     "Reveal mapping" — ideally without ever clicking it.
  2. Fill scores.template.json: under "A" put the Variant 1 scores, under "B" the
     Variant 2 scores — one number per rubric dimension. Score what you see, not
     what you suspect.
  3. If you notice a factual problem (invented facts, wrong numbers, broken claims),
     record it under a top-level "facts" key in the same file, as free text.
     Accusations are verified by a human before any votes are counted.
  4. Save the filled file as scores.json in this same folder (leave
     scores.template.json as-is) and tell the operator.
  5. Never ask which side is which, and never record it — the mapping lives in
     keys/ outside this kit and is invisible to judges on purpose.
`;
}

async function cmdCollect(args) {
  const runDir = resolveRun(args.run);
  const decl = loadDeclaration(runDir);
  const tasks = decl.tasks;
  const reqTimeout = Number(args.timeout || DEFAULT_TIMEOUT_S) || DEFAULT_TIMEOUT_S;
  if (reqTimeout < 5) console.log(`  note: --timeout raised to the 5s floor (a shorter hard limit kills every cell before it starts)`);
  const timeoutMs = Math.max(5, reqTimeout) * 1000;
  const judgeCount = Math.max(1, Math.min(6, Math.floor(Number(args["judge-count"] || DEFAULT_JUDGES) || DEFAULT_JUDGES)));
  const outputsRoot = path.join(runDir, "outputs");
  const rendersDir = path.join(runDir, "renders");
  const kitRoot = path.join(runDir, "judge-kit");
  const keysDir = path.join(runDir, "keys");
  const cells = [];
  for (const variant of ["s0", "s1"]) for (const t of tasks) cells.push({ variant, task: t });

  console.log(`collect · ${rel(runDir)} · ${cells.length} cells (${tasks.length} tasks × 2 variants) · timeout ${timeoutMs / 1000}s`);

  // ---- phase 1: execute the cells (or print manual instructions)
  if (args.exec) {
    const template = String(args.exec);
    for (const ph of ["{brief}", "{out}", "{skill_dir}"]) {
      if (!template.includes(ph)) console.log(`  note: template lacks ${ph} — every cell would run the identical command`);
    }
    const results = [];
    for (const c of cells) {
      const briefPath = path.join(runDir, "briefs", `${c.task}.md`);
      const outDir = path.join(outputsRoot, c.variant, c.task);
      const variantDir = path.join(runDir, c.variant);
      mkdirSync(outDir, { recursive: true });
      const cmd = template
        .replaceAll("{brief}", q(briefPath))
        .replaceAll("{out}", q(outDir))
        .replaceAll("{skill_dir}", q(variantDir));
      console.log(`RUN  ${c.variant} × ${c.task}\n     ${cmd}`);
      const r = await runCell(cmd, timeoutMs);
      console.log(`     → ${r.status}${r.detail ? ` (${r.detail})` : ""}${r.status !== "ok" && r.tail ? ` — ${r.tail}` : ""}`);
      results.push({ variant: c.variant, task: c.task, cmd, status: r.status, detail: r.detail || "" });
    }
    writeFileSync(path.join(outputsRoot, "exec-results.json"), JSON.stringify({ ranAt: new Date().toISOString(), timeoutMs, cells: results }, null, 2) + "\n", "utf-8");
    const bad = results.filter((r) => r.status !== "ok");
    console.log(bad.length
      ? `  exec: ${results.length - bad.length}/${results.length} cells ok — failed cells listed, not fatal: ${bad.map((b) => `${b.variant}/${b.task} ${b.status}`).join(", ")}`
      : `  exec: ${results.length}/${results.length} cells ok`);
  } else {
    const filled = cells.filter((c) => listHtml(path.join(outputsRoot, c.variant, c.task)).length).length;
    const rendersReady = tasks.filter((t) => isFile(path.join(rendersDir, `${t}-A.png`)) && isFile(path.join(rendersDir, `${t}-B.png`))).length;
    printManualInstructions(runDir, tasks, decl);
    if (!filled && !rendersReady) {
      console.log(`nothing collected yet — stopping after instructions (fill the cells, then re-run this command).`);
      process.exit(0);
    }
    console.log(`cells with .html output: ${filled}/${cells.length} · tasks with a full PNG pair: ${rendersReady}/${tasks.length} — continuing with what exists`);
  }

  // ---- phase 2: render deliverables to PNG at the task's stated size
  mkdirSync(rendersDir, { recursive: true });
  for (const c of cells) {
    const side = c.variant === "s0" ? "A" : "B"; // A = baseline variant, B = candidate variant (matches evals/README.md step 2)
    const canon = path.join(rendersDir, `${c.task}-${side}.png`);
    if (isFile(canon)) { console.log(`RENDER ${c.task}-${side}: existing PNG reused (delete renders/ to re-render)`); continue; }
    const htmls = listHtml(path.join(outputsRoot, c.variant, c.task));
    if (!htmls.length) { console.log(`RENDER ${c.task}-${side}: no .html in outputs/${c.variant}/${c.task} — cell skipped`); continue; }
    const size = deliverableSize(c.task);
    let canonicalDone = false;
    let alt = 0;
    for (const html of htmls) {
      const tmp = path.join(rendersDir, `.shoot-${c.variant}-${c.task}-${alt}`);
      rmSync(tmp, { recursive: true, force: true });
      mkdirSync(tmp, { recursive: true });
      console.log(`RENDER ${c.task}-${side}: node scripts/shoot.mjs ${rel(html)} --size ${size}${canonicalDone ? " (alt render)" : ""}`);
      const r = await runCell(`node ${q(SHOOT)} ${q(html)} --size ${size} --out ${q(tmp)}`, timeoutMs);
      const pngs = r.status === "ok" && isDir(tmp) ? readdirSync(tmp).filter((f) => f.toLowerCase().endsWith(".png")).sort() : [];
      if (r.status === "ok" && pngs.length) {
        const target = canonicalDone ? path.join(rendersDir, `${c.task}-${side}.alt-${alt}.png`) : canon;
        cpSync(path.join(tmp, pngs[0]), target);
        console.log(`       → ${rel(target)}`);
        canonicalDone = true;
      } else {
        console.log(`       → ${r.status}${r.status === "ok" && !pngs.length ? " (no PNG produced)" : ""}${r.tail ? ` — ${r.tail}` : ""}`);
      }
      rmSync(tmp, { recursive: true, force: true });
      alt++;
    }
    if (!canonicalDone) console.log(`RENDER ${c.task}-${side}: FAILED for every .html — listed, not fatal (drop your own PNG at ${rel(canon)} to continue)`);
  }

  // ---- phase 3: build the per-judge blind kit
  const dims = rubricDims();
  mkdirSync(keysDir, { recursive: true });
  const pairA = (t) => path.join(rendersDir, `${t}-A.png`);
  const pairB = (t) => path.join(rendersDir, `${t}-B.png`);
  const ready = tasks.filter((t) => isFile(pairA(t)) && isFile(pairB(t)));
  const notReady = tasks.filter((t) => !ready.includes(t));
  if (notReady.length) console.log(`  no blind pair for: ${notReady.join(", ")} (missing render(s)) — the kit skips them`);

  for (let j = 1; j <= judgeCount; j++) {
    const jk = `j${j}`;
    const jkDir = path.join(kitRoot, jk);
    mkdirSync(jkDir, { recursive: true });
    const key = {};
    for (const t of ready) {
      const page = path.join(jkDir, `${t}.html`);
      const r = await runCell(`node ${q(AB)} --pair ${q(pairA(t))} ${q(pairB(t))} --out ${q(page)}`, timeoutMs);
      if (r.status !== "ok") { console.log(`KIT  ${jk}/${t}: ab_harness ${r.status} — skipped`); continue; }
      const mapping = parseSideOrder(readFileSync(page, "utf-8"));
      if (!mapping) { console.log(`KIT  ${jk}/${t}: could not read the randomized order back from the page — task skipped`); continue; }
      key[t] = mapping;
    }
    const keyed = Object.keys(key);
    if (!keyed.length) { console.log(`KIT  ${jk}: no tasks keyed — nothing written`); continue; }
    writeFileSync(path.join(keysDir, `${jk}.json`), JSON.stringify(key, null, 2) + "\n", "utf-8");
    const template = {};
    for (const t of keyed) template[t] = { A: dimNulls(dims), B: dimNulls(dims) };
    writeFileSync(path.join(jkDir, "scores.template.json"), JSON.stringify(template, null, 2) + "\n", "utf-8");
    if (isFile(path.join(jkDir, "scores.json"))) console.log(`KIT  ${jk}: scores.json already present — kept (template refreshed)`);
    console.log(`KIT  ${jk}: ${keyed.length} blind page(s) + scores.template.json (independent shuffle per judge) · key at keys/${jk}.json — judge-invisible, never share it`);
  }
  writeFileSync(path.join(kitRoot, "README.txt"), judgeKitReadme(runDir, tasks, judgeCount), "utf-8");
  scanLeaks(runDir, decl);
  console.log(`  rubric dimensions: ${dims.join(", ")}`);
  console.log(`  next: each judge fills judge-kit/j<k>/scores.json (see judge-kit/README.txt), then:`);
  console.log(`    node scripts/eval_harness.mjs tally --run ${rel(runDir)}`);
  process.exit(0);
}

function dimNulls(dims) {
  return Object.fromEntries(dims.map((d) => [d, null]));
}

/** Read the randomized left/right order back out of an ab_harness page.
 *  The reveal paragraph names the two PNG basenames; -A = s0 baseline, -B = s1 candidate.
 *  Judge label A = page "Variant 1", judge label B = page "Variant 2". */
function parseSideOrder(html) {
  const m = /Variant 1 = (\S+) · Variant 2 = (\S+)</.exec(html);
  if (!m) return null;
  const under = (name) => (name.endsWith("-A.png") ? "s0" : name.endsWith("-B.png") ? "s1" : null);
  const a = under(m[1]);
  const b = under(m[2]);
  if (!a || !b || a === b) return null;
  return { A: a, B: b };
}

/* ---------------------------------- tally ------------------------------------ */

function factsNonEmpty(f) {
  if (f == null) return null;
  if (typeof f === "string") return f.trim() ? f.trim() : null;
  if (Array.isArray(f)) return f.length ? f : null;
  if (typeof f === "object") {
    const vals = Object.entries(f).filter(([, v]) => v != null && String(v).trim() !== "");
    return vals.length ? Object.fromEntries(vals) : null;
  }
  return String(f);
}

function cmdTally(args) {
  const runDir = resolveRun(args.run);
  const decl = loadDeclaration(runDir);
  const tasks = decl.tasks;
  const devCount = decl.dev.length;
  const dims = rubricDims();
  const kitRoot = path.join(runDir, "judge-kit");
  const keysDir = path.join(runDir, "keys");

  const judges = args.judge
    ? String(args.judge).split(",").map((s) => s.trim()).filter(Boolean)
    : (isDir(kitRoot) ? readdirSync(kitRoot).filter((d) => /^j\d+$/.test(d) && isDir(path.join(kitRoot, d))).sort((a, b) => Number(a.slice(1)) - Number(b.slice(1))) : []);
  if (!judges.length) { console.error("tally: no judges found — pass --judge j1,j2 or build the kit first (collect)"); process.exit(2); }

  const loaded = [];
  for (const jk of judges) {
    const scores = readJson(path.join(kitRoot, jk, "scores.json"));
    const key = readJson(path.join(keysDir, `${jk}.json`));
    if (!scores) { console.log(`judge ${jk}: no filled scores.json — excluded`); continue; }
    if (!key) { console.log(`judge ${jk}: key file keys/${jk}.json missing — scores unusable, excluded`); continue; }
    loaded.push({ jk, scores, key });
  }
  if (!loaded.length) { console.error("tally: no judge has a usable scores.json + key pair — nothing to tally"); process.exit(2); }

  console.log(`tally · ${rel(runDir)} · candidate ${decl.candidate} · ${loaded.length}/${judges.length} judge(s) usable · rubric dimensions: ${dims.join(", ")}`);

  // ---- facts before votes: accusations are verified by a human before counting
  const accusations = [];
  for (const l of loaded) {
    const f = factsNonEmpty(l.scores.facts);
    if (f) accusations.push({ jk: l.jk, facts: f });
  }
  if (accusations.length) {
    console.log(``);
    console.log(`FACTS BEFORE VOTES — judge(s) recorded factual accusations; a human must verify each against the deliverables before votes count:`);
    for (const a of accusations) console.log(`  ${a.jk}: ${typeof a.facts === "string" ? a.facts : JSON.stringify(a.facts)}`);
    if (!args["facts-verified"]) {
      console.log(``);
      console.log(`verdict: facts-pending — accusations are unverified. Check each one, then re-run with --facts-verified to count the votes.`);
      printTsvRow(decl, "facts-pending", `e2 · facts unverified: ${accusations.length} accusation(s)`, loaded, tasks, null);
      process.exit(1);
    }
    console.log(`facts: verified by a human (--facts-verified) — counting votes.`);
  }

  // ---- candidate vs incumbent sizes (tie rule). s0 deliberately does NOT contain
  // ---- the candidate file, so the incumbent's length comes from the plan-time
  // ---- snapshot in incumbent/ (falling back to an s0 copy for hand-made run dirs).
  const candFile = path.join(runDir, "s1", decl.candidate);
  const incSnapshot = path.join(runDir, "incumbent", decl.candidate);
  const incFile = isFile(incSnapshot) ? incSnapshot : path.join(runDir, "s0", decl.candidate);
  const sizes = { cand: isFile(candFile) ? statSync(candFile).size : null, inc: isFile(incFile) ? statSync(incFile).size : null };

  // ---- per task × judge outcome
  const isWin = (r) => r.outcome === "win" || r.outcome === "tie-win";
  const results = {};
  for (const t of tasks) {
    results[t] = {};
    for (const l of loaded) {
      const keyEntry = l.key[t];
      const label = keyEntry && Object.keys(keyEntry).find((k) => keyEntry[k] === "s1");
      const baseLabel = keyEntry && Object.keys(keyEntry).find((k) => keyEntry[k] === "s0");
      const entry = l.scores[t];
      if (!label || !baseLabel || !entry) { results[t][l.jk] = { outcome: "missing", reason: "no key/scores for this task" }; continue; }
      if (typeof entry !== "object" || entry[label] == null || entry[baseLabel] == null) {
        results[t][l.jk] = { outcome: "missing", reason: `scores must use the blind labels A and B` };
        continue;
      }
      const c = entry[label];
      const b = entry[baseLabel];
      const numeric = dims.every((d) => Number.isFinite(Number(c[d])) && Number.isFinite(Number(b[d])));
      if (!numeric) { results[t][l.jk] = { outcome: "incomplete", reason: "missing or non-numeric dimension score" }; continue; }
      let wins = 0;
      let losses = 0;
      let maxDrop = 0;
      let dropDim = null;
      for (const d of dims) {
        const cd = Number(c[d]);
        const bd = Number(b[d]);
        if (cd > bd) wins++;
        else if (cd < bd) { losses++; if (bd - cd > maxDrop) { maxDrop = bd - cd; dropDim = d; } }
      }
      const margin = wins - losses;
      let outcome;
      let reason = "";
      if (wins > losses && maxDrop <= 0.5) outcome = "win";
      else if (wins > losses) { outcome = "blocked"; reason = `wins more dims but drops ${maxDrop} on ${dropDim} (>0.5)`; }
      else if (wins === losses) {
        if (sizes.cand != null && sizes.inc != null && sizes.cand < sizes.inc) { outcome = "tie-win"; reason = `tie but candidate shorter: ${sizes.cand}B < ${sizes.inc}B — equal output for fewer loaded tokens`; }
        else if (sizes.inc == null || sizes.cand == null) { outcome = "tie-fail"; reason = "tie on a new file (no incumbent to be shorter than) — a tie is a fail"; }
        else { outcome = "tie-fail"; reason = `tie on a longer/equal file: ${sizes.cand}B vs incumbent ${sizes.inc}B — a tie is a fail`; }
      } else {
        outcome = "loss"; // counts say it all — no footnote needed
      }
      results[t][l.jk] = { outcome, wins, losses, even: dims.length - wins - losses, maxDrop, margin, reason };
    }
  }

  // ---- table (compact cells; reasons go to footnotes so columns never jam)
  console.log(``);
  console.log(`  ${pad("task", 26)} ${loaded.map((l) => pad(l.jk, 26)).join("")}`);
  const notes = [];
  for (const t of tasks) {
    const tag = t === decl.holdout ? " (holdout)" : devCount && t === tasks[0] ? " (dev)" : "";
    const cellsOut = loaded.map((l) => {
      const r = results[t][l.jk];
      if (!r || r.outcome === "missing") return pad("— missing", 26);
      if (r.outcome === "incomplete") return pad("incomplete", 26);
      if (r.reason) notes.push(`${t} / ${l.jk} — ${r.outcome}: ${r.reason}`);
      return pad(`${r.outcome} ${r.wins}W ${r.losses}L ${r.even}E (margin ${r.margin > 0 ? "+" : ""}${r.margin})`, 26);
    }).join("");
    console.log(`  ${pad(t + tag, 26)} ${cellsOut}`);
  }
  for (const n of notes) console.log(`  note: ${n}`);

  // ---- close-call tasks: voters disagree AND some voter's margin is one dimension
  const closeCall = tasks.filter((t) => {
    const valid = loaded.map((l) => results[t][l.jk]).filter((r) => r && r.wins != null);
    if (valid.length < 2) return false;
    const disagree = valid.some(isWin) && valid.some((r) => !isWin(r));
    const narrow = valid.some((r) => Math.abs(r.margin) === 1);
    return disagree && narrow;
  });

  // ---- promotion: majority of voters win EVERY declared dev task plus the holdout
  const U = loaded.length;
  const reachers = loaded.filter((l) => tasks.every((t) => results[t][l.jk] && isWin(results[t][l.jk]))).length;
  const majority = reachers > U / 2;
  const anyTieWin = tasks.some((t) => loaded.some((l) => results[t][l.jk]?.outcome === "tie-win"));
  const anyTieFail = tasks.some((t) => loaded.some((l) => results[t][l.jk]?.outcome === "tie-fail"));
  const anyPlainLoss = tasks.some((t) => loaded.some((l) => ["loss", "blocked"].includes(results[t][l.jk]?.outcome)));

  let verdict;
  let verdictLine;
  if (majority) {
    verdict = "promote";
    verdictLine = `verdict: promote — ${reachers}/${U} voters won every dev task plus the holdout (majority needs more than ${U / 2}).`
      + (anyTieWin ? ` A tie carried it: the candidate file is shorter than the incumbent.` : ``);
  } else if (closeCall.length) {
    verdict = "close-call-rerun";
    verdictLine = `verdict: close-call-rerun — voters disagree on ${closeCall.join(", ")} and a voter's win/loss margin is one dimension.`
      + ` Regenerate BOTH variants for that task once (same brief, both variants re-run), re-judge, then re-run tally. One rerun, no more.`;
  } else {
    verdict = "fail";
    const blocking = tasks.filter((t) => !loaded.every((l) => results[t][l.jk] && isWin(results[t][l.jk])))
      .map((t) => `${t} (${[...new Set(loaded.map((l) => results[t][l.jk]?.outcome).filter(Boolean))].join("/")})`);
    verdictLine = `verdict: fail — ${reachers}/${U} voters reached a win on every task (majority needs more than ${U / 2}); not won: ${blocking.join(", ")}.`;
  }

  console.log(``);
  console.log(verdictLine);
  if (verdict === "fail" && sizes.inc == null && anyTieFail) {
    console.log(`  note: no incumbent snapshot for this candidate (it is a new file relative to the mirror), so a tie cannot be rescued by length — a tie is a fail.`);
  }

  // ---- exact evals/results.tsv row
  const rowVerdict = verdict === "promote" ? (anyTieWin ? "tie-promote" : "win")
    : verdict === "fail" ? (anyTieFail && !anyPlainLoss ? "tie-revert" : "fail")
    : verdict;
  const perJudge = loaded.map((l) => `${l.jk} ${tasks.map((t) => {
    const r = results[t][l.jk];
    return r && r.wins != null ? `${r.wins}W${r.losses}L${r.even}E` : "—";
  }).join("/")}`).join(", ");
  const evidenceBits = [`e2`, `dims ${perJudge}`, `${reachers}/${U} voters won all ${tasks.length} tasks (dev ${devCount} + holdout 1)`];
  if (anyTieWin || anyTieFail) evidenceBits.push(`candidate ${sizes.cand ?? "?"}B vs incumbent ${sizes.inc ?? "none"}`);
  printTsvRow(decl, rowVerdict, evidenceBits.join(" · "), loaded, tasks, verdictLine);
  process.exit(verdict === "promote" ? 0 : 1);
}

function printTsvRow(decl, verdictCell, evidence, loaded, tasks, verdictLine) {
  console.log(``);
  console.log(`# append to evals/results.tsv — columns: timestamp · commit · file · verdict · evidence · eval_mode`);
  console.log(`${new Date().toISOString()}\t${gitCommit()}\t${decl.candidate}\t${verdictCell}\t${evidence}\tpromotion`);
  if (verdictLine && verdictCell === "facts-pending") console.log(`# (not final — re-run after the accusations are verified)`);
}

/* ----------------------------------- main ------------------------------------ */

const argv = process.argv.slice(2);
const sub = argv[0];
const rest = argv.slice(1);
if (!sub || sub === "--help" || sub === "-h") usage(sub ? 0 : 2);

try {
  if (sub === "plan") cmdPlan(parseFlags(rest, { "--candidate": "val", "--hypothesis": "val", "--dev": "val", "--holdout": "val" }));
  else if (sub === "collect") await cmdCollect(parseFlags(rest, { "--run": "val", "--exec": "val", "--judge-count": "val", "--timeout": "val" }));
  else if (sub === "tally") cmdTally(parseFlags(rest, { "--run": "val", "--judge": "val", "--facts-verified": "bool" }));
  else { console.error(`Unknown subcommand: ${sub}`); usage(2); }
} catch (e) {
  console.error(`eval harness: ${e && e.message ? e.message : e}`);
  process.exit(2);
}
