#!/usr/bin/env node
/**
 * Mirror the runtime skill (SKILL.md + knowledge/ + learnings/) into
 * dsh/skills/design-garden/, so the dsh bundle is self-contained when installed
 * from Git or npm. The repo root keeps the flat layout used by plain git-clone
 * installs; this script owns the packaged copy only.
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

rmSync(DEST, { recursive: true, force: true });
mkdirSync(DEST, { recursive: true });

for (const item of MIRROR) {
  const source = join(ROOT, item);
  if (!existsSync(source)) throw new Error(`missing source: ${source}`);
  cpSync(source, join(DEST, item), { recursive: true });
}

// Keep the packaged skill's version in step with the runtime package.
const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
writeFileSync(join(DEST, "VERSION"), `${pkg.version}\n`);

console.log(`mirrored ${MIRROR.join(", ")} (+ VERSION) → ${DEST}`);
