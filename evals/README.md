# Evals — how design-garden proves it's getting better

Growth without measurement becomes bloat. This directory holds the measurement: benchmark briefs, a scoring rubric, a blind A/B procedure, and a results ledger. It answers one question: **does a knowledge change actually improve output?**

## The evidence ladder

Every claim names its level, and a report may never present a lower level as a higher one.

| Level | What happens | What it can decide |
|---|---|---|
| **e0** | Script audit — `validate_knowledge.mjs`, `lint.mjs`; no tokens spent | Schema, budgets, floors. Hygiene only |
| **e1** | Read review — the rubric applied to documents | Diagnosis and ordering of ideas. **Never a keep/revert verdict** |
| **e2** | Blind run — `ab_harness.mjs` A/B on real outputs | The **only** gate for promotion and demotion |
| **e3** | Real-environment run — the user's actual runtime | Field confirmation; label its absence in every report |

Anything that skipped e2 is **"unmeasured — not comparable"**: it cannot be quoted as a gain in a PR, CHANGELOG entry, or issue.

## When to run an eval

1. **Promoting knowledge**: `experimental → proven` requires an e2 win on the declared dev set plus the holdout (see CONTRIBUTING.md).
2. **Suspecting a bad rule**: run the matching dev task with and without it. A demotion needs the same e2 evidence as a promotion.
3. **Releases**: before a version bump, spot-run 3–5 dev tasks as a regression check.

## Task splits: dev and holdout

Every task in `tasks/` carries `split: dev` or `split: holdout`, plus a `doc-derived` note when its criteria came from our own docs:

- **dev** — the finding set. Run as often as needed; a dev loss tells you what to fix.
- **holdout** — the acceptance set. Run exactly once per candidate, at acceptance, then it stays locked for that candidate.

Promotion requires winning on both: the dev win justifies the attempt, the holdout win proves the change isn't overfit to the tasks that motivated it. A doc-derived task can never be the sole holdout — testing a document with its own documentation finds only what the document already admits. Where a holdout set mixes tasks, at least one must be non-doc-derived.

Audit note (2026-11-18): all 18 existing tasks are doc-derived — their traps and "strong output" criteria quote `knowledge/` checklists nearly verbatim — so every one is assigned `split: dev` and none is holdout-eligible. New holdout tasks must come from briefs that never touched `knowledge/`: real user briefs (community briefs are a good source) or invented user-style briefs labeled `source: user-style brief (invented, never used in knowledge work)`. What disqualifies a holdout is provenance leakage, not the absence of a human author — the candidate knowledge must never have been written against the task. Holdouts stay sealed until their first acceptance run.

Pick tasks that discriminate: a task where the knowledge domain doesn't apply proves nothing, and a task the bare model already aces measures nothing.

## The blind A/B procedure (e2)

