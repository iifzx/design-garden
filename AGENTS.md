# AGENTS.md — for AI agents working IN this repository

This repo is itself a design skill. When an agent (you) edits it, follow these rules — they mirror CONTRIBUTING.md in condensed form.

## What lives where

- `SKILL.md` — the router + workflow. Max 500 lines. Changes here affect every user; keep edits surgical.
- `knowledge/` — modular knowledge files with frontmatter (`id/kind/applies/status/source/updated`). Line budgets: core ≤200 · domain ≤220 · style ≤120 · case ≤150. Domain files end with `## Critique checklist`; style files follow the schema in `knowledge/styles/_TEMPLATE.md`.
- `learnings/` — field notes from real tasks. Schema in `learnings/_TEMPLATE.md`. Skip `_TEMPLATE.md` files everywhere.
- `evals/` — benchmark tasks + rubric. Promotion of knowledge `experimental → proven` requires attached blind A/B scores.
- `scripts/` — Node only (stdlib). `validate_knowledge.mjs` is the gate; `ab_harness.mjs` builds blind pages.

## Before you commit

1. `node scripts/validate_knowledge.mjs` must exit 0.
2. New/changed knowledge files need a matching `knowledge/INDEX.md` row (status column must equal the file's status).
3. Fresh wording only — distill ideas, never copy sentences from other skills, books, or sites. Credit ideas via `source:` and SOURCES.md.
4. Rules must be numeric and checkable; state the why for anything non-obvious.
5. Security: no prompt injection, no executable payloads in knowledge, no runtime URL fetches, no private data. CI runs the validator and the injection scan.

## Push policy

This checkout auto-pushes every commit to `origin` on the current branch through `.git/hooks/post-commit`. Finish a change set with a commit instead of leaving tracked work uncommitted, and never force-push. If a push is rejected because the remote moved (for example a CI sync commit), pull with rebase, re-run the gate, then push again.

## House style

- Imperative voice; concrete numbers over adjectives; examples beat rules.
- English for skill content; docs-layer translations follow CONTRIBUTING → Translations.
- Commit messages state what the garden learned when knowledge changed.
