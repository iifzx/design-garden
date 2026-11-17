#!/usr/bin/env node
/**
 * design-garden :: lint — the mechanical half of the GATE.
 *
 * Static, zero-dependency audit of an HTML deliverable against the skill's floors
 * (F1–F15) and Never list (N1–N19). RED findings are floor violations that block
 * delivery; YELLOW findings are template decoration to delete or justify.
 *
 * Heuristic by design: it only reports high-confidence findings. Anything it cannot
 * prove (semi-transparent colors, inherited backgrounds, gradient scrims) is either
 * skipped or reported yellow for a human look.
 *
 * Usage:
 *   node scripts/lint.mjs <file.html> [--domain <d>] [--json] [--strict]
 *
 * Exit codes: 0 = no RED, 1 = RED found (or YELLOW with --strict), 2 = usage error.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const DOMAIN_FLOORS = {
  "ui-web": { body: 16, label: 12 },
  "ui-mobile": { body: 16, label: 11 },
  "poster-banner": { body: 14, label: 10 },
  slides: { body: 24, label: 16 },
  icon: { body: 0, label: 0 },
  "data-viz": { body: 14, label: 11 },
  "video-motion": { body: 24, label: 16 },
  "illustration-art": { body: 0, label: 0 },
  "logo-brand": { body: 14, label: 10 },
};

const GENERIC_FAMILIES = new Set([
  "serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui", "ui-sans-serif", "ui-serif", "ui-monospace",
  "-apple-system", "blinkmacsystemfont", "segoe ui", "segoe ui variable", "roboto", "helvetica", "helvetica neue",
  "arial", "sans", "noto sans", "noto sans sc", "pingfang sc", "hiragino sans gb", "microsoft yahei", "simsun", "songti sc",
  "sf pro", "sf pro text", "sf pro display", "inter ui", "times", "times new roman", "georgia", "garamond", "cambria",
]);

const BANNED_DISPLAY = ["inter", "roboto", "poppins", "montserrat", "space grotesk"];

function usage(exitCode = 0) {
  const out = exitCode ? console.error : console.log;
  out(`design-garden lint — mechanical floor audit for an HTML deliverable.

Usage:
  node scripts/lint.mjs <file.html> [options]

Options:
  --domain <d>    adjusts readability floors (${Object.keys(DOMAIN_FLOORS).join(" | ")})
  --json          machine-readable findings
  --strict        exit 1 on YELLOW as well

RED blocks delivery. YELLOW is template decoration: delete it or justify it.`);
  process.exit(exitCode);
}

function parseArgs(argv) {
  const opts = { file: null, domain: null, json: false, strict: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--help" || a === "-h") usage(0);
    else if (a === "--json") opts.json = true;
    else if (a === "--strict") opts.strict = true;
    else if (a === "--domain") opts.domain = argv[++i];
    else if (!a.startsWith("-") && !opts.file) opts.file = a;
    else {
      console.error(`Unknown option: ${a}`);
      usage(2);
    }
  }
  if (!opts.file) usage(2);
  if (opts.domain && !DOMAIN_FLOORS[opts.domain]) {
    console.error(`Unknown domain "${opts.domain}". Known: ${Object.keys(DOMAIN_FLOORS).join(", ")}`);
    process.exit(2);
  }
  return opts;
}

/* --------------------------------- CSS ------------------------------------- */

function lineAt(text, base, index) {
  let n = base;
  for (let i = 0; i < index && i < text.length; i++) if (text[i] === "\n") n++;
  return n;
}