1. Declare the eval in the PR before the first run: the one hypothesis being tested, the dev tasks that make the case, and the holdout task (a task outside the dev set).
2. Run each task **twice** with the same agent and prompt: variant **A** without the candidate knowledge, variant **B** with it. Render both to PNG (or screenshot the HTML at the deliverable's stated sizes). **Record the model** that produced each variant — attribution is part of the record, and A/B pairs are only apples-to-apples within one model. Cross-model runs are welcome as separate comparisons.
3. Build the blind comparison page:
   ```
   node scripts/ab_harness.mjs --pair variantA.png variantB.png --out eval.html
   ```
   It randomizes left/right order per pair and hides which is which until you click "reveal".
4. Score both variants against `rubric.md` (6 dimensions, 1–5 each), ideally without knowing which is which. Two voters beat one; three beat two.
5. Verdict by tally — count dimension wins, not averages:
   - **Task win**: the candidate wins strictly more of the 6 dimensions than it loses, AND no dimension drops more than 0.5 vs the baseline.
   - **Promotion**: a majority of voters reach a task win on every declared dev task plus the holdout — with 2 voters both must win, with 3 voters at least 2.
   - **Close call**: a voter's win/loss margin is one dimension AND the voters disagree → rerun that task once with both variants regenerated, then recount. One rerun, no more.
   - **A tie is a fail** — knowledge must earn its lines. One exception: a tie on a candidate file **shorter** than the incumbent promotes (equal output for fewer loaded tokens); a tie on a longer file reverts.
6. Keep the evidence: `eval.html` and per-dimension scores in the PR, plus one row appended to `results.tsv`.

## The harness — running the procedure end-to-end

`scripts/eval_harness.mjs` mechanizes the procedure above:

- **`plan`** — declare the one hypothesis, the dev set and the holdout; it refuses a holdout that sits inside the dev set or carries a `- doc-derived:` line, then builds the s0/s1 variant skill dirs (without/with the candidate) and per-task briefs under `evals/runs/<run>/`.
- **`collect`** — runs each variant × task cell through your agent CLI via `--exec` (placeholders `{brief}` `{out}` `{skill_dir}`; hard timeout, non-interactive; cells that fail are listed, never fatal) or prints manual paste instructions. Renders deliverables and builds per-judge blind pages with judge-invisible key files.
- **`tally`** — reads each judge's filled `scores.json`, applies the verdict rules exactly as written above (including the tie-shorter-file exception), prints the verdict and the `evals/results.tsv` row. Unverified factual accusations from a judge block the verdict until `--facts-verified`.

Run dirs are regenerable artifacts and stay unversioned; the durable records are the declaration in the PR and the `results.tsv` row.

## Rules that keep evals honest

- Same model, same prompt, same task for both variants — the knowledge is the only variable.
- The two variants' output directories stay invisible to each other, and prompts never list directory contents. If contamination is suspected, compare long-line overlap between the outputs before judging.
- Check what the runtime has installed before running: a built-in similar skill can silently contaminate the control (without-knowledge) side. Label an impure baseline as impure.
- Strip provenance from outputs before judging: paths, watermarks, timestamps — anything that reveals which variant produced what.
- One eval tests one hypothesis. A PR that changes two rules runs two evals.
- Don't look at filenames/order before scoring (the harness randomizes for a reason).
- A tie is a fail for promotion — unless the candidate file is shorter than the incumbent (see the verdict rule above): equal output for fewer loaded tokens.
- One eval is evidence, two is stronger, and a task where the knowledge domain doesn't apply proves nothing — pick tasks that discriminate. A task the bare model already aces measures nothing.

## The results ledger

`results.tsv` is the machine-readable memory of every run. Every promotion, demotion, retest, or trigger-test run appends one row:

```
timestamp	commit	file	verdict	evidence	eval_mode
```

- Reverted hypotheses get a row too, so nobody retries a proven-dead idea from memory.
- `commit` is the commit the candidate landed on; `verdict` is one of win, fail, tie-promote, tie-revert, unmeasured.
- `evidence` names the level reached (e0–e3) and points at the artifacts (scores, `eval.html`, PR).

## Cost

State the bill before running it. A promotion eval costs:

**2 runs × dev tasks + 2 runs × holdout tasks** (each task runs with and without the candidate), plus one render per run, plus voters × tasks × 12 dimension scores (6 per variant).

Concrete: 2 dev tasks + 1 holdout task at 2 voters = 6 agent runs, 6 renders, and 72 dimension scores; a close-call rerun doubles one task's runs. With the current suite (18 tasks, all dev, none holdout-eligible), a single-domain eval is 2 dev tasks — 4 runs, 4 renders, 48 dimension scores — and promotion stays blocked until at least one non-doc-derived holdout task exists.

No subagent runtime available? Fall back to e0 + a human blind vote only, and mark the result **"unmeasured — not comparable"**: it cannot support a promotion.

## Community blind votes (advisory)

Maintainers may post generated blind pairs as **vote posts in Discussions** so anyone can vote "which looks better" by replying 1 or 2 — no code or design background needed (this is rung 2 of the zero-skill ladder in CONTRIBUTING.md). Votes are **advisory signal**: they tell maintainers where to look and surface disagreements, but the verdict still comes from the e2 tally above. A large vote split against a winning tally is a flag worth investigating, not an automatic veto.

## Task index

Each task file in `tasks/` names its domain and declares its `split` (dev or holdout), plus a `doc-derived` note when its criteria came from our docs. To add tasks: follow an existing file's shape (brief + deliberate traps + what strong output looks like). Traps are what make tasks discriminating — a brief without traps scores every output the same — and a task the bare model already aces measures nothing. Holdout tasks must come from briefs that never touched `knowledge/`.
