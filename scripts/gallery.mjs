#!/usr/bin/env node
/**
 * design-garden gallery — render every style specimen at 1440×900 and build the
 * labeled 18-cell overview. Each tile names the MODE (style recipe) that produced
 * it and the batch/model that made the specimen, so the gallery is a record, not
 * a mood board.
 *
 *   node scripts/gallery.mjs                 # render all + rebuild index/overview
 *   node scripts/gallery.mjs --skip-render   # rebuild HTML/overview from existing PNGs
 *   node scripts/gallery.mjs --only art-deco # one specimen (repeatable)
 */
import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const STYLES = path.join(ROOT, "examples", "styles");
const TMP = path.join(ROOT, ".tmp-gallery");
const MANIFEST = path.join(STYLES, "specimens.json");
const OVERVIEW = path.join(STYLES, "overview.png");

const argv = process.argv.slice(2);
const skipRender = argv.includes("--skip-render");
const only = argv.reduce((acc, a, i) => (a === "--only" ? [...acc, argv[i + 1]] : acc), []);

function fail(msg) {
  console.error(`gallery: ${msg}`);
  process.exit(1);
}

function runShoot(file, size, outDir, full = false) {
  const args = [
    path.join(ROOT, "scripts", "shoot.mjs"),
    file,
    "--size", size,
    "--out", outDir,
    "--wait", "900",
    "--json",
  ];
  if (full) args.push("--full");
  const r = spawnSync(process.execPath, args, { cwd: ROOT, encoding: "utf8", maxBuffer: 8 * 1024 * 1024 });
  if (r.status !== 0) {
    throw new Error(`shoot failed (${r.status}) for ${path.basename(file)}\n${r.stderr || r.stdout}`);
  }
  let json;
  try {
    json = JSON.parse(r.stdout);
  } catch {
    throw new Error(`shoot returned non-JSON for ${path.basename(file)}:\n${r.stdout.slice(0, 400)}`);
  }
  if (!json.ok || !json.shots?.length) throw new Error(`shoot captured nothing for ${path.basename(file)}`);
  return json.shots[0].file;
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function indexHtml(items) {
  const cards = items.map((item) => {
    const swatches = item.palette.map((c) => `<span class="sw" style="background:${esc(c)}" title="${esc(c)}"></span>`).join("");
    return `
    <article class="card">
      <a class="shot" href="${esc(item.file)}.html">
        <img src="${esc(item.file)}.png" alt="${esc(item.name)} specimen — Fern plant-care hero">
      </a>
      <div class="meta">
        <div class="row"><span class="mode">Mode ${String(item.mode).padStart(2, "0")}</span><span class="swatches">${swatches}</span></div>
        <h2>${esc(item.name)}</h2>
        <p class="type">${esc(item.type)}</p>
        <p class="tokens">${esc(item.tokens)}</p>
        <p class="producer">Made by ${esc(item.producer)} · <span class="recipe">knowledge/styles/${esc(item.recipe)}.md</span></p>
      </div>
    </article>`;
  }).join("");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Design Garden — 18 style specimens, one brief</title>
<meta name="description" content="Eighteen style recipes on the same Fern brief; every tile names its recipe and the model/batch that made it.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  *{box-sizing:border-box}
  html,body{margin:0;background:#F7F6F2;color:#171614;font:400 14px/1.45 "Inter",system-ui,sans-serif}
  .page{width:2400px;padding:46px 48px 36px}
  header{display:flex;align-items:flex-end;justify-content:space-between;padding-bottom:20px;border-bottom:2px solid #171614}
  h1{font:600 42px/1.05 "Inter",sans-serif;letter-spacing:-.025em;margin:0}
  .sub{max-width:760px;font:400 15px/1.55 "Inter",sans-serif;color:#5C5952;margin-top:10px}
  .stamp{text-align:right;font:500 11px/1.6 "Inter",sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#5C5952}
  .stamp b{color:#B33A2B;font-weight:600}
  .grid{display:grid;grid-template-columns:repeat(6,1fr);gap:40px 26px;margin-top:34px}
  .card{background:#FDFDFC;border:1px solid #DBD8D0;border-radius:3px;overflow:hidden}
  .shot{display:block;border-bottom:1px solid #DBD8D0;background:#EFEDE7}
  .shot img{display:block;width:100%;aspect-ratio:16/10;object-fit:cover}
  .meta{padding:12px 14px 14px}
  .row{display:flex;align-items:center;justify-content:space-between}
  .mode{font:600 10px/1 "Inter",sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#B33A2B}
  .swatches{display:flex;gap:3px}
  .sw{width:11px;height:11px;border-radius:50%;border:1px solid rgba(23,22,20,.22)}
  h2{font:600 21px/1.2 "Inter",sans-serif;letter-spacing:-.02em;margin:7px 0 0}
  .type{font:500 12px/1.4 "Inter",sans-serif;color:#3F3C36;margin:6px 0 0}
  .tokens{font:400 12px/1.4 "Inter",sans-serif;color:#6E6A62;margin:3px 0 0}
  .producer{font:400 10px/1.4 "Inter",sans-serif;color:#8A857B;margin:7px 0 0;letter-spacing:.02em}
  .recipe{color:#A8A399}
  footer{display:flex;align-items:center;justify-content:space-between;margin-top:28px;padding-top:14px;border-top:1px solid #C9C5BB;font:400 11px/1.5 "Inter",sans-serif;color:#6E6A62}
  footer b{color:#171614;font-weight:600}
</style>
</head>
<body>
<div class="page">
  <header>
    <div>
      <h1>Eighteen styles, one brief.</h1>
      <p class="sub">The same product, the same copy — only the style system changes. Each tile names the recipe that produced it, its key tokens, and the model or batch that made the specimen.</p>
    </div>
    <div class="stamp">Design Garden · Style Gallery<br><b>${items.length} specimens · 1440×900</b></div>
  </header>

  <main class="grid">${cards}
  </main>

  <footer>
    <span><b>Reading the labels:</b> “Mode” is the style recipe; the line under the tokens names the batch or model that made the specimen.</span>
    <span>New twelve: Doubao · 2026-11-17. Original six: v0.2.0 gallery batch.</span>
  </footer>
</div>
</body>
</html>`;
}

function main() {
  const raw = JSON.parse(readFileSync(MANIFEST, "utf8"));
  if (!Array.isArray(raw) || raw.length !== 18) fail(`specimens.json should hold 18 entries, found ${raw?.length}`);
  for (const item of raw) {
    if (!existsSync(path.join(STYLES, `${item.file}.html`))) fail(`missing specimen: ${item.file}.html`);
    if (!Array.isArray(item.palette) || item.palette.length < 3) fail(`palette missing for ${item.file}`);
    if (!Number.isInteger(item.mode) || item.mode < 1 || item.mode > 18) fail(`invalid mode for ${item.file}`);
  }
  const items = raw.slice().sort((a, b) => a.mode - b.mode);
  const modes = new Set(items.map((i) => i.mode));
  if (modes.size !== 18) fail("mode numbers must be unique 1–18");
  const targets = only.length ? items.filter((i) => only.includes(i.file)) : items;
  if (!targets.length) fail(`--only matched nothing: ${only.join(", ")}`);

  rmSync(TMP, { recursive: true, force: true });
  mkdirSync(TMP, { recursive: true });

  if (!skipRender) {
    for (const item of targets) {
      const outDir = path.join(TMP, item.file);
      const file = path.join(STYLES, `${item.file}.html`);
      process.stdout.write(`render ${item.file} … `);
      const shot = runShoot(file, "1440x900", outDir);
      copyFileSync(shot, path.join(STYLES, `${item.file}.png`));
      console.log("ok");
    }
  }

  const index = path.join(STYLES, "index.html");
  writeFileSync(index, indexHtml(items), "utf-8");
  process.stdout.write("render overview … ");
  const shot = runShoot(index, "2400x1500", path.join(TMP, "overview"), true);
  copyFileSync(shot, OVERVIEW);
  console.log("ok");
  rmSync(TMP, { recursive: true, force: true });

  console.log(`\nGallery: ${items.length} specimens → examples/styles/*.png`);
  console.log(`Index:   ${path.relative(ROOT, index)}`);
  console.log(`Overview:${path.relative(ROOT, OVERVIEW)}`);
}

try {
  main();
} catch (e) {
  if (existsSync(TMP)) console.error(`debug output kept in ${path.relative(ROOT, TMP)}`);
  fail(e.message);
}
