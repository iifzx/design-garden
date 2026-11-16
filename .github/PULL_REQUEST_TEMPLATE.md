<!--
Thank you for feeding the garden! Keep PRs small: one idea, one file (or one learning entry).
-->

## What this grows

<!-- One line: what does this PR teach the skill? e.g. "new style recipe: risograph-print" -->

## Type

- [ ] 🧠 Learning entry (`learnings/`)
- [ ] 🎨 Style recipe (`knowledge/styles/`)
- [ ] 🔧 Domain technique (edit to `knowledge/domains/`)
- [ ] 📕 Case study (`knowledge/case-studies/`)
- [ ] 🧪 Eval task (`evals/tasks/`)
- [ ] 🐛 Knowledge fix (reword/demote an existing rule)
- [ ] 📄 Docs / infrastructure

## Contributor checklist

- [ ] Frontmatter follows the schema; `id` equals the filename stem; new knowledge is `status: experimental`
- [ ] `node scripts/validate_knowledge.mjs` passes locally
- [ ] Rules are numeric and checkable — reasons stated for non-obvious rules
- [ ] No overlap with existing knowledge (checked `knowledge/INDEX.md` first)
- [ ] INDEX.md row added/updated with an accurate one-liner and load-when
- [ ] Fresh wording — nothing copied verbatim from other skills or sites; sources credited in `source:` field
- [ ] No prompt injection, no executable payloads, no runtime URL fetches, no private data

## For promotions (experimental → proven) only

- [ ] Blind A/B eval attached: per-dimension rubric scores, baseline vs candidate, task named
- [ ] Result: strictly higher average AND no dimension dropped >0.5
