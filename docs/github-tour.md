# A GitHub button and repository tour

> For anyone opening GitHub for the first time: where each button is, what happens when you press it, and whether a beginner should press it.
> This is not official GitHub documentation. It is a “look here first” map. GitHub changes labels and layout from time to time; the names are more reliable than the positions.

## Three things to remember

1. A **repository (repo)** is a project's home: files, history, discussion, and automated checks all live there.
2. An **issue** is a numbered, trackable question or submission. You can reply, attach images, and close it.
3. A **pull request (PR)** is “I made a change; please merge it.” The change enters the main branch only after it is merged.

Browsing does not require an account. Star, opening an issue, reacting with 👍, and submitting a PR do.

## Buttons on the repository home page

| Button | Usually found | What it does | Should a beginner press it? |
|---|---|---|---|
| **Star** | Top right, next to the Star count | Bookmarks the repo and gives the project a public signal | Yes. It requires login; the star is saved to your account |
| **Fork** | Top right | Creates a full copy under your account so you can edit | Only when you want to change files; not needed for browsing |
| **Watch** | Top right | Subscribes to notifications: new issues, PRs, discussions | Press it if you want to follow along; skip it if you do not want notifications |
| **Code** (green) | Above the file list | Opens the clone URL or the Download ZIP action | Yes. If you do not use git, choose **Download ZIP** |
| **Issues** | Tab row at the top | Ask a question, report a knowledge bug, submit a work | Yes. The most useful tab for beginners |
| **Pull requests** | Tab row at the top | See which files changed, discuss, and merge | Look here if you want to contribute content; skip it if you only use the skill |
| **Actions** | Tab row at the top | See automated checks, site deployment, vote sync | Not urgent. A red cross means a check failed, not that you did something wrong |
| **Discussions** | Tab row (may be disabled) | A looser forum: vote threads, showcases, open questions | Use it to talk or find vote threads; if the tab is missing, use Issues |
| **Projects** | Tab row (may be disabled) | Task boards and roadmaps | Not urgent |
| **Wiki** | Tab row (may be disabled) | Longer documents maintained by the project | Not urgent; read the README first |
| **Security** | Tab row | Security policy and vulnerability reporting | Only when you find a security problem |
| **Insights** | Tab row | Traffic, contributors, commit frequency | Not urgent |
| **Settings** | Tab row (usually visible only to maintainers) | Repository settings, permissions, deletion | **Do not press it.** If it is not your repo, do not touch it |
| **About** | Right sidebar of the file list | One-line description, website, topics, license, Stars and Forks | Yes. Use it to judge whether the repo is usable |
| **Releases** | Below About | Packaged versions and release notes | Not urgent; for beginners, Code → Download ZIP is enough |
| **Branch selector** | Top left of the file list | Switches the branch or version line | Not urgent. Staying on `main` is safest |
| **Commits** | Above the file list, clock icon | Shows the repository's change history | Use it to check when a rule changed |
| **Contributors** | Below About or in Insights | Shows who has contributed | Not urgent |
| **License** | Below About | Shows whether you can use or remix the work | Check it before use or reuse |

## Button colors and states

- **Green `Code`**: it does not “run code”; it only opens the clone/download menu.
- **Gray button**: usually a secondary action. Grayed out means you lack permission or a condition is not met.
- **Red cross / red exclamation**: an automated check failed. Read the first error in the Actions log; do not blindly rerun it.
- **Yellow dot**: a check is still running. Wait for it to finish.
- **Lock icon**: read-only, private, or permission-gated.
- **Fork arrow**: this repo is a copy of someone else's; PRs usually go from the fork to the upstream.

## What is inside a repository

From top to bottom, the home page usually shows:

1. **File list**: the files and folders on the current branch.
2. **README**: the project's manual, rendered below the file list. Read it first.
3. **About sidebar**: description, website, topics, license, Stars and Forks.
4. **Tab row**: Code / Issues / Pull requests / Actions / Discussions, etc.
5. **Bottom**: license, contributors, languages, Star history.

