#!/usr/bin/env node
/**
 * WorkBuddy build — turns the repo's runtime skill into a marketplace-ready package.
 *
 * The repo root keeps its own layout and frontmatter; this script never edits it.
 * It writes a separate copy under workbuddy/dist/design-garden/ whose SKILL.md
 * frontmatter carries the fields WorkBuddy's open platform requires, then zips it
 * so it can be uploaded to https://open.workbuddy.cn.
 *
 *   node workbuddy/build.mjs            # build folder + zip
 *   node workbuddy/build.mjs --no-zip   # folder only (fast local preview)
 */
import { execFileSync, execSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const DIST = join(HERE, "dist");
const DEST = join(DIST, "design-garden");

const NO_ZIP = process.argv.includes("--no-zip");

const cfg = JSON.parse(readFileSync(join(HERE, "config.json"), "utf8"));
const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
const version = pkg.version;

// --- read source SKILL.md, split frontmatter from body ----------------------
const source = readFileSync(join(ROOT, "SKILL.md"), "utf8");
const fmMatch = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
if (!fmMatch) throw new Error("SKILL.md has no YAML frontmatter");

const body = source.slice(fmMatch[0].length);
const srcFm = {};
for (const line of fmMatch[1].split(/\r?\n/)) {
  const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
  if (m) srcFm[m[1]] = m[2];
}

// --- what WorkBuddy's parser chokes on, checked before we write anything ----
function assertPlainScalar(field, value) {
  if (typeof value !== "string" || !value.length) throw new Error(`${field}: empty value`);
  const problems = [];
  if (value.includes("\n")) problems.push("contains a newline");
  if (value.includes("\t")) problems.push("contains a tab");
  if (/: /.test(value)) problems.push('contains ": " (parsed as a nested mapping)');
  if (/ #/.test(value)) problems.push('contains " #" (parsed as a comment)');
  if (/^[\s\-?*&!|>%@`"'[\]{},#]/.test(value)) problems.push("starts with a YAML indicator");
  if (/\s$/.test(value)) problems.push("ends with whitespace");
  if (problems.length) throw new Error(`${field} is unsafe as a YAML plain scalar — ${problems.join("; ")}`);
}

// WorkBuddy rejects any package deeper than root/<dir>/<file>, but the repo keeps
// knowledge/<bucket>/<file>.md. Flattening folds the bucket into the filename
// (knowledge/core/anti-slop.md → knowledge/core-anti-slop.md) and rewrites every
// reference in the packaged copy, so the folder stays two levels while each file
// keeps its meaning. The repo itself is untouched.
const BUCKETS = ["core", "domains", "styles", "case-studies"];
const BUCKET_ALT = BUCKETS.join("|");

function flattenText(text) {
  return text
    // knowledge/core/anti-slop.md → knowledge/core-anti-slop.md
    .replace(new RegExp(`knowledge/(${BUCKET_ALT})/([a-z0-9-]+\\.md)`, "g"), "knowledge/$1-$2")
    // bare core/anti-slop.md (written relative to knowledge/) → core-anti-slop.md
    .replace(new RegExp(`(^|[^a-z0-9-])([a-z0-9-]+/)?(${BUCKET_ALT})/([a-z0-9-]+\\.md)`, "g"), "$1$2$3-$4")
    // a directory mentioned without a file: knowledge/styles/ → knowledge/styles-*
    .replace(new RegExp(`knowledge/(${BUCKET_ALT})/`, "g"), "knowledge/$1-*");
}

const fm = [
  ["name", cfg.skillName],
  ["display_name", cfg.frontmatter.display_name],
  ["display_name_en", cfg.frontmatter.display_name_en],
  ["description", srcFm.description],
  ["description_zh", cfg.frontmatter.description_zh],
  ["description_en", cfg.frontmatter.description_en],
  ["version", version],
  ["author", cfg.frontmatter.author],
];
for (const [k, v] of fm) assertPlainScalar(k, v);
for (const key of ["examples_zh", "examples_en"]) {
  const list = cfg.frontmatter[key];
  if (!Array.isArray(list) || !list.length) throw new Error(`${key}: needs a non-empty array`);
  for (const item of list) assertPlainScalar(`${key}[]`, item);
}

const lines = ["---"];
for (const [k, v] of fm) lines.push(`${k}: ${v}`);
for (const key of ["examples_zh", "examples_en"]) {
  lines.push(`${key}:`);
  for (const item of cfg.frontmatter[key]) lines.push(`  - ${item}`);
}
lines.push("---", "");

// --- assemble the package ---------------------------------------------------
mkdirSync(DIST, { recursive: true });
// --no-zip is the preview path used by sync.mjs; it must not delete an already
// built upload artifact, so only the package folder is replaced.
rmSync(DEST, { recursive: true, force: true });
mkdirSync(DEST, { recursive: true });

writeFileSync(join(DEST, "SKILL.md"), lines.join("\n") + flattenText(body), "utf8");
writeFileSync(join(DEST, "VERSION"), `${version}\n`, "utf8");

// knowledge/: index + flattened buckets, body rewritten so every reference resolves
const kDest = join(DEST, "knowledge");
mkdirSync(kDest, { recursive: true });
for (const f of readdirSync(join(ROOT, "knowledge"))) {
  if (f.endsWith(".md")) {
    writeFileSync(join(kDest, f), flattenText(readFileSync(join(ROOT, "knowledge", f), "utf8")), "utf8");
  }
}
for (const bucket of BUCKETS) {
  const from = join(ROOT, "knowledge", bucket);
  if (!existsSync(from)) throw new Error(`missing knowledge bucket: ${from}`);
  for (const f of readdirSync(from)) {
    if (!f.endsWith(".md") || f.startsWith("_")) continue; // schema templates stay behind
    writeFileSync(join(kDest, `${bucket}-${f}`), flattenText(readFileSync(join(from, f), "utf8")), "utf8");
  }
}

// learnings/ is already two levels, so it ships as-is (rewritten for safety)
const lDest = join(DEST, "learnings");
mkdirSync(lDest, { recursive: true });
for (const f of readdirSync(join(ROOT, "learnings"))) {
  if (!f.endsWith(".md")) continue;
  writeFileSync(join(lDest, f), flattenText(readFileSync(join(ROOT, "learnings", f), "utf8")), "utf8");
}

const scriptDest = join(DEST, "scripts");
mkdirSync(scriptDest, { recursive: true });
for (const f of cfg.runtimeScripts) {
  const from = join(ROOT, "scripts", f);
  if (!existsSync(from)) throw new Error(`missing runtime script: ${from}`);
  cpSync(from, join(scriptDest, f));
}

for (const f of cfg.extraFiles ?? []) {
  const from = join(ROOT, f);
  if (existsSync(from)) cpSync(from, join(DEST, f));
}

// enforce the platform's two-level rule before anything gets zipped
const deep = [];
const check = (d, depth) => {
  for (const name of readdirSync(d)) {
    const p = join(d, name);
    if (statSync(p).isDirectory()) {
      if (depth + 1 > 2) deep.push(p.replace(DEST, ""));
      check(p, depth + 1);
    }
  }
};
check(DEST, 0);
if (deep.length) throw new Error(`package exceeds two directory levels: ${deep.join(", ")}`);

// every path the packaged copy points at must exist inside the package
const missing = new Set();
for (const dir of ["", "knowledge", "learnings"]) {
  const d = join(DEST, dir);
  if (!existsSync(d)) continue;
  for (const f of readdirSync(d)) {
    if (!f.endsWith(".md")) continue;
    const text = readFileSync(join(d, f), "utf8");
    for (const m of text.matchAll(/(knowledge\/[A-Za-z0-9_-]+\.md|learnings\/[A-Za-z0-9_-]+\.md)/g)) {
      if (!existsSync(join(DEST, m[1]))) missing.add(`${f} → ${m[1]}`);
    }
  }
}
if (missing.size) throw new Error(`dangling references in the package:\n  ${[...missing].join("\n  ")}`);


// --- report -----------------------------------------------------------------
function summarize(dir) {
  let files = 0;
  let bytes = 0;
  const walk = (d) => {
    for (const name of readdirSync(d)) {
      const p = join(d, name);
      const st = statSync(p);
      if (st.isDirectory()) walk(p);
      else {
        files += 1;
        bytes += st.size;
      }
    }
  };
  walk(dir);
  return { files, bytes };
}

const stats = summarize(DEST);
console.log(`built ${DEST}`);
console.log(`  files ${stats.files} · ${(stats.bytes / 1024 / 1024).toFixed(2)} MB · version ${version}`);

if (!NO_ZIP) {
  const zip = join(DIST, `${cfg.skillName}-${version}.zip`);
  rmSync(zip, { force: true });
  if (process.platform === "win32") {
    execFileSync(
      "powershell.exe",
      [
        "-NoProfile",
        "-NonInteractive",
        "-Command",
        `Compress-Archive -LiteralPath '${DEST}' -DestinationPath '${zip}' -CompressionLevel Optimal`,
      ],
      { stdio: ["ignore", "ignore", "pipe"] },
    );
  } else {
    execSync(`cd "${DIST}" && zip -qr "${zip}" "${cfg.skillName}"`, { stdio: ["ignore", "ignore", "pipe"] });
  }
  console.log(`zipped ${zip} · ${(statSync(zip).size / 1024 / 1024).toFixed(2)} MB`);
  console.log(`\nUpload at https://open.workbuddy.cn — developer certification is required once, then each version is a fresh upload + review.`);
}
