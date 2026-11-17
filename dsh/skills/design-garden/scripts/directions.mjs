#!/usr/bin/env node
/**
 * design-garden directions — the DEAL gate as a picture.
 *
 * Renders 2–3 first screens at 1440×900 and stitches them side by side with
 * labels, so the user picks a direction by looking rather than reading a menu.
 *
 *   node scripts/directions.mjs a.html b.html c.html \
 *     --labels "Quiet grid,Editorial,Brutal" --out shots/directions.png
 *
 * The full build only starts after one direction is chosen.
 */
import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const TMP = path.join(ROOT, ".tmp-directions");

function usage(code = 0) {
  console.log(`design-garden directions — three first screens, one decision.

Usage:
  node scripts/directions.mjs <a.html> <b.html> [c.html] [options]

Options:
  --labels "A,B,C"   panel labels (default: file names)
  --out <file.png>   output sheet (default: shots/directions.png)
  --wait <ms>        settle time per capture (default 700)

Exit 2 means no renderer — fall back to the code review and say so.`);
  process.exit(code);
}

const argv = process.argv.slice(2);
const files = [];
let labels = null;
let out = path.join(process.cwd(), "shots", "directions.png");
let wait = 700;

for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === "--help" || a === "-h") usage(0);
  else if (a === "--labels") labels = argv[++i];
  else if (a === "--out") out = path.resolve(argv[++i]);
  else if (a === "--wait") wait = Number(argv[++i]) || 700;
  else if (!a.startsWith("-") && /\.html?$/i.test(a)) files.push(path.resolve(a));
  else {
    console.error(`Unknown argument: ${a}`);
    usage(1);
  }
}

if (files.length < 2 || files.length > 3) {
  console.error("directions expects 2 or 3 HTML files.");
  usage(1);
}
for (const f of files) if (!existsSync(f)) {
  console.error(`No such file: ${f}`);
  process.exit(1);
}

const ensureDir = (p) => mkdirSync(p, { recursive: true });

function shoot(file, size, outDir, full = false) {
  const args = [
    path.join(ROOT, "scripts", "shoot.mjs"),
    file,
    "--size", size,
    "--out", outDir,
    "--wait", String(wait),
    "--json",
  ];
  if (full) args.push("--full");
  const r = spawnSync(process.execPath, args, { cwd: process.cwd(), encoding: "utf8", maxBuffer: 16 * 1024 * 1024 });
  if (r.status !== 0) {
    const e = new Error(`shoot failed for ${path.basename(file)}\n${r.stderr || r.stdout}`);
    if (r.status === 2) e.exitCode = 2;
    throw e;
  }
  const json = JSON.parse(r.stdout);
  if (!json.ok || !json.shots?.length) throw new Error(`nothing captured for ${path.basename(file)}`);
  return json.shots[0].file;
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function sheetHtml(shots) {
  const width = shots.length === 2 ? 1180 : 1720;
  const panels = shots.map((s, i) => `
      <figure class="panel">
        <img src="data:image/png;base64,${s.base64}" alt="${esc(s.label)} first screen">
        <figcaption><span class="no">Direction ${String(i + 1).padStart(2, "0")}</span><span class="label">${esc(s.label)}</span></figcaption>
      </figure>`).join("");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Design Garden — three first screens</title>
<style>
  *{box-sizing:border-box}
  html,body{margin:0;background:#111214;color:#F2F0EA;font:400 14px/1.4 "Inter",system-ui,sans-serif}
  .page{width:${width}px;padding:26px 34px 30px}
  header{display:flex;align-items:flex-end;justify-content:space-between;padding-bottom:14px;border-bottom:1px solid #34353A}
  h1{font:600 26px/1.1 "Inter",sans-serif;letter-spacing:-.02em;margin:0}
  .stamp{font:500 10px/1.5 "Inter",sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#8D8F96;text-align:right}
  .row{display:flex;gap:30px;margin-top:22px}
  .panel{margin:0;flex:1;min-width:0}
  .panel img{display:block;width:100%;aspect-ratio:16/10;object-fit:cover;border:1px solid #34353A;background:#1A1B1E}
  figcaption{display:flex;align-items:baseline;gap:12px;padding-top:9px}
  .no{font:500 10px/1 "Inter",sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#8D8F96}
  .label{font:600 15px/1.2 "Inter",sans-serif}
  footer{margin-top:14px;font:400 10px/1.4 "Inter",sans-serif;letter-spacing:.08em;color:#777A80}
</style>
</head>
<body>
<div class="page">
  <header>
    <h1>${shots.length === 2 ? "Two" : "Three"} first screens, one decision.</h1>
    <div class="stamp">DEAL gate · 1440×900<br>Design Garden</div>
  </header>
  <div class="row">${panels}
  </div>
  <footer>Pick one before the full build starts. A direction that repeats the last six looks is rejected at the ledger check, not here.</footer>
</div>
</body>
</html>`;
}

function main() {
  rmSync(TMP, { recursive: true, force: true });
  ensureDir(TMP);

  const names = labels
    ? labels.split(",").map((s) => s.trim()).filter(Boolean)
    : files.map((f) => path.basename(f, path.extname(f)));
  if (names.length !== files.length) {
    throw new Error(`--labels has ${names.length} entries for ${files.length} files`);
  }

  const shots = [];
  for (let i = 0; i < files.length; i++) {
    process.stdout.write(`capture ${names[i]} … `);
    const png = shoot(files[i], "1440x900", path.join(TMP, `p${i}`));
    shots.push({ label: names[i], base64: readFileSync(png).toString("base64") });
    console.log("ok");
  }

  const width = files.length === 2 ? 1180 : 1720;
  const sheetPath = path.join(TMP, "directions.html");
  writeFileSync(sheetPath, sheetHtml(shots), "utf-8");

  ensureDir(path.dirname(out));
  process.stdout.write("compose … ");
  const png = shoot(sheetPath, `${width}x520`, path.join(TMP, "out"), true);
  copyFileSync(png, out);
  console.log("ok");

  rmSync(TMP, { recursive: true, force: true });
  console.log(`\nDirections sheet: ${out}`);
  console.log(`Panels: ${names.map((n, i) => `${i + 1}. ${n}`).join(" · ")}`);
}

try {
  main();
} catch (e) {
  if (existsSync(TMP)) console.error(`debug output kept in ${path.relative(process.cwd(), TMP)}`);
  console.error(`directions: ${e.message}`);
  process.exit(e.exitCode || 1);
}