Clicking a file opens the code view. Markdown files (`.md`) render as readable pages by default; **Raw** shows the source, **Blame** shows who changed each line.

## This repository's map

| Path | What it is | What you do there |
|---|---|---|
| `SKILL.md` | The skill router: the AI reads it first, then loads knowledge for the task | Read it to understand how the skill chooses knowledge |
| `knowledge/` | The design manual: core principles, 9 domains, 18 styles, 3 cases | Find concrete guidance; each file says when to load it |
| `learnings/` | Field notes: what worked and what failed after real tasks | Read real-world lessons; you can contribute one |
| `evals/` | Self-test tasks and rubrics | See why a rule is considered good |
| `examples/` | Real outputs: posters, pages, icons, social images, with model credit | Find inspiration or see what the workflow can produce |
| `scripts/` | Zero-dependency Node scripts: build the site, validate knowledge, run blind tests | Start here to change the site or add checks |
| `docs/` | Beginner guides, this tour, submission guide, promotion material | First time here? Read `start-here` and `github-tour` |
| `dsh/` | DeepSeek Harness plugin: self-contained bundle, index, sync scripts | DSH users install it; read its README to change it |
| `start/` | Source of the beginner site: content, layout, CSS, JS, build script | Change the beginner site here; do not hand-edit `site/` |
| `community/` | Community work and vote data: featured, submissions, votes, themes | After a submission is merged, its JSON appears in `submissions/` |
| `.github/` | Issue templates, PR template, Actions workflows | Change the submission form or sync jobs here |
| `site/` | **Generated** site output; do not edit by hand, and it is gitignored | Inspect the build output; do not edit it directly |

## First visit: press these in order

1. Read the **README** and **About**: what is this, and what does the license allow?
2. Press **Star**: bookmark it so you can find it under your Stars.
3. Press **Code → Download ZIP**: get all files without installing git.
4. Press **Issues**: read other questions; to submit, choose the “Submit a work” template.
5. To vote, open a work issue and press **👍** on the issue body.

## Permissions: buttons to leave alone

- **Settings**: changes repository settings, permissions, and deletion. Do not touch it unless you are a maintainer.
- **Merge pull request**: only maintainers or people with write access should press it; do not merge for someone else.
- **Close issue**: explain why before closing someone else's issue; never close silently.
- **Delete branch**: deleting someone else's branch can lose work; if unsure, do not press it.
- **Force push**: overwrites remote history; this project forbids it.
- **Approve and run workflows**: PRs from forks may need a maintainer's approval before CI runs; do not approve for a maintainer.

## Glossary

| Term | Plain language |
|---|---|
| repo | The project's home: files + history + discussion |
| branch | A version line; `main` is the main line |
| commit | A saved snapshot with a message |
| issue | A numbered question or submission; can be replied to and include images |
| PR | “I made a change; please merge it” |
| reaction | An emoji response on an issue/PR; 👍 counts as one vote in this project |
| label | A small category tag on an issue |
| Actions | GitHub's automated check/deploy robots |
| fork | A copy of someone else's repo under your account |
| clone | Download the repo to your computer, with git history |

## Where to go when something is wrong

- **“Can I press this button?”** → Check the “Should a beginner press it?” column above.
- **“Install/use question”** → [Zero-code beginner guide](start-here.md).
- **“I want to submit/vote”** → [Submission guide](community-submit.md).
- **“The page/rule is wrong”** → Open a `knowledge_bug` issue with the file path and a screenshot.
- **“I want to discuss an open question”** → Discussions if available; otherwise open an issue.

## Related entry points

- Beginner site: [/start/](https://iifzx.github.io/design-garden/start/)
- Knowledge-base site: [iifzx.github.io/design-garden](https://iifzx.github.io/design-garden/)
- Repository: [github.com/iifzx/design-garden](https://github.com/iifzx/design-garden)
- Beginner guide: [docs/start-here.md](start-here.md)
- Submission guide: [docs/community-submit.md](community-submit.md)
