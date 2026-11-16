#!/usr/bin/env node
/**
 * Relative-link integrity checker for all markdown files (and <img> srcs in them).
 * Deterministic and offline: verifies that every relative link/image target exists.
 * External http(s) links are counted but not fetched. Exit 1 on broken links.
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SKIP_DIRS = new Set([".git", "node_modules", "site", ".zcode"]);
const broken = [];
let checked = 0;
let external = 0;

function walk(dir, files = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith(".md")) files.push(full);
  }
  return files;
}

function stripCode(text) {
  // don't treat links inside fenced/inline code as links
  return text.replace(/```[\s\S]*?```/g, "").replace(/`[^`]*`/g, "");
}

for (const file of walk(ROOT)) {
  const raw = readFileSync(file, "utf-8");
  const text = stripCode(raw);
  const dir = path.dirname(file);
  const targets = [];

  for (const m of text.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) targets.push(m[1]);
  for (const m of text.matchAll(/<img[^>]+src=["']([^"']+)["']/g)) targets.push(m[1]);

  for (const rawTarget of targets) {
    if (/^(https?:|mailto:|#)/i.test(rawTarget)) {
      if (/^https?:/i.test(rawTarget)) external++;
      continue;
    }
    checked++;
    const clean = rawTarget.split("#")[0].trim();
    if (!clean) continue;
    const resolved = path.resolve(dir, decodeURIComponent(clean));
    if (!existsSync(resolved)) {
      broken.push(`${path.relative(ROOT, file)} → ${rawTarget}`);
    }
  }
}

console.log(`checked ${checked} relative links (${external} external links skipped) in markdown files`);
if (broken.length) {
  console.log(`\nBROKEN (${broken.length}):`);
  for (const b of broken) console.log(`  ✗ ${b}`);
  process.exit(1);
}
console.log("all relative links resolve ✓");
