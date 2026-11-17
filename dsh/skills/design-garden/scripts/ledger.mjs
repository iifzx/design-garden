#!/usr/bin/env node
/**
 * design-garden :: ledger — the local memory of what your deliveries look like.
 *
 * Every delivery gets a compact appearance signature (palette family, display face,
 * layout form, radius, density). Before dealing directions, `check` tells you which
 * looks you have already used, so a returning user does not get the same design twice.
 * Taste statements are stored verbatim, with the scope they apply to.
 *
 * Local only: ~/.design-garden/ledger.json (override with DESIGN_GARDEN_HOME).
 * Nothing is uploaded, and the file is never part of the repo.
 *
 * Usage:
 *   node scripts/ledger.mjs add <file.html> --project <name> [--domain <d>] [--style <s>] [--quote "<text>"]
 *   node scripts/ledger.mjs check [--last 6] [--domain <d>] [--json]
 *   node scripts/ledger.mjs quote "<text>" --scope <domain|all> [--project <name>]
 *   node scripts/ledger.mjs path
 *
 * Exit codes: 0 = ok (including "no ledger yet"), 2 = usage or file error.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";

const HOME = process.env.DESIGN_GARDEN_HOME || path.join(os.homedir(), ".design-garden");
const LEDGER = path.join(HOME, "ledger.json");

const GENERIC = new Set([
  "serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui", "ui-sans-serif", "ui-serif", "ui-monospace",
  "-apple-system", "blinkmacsystemfont", "segoe ui", "segoe ui variable", "roboto", "helvetica", "helvetica neue",
  "arial", "sans", "noto sans", "noto sans sc", "pingfang sc", "hiragino sans gb", "microsoft yahei", "simsun",
  "songti sc", "sf pro", "sf pro text", "sf pro display", "times", "times new roman", "georgia", "garamond", "cambria",
]);

function usage(exitCode = 0) {
  const out = exitCode ? console.error : console.log;
  out(`design-garden ledger — local memory of what your deliveries look like.

Usage:
  node scripts/ledger.mjs add <file.html> --project <name> [--domain <d>] [--style <s>] [--quote "<text>"]
  node scripts/ledger.mjs check [--last 6] [--domain <d>] [--json]
  node scripts/ledger.mjs quote "<text>" --scope <domain|all> [--project <name>]
  node scripts/ledger.mjs path

Storage: ${LEDGER}
Override with DESIGN_GARDEN_HOME. Local only, never uploaded.`);
  process.exit(exitCode);
}

function parseArgs(argv) {
  const opts = { cmd: null, file: null, project: null, domain: null, style: null, quote: null, scope: null, last: 6, json: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--help" || a === "-h") usage(0);
    else if (a === "--json") opts.json = true;
    else if (a === "--project") opts.project = argv[++i];
    else if (a === "--domain") opts.domain = argv[++i];
    else if (a === "--style") opts.style = argv[++i];
    else if (a === "--quote") opts.quote = argv[++i];
    else if (a === "--scope") opts.scope = argv[++i];
    else if (a === "--last") opts.last = Number(argv[++i]);
    else if (!a.startsWith("-") && !opts.cmd) opts.cmd = a;
    else if (!a.startsWith("-") && opts.cmd === "quote" && !opts.quote) opts.quote = a;
    else if (!a.startsWith("-") && !opts.file) opts.file = a;
    else if (!a.startsWith("-") && opts.cmd === "quote" && !opts.quote) opts.quote = a;
    else {
      console.error(`Unknown option: ${a}`);
      usage(2);
    }
  }
  if (!opts.cmd) usage(2);
  if (!["add", "check", "quote", "path"].includes(opts.cmd)) {
    console.error(`Unknown command "${opts.cmd}". Use add | check | quote | path.`);
    process.exit(2);
  }
  if (!Number.isFinite(opts.last) || opts.last < 1) opts.last = 6;
  return opts;
}

/* ------------------------------- Storage ----------------------------------- */

function readLedger() {
  if (!existsSync(LEDGER)) return { version: 1, deliveries: [], quotes: [] };
  try {
    const parsed = JSON.parse(readFileSync(LEDGER, "utf-8"));
    return { version: 1, deliveries: Array.isArray(parsed.deliveries) ? parsed.deliveries : [], quotes: Array.isArray(parsed.quotes) ? parsed.quotes : [] };
  } catch {
    console.error(`Ledger at ${LEDGER} is unreadable; leaving it untouched.`);
    process.exit(2);
  }
}

function writeLedger(ledger) {
  mkdirSync(HOME, { recursive: true });
  writeFileSync(LEDGER, JSON.stringify(ledger, null, 2) + "\n", "utf-8");
}

/* ------------------------------- Signature --------------------------------- */

