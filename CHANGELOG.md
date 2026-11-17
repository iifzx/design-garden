# Changelog — what the garden learned

Each entry records what design-garden *learned* in that version, not just what changed. Growth is the product.

## Unreleased — the rules became tools (2026-11-17)

**Learned — about proving the garden actually grows** (ideas distilled from darwin-skill, see [docs/darwin-benchmark.md](docs/darwin-benchmark.md))
- Verdicts are tallies, not averages: a candidate wins a task by taking strictly more rubric dimensions than it loses with no dimension dropping >0.5 — and a tie fails unless the candidate file is shorter (equal output for fewer loaded tokens). Average scores swing ±8 across judges; win counts do not.
- The evidence ladder (e0 script audit → e1 read review → e2 blind run → e3 real environment) is now explicit: read reviews diagnose and order, only e2 decides keep/revert, and anything that skipped e2 is "unmeasured — not comparable", unquotable as a gain.
- Eval tasks now carry `split: dev` and `doc-derived:` provenance. The honest audit: all 18 existing tasks are doc-derived (their traps quote our own knowledge files), so none can serve as a sole holdout — promotion stays blocked until holdouts are minted from real briefs that never touched knowledge/.
- `evals/results.tsv` records every promotion, demotion, retest and trigger run — reverted hypotheses included, so dead ideas stay dead.
- Honest-eval rules grew from 4 to 8: variant output directories invisible to each other, built-in-skill contamination labeled, provenance stripped before judging, one hypothesis per eval.
- Cost is now stated, not discovered: a promotion eval ≈ 2 runs × dev tasks + 2 × holdout tasks + a render per run + 12 scores per task per voter.
- The router is now testable: `scripts/trigger_test.mjs` (check / kit / tally) runs the description against 11 queries — 3 of the should-trigger queries contain **zero** of the description's 85 extracted trigger words (a 404 screen people smile at, a one-glance board handout, "what would someone with taste change?"), so the description must fire on outcomes, not vocabulary. Verdict: hit <80% or any misfire = needs-work; after a description edit, only the holdout half judges — keep when hit rises or misfire falls without the other worsening, otherwise revert.
- The growth ratchet: a PR that grows any knowledge file by more than 10% must cite the failed check or the real learning entry it fixes — without one, the edit may only delete or refine.

**Learned — about making rules executable**
- Judgment was never the bottleneck; mechanical compliance is. A rule that only lives in prose gets skipped under deadline, so the GATE's floors became three scripts: `shoot.mjs` (exact-size renders + contact sheet), `lint.mjs` (RED floors / YELLOW decoration by line), `ledger.mjs` (local appearance memory).
- Screenshot truth beats CSS intuition: headless Chrome has a ~500px minimum window and `--window-size` is not `innerWidth` (about 22px of frame), so exact 375px, full-page and per-screen need the DevTools Protocol. Playwright stays an optional first renderer; a local Chrome/Edge is the fallback, never a required dependency.
- The Never list is now half-automatic: contrast, 12px floors, `transition: all`, animated layout properties, `prefers-reduced-motion`, `:focus-visible`, alt text, meta-string clichés. First runs on our own examples caught a 11.5px label and five font weights — the tools audit the garden, not only the user.
- A local ledger closes the repetition loop across sessions without spending a knowledge-file slot: last six looks, palette/font/layout repeats, and the user's taste in their own words.

**Learned — about showing directions instead of describing them**
- A written direction spec is still a menu. The DEAL gate now renders **one real 1440×900 first screen per direction**, composes 2–3 of them side by side with `directions.mjs`, and stops for a pick; the full build starts only after that. Real headline, real palette, real motif — no gray boxes. Pinned-style briefs still skip DEAL.
- The style gallery only teaches when the model can **see** the recipe. All 18 style recipes now have a specimen on the same Fern brief and the same copy, at 1440×900; each HTML states `RECIPE` (style mode), `MODE` (recipe name/number) and `MADE BY` (session/model), and `gallery.mjs` rebuilds the 18-tile index + overview from `specimens.json`.
- Attribution is part of the record: the twelve new specimens are `Doubao · 2026-11-17`; the original six are `v0.2.0 gallery batch` because their model was never recorded — no invented model names.
- The new specimens went through the same `lint.mjs` floor: two real REDs (handcrafted CTA hover 3.3:1, playful nav 2.6:1) were fixed, plus a yellow pure-black display face and a 14px footer were cleaned before the gallery was accepted.

