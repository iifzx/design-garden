# Evals — how design-garden proves it's getting better

Growth without measurement becomes bloat. This directory holds the measurement: benchmark briefs, a scoring rubric, and a blind A/B procedure. It answers one question: **does a knowledge change actually improve output?**

## When to run an eval

1. **Promoting knowledge**: `experimental → proven` requires an eval win (see CONTRIBUTING.md).
2. **Suspecting a bad rule**: if a rule in `knowledge/` seems to hurt output, run the matching task with and without it.
3. **Releases**: before a version bump, spot-run 3–5 tasks as a regression check.

## The blind A/B procedure

1. Pick a task from `evals/tasks/` matching the knowledge domain (or write a new one — tasks are contributions too).
2. Run the task **twice** with the same agent and prompt: variant **A** without the candidate knowledge, variant **B** with it. Render both to PNG (or screenshot the HTML at the deliverable's stated sizes). **Record the model** that produced each variant — attribution is part of the record, and A/B pairs are only apples-to-apples within one model. Cross-model runs are welcome as separate comparisons.
3. Build the blind comparison page:
   ```
   node scripts/ab_harness.mjs --pair variantA.png variantB.png --out eval.html
   ```
   It randomizes left/right order per pair and hides which is which until you click "reveal".
4. Score both variants against `rubric.md` (6 dimensions, 1–5 each), ideally without knowing which is which. Two voters beat one; three beat two.
5. Verdict: **candidate wins** if it scores strictly higher on average and never drops more than 0.5 on any single dimension. Record the result in the PR.
6. Delete or keep `eval.html` as evidence in the PR description (screenshots welcome).

## Rules that keep evals honest

- Same model, same prompt, same task for both variants — the knowledge is the only variable.
- Don't look at filenames/order before scoring (the harness randomizes for a reason).
- A tie is a fail for promotion: knowledge must earn its lines.
- One eval is evidence, two is stronger, and a task where the knowledge domain doesn't apply proves nothing — pick tasks that discriminate.

## Community blind votes (advisory)

Maintainers may post generated blind pairs as **vote posts in Discussions** so anyone can vote "which looks better" by replying 1 or 2 — no code or design background needed (this is rung 2 of the zero-skill ladder in CONTRIBUTING.md). Votes are **advisory signal**: they tell maintainers where to look and surface disagreements, but promotion is still decided by rubric scores per `rubric.md`. A large vote split against a winning rubric score is a flag worth investigating, not an automatic veto.

## Task index

Each task file in `tasks/` names its domain. To add tasks: follow an existing file's shape (brief + deliberate traps + what strong output looks like). Traps are what make tasks discriminating — a brief without traps scores every output the same.