function parseColor(raw) {
  let s = String(raw || "").trim().toLowerCase();
  const named = { white: "#ffffff", black: "#000000", red: "#ff0000" };
  if (named[s]) s = named[s];
  let m = s.match(/^#([0-9a-f]{3,8})$/i);
  if (m) {
    let h = m[1];
    if (h.length === 3 || h.length === 4) h = h.split("").map((c) => c + c).join("");
    if (h.length !== 6 && h.length !== 8) return null;
    return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
  }
  m = s.match(/^rgba?\(([^)]+)\)$/);
  if (m) {
    const p = m[1].split(/[,/\s]+/).filter(Boolean).map((n) => (n.endsWith("%") ? (parseFloat(n) / 100) * 255 : parseFloat(n)));
    if (p.length < 3 || p.some((n) => Number.isNaN(n))) return null;
    return { r: p[0], g: p[1], b: p[2] };
  }
  return null;
}

function rgbToHsl({ r, g, b }) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return { h: h * 360, s, l };
}

function familyOf(color) {
  const hsl = rgbToHsl(color);
  if (hsl.s < 0.12 || hsl.l < 0.1 || hsl.l > 0.95) return null;
  if (hsl.h < 45 || hsl.h >= 330) return "warm";
  if (hsl.h < 70) return "amber";
  if (hsl.h < 170) return "green";
  if (hsl.h < 250) return "cool";
  if (hsl.h < 310) return "violet";
  return "magenta";
}

