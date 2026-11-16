#!/usr/bin/env node
/**
 * design-garden knowledge validator — the quality gate for every contribution.
 *
 * Checks schema conformance, line budgets, INDEX sync, and scans knowledge files
 * for prompt-injection patterns. Run before every commit; CI runs it on every PR.
 *
 * Usage: node scripts/validate_knowledge.mjs [--root PATH]
 * Exit code 0 = clean, 1 = errors found.
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";

const BUDGETS = { core: 200, domain: 220, style: 120, case: 150 };
const KINDS = new Set(["core", "domain", "style", "case"]);
const STATUSES = new Set(["core", "proven", "experimental", "local"]);
const KNOWLEDGE_DIRS = ["knowledge/core", "knowledge/domains", "knowledge/styles", "knowledge/case-studies"];
const SKILL_MAX_LINES = 500;

// Patterns that must never appear in files an agent loads as instructions.
const INJECTION_PATTERNS = [
  /ignore\s+(all\s+|any\s+)?previous\s+instructions/i,
  /disregard\s+(all\s+|any\s+|the\s+)?(previous|above|prior)/i,
  /you\s+are\s+now\s+a\b/i,
  /jailbreak/i,
  /exfiltrat/i,
  /curl\s+https?:\/\//i,
  /wget\s+https?:\/\//i,
  /rm\s+-rf\s+\//i,
  /base64[^\n]{0,20}[A-Za-z0-9+/]{120,}={0,2}/,
];
const STYLE_REQUIRED_SECTIONS = ["## Palette", "## Type", "## Layout grammar", "## Prompt handles"];
const DOMAIN_REQUIRED_SECTION = "## Critique checklist";

function parseFrontmatter(text) {
  const lines = text.split(/\r?\n/);
  if (!lines.length || lines[0].trim() !== "---") return { fields: {}, bodyStart: 0 };
  const fields = {};
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "---") return { fields, bodyStart: i + 1 };
    const m = line.match(/^([A-Za-z_][\w-]*)\s*:\s*(.*)$/);
    if (m) fields[m[1]] = m[2].trim().replace(/^['"]|['"]$/g, "");
  }
  return { fields: {}, bodyStart: 0 }; // unterminated frontmatter
}

function parseList(value = "") {
  return value.replace(/^\[|\]$/g, "").split(",").map((s) => s.trim().replace(/^['"]|['"]$/g, "")).filter(Boolean);
}

function countEntries(text) {
  const idx = text.indexOf("## Entries");
  if (idx < 0) return 0;
  return (text.slice(idx).match(/^### /gm) || []).length;
}

const report = { errors: [], warnings: [], oks: [] };
const err = (m) => report.errors.push(m);
const warn = (m) => report.warnings.push(m);
const ok = (m) => report.oks.push(m);

function checkInjection(file, text) {
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(text)) err(`${file}: matches injection pattern ${pattern}`);
  }
  const httpsPat = /http:\/\/[^\s\)\]"']+/g;
  let m;
  while ((m = httpsPat.exec(text))) warn(`${file}: non-HTTPS link ${m[0]}`);
}

function checkKnowledgeFile(file, root) {
  const text = readFileSync(file, "utf-8");
  const { fields } = parseFrontmatter(text);
  const nLines = text.split(/\r?\n/).length;
  const rel = path.relative(root, file).split(path.sep).join("/");
  if (!Object.keys(fields).length) {
    err(`${file}: missing or malformed frontmatter`);
    return null;
  }
  const kind = fields.kind || "";
  const status = fields.status || "";
  if ((fields.id || "") !== path.basename(file, ".md")) {
    err(`${file}: id '${fields.id}' != filename stem '${path.basename(file, ".md")}'`);
  }
  if (!KINDS.has(kind)) err(`${file}: kind '${kind}' not in ${[...KINDS].sort()}`);
  if (!STATUSES.has(status)) err(`${file}: status '${status}' not in ${[...STATUSES].sort()}`);
  for (const req of ["id", "kind", "status", "updated", "source"]) {
    if (!fields[req]) err(`${file}: missing required field '${req}'`);
  }
  const budget = BUDGETS[kind];
  if (budget && nLines > budget) err(`${file}: ${nLines} lines exceeds ${kind} budget ${budget}`);
  if ((kind === "domain" || kind === "style") && !parseList(fields.applies).length) {
    err(`${file}: applies list is empty`);
  }
  if (kind === "domain" && !text.includes(DOMAIN_REQUIRED_SECTION)) {
    err(`${file}: missing required section '${DOMAIN_REQUIRED_SECTION}'`);
  }
  if (kind === "style") {
    for (const section of STYLE_REQUIRED_SECTIONS) {
      if (!text.includes(section)) err(`${file}: missing required style section '${section}'`);
    }
  }
  checkInjection(file, text);
  ok(`${rel}: ${kind}/${status}, ${nLines} lines`);
  return status;
}

function checkLearningFile(file) {
  const text = readFileSync(file, "utf-8");
  const { fields } = parseFrontmatter(text);
  if (!Object.keys(fields).length) {
    err(`${file}: missing or malformed frontmatter`);
    return 0;
  }
  if (fields.kind !== "learning") err(`${file}: learnings kind must be 'learning', got '${fields.kind}'`);
  if (fields.status !== "local") err(`${file}: learnings status must be 'local', got '${fields.status}'`);
  if (!fields.id) err(`${file}: missing required field 'id'`);
  const n = countEntries(text);
  checkInjection(file, text);
  ok(`${path.relative(root, file).split(path.sep).join("/")}: learning file, ${n} entries`);
  return n;
}

function checkIndex(root, statuses) {
  const index = path.join(root, "knowledge", "INDEX.md");
  if (!existsSync(index)) {
    err("knowledge/INDEX.md: missing (required routing table)");
    return;
  }
  const text = readFileSync(index, "utf-8");
  const listed = new Set();
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^\|\s*`?([\w\-/]+\.md)`?\s*\|/);
    if (!m) continue;
    const rel = m[1];
    listed.add(rel);
    const target = path.join(root, "knowledge", rel);
    if (!existsSync(target)) {
      err(`knowledge/INDEX.md: row points to missing file '${rel}'`);
      continue;
    }
    const cells = line.split("|").map((c) => c.trim());
    const rowStatus = cells[2] || "";
    const actual = statuses.get(rel);
    if (actual && rowStatus && rowStatus !== actual) {
      err(`knowledge/INDEX.md: '${rel}' status '${rowStatus}' != file status '${actual}'`);
    }
  }
  for (const rel of statuses.keys()) {
    if (!listed.has(rel)) err(`knowledge/INDEX.md: knowledge file '${rel}' not listed in index`);
  }
}

// --- main ---
const argRoot = process.argv.indexOf("--root");
const root = path.resolve(argRoot > 0 ? process.argv[argRoot + 1] : path.join(import.meta.dirname, ".."));

// SKILL.md
const skill = path.join(root, "SKILL.md");
if (!existsSync(skill)) {
  err("SKILL.md: missing");
} else {
  const text = readFileSync(skill, "utf-8");
  const n = text.split(/\r?\n/).length;
  const { fields } = parseFrontmatter(text);
  if (!fields.name || !fields.description) err("SKILL.md: frontmatter needs non-empty 'name' and 'description'");
  if (n > SKILL_MAX_LINES) err(`SKILL.md: ${n} lines exceeds router budget ${SKILL_MAX_LINES}`);
  else ok(`SKILL.md: router, ${n} lines`);
  checkInjection(skill, text);
}

// knowledge files
const statuses = new Map();
const stats = { core: 0, domain: 0, style: 0, case: 0 };
for (const sub of KNOWLEDGE_DIRS) {
  const dir = path.join(root, sub);
  if (!existsSync(dir)) {
    err(`${sub}: missing directory`);
    continue;
  }
  for (const f of readdirSync(dir).filter((f) => f.endsWith(".md") && f !== "_TEMPLATE.md").sort()) {
    const file = path.join(dir, f);
    const text = readFileSync(file, "utf-8");
    const status = checkKnowledgeFile(file, root);
    const rel = path.relative(path.join(root, "knowledge"), file).split(path.sep).join("/");
    if (status) statuses.set(rel, status);
    const kind = parseFrontmatter(text).fields.kind;
    if (kind in stats) stats[kind]++;
  }
}

// learnings
let totalEntries = 0;
const learningsDir = path.join(root, "learnings");
if (!existsSync(learningsDir)) {
  err("learnings: missing directory");
} else {
  for (const f of readdirSync(learningsDir).filter((f) => f.endsWith(".md") && f !== "_TEMPLATE.md").sort()) {
    totalEntries += checkLearningFile(path.join(learningsDir, f));
  }
}

// index sync
checkIndex(root, statuses);

// report
for (const line of report.oks) console.log(`  OK   ${line}`);
for (const line of report.warnings) console.log(`  WARN ${line}`);
for (const line of report.errors) console.log(`  ERR  ${line}`);
console.log(`\nGarden status: ${stats.core} core, ${stats.domain} domains, ${stats.style} styles, ${stats.case} case studies, ${totalEntries} learnings`);
console.log(`${report.errors.length} errors, ${report.warnings.length} warnings`);
process.exit(report.errors.length ? 1 : 0);
