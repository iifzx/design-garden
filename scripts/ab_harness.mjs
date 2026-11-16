#!/usr/bin/env node
/**
 * design-garden blind A/B harness.
 *
 * Builds a self-contained HTML page that shows each A/B pair in randomized left/right
 * order, hiding which variant is which until you click "reveal". Score with evals/rubric.md.
 *
 * Usage:
 *   node scripts/ab_harness.mjs --pair variantA.png variantB.png [--pair a2.png b2.png ...] --out eval.html
 *   node scripts/ab_harness.mjs --pairs-dir renders/ --pattern "(.+)-(A|B)\.png" --out eval.html
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";

const MIME = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".gif": "image/gif" };

function dataUrl(p) {
  return `data:${MIME[p.suffix?.toLowerCase() ?? path.extname(p).toLowerCase()]};base64,${readFileSync(p).toString("base64")}`;
}

function collectPairs(args) {
  const pairs = [];
  if (args.pairsDir) {
    const pat = new RegExp(args.pattern);
    const found = new Map();
    for (const f of readdirSync(args.pairsDir).sort()) {
      const m = pat.exec(f);
      if (m && MIME[path.extname(f).toLowerCase()]) {
        const key = m[1];
        if (!found.has(key)) found.set(key, {});
        found.get(key)[m[2].toUpperCase()] = path.join(args.pairsDir, f);
      }
    }
    for (const [name, sides] of [...found.entries()].sort()) {
      if (sides.A && sides.B) pairs.push([sides.A, sides.B]);
      else console.log(`skip '${name}': needs one -A and one -B file`);
    }
  }
  for (const [a, b] of args.pair || []) pairs.push([path.resolve(a), path.resolve(b)]);
  return pairs;
}

const TEMPLATE = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>design-garden blind A/B</title>
<style>
 body { font: 16px/1.5 system-ui, sans-serif; margin: 0 auto; max-width: 1400px; padding: 24px; }
 .pair { border-top: 1px solid #ddd; padding: 24px 0; }
 .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
 figure { margin: 0; } img { max-width: 100%; border: 1px solid #ccc; }
 .tag { font-weight: 600; }
 textarea { width: 100%; min-height: 48px; }
 .hidden { filter: blur(6px); user-select: none; }
</style></head><body>
<h1>design-garden blind A/B eval</h1>
<p>Score each side against <code>evals/rubric.md</code> before revealing identities.</p>
{pairs}
</body></html>`;

const PAIR_TMPL = `<div class="pair" id="pair-{i}">
 <h2>Pair {i}{title}</h2>
 <div class="grid">
  <figure><figcaption class="tag">Variant 1</figcaption><img src="{left}" alt="variant 1"></figure>
  <figure><figcaption class="tag">Variant 2</figcaption><img src="{right}" alt="variant 2"></figure>
 </div>
 <p class="scores">Scores (1–5 ×6) — V1: <input size="14" placeholder="d1,d2,d3,d4,d5,d6"> · V2: <input size="14" placeholder="d1,d2,d3,d4,d5,d6"></p>
 <textarea placeholder="Notes — what differs and why it matters"></textarea>
 <button class="reveal" onclick="document.getElementById('truth-{i}').classList.toggle('hidden')">Reveal mapping</button>
 <p id="truth-{i}" class="hidden">Variant 1 = {lname} · Variant 2 = {rname}</p>
</div>`;

// minimal arg parser (kept dependency-free)
const argv = process.argv.slice(2);
const args = { pair: [] };
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === "--pair") args.pair.push([argv[++i], argv[++i]]);
  else if (argv[i] === "--pairs-dir") args.pairsDir = argv[++i];
  else if (argv[i] === "--pattern") args.pattern = argv[++i];
  else if (argv[i] === "--out") args.out = argv[++i];
}
args.pattern ??= "(.+)-(A|B)\\.(png|jpg|jpeg|webp|gif)";
args.out ??= "eval.html";

const pairs = collectPairs(args);
if (!pairs.length) {
  console.error("no pairs collected — pass --pair or --pairs-dir");
  process.exit(2);
}
let html = [];
let i = 0;
for (const [a, b] of pairs) {
  for (const p of [a, b]) {
    if (!existsSync(p)) throw new Error(`missing file: ${p}`);
    if (!MIME[path.extname(p).toLowerCase()]) throw new Error(`unsupported type: ${p}`);
  }
  i++;
  const [left, right] = Math.random() < 0.5 ? [a, b] : [b, a];
  const title = pairs.length > 1 ? ` — ${a.replace(/\.md$/, "").split(/[\\/]/).pop()}` : "";
  html.push(PAIR_TMPL
    .replaceAll("{i}", String(i))
    .replace("{title}", title)
    .replace("{left}", dataUrl(left))
    .replace("{right}", dataUrl(right))
    .replace("{lname}", path.basename(a))
    .replace("{rname}", path.basename(b)));
}
const { writeFileSync } = await import("node:fs");
writeFileSync(args.out, TEMPLATE.replace("{pairs}", html.join("\n")), "utf-8");
console.log(`wrote ${args.out} with ${pairs.length} pair(s); mapping is hidden until 'Reveal mapping' is clicked`);
