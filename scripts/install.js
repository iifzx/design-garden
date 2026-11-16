#!/usr/bin/env node
/**
 * design-garden installer — clone-or-update into your agent's skills directory.
 * Cross-platform (Node). Works via: npx github:iifzx/design-garden  (after npm publish)
 * or:  npm i -g github:iifzx/design-garden && design-garden
 */
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import os from "node:os";

const REPO = "https://github.com/iifzx/design-garden.git";
const DEST = process.env.DESIGN_GARDEN_DIR || path.join(os.homedir(), ".agents", "skills", "design-garden");

function run(cmd) {
  return execSync(cmd, { stdio: "inherit" });
}

if (!existsSync(path.join(DEST, "SKILL.md"))) {
  console.log(`Cloning design-garden into ${DEST} …`);
  execSync(`mkdir -p "${path.dirname(DEST).replace(/\\/g, "/")}"`, { shell: true, stdio: "ignore" });
  run(`git clone --depth 1 "${REPO}" "${DEST.split(path.sep).join("/")}"`);
} else {
  console.log("design-garden already installed — updating…");
  run(`git -C "${DEST.split(path.sep).join("/")}" pull --ff-only`);
}

console.log(`\n✅ Installed at: ${DEST}`);
console.log('Next: open your AI assistant and just design — "make a poster for my cat\'s birthday".');
console.log('If it doesn\'t trigger, say: "use design-garden to …"');
console.log("Beginner guide: https://github.com/iifzx/design-garden/blob/main/docs/start-here.md");
