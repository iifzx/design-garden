#!/usr/bin/env node
/**
 * Mirror the runtime skill (SKILL.md + knowledge/ + learnings/ + the three delivery
 * scripts) into skills/design-garden/ so plugin marketplaces get the nested layout
 * (skills/<name>/SKILL.md) that Claude Code / ZCode plugin loaders expect, while the
 * repo root keeps the flat layout that plain `git clone` installs use.
 *
 * Preserved in the mirror: .zcode-plugin/, .claude-plugin/ (hand-maintained manifests).
 * CI runs this on every push to main; can also run locally: node scripts/sync_plugin.mjs
 */
import { cpSync, rmSync, mkdirSync, existsSync, readdirSync, writeFileSync, readFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const DEST = path.join(ROOT, "skills", "design-garden");
const MIRROR = ["SKILL.md", "knowledge", "learnings"];
const RUNTIME_SCRIPTS = ["shoot.mjs", "lint.mjs", "ledger.mjs"];
const PRESERVE = new Set([".zcode-plugin", ".claude-plugin"]);

mkdirSync(DEST, { recursive: true });

// clear everything except hand-maintained manifest dirs
for (const entry of readdirSync(DEST)) {
  if (!PRESERVE.has(entry)) {
    rmSync(path.join(DEST, entry), { recursive: true, force: true });
  }
}

// mirror the runtime skill
for (const m of MIRROR) {
  const src = path.join(ROOT, m);
  if (!existsSync(src)) throw new Error(`missing source: ${src}`);
  cpSync(src, path.join(DEST, m), { recursive: true });
}

// runtime tools referenced by SKILL.md must ship with the packaged copy
const scriptDest = path.join(DEST, "scripts");
mkdirSync(scriptDest, { recursive: true });
for (const f of RUNTIME_SCRIPTS) {
  const src = path.join(ROOT, "scripts", f);
  if (!existsSync(src)) throw new Error(`missing runtime script: ${src}`);
  cpSync(src, path.join(scriptDest, f));
}

// DeepSeek Harness bundle convention: VERSION file matches the manifest version
const pkg = JSON.parse(readFileSync(path.join(ROOT, "package.json"), "utf-8"));
writeFileSync(path.join(DEST, "VERSION"), `${pkg.version}\n`);

console.log(`mirrored ${MIRROR.join(", ")} + scripts/{${RUNTIME_SCRIPTS.join(",")}} (+ VERSION) → ${path.relative(ROOT, DEST)}`);
