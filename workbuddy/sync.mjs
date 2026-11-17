#!/usr/bin/env node
/**
 * WorkBuddy sync — mirror the built package into WorkBuddy's local skills dir so
 * the app and this repo can never drift apart.
 *
 *   node workbuddy/sync.mjs                 # build, then mirror to ~/.workbuddy/skills/design-garden
 *   node workbuddy/sync.mjs --no-build      # mirror whatever is already in workbuddy/dist
 *   node workbuddy/sync.mjs --target D:\x   # mirror somewhere else
 *
 * The mirror is one-way (repo → skill dir). Never edit the skill dir by hand:
 * the next sync overwrites it.
 */
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import os from "node:os";

const HERE = dirname(fileURLToPath(import.meta.url));
const DIST = join(HERE, "dist");
const SRC = join(DIST, "design-garden");

const args = process.argv.slice(2);
const NO_BUILD = args.includes("--no-build");
const targetFlag = args.indexOf("--target");
const cfg = JSON.parse(readFileSync(join(HERE, "config.json"), "utf8"));

const rawTarget = targetFlag > -1 ? args[targetFlag + 1] : cfg.syncTarget;
if (!rawTarget) throw new Error("no sync target: pass --target <dir> or set syncTarget in workbuddy/config.json");
const TARGET = resolve(rawTarget.replace(/^~(?=$|[\\/])/, os.homedir()));

if (!NO_BUILD) {
  execFileSync(process.execPath, [join(HERE, "build.mjs"), "--no-zip"], { stdio: "inherit" });
}
if (!existsSync(join(SRC, "SKILL.md"))) {
  throw new Error(`nothing to sync — run node workbuddy/build.mjs first (missing ${SRC})`);
}

if (TARGET === resolve(DIST) || TARGET === resolve(HERE)) throw new Error("refusing to sync into the build directory itself");

mkdirSync(dirname(TARGET), { recursive: true });
try {
  rmSync(TARGET, { recursive: true, force: true });
} catch (err) {
  throw new Error(
    `could not replace ${TARGET} — WorkBuddy may be holding the files open. Quit WorkBuddy, rerun, then start it again.\n${err.message}`,
  );
}
cpSync(SRC, TARGET, { recursive: true });

let files = 0;
const count = (d) => {
  for (const name of readdirSync(d)) {
    const p = join(d, name);
    if (statSync(p).isDirectory()) count(p);
    else files += 1;
  }
};
count(TARGET);

const version = readFileSync(join(TARGET, "VERSION"), "utf8").trim();
console.log(`synced ${files} files → ${TARGET} (version ${version})`);
console.log("WorkBuddy reads this directory on startup and when the skills page refreshes; restart the app if the new version is not shown yet.");