**Learned — about coverage gaps and honesty**
- `domains/social-carousel.md` (experimental): 3:4 multi-image posts are one argument split across swipes — the cover buys the swipe, each page spends one beat, the last page cashes out. Floors at 1080×1440: cover title ≥72px (any cover text ≥36px), inner headline ≥48px, body ≥28px, captions ≥24px; one HTML sliced into zero-padded PNGs at exact canvas; footers clear the bottom ~170px of platform chrome.
- `domains/infographic-long.md` (experimental): vertical narrative for 750×N long-scrolls — numbered section signatures repeated at seams, a progress anchor so mid-scroll entrants orient in one glance, one hero stat per screen (number ≥88px + source ≥18px), CTA ≥88px tall with a midpoint repeat on >6 sections.
- Both land as `experimental` per the state machine: they load only when the task explicitly matches, and promotion to proven waits for eval scores, not enthusiasm.
- `core/facts.md` (core): verify before you design — every real product, version, price, date, or quote a design will state gets verified and logged to `product-facts.md` (one line per fact: fact + source + date checked); anything unverified becomes a visible `[PLACEHOLDER: …]` at real size in the real hierarchy. Plausible-looking invented values get shipped; placeholders cannot be.
- The GATE tools grew with the domains: `shoot.mjs` gained 1080×1440 and 750×1334 presets, `lint.mjs` gained the 28/24 and 24/18 body/label floors — `--domain social-carousel` now flags a 20px body that ui-web would pass.
- Housekeeping: package.json, both mirror VERSION files, and the plugin manifests aligned at 0.2.1 with the latest tag (three spots had drifted); the router description now states its boundary — not for production web apps or backend systems.

## v0.2.1 — DeepSeek Harness support (2026-11-17)

**Learned — about the DSH ecosystem**
- DeepSeek Harness (`dsh`) reads the same Agent Skills standard: SKILL.md directories, non-recursive discovery under `~/.dsh/skills` or `~/.agents/skills`, folder name must match frontmatter `name`. Our flat clone install already satisfies it; the nested mirror now also carries a `VERSION` file per the DSH bundle convention.
- `whenToUse` metadata added to SKILL.md frontmatter — dsh's trigger signal, safely ignored by other loaders.
- In DSH terms this ships as a **skill** (behavior layer), not a Cordis tool plugin — plugins change what an agent can reach; skills change how it works. Documented in both READMEs + PROMOTION.md entry for the DSH ecosystem list.

## v0.2.0 — Distribution, gallery, and the recipes that learned from being used (2026-11-17)

**Learned — about distribution**
- Plugin/marketplace packaging: `.claude-plugin/marketplace.json` + a CI-synced nested mirror (`skills/design-garden/`) so one-command installs work (`/plugin marketplace add iifzx/design-garden`) while plain git-clone installs keep working unchanged
- npm installer (`scripts/install.js`, `package.json`): `npm i -g github:iifzx/design-garden`

**Learned — the recipes learned from being used**
- A fresh agent built six same-brief heroes from six style recipes; every recipe got a `Field QA` section: type scales are body→section ladders and heroes need +1–2 ratio steps (now stated in core/typography too); swiss steel gray and japandi stone gray can't carry text (demoted to non-text); glassmorphism's scrim clause promoted to a hard rule and Space Grotesk swapped out; y2k's midnight navy is the default chrome ground; neo-brutalism's stacking-context gotcha recorded in learnings/ui-web.md
- Style gallery shipped: one brief, six styles, sources included — examples/styles/

**Learned — housekeeping**
- Relative-link integrity checker (331 links verified in CI), tag→release automation extracting the CHANGELOG section, welcome bot for first-time contributors, all-contributors recognition
- Promotion kit: ready-to-paste awesome-list entries and social drafts (docs/PROMOTION.md)

## v0.1.5 — Ten languages (2026-11-17)

**Learned — about reaching everyone**
- README now ships in 10 languages: English, 简体中文, 繁體中文, 日本語, 한국어, Español, Português (BR), Français, Deutsch, Русский — each with the full growth-loops story, gallery, install and contribution paths, and a complete language switcher
- The new translations were drafted by GLM-5.3-Flash and say so themselves; native-speaker polish PRs are explicitly invited (the Translations section in CONTRIBUTING marks this batch)
- Example prompts in each README are localized to culturally natural briefs — the skill triggers on design requests in any language
- Knowledge content stays English by design; the docs-layer translation convention (CONTRIBUTING → Translations) now tracks ten files

## v0.1.4 — First independent QA run (2026-11-17)

A fresh agent session ran the installed skill on a real brief (flower-shop anniversary poster, WeChat Moments) with a mandate to QA the skill itself. It completed the full workflow — dealt 3 directions, its GATE caught an SVG wreath falling off-canvas and a broken type-scale chain — and found **9 issues in the skill**, all fixed:

