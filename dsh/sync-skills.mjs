#!/usr/bin/env node
/**
 * Mirror the runtime skill (SKILL.md + knowledge/ + learnings/ + the runtime
 * delivery scripts) into dsh/skills/design-garden/, so the dsh bundle is self-contained when
 * installed from Git or npm. The repo root keeps the flat layout used by plain
 * git-clone installs; this script owns the packaged copy only.
 *
 * Run before tagging a release: node dsh/sync-skills.mjs
 */
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const DEST = join(HERE, "skills", "design-garden");
const MIRROR = ["SKILL.md", "knowledge", "learnings"];
const RUNTIME_SCRIPTS = ["shoot.mjs", "lint.mjs", "ledger.mjs", "directions.mjs"];

rmSync(DEST, { recursive: true, force: true });
mkdirSync(DEST, { recursive: true });

for (const item of MIRROR) {
  const source = join(ROOT, item);
  if (!existsSync(source)) throw new Error(`missing source: ${source}`);
  cpSync(source, join(DEST, item), { recursive: true });
}

// the skill body calls these; a bundle without them is a broken skill
const scriptDest = join(DEST, "scripts");
mkdirSync(scriptDest, { recursive: true });
for (const f of RUNTIME_SCRIPTS) {
  const source = join(ROOT, "scripts", f);
  if (!existsSync(source)) throw new Error(`missing runtime script: ${source}`);
  cpSync(source, join(scriptDest, f));
}

// Keep the packaged skill's version in step with the runtime package.
const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
writeFileSync(join(DEST, "VERSION"), `${pkg.version}\n`);

console.log(`mirrored ${MIRROR.join(", ")} + scripts/{${RUNTIME_SCRIPTS.join(",")}} (+ VERSION) → ${DEST}`);