function cleanFamily(raw) {
  return String(raw || "").split(",")[0].trim().replace(/^["']|["']$/g, "").toLowerCase();
}

// `font: 400 16px/1.55 "Archivo", system-ui, sans-serif` — the family starts after the size token.
function familiesFromShorthand(value) {
  const parts = String(value).match(/"[^"]+"|'[^']+'|[^\s,]+/g) || [];
  let i = 0;
  while (i < parts.length && !/^[\d.]+(px|rem|em|pt|%|vw|vh|ex|ch)(\/|$)/.test(parts[i]) && !/^(xx-small|x-small|small|medium|large|x-large|xx-large)$/.test(parts[i])) i++;
  if (i >= parts.length) return [];
  i++;
  if (parts[i] && parts[i].startsWith("/")) i++;
  return parts.slice(i).map(cleanFamily).filter(Boolean);
}

function signature(html) {
  const css = (html.match(/<style[\s\S]*?<\/style>/gi) || []).join("\n");
  const hexes = [...new Set((css.match(/#[0-9a-f]{6}\b/gi) || []).map((h) => h.toLowerCase()))];
  const buckets = {};
  for (const hex of hexes) {
    const c = parseColor(hex);
    const fam = c && familyOf(c);
    if (fam) buckets[fam] = (buckets[fam] || 0) + 1;
  }
  const palette = Object.keys(buckets).sort((a, b) => buckets[b] - buckets[a])[0] || "neutral";

  const familyBySelector = [];
  const ruleRe = /([^{}]+)\{([^{}]*)\}/g;
  let m;
  while ((m = ruleRe.exec(css))) {
    const selector = m[1].trim().replace(/\s+/g, " ");
    if (selector.startsWith("@")) continue;
    for (const decl of m[2].split(";")) {
      const idx = decl.indexOf(":");
      if (idx < 0) continue;
      const prop = decl.slice(0, idx).trim().toLowerCase();
      const value = decl.slice(idx + 1).trim();
      if (!value) continue;
      if (prop === "font-family") {
        const fam = cleanFamily(value);
        if (fam && !GENERIC.has(fam)) familyBySelector.push({ selector, family: fam });
      } else if (prop === "font") {
        const fams = familiesFromShorthand(value);
        if (fams[0] && !GENERIC.has(fams[0])) familyBySelector.push({ selector, family: fams[0] });
      }
    }
  }
  const counts = {};
  for (const f of familyBySelector) counts[f.family] = (counts[f.family] || 0) + 1;
  const displayRule = familyBySelector.find((f) => /(h1|h2|\.hero|display|\.title)/i.test(f.selector));
  const displayFont = (displayRule && displayRule.family) || Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0] || null;
  const bodyRule = familyBySelector.find((f) => /^body\b|^html\b|^:root\b/i.test(f.selector));
  const bodyFont = (bodyRule && bodyRule.family) || null;

  const sections = (html.match(/<section\b/gi) || []).length;
  const grid = css.match(/grid-template-columns\s*:\s*(?:repeat\(\s*(\d+)|([^;{}]+))/i);
  let columns = 1;
  if (grid) {
    if (grid[1]) columns = Number(grid[1]);
    else columns = (grid[2].match(/\S+/g) || []).filter((t) => /fr|px|%|rem|em/.test(t)).length || 1;
  }
  const layout = columns >= 2 ? `${columns}-col grid` : sections >= 4 ? "stacked sections" : "single canvas";

  const text = html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  const density = sections ? Math.round(words / sections) : words;

  const radii = {};
  const radiusRe = /border-radius\s*:\s*([^;{}]+)/gi;
  while ((m = radiusRe.exec(css))) radii[m[1].trim()] = (radii[m[1].trim()] || 0) + 1;
  const radius = Object.keys(radii).sort((a, b) => radii[b] - radii[a])[0] || null;

  return {
    palette,
    colors: hexes.slice(0, 4),
    displayFont,
    bodyFont,
    layout,
    sections,
    density,
    radius,
  };
}

/* -------------------------------- Analysis --------------------------------- */

function summarizeRepeat(deliveries) {
  const risks = [];
  const count = (fn) => {
    const map = {};
    for (const d of deliveries) {
      const key = fn(d);
      if (!key) continue;
      map[key] = (map[key] || 0) + 1;
    }
    return map;
  };
  const palette = count((d) => d.signature?.palette);
  const display = count((d) => d.signature?.displayFont);
  const layout = count((d) => d.signature?.layout);
  for (const [key, n] of Object.entries(palette)) {
    if (n >= 3) risks.push(`palette "${key}" in ${n}/${deliveries.length} — use another family or say why this one again`);
  }
  for (const [key, n] of Object.entries(display)) {
    if (n >= 3) risks.push(`display face "${key}" in ${n}/${deliveries.length} — check typography.md's pairing logic`);
  }
  for (const [key, n] of Object.entries(layout)) {
    if (n >= 4) risks.push(`layout "${key}" in ${n}/${deliveries.length} — change the section form, not the palette`);
  }
  return risks;
}

/* --------------------------------- Main ------------------------------------ */

function main() {
  const opts = parseArgs(process.argv.slice(2));
  const ledger = readLedger();

  if (opts.cmd === "path") {
    console.log(LEDGER);
    return;
  }

  if (opts.cmd === "quote") {
    const text = opts.quote;
    if (!text) {
      console.error('quote needs the words: node scripts/ledger.mjs quote "too corporate, we\'re not a bank" --scope ui-web');
      process.exit(2);
    }
    ledger.quotes.push({ at: new Date().toISOString().slice(0, 10), text, scope: opts.scope || "all", project: opts.project || null });
    writeLedger(ledger);
    console.log(`Recorded taste note (${opts.scope || "all"}): "${text}"`);
    return;
  }

  if (opts.cmd === "add") {
    if (!opts.file) {
      console.error("add needs a delivered .html file.");
      process.exit(2);
    }
    const file = path.resolve(opts.file);
    if (!existsSync(file) || !/\.html?$/i.test(file)) {
      console.error(`Not an existing .html file: ${file}`);
      process.exit(2);
    }
    if (!opts.project) {
      console.error("add needs --project <name> so the ledger can tell projects apart.");
      process.exit(2);
    }
    const html = readFileSync(file, "utf-8");
    const sig = signature(html);
    ledger.deliveries.push({
      at: new Date().toISOString().slice(0, 10),
      project: opts.project,
      domain: opts.domain || null,
      style: opts.style || null,
      file: path.basename(file),
      signature: sig,
    });
    if (opts.quote) ledger.quotes.push({ at: new Date().toISOString().slice(0, 10), text: opts.quote, scope: opts.domain || "all", project: opts.project });
    writeLedger(ledger);
    console.log(`Recorded look #${ledger.deliveries.length}: ${sig.palette} / ${sig.displayFont || "no display face"} / ${sig.layout}.`);
    console.log(`Next project: run \`node scripts/ledger.mjs check\` before dealing directions.`);
    return;
  }

  // check
  const list = [...ledger.deliveries].reverse().filter((d) => (opts.domain ? d.domain === opts.domain : true)).slice(0, opts.last);
  const risks = summarizeRepeat(list);
  const quotes = ledger.quotes.filter((q) => q.scope === "all" || (opts.domain && q.scope === opts.domain)).slice(-5);
  const data = { path: LEDGER, total: ledger.deliveries.length, last: list, risks, quotes };

  if (opts.json) {
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  console.log(`design-garden ledger · ${LEDGER}`);
  console.log(`${ledger.deliveries.length} deliver${ledger.deliveries.length === 1 ? "y" : "ies"} recorded${opts.domain ? ` · ${opts.domain}` : ""}`);
  if (!list.length) {
    console.log("\nNo deliveries yet. Record one after your next GATE: `ledger.mjs add <file> --project <name>`.");
    return;
  }
  console.log(`\nLast ${list.length}`);
  for (const d of list) {
    const s = d.signature || {};
    const bits = [d.at, d.project.padEnd(18).slice(0, 18), (d.domain || "-").padEnd(13), (s.palette || "-").padEnd(8), (s.displayFont || "-").padEnd(16), s.layout || "-"].join("  ");
    console.log(`  ${bits}`);
  }
  console.log("\nRepeat risk");
  if (!risks.length) console.log("  Not yet — fewer than three deliveries share a family, face, or layout.");
  else for (const r of risks) console.log(`  - ${r}`);
  if (quotes.length) {
    console.log("\nTaste notes (verbatim)");
    for (const q of quotes) console.log(`  "${q.text}"${q.scope === "all" ? "" : ` [${q.scope}]`}`);
  }
}

main();
