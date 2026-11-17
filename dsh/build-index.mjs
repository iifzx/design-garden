#!/usr/bin/env node
/**
 * Rebuild dsh/index.json — the DeepSeek Harness plugin index (format 1) that the
 * "Discover" tab can add as a custom index source.
 *
 * The index pins one Git commit instead of a branch, so installs are reproducible.
 * It points at the last commit that changed dsh/package.json: commit the bundle
 * first, then run this script and commit the index.
 *
 * Usage:
 *   node dsh/build-index.mjs
 *   node dsh/build-index.mjs --commit <40-hex-sha> --timestamp <unix-seconds>
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const PACKAGE_FILE = join(HERE, "package.json");

const args = process.argv.slice(2);
const argValue = (flag) => {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
};

const pkg = JSON.parse(readFileSync(PACKAGE_FILE, "utf8"));
const version = String(pkg.version ?? "");
if (!/^\d+\.\d+\.\d+(?:[-+].*)?$/.test(version)) {
  console.error(`dsh/package.json has no valid version: ${JSON.stringify(pkg.version)}`);
  process.exit(1);
}

const explicitCommit = argValue("--commit");
const explicitTimestamp = argValue("--timestamp");
const output = argValue("--out") ?? join(HERE, "index.json");

const git = (...gitArgs) =>
  execFileSync("git", ["-C", ROOT, ...gitArgs], { encoding: "utf8" }).trim();

let commit = explicitCommit;
if (commit === undefined) {
  commit = git("log", "-1", "--format=%H", "--", "dsh/package.json");
}
if (!/^[0-9a-f]{40}$/.test(commit ?? "")) {
  console.error(
    "No commit found for dsh/package.json. Commit the bundle first, or pass --commit <40-hex-sha>.",
  );
  process.exit(1);
}

// The pinned commit must actually contain this bundle, otherwise the index would
// install a package that does not exist at that revision.
try {
  git("cat-file", "-e", `${commit}:dsh/package.json`);
} catch {
  console.error(`Commit ${commit} does not contain dsh/package.json.`);
  process.exit(1);
}

let timestamp;
if (explicitTimestamp !== undefined) {
  timestamp = Number(explicitTimestamp);
  if (!Number.isInteger(timestamp) || timestamp <= 0) {
    console.error(`--timestamp must be a positive Unix second value, got ${explicitTimestamp}`);
    process.exit(1);
  }
} else {
  timestamp = Math.floor(Date.now() / 1000);
}

const dirty = git("status", "--porcelain", "--", "dsh");
if (dirty !== "") {
  console.warn(
    `warning: dsh/ has uncommitted changes, so index.json pins an older commit:\n${dirty}`,
  );
}

const index = {
  format: 1,
  title: { en: "Design Garden", zh: "设计花园" },
  description: {
    en: "design-garden — a self-improving design skill for DeepSeek Harness: UI, posters, icons, logos, slides, data-viz, video and illustration.",
    zh: "design-garden — 会成长的设计技能，覆盖 UI、海报、图标、Logo、幻灯片、图表、视频与插画。",
  },
  plugins: [
    {
      name: pkg.name,
      title: {
        en: "Design Garden — design skill for dsh",
        zh: "设计花园 — DSH 设计技能",
      },
      description: {
        en: "Bundles the design-garden skill into dsh's native skill catalog: art direction, craft rules and a critique gate for any visual task.",
        zh: "把 design-garden 技能装进 dsh 原生技能目录：为任何视觉任务提供艺术指导、工艺规则与交付前的评审关卡。",
      },
      icon: "icon.svg",
      author: "iifzx",
      homepage: "https://github.com/iifzx/design-garden",
      repository: {
        url: "https://github.com/iifzx/design-garden",
        directory: "dsh",
      },
      versions: [
        {
          version,
          publishTimestamp: timestamp,
          source: {
            type: "git",
            url: "https://github.com/iifzx/design-garden",
            commit,
            path: "dsh",
          },
        },
      ],
    },
  ],
};

writeFileSync(output, `${JSON.stringify(index, null, 2)}\n`, "utf8");
console.log(`wrote ${isAbsolute(output) ? output : resolve(output)}`);
console.log(`  plugin:  ${pkg.name}@${version}`);
console.log(`  commit:  ${commit}`);
console.log(`  source:  git+https://github.com/iifzx/design-garden.git#${commit}&path:/dsh`);
