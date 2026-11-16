#!/usr/bin/env node
/**
 * Extract one version's section from CHANGELOG.md: extract_changelog.mjs <tag> <outfile>
 * Matches a `## <tag> — title` heading and collects lines until the next `## ` heading.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

const [tag, outFile = "release-body.md"] = process.argv.slice(2);
if (!tag) throw new Error("usage: extract_changelog.mjs <tag> <outfile>");

const changelogPath = path.resolve(import.meta.dirname, "..", "CHANGELOG.md");
let body = "";
if (existsSync(changelogPath)) {
  const lines = readFileSync(changelogPath, "utf-8").split(/\r?\n/);
  const start = lines.findIndex((l) => new RegExp(`^##\\s+${tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(\\s|—|-|$)`).test(l));
  if (start >= 0) {
    const rest = lines.slice(start + 1);
    const end = rest.findIndex((l) => /^##\s/.test(l));
    body = rest.slice(0, end < 0 ? rest.length : end).join("\n").trim();
  }
}
if (!body) body = `See [CHANGELOG.md](https://github.com/iifzx/design-garden/blob/main/CHANGELOG.md) for what the garden learned in ${tag}.`;
writeFileSync(outFile, body, "utf-8");
console.log(`extracted ${body.length} chars for ${tag}`);