function matchBrace(text, open) {
  let depth = 0;
  for (let i = open; i < text.length; i++) {
    if (text[i] === "{") depth++;
    else if (text[i] === "}") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function splitDecls(body) {
  const out = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < body.length; i++) {
    const ch = body[i];
    if (ch === "(") depth++;
    else if (ch === ")") depth--;
    else if (ch === ";" && depth === 0) {
      out.push(body.slice(start, i));
      start = i + 1;
    }
  }
  out.push(body.slice(start));
  return out
    .map((d) => {
      const idx = d.indexOf(":");
      if (idx < 0) return null;
      return { prop: d.slice(0, idx).trim().toLowerCase(), value: d.slice(idx + 1).trim() };
    })
    .filter((d) => d && d.prop && d.value);
}

function parseCss(css, file, baseLine, rules) {
  let i = 0;
  while (i < css.length) {
    const open = css.indexOf("{", i);
    if (open < 0) break;
    const prelude = css.slice(i, open).trim();
    const close = matchBrace(css, open);
    if (close < 0) break;
    const body = css.slice(open + 1, close);
    if (prelude.startsWith("@")) {
      if (/^@(media|supports|layer|container|document)/i.test(prelude)) {
        parseCss(body, file, lineAt(css, baseLine, open + 1), rules);
      } else {
        rules.push({ selector: prelude.replace(/\s+/g, " "), body, line: lineAt(css, baseLine, i), file, at: true });
      }
    } else {
      rules.push({ selector: prelude.replace(/\s+/g, " "), body, line: lineAt(css, baseLine, i), file, at: false });
    }
    i = close + 1;
  }
}

function collectCss(html, file) {
  const blocks = [];
  const styleRe = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
  let m;
  while ((m = styleRe.exec(html))) {
    blocks.push({ text: m[1], baseLine: lineAt(html, 0, m.index + m[0].indexOf(m[1])) });
  }
  const linkRe = /<link\b[^>]*rel=["']?stylesheet["']?[^>]*>/gi;
  while ((m = linkRe.exec(html))) {
    const href = (m[0].match(/href=["']([^"']+)["']/i) || [])[1];
    if (!href || /^(https?:)?\/\//i.test(href) || href.startsWith("data:")) continue;
    const target = path.resolve(path.dirname(file), decodeURIComponent(href.split("?")[0]));
    if (existsSync(target)) blocks.push({ text: readFileSync(target, "utf-8"), baseLine: 0, file: target });
  }
  const rules = [];
  for (const b of blocks) parseCss(b.text.replace(/\/\*[\s\S]*?\*\//g, ""), b.file || file, b.baseLine, rules);
  return { rules, cssText: blocks.map((b) => b.text).join("\n") };
}

/* -------------------------------- Colors ----------------------------------- */

function clamp(n, lo, hi) {
  return Math.min(hi, Math.max(lo, n));
}

function parseColor(raw) {
  if (!raw) return null;
  let s = String(raw).trim().toLowerCase();
  s = s.replace(/^["']|["']$/g, "");
  const named = { white: "#ffffff", black: "#000000", red: "#ff0000", transparent: "rgba(0,0,0,0)" };
  if (named[s]) s = named[s];
  let m = s.match(/^#([0-9a-f]{3,8})$/i);
  if (m) {
    let h = m[1];
    if (h.length === 3 || h.length === 4) h = h.split("").map((c) => c + c).join("");
    if (h.length !== 6 && h.length !== 8) return null;
    return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16), a: h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1 };
  }
  m = s.match(/^rgba?\(([^)]+)\)$/);
  if (m) {
    const parts = m[1].split(/[,/\s]+/).filter(Boolean).map((p) => p.trim());
    if (parts.length < 3) return null;
    const num = (p) => (p.endsWith("%") ? (parseFloat(p) / 100) * 255 : parseFloat(p));
    const alpha = parts[3] === undefined ? 1 : parts[3].endsWith("%") ? parseFloat(parts[3]) / 100 : parseFloat(parts[3]);
    if ([parts[0], parts[1], parts[2]].some((p) => Number.isNaN(num(p)))) return null;
    return { r: clamp(num(parts[0]), 0, 255), g: clamp(num(parts[1]), 0, 255), b: clamp(num(parts[2]), 0, 255), a: clamp(Number.isFinite(alpha) ? alpha : 1, 0, 1) };
  }
  m = s.match(/^hsla?\(([^)]+)\)$/);
  if (m) {
    const parts = m[1].split(/[,/\s]+/).filter(Boolean);
    const h = parseFloat(parts[0]);
    const sat = parseFloat(parts[1]) / 100;
    const light = parseFloat(parts[2]) / 100;
    const a = parts[3] === undefined ? 1 : parts[3].endsWith("%") ? parseFloat(parts[3]) / 100 : parseFloat(parts[3]);
    if ([h, sat, light].some((n) => Number.isNaN(n))) return null;
    return { ...hslToRgb(h, sat, light), a: clamp(a, 0, 1) };
  }
  return null;
}

function hslToRgb(h, s, l) {
  h = ((h % 360) + 360) % 360;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((b + m) * 255) };
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

function luminance({ r, g, b }) {
  const f = (c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function contrast(a, b) {
  const l1 = luminance(a), l2 = luminance(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function firstColor(value) {
  if (!value) return null;
  const candidates = String(value).match(/#[0-9a-f]{3,8}|rgba?\([^)]*\)|hsla?\([^)]*\)|white|black|transparent/gi) || [];
  return candidates.length ? parseColor(candidates[0]) : null;
}

function resolveVars(value, vars, depth = 0) {
  if (!value || depth > 8) return value;
  return String(value).replace(/var\(\s*(--[\w-]+)\s*(?:,\s*([^)]*))?\)/gi, (_, name, fallback) => {
    const v = vars.get(name.toLowerCase()) ?? fallback ?? "";
    return resolveVars(v, vars, depth + 1);
  });
}

/* -------------------------------- Analysis --------------------------------- */

function run(html, file, domain) {
  const floors = DOMAIN_FLOORS[domain] || DOMAIN_FLOORS["ui-web"];
  const { rules, cssText } = collectCss(html, file);
  const findings = [];
  const seen = new Set();
  const add = (level, code, message, line = 0, where = file) => {
    const key = `${level}|${code}|${where}|${line}|${message}`;
    if (seen.has(key)) return;
    seen.add(key);
    findings.push({ level, code, message, file: where, line });
  };

  // variables
  const vars = new Map();
  for (const r of rules) {
    for (const d of splitDecls(r.body)) {
      if (d.prop.startsWith("--")) vars.set(d.prop.toLowerCase(), d.value.replace(/!important/i, "").trim());
    }
  }

  // merge declarations per selector (so color and background set in different rules pair up)
  const merged = new Map();
  for (const r of rules) {
    if (r.at) continue;
    const key = r.selector;
    const entry = merged.get(key) || { selector: key, line: r.line, file: r.file, decls: {} };
    for (const d of splitDecls(r.body)) entry.decls[d.prop] = resolveVars(d.value, vars);
    merged.set(key, entry);
  }
  const doc = { selector: "html/body/:root", line: 1, file, decls: {} };
  for (const key of [":root", "html", "body", "*"]) {
    if (merged.has(key)) Object.assign(doc.decls, merged.get(key).decls);
  }

  // F2 contrast
  const contrastTargets = merged.has("body") ? [...merged.values()] : [doc, ...merged.values()];
  for (const entry of contrastTargets) {
    if (/:{1,2}(selection|placeholder|before|after)/i.test(entry.selector)) continue;
    const color = parseColor(entry.decls.color);
    const bgRaw = entry.decls["background-color"] || entry.decls.background;
    const bg = parseColor(bgRaw) || firstColor(bgRaw);
    if (!color || !bg) continue;
    if (color.a < 0.95 || bg.a < 0.95) {
      add("yellow", "F2", `semi-transparent pair on "${entry.selector}" — verify contrast by eye`, entry.line, entry.file);
      continue;
    }
    const size = parseFloat((entry.decls["font-size"] || "").match(/([\d.]+)px/)?.[1] || "0");
    const weight = /bold|[6-9]00/.test(entry.decls["font-weight"] || "") ? 700 : 400;
    const large = size >= 24 || (size >= 18.66 && weight >= 700);
    const need = large ? 3 : 4.5;
    const ratio = contrast(color, bg);
    if (ratio + 0.05 < need) {
      add(
        "red",
        "F2",
        `${entry.selector} — text ${ratio.toFixed(1)}:1 (need ${need}:1) on ${rgbToHex(bg)}`,
        entry.line,
        entry.file
      );
    }
  }

  // typography
  const families = new Map();
  const weights = new Set();
  for (const r of rules) {
    for (const d of splitDecls(r.body)) {
      if (d.prop === "font-family") {
        const first = cleanFamily(d.value.split(",")[0]);
        if (first) families.set(first, (families.get(first) || 0) + 1);
      }
      if (d.prop === "font-weight") {
        const w = normalizeWeight(d.value);
        if (w) weights.add(w);
      }
      if (d.prop === "font-size") {
        const px = fontSizePx(d.value);
        if (px === null) continue;
        if (px < 12) add("red", "F7", `${r.selector} — font-size ${px}px is below the 12px legibility floor`, r.line, r.file);
        else if (floors.body && px < floors.body && /(^|[ ,>])(body|p|li|td|article|main|\.prose|\.copy)\b/i.test(r.selector)) {
          add("yellow", "F7", `${r.selector} — ${px}px body text; ${domain || "ui-web"} floor is ${floors.body}px`, r.line, r.file);
        }
      }
    }
  }
  const realFamilies = [...families.keys()].filter((f) => !GENERIC_FAMILIES.has(f));
  if (realFamilies.length > 2) {
    add("red", "F7", `${realFamilies.length} typefaces (${realFamilies.slice(0, 4).join(", ")}) — floor is ≤2`, 0, file);
  }
  if (weights.size > 3) add("yellow", "F7", `${weights.size} font weights (${[...weights].sort().join(", ")}) — floor is ≤3`, 0, file);

  // display faces from the Never list
  for (const r of rules) {
    const decl = splitDecls(r.body).find((d) => d.prop === "font-family");
    if (!decl) continue;
    const first = cleanFamily(decl.value.split(",")[0]);
    if (first && BANNED_DISPLAY.includes(first) && /(h1|h2|display|hero|title)/i.test(r.selector)) {
      add("yellow", "N10", `${r.selector} — "${first}" as a display face is on the Never list`, r.line, r.file);
    }
  }

  // motion
  const hasKeyframes = /@keyframes/i.test(cssText);
  const hasAnimation = /\banimation\s*:/i.test(cssText) || hasKeyframes;
  const hasMotion = /\b(transition|animation)\s*:/i.test(cssText);
  const honorsReduced = /prefers-reduced-motion/i.test(cssText);
  for (const r of rules) {
    for (const d of splitDecls(r.body)) {
      if (d.prop === "transition" || d.prop === "transition-property") {
        if (/\ball\b/i.test(d.value)) add("red", "F4", `${r.selector} — transition: all; animate the properties that change`, r.line, r.file);
        if (/\b(width|height|top|left|right|margin|padding)\b/i.test(d.value)) {
          add("red", "F4", `${r.selector} — animating a layout property (${d.value.split(",")[0].trim()})`, r.line, r.file);
        }
      }
      if (d.prop === "transition-duration" || d.prop === "animation-duration") {
        const ms = maxDurationMs(d.value);
        if (ms && ms > 300 && d.prop === "transition-duration") {
          add("yellow", "F5", `${r.selector} — ${ms}ms UI transition; keep UI motion ≤300ms`, r.line, r.file);
        }
      }
    }
  }
  if (hasAnimation && !honorsReduced) add("red", "F6", "animations without a prefers-reduced-motion escape", 0, file);
  else if (hasMotion && !honorsReduced) add("yellow", "F6", "transitions without a prefers-reduced-motion escape", 0, file);

  // focus
  const killsOutline = /outline\s*:\s*(none|0)\b/i.test(cssText);
  if (killsOutline && !/:focus-visible/i.test(cssText)) {
    add("red", "F3", "outline removed without a :focus-visible replacement", 0, file);
  }

  // images
  const imgRe = /<img\b[^>]*>/gi;
  let m;
  while ((m = imgRe.exec(html))) {
    if (!/\balt\s*=/i.test(m[0])) add("red", "A11", `<img> without alt`, lineAt(html, 0, m.index));
  }

  // honesty
  const honesty = /lorem ipsum|\bTODO\b|\bTBD\b|标题文字|此处填写|敬请期待|placeholder text/i;
  if (honesty.test(html)) add("red", "F12", "placeholder copy in the deliverable (Lorem/TODO/标题文字)", 0, file);

  // Never list: violet, pure black, emoji, caps eyebrow, middle dot, arrows
  for (const r of rules) {
    for (const d of splitDecls(r.body)) {
      if (!/^(color|background|background-color|border-color|fill|stroke)$/.test(d.prop)) continue;
      const c = parseColor(resolveVars(d.value, vars)) || firstColor(d.value);
      if (!c) continue;
      const hsl = rgbToHsl(c);
      if (hsl.h >= 250 && hsl.h <= 310 && hsl.s > 0.22 && hsl.l > 0.18 && hsl.l < 0.88) {
        add("yellow", "N3", `${r.selector} — violet ${rgbToHex(c)}; make the hue come from the subject`, r.line, r.file);
      }
      if (d.prop === "color" && c.r + c.g + c.b === 0) {
        add("yellow", "N18", `${r.selector} — pure #000 text; use a tinted ink`, r.line, r.file);
      }
    }
  }

  const visible = html
    .replace(/<head\b[\s\S]*?<\/head>/gi, (s) => s.replace(/[^\n]/g, " "))
    .replace(/<style\b[\s\S]*?<\/style>/gi, (s) => s.replace(/[^\n]/g, " "))
    .replace(/<script\b[\s\S]*?<\/script>/gi, (s) => s.replace(/[^\n]/g, " "));
  const textRe = />([^<>]{2,80})</g;
  while ((m = textRe.exec(visible))) {
    const text = m[1].trim();
    if (!text) continue;
    const at = lineAt(visible, 0, m.index);
    const words = text.split(/\s+/).filter(Boolean);
    if (words.length >= 2 && words.length <= 5 && !/[a-z]/.test(text) && !/\[|\]/.test(text) && /^[A-Z0-9&/,'\-–]+$/.test(text)) {
      const near = visible.slice(m.index, m.index + 140);
      const before = visible.slice(Math.max(0, m.index - 220), m.index + 20);
      const classHint = /class=["'][^"']*(eyebrow|kicker|overline|label|prehead|tagline|pretitle)[^"']*["']/i.test(before);
      if (classHint || /<h[12]\b/i.test(near)) add("yellow", "N4", `all-caps label "${text.slice(0, 28)}" above a heading`, at);
    }
    if (text.includes("·") && text.length < 90) {
      const segments = text.split("·").map((s) => s.trim()).filter(Boolean);
      const dateNames = /^(january|february|march|april|may|june|july|august|september|october|november|december|monday|tuesday|wednesday|thursday|friday|saturday|sunday)$/i;
      const titleish = (s) =>
        s.split(/\s+/).every((w) => /^[A-Z][a-z]*$/.test(w) || /^[A-Z]{2,}$/.test(w) || /^(of|the|and|&|de|la|le)$/i.test(w));
      const metaLike =
        segments.length >= 2 &&
        segments.every((s) => !/\d/.test(s) && s.split(/\s+/).length <= 4 && titleish(s) && !dateNames.test(s));
      if (metaLike) add("yellow", "N5", `middle-dot meta string "${text.slice(0, 38)}"`, at);
    }
    const insideLink = /<a\b[^>]*>[^<]*$/i.test(visible.slice(Math.max(0, m.index - 200), m.index + 1));
    if (text.endsWith("→") && !insideLink) add("yellow", "N6", `"→" appended to "${text.slice(0, 30)}"`, at);
    if (/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}]/u.test(text)) add("yellow", "N9", `emoji used as structure near "${text.slice(0, 24)}"`, at);
  }
  const arrowLink = /<a\b[^>]*>[\s\S]{0,140}?→/gi;
  while ((m = arrowLink.exec(visible))) {
    add("yellow", "N6", "link with a trailing →", lineAt(visible, 0, m.index));
  }

  // uniform radius / gap
  const radii = new Map();
  const gaps = new Map();
  for (const r of rules) {
    for (const d of splitDecls(r.body)) {
      if (d.prop === "border-radius") radii.set(d.value, (radii.get(d.value) || 0) + 1);
      if (d.prop === "gap" || d.prop === "row-gap") gaps.set(d.value, (gaps.get(d.value) || 0) + 1);
    }
  }
  if (radii.size === 1 && [...radii.values()][0] >= 4) {
    add("yellow", "N7", `one border-radius (${[...radii.keys()][0]}) on every surface`, 0, file);
  }
  if (gaps.size === 1 && [...gaps.values()][0] >= 4) {
    add("yellow", "N7", `one gap (${[...gaps.keys()][0]}) at every seam`, 0, file);
  }

  // F1 tokens: raw hex outside custom-property declarations
  const hexes = (cssText.match(/#[0-9a-f]{3,8}\b/gi) || []).length;
  const tokenHexes = (cssText.match(/--[\w-]+\s*:\s*[^;{}]*#[0-9a-f]{3,8}/gi) || []).length;
  if (hexes - tokenHexes > 12) {
    add("yellow", "F1", `${hexes - tokenHexes} raw hex values outside tokens — name them`, 0, file);
  }

  return findings;
}

function cleanFamily(raw) {
  return String(raw || "").trim().replace(/^["']|["']$/g, "").toLowerCase();
}

function normalizeWeight(v) {
  const s = String(v).trim().toLowerCase();
  if (s === "normal") return "400";
  if (s === "bold") return "700";
  const n = parseFloat(s);
  return Number.isFinite(n) ? String(Math.round(n)) : null;
}

function fontSizePx(v) {
  const s = String(v);
  const clamp = s.match(/clamp\(\s*([\d.]+)px/i);
  if (clamp) return parseFloat(clamp[1]);
  const px = s.match(/([\d.]+)px/);
  if (px) return parseFloat(px[1]);
  if (/([\d.]+)rem/.test(s)) return parseFloat(RegExp.$1) * 16;
  return null;
}

function maxDurationMs(v) {
  const parts = String(v).split(",");
  let max = 0;
  for (const p of parts) {
    const m = p.match(/([\d.]+)(ms|s)\b/);
    if (!m) continue;
    const ms = m[2] === "s" ? parseFloat(m[1]) * 1000 : parseFloat(m[1]);
    max = Math.max(max, ms);
  }
  return max;
}

function rgbToHex({ r, g, b }) {
  return `#${[r, g, b].map((n) => Math.round(n).toString(16).padStart(2, "0")).join("")}`;
}

/* --------------------------------- Main ------------------------------------ */

function main() {
  const opts = parseArgs(process.argv.slice(2));
  const file = path.resolve(opts.file);
  if (!existsSync(file) || !/\.html?$/i.test(file)) {
    console.error(`lint.mjs expects an existing .html file, got ${file}`);
    process.exit(2);
  }
  const html = readFileSync(file, "utf-8");
  const findings = run(html, file, opts.domain);

  const reds = findings.filter((f) => f.level === "red");
  const yellows = findings.filter((f) => f.level === "yellow");

  if (opts.json) {
    console.log(JSON.stringify({ file, domain: opts.domain || null, reds: reds.length, yellows: yellows.length, findings }, null, 2));
  } else {
    console.log(`design-garden lint · ${path.basename(file)}${opts.domain ? ` · ${opts.domain}` : ""}`);
    for (const level of ["red", "yellow"]) {
      const list = findings.filter((f) => f.level === level);
      if (!list.length) continue;
      console.log(level === "red" ? "RED — floor violations, must fix" : "YELLOW — template decoration, delete or justify");
      const byCode = new Map();
      for (const f of list) {
        const key = f.code;
        if (!byCode.has(key)) byCode.set(key, []);
        byCode.get(key).push(f);
      }
      for (const [code, items] of byCode) {
        for (const f of items.slice(0, 4)) {
          const loc = f.line ? `${path.basename(f.file)}:${f.line}` : path.basename(f.file);
          console.log(`  ${code}  ${loc}  ${f.message}`);
        }
        if (items.length > 4) console.log(`  ${code}  … ${items.length - 4} more`);
      }
    }
    if (!findings.length) console.log("Clean: 0 red, 0 yellow.");
    else console.log(`${reds.length} red, ${yellows.length} yellow.`);
  }

  process.exit(reds.length || (opts.strict && yellows.length) ? 1 : 0);
}

main();
