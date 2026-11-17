import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const API = "https://api.github.com";
const TOKEN = process.env.GITHUB_TOKEN || "";
const REPO = process.env.GITHUB_REPOSITORY || "iifzx/design-garden";
const [OWNER, NAME] = REPO.split("/");

const api = async (path) => {
  const response = await fetch(API + path, {
    headers: {
      Accept: "application/vnd.github+json",
      ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "design-garden-votes",
    },
  });
  if (!response.ok) {
    const text = await response.text();
    const error = new Error(`GitHub API ${response.status}: ${text.slice(0, 300)}`);
    error.status = response.status;
    throw error;
  }
  return response.json();
};

const countPlusOne = async (issueNumber) => {
  const users = new Set();
  let page = 1;
  while (page < 20) {
    const reactions = await api(
      `/repos/${OWNER}/${NAME}/issues/${issueNumber}/reactions?per_page=100&page=${page}`,
    );
    for (const reaction of reactions) {
      if (reaction.content === "+1" && reaction.user?.login) {
        users.add(reaction.user.login);
      }
    }
    if (reactions.length < 100) break;
    page += 1;
  }
  return users.size;
};

const main = async () => {
  const submissionsDir = join(ROOT, "community", "submissions");
  const files = readdirSync(submissionsDir).filter((name) => /^issue-\d+\.json$/.test(name));

  const counts = {};
  for (const file of files) {
    const submission = JSON.parse(readFileSync(join(submissionsDir, file), "utf8"));
    if (!submission.id || !submission.issue) continue;
    try {
      counts[submission.id] = await countPlusOne(Number(submission.issue));
    } catch (error) {
      if (error.status === 404) {
        counts[submission.id] = 0;
        console.warn(`Issue #${submission.issue} not found; count 0.`);
      } else {
        throw error;
      }
    }
    console.log(`${submission.id}: ${counts[submission.id]} 👍`);
  }

  const votesPath = join(ROOT, "community", "votes.json");
  const current = JSON.parse(readFileSync(votesPath, "utf8"));
  const before = JSON.stringify(current.counts || {});
  const after = JSON.stringify(counts);

  if (before === after) {
    console.log("Votes unchanged.");
    return;
  }

  const next = {
    updated: new Date().toISOString(),
    source: "github-reactions",
    counts,
  };
  writeFileSync(votesPath, `${JSON.stringify(next, null, 2)}\n`);
  console.log(`Updated ${votesPath}: ${before} -> ${after}`);
};

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