- **Routing arithmetic was contradictory** (HIGH): the mandatory files exhausted the ≤6 cap before style recipes could ever load. Now: cap 7, learnings exempt, supporting core modules ≤3 as-needed — styles finally reachable.
- `core/layout.md` was orphaned (in INDEX, missing from SKILL.md routing) — wired in.
- WeChat Moments (朋友圈) had no spec despite being the most common Chinese placement — 1080×1350 3:4 added with phone-legibility floors.
- Designing with unknown client facts had no guidance — new principles rule: visible first-class bracketed slots, never fake brands, never hide the slot in small type.
- DEAL's big-vs-small boundary was undefined (is one poster "big"?) — now: multi-canvas stops, single-canvas proceeds with directions shown.
- "Append" contradicted learnings' newest-first convention — wording fixed.
- Print-only checklist items now scoped; thumbnail test (~200px) added; PASS/FIX/WAIVED grades must be recorded in the rationale; case studies marked reference reading outside the cap; browser verification recipe documented (exact-size viewport, HTTP serving, flaky-capture fallback).

The QA run's own learning entry (placeholder slots as first-class copy) was distilled into `core/principles.md`.

## v0.1.3 — The missing capability: critique (2026-11-17)

**Learned — a capability the skill promised but never taught**
- `knowledge/core/critique.md`: reviewing *other people's* designs is its own craft — intent reconstruction, the 5-second/squint/device passes, damage ranking (top 3 per round), four-part findings (what → rule → concrete fix → severity), "make it pop" translations into testable statements, tone discipline. The skill triggers on "review this design" — now it knows how.

**Learned — about the community mechanism**
- The voting loop was empty, so it got seeded: two real poster directions from the same brief (Late Set vs Cut Record) now run as blind vote post #1 — and examples/ finally shows the DEAL's output, not just one direction.

**Learned — housekeeping**
- Site gains a Guides section (beginner guides, contributing, roadmap, changelog are now browsable outside GitHub)
- PRs auto-labeled by what they feed (style-recipe / domain-knowledge / learning-entry / evals)
- Vote flow documented as reply-1-or-2 vote posts (native poll widgets aren't API-creatable)

## v0.1.2 — Browsable knowledge base (2026-11-17)

- Site: zero-dependency single-file knowledge browser deployed to GitHub Pages (searchable, status chips, source links); stats.json feeds dynamic README badges that grow with the garden
- scripts/build_site.mjs fixes recorded: nested client-side template literals need escaped backticks/`${}`; `esc()` must escape `"` for attribute safety; markdown list continuations (2-space indent) merge into the previous item
- knowledge/styles/_TEMPLATE.md shipped (was referenced, never existed); validator skips _TEMPLATE files
- scripts/install.sh (clone-or-update), AGENTS.md for agents working in this repo, honest comparison table in both READMEs

## v0.1.1 — Community standards & showcase (2026-11-17)

**Learned — about itself**
- Examples gallery: the skill's own eval-brief outputs (landing page, poster, icon set) now live in `examples/` with rendered screenshots — including what the critique gate caught: brass text failing 4.5:1, a static "Open today" claim that lies every Monday, a mobile headline accent that needed `nowrap` (not `text-wrap: balance`), and webfont links that would have silently fallen back
- Multi-word headline accents are wrap-fragile: `white-space: nowrap` on the span, not `text-wrap: balance` on the parent (recorded in learnings/ui-web.md)

**Learned — about serving everyone**
- Zero-skill contribution ladder: beginner guides (`docs/start-here.md` + 中文版), 🌻 First bloom issue template, community blind votes via Discussions Polls
- Standalone Chinese README + translation convention for future languages

**Learned — housekeeping**
- CODE_OF_CONDUCT (Contributor Covenant 2.1), SECURITY policy (prompt-injection reporting), PR template, ROADMAP
- Script references fully migrated to Node (`validate_knowledge.mjs`, `ab_harness.mjs`)

## v0.1.0 — Planting (2026-11-16)

The garden opens with a full seed bed, distilled from 17 design skills and the shared craft canon (see [SOURCES.md](SOURCES.md)):

**Learned — process**
- The 8-step workflow: PARSE → ROUTE → BRIEF → DEAL → EXECUTE → GATE → DELIVER → LEARN
- Three-direction dealing: 2–3 structurally distinct art directions before executing anything above component scale
- The five form questions (narrative role / viewing distance / temperature / capacity / motif-from-content)
- Critique gate discipline: fix only the 3 most damaging issues per round, ≥2 rounds before delivery
- Runtime self-learning: one structured entry per task into `learnings/<domain>.md`

**Learned — knowledge (34 modules)**
- 6 core modules: principles · color (derivation protocol, OKLCH budgets, dark-mode parity) · typography (decision order, CJK rules) · layout (grid grammar, screen windows, spacing rhythm) · motion (easing/duration/spring tables) · anti-slop (the canonical merged tell list)
- 9 domain modules with per-domain critique checklists
- 18 style recipes with a unified schema
- Eval harness: rubric + blind A/B procedure + CI validation

**Learned — first field notes**
- Dark canvases kill saturated brand colors; tinted mid-lightness surfaces save them
- "It feels crowded" usually means uneven spacing rhythm, not insufficient space
- Restructure reading order instead of fighting clients over information count
