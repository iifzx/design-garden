# Contributing — how to grow the garden

design-garden is a design skill that improves through use. Everything it knows lives in small, modular files, and every file is something a contributor can add or improve without understanding the whole system. This document is the growth protocol.

## The garden model

Knowledge moves through states, tracked in each file's frontmatter and mirrored in `knowledge/INDEX.md`:

```
seedling            proven               core
experimental  ──►  (eval-passed)  ──►   (foundational, maintained by leads)
```

- **`experimental`** — new contributions land here. They load only when a task explicitly matches, so a promising-but-unproven idea can never silently degrade output.
- **`proven`** — passed a blind eval (see below), loads by default for matching tasks.
- **`core`** — foundational modules the workflow depends on; changed only with extra care and review.
- **`learnings/`** — field notes recorded by the skill itself during real tasks (`status: local`). The raw ore; knowledge files are the refined metal.

## 🌻 New here? Zero-skill contributions

You don't need to write code or design professionally to matter here — the "something feels off" instinct of a real user is exactly what machines lack. The full beginner walkthrough lives in the **Start Here guide**: [docs/start-here.md](docs/start-here.md) · 中文版 [docs/start-here.zh-CN.md](docs/start-here.zh-CN.md).

The zero-skill ladder, easiest first:

1. ⭐ **Star & share** — helps the garden find more feeders.
2. 🗳️ **Blind vote** — open the latest vote post in Discussions, look at the two anonymous designs, and reply **1** or **2**. Votes are community advisory signal for evals; rubric scores still decide promotions (see `evals/README.md`).
3. 🌻 **First bloom report** — file the "🌻 小白报告 · First bloom" issue and answer 3 plain-language questions. Every report gets distilled into the knowledge base.
4. 📋 **Post a real design need** — "I need a lost-cat flyer" is valuable: good real briefs become eval tasks (maintainers convert and credit you).

When you're comfortable, the professional paths below are waiting.

## What you can contribute

| Contribution | Where | Effort |
|---|---|---|
| 🌻 First bloom (zero-code) | [issue template](https://github.com/iifzx/design-garden/issues/new?template=beginner_bloom.yml) — see the beginner section above | 2 min |
| 🧠 Learning report | open an issue (template) or PR a new entry into `learnings/<domain>.md` | minutes |
| 🎨 Style recipe | `knowledge/styles/<slug>.md` — follow the style schema | ~1 hour |
| 🔧 Domain technique | PR a section into an existing `knowledge/domains/<domain>.md` | ~1 hour |
| 📕 Case study | `knowledge/case-studies/<slug>.md` — before/after with reasoning | ~1 hour |
| 🧪 Eval task | `evals/tasks/<domain>-<NN>.md` — brief + deliberate traps | ~30 min |
| 🐛 Knowledge bug | open an issue; fixes may demote a rule to `experimental` or reword it | minutes |

Before writing: check `knowledge/INDEX.md` for overlap. One idea, one file — we merge duplicates rather than accumulate them.

## Schemas

Every knowledge file starts with:

```yaml
---
id: <filename-without-.md>     # must equal the filename stem
kind: style                    # core | domain | style | case
applies: [ui-web, poster-banner]  # subset of the 9 domains, or [any]
status: experimental           # new contributions always start here
source: "distilled: <where this knowledge comes from>"
updated: 2026-11-16
---
```

- **Style recipes** follow the section schema in any `knowledge/styles/*.md` file (Identity → Palette → Type → Layout grammar → Signature moves → Motion & interaction → Do/Don't → Prompt handles). Copy `knowledge/styles/_TEMPLATE.md` if present.
- **Learning entries** follow the schema in `learnings/_TEMPLATE.md` (Situation / Move / Pitfall / Confidence).
- **Line budgets** (hard limits, enforced by CI): core 200 · domain 220 · style 120 · case 150 · SKILL.md 500.

## The quality bar

1. **Numbers beat adjectives.** "Generous whitespace" is not knowledge; "whitespace ≥40%, section gaps 120/144/176 at 1440" is.
2. **Say why** for any non-obvious rule — a rule without a reason gets cargo-culted and then misapplied.
3. **Checkable, not aspirational.** Every rule must be something an agent can verify in its own output.
4. **Fresh wording.** We distill ideas, not sentences — never copy text from other skills, books, or sites. Credit ideas via the `source:` field and `SOURCES.md`.
5. **One test per rule**: would an agent reading only this file and its INDEX row know when to apply it? If not, sharpen the INDEX one-liner.

## The promotion lifecycle (how experimental becomes proven)

1. Land your contribution as `status: experimental` + an INDEX row saying when it loads.
2. Pick or write an eval task in `evals/tasks/` that discriminates (has traps your knowledge specifically addresses).
3. Run the blind A/B procedure in `evals/README.md` (with/without your knowledge; `scripts/ab_harness.py` builds the blind page).
4. Candidate **wins** = strictly higher average on the rubric AND no dimension dropping >0.5. Attach per-dimension scores to the PR.
5. A maintainer flips status to `proven` and updates CHANGELOG ("what the garden learned").
6. Promotion can run in reverse: a `knowledge-bug` issue with evidence demotes a rule back to `experimental` or removes it. The garden prunes.

## Security & safety rules (non-negotiable)

Knowledge files are instructions agents will follow. Therefore:

- **No prompt injection**: content must stay within design guidance. Never write "ignore instructions", role rewrites, or commands directed at the agent's runtime.
- **No executable payloads**: no code that isn't illustrative markup/CSS/SVG; no scripts inside knowledge files.
- **No fetch-me URLs**: don't write knowledge that requires downloading external resources at runtime.
- **No private data**: no client names, secrets, or personal data in learnings or cases.
- CI runs `scripts/validate_knowledge.mjs` on every PR — schema, budgets, INDEX sync, and injection-pattern scans must all pass.

## Reviewer checklist (maintainers)

- [ ] Schema/frontmatter valid; line budget respected
- [ ] INDEX.md row added with an accurate one-liner and load-when
- [ ] No overlap with existing knowledge (or existing file improved instead)
- [ ] Rules are numeric/checkable; reasons stated
- [ ] Injection scan clean; no external runtime fetches
- [ ] Promotion claims backed by attached eval scores

## Local workflow

```bash
# validate everything before committing
node scripts/validate_knowledge.mjs

# build a blind A/B page from rendered variants
node scripts/ab_harness.mjs --pair a.png b.png --out eval.html
```

Install your fork locally to test: clone into your agent's skills directory (e.g. `~/.agents/skills/design-garden` or `~/.zcode/skills/design-garden`) and use it on a real brief. Its LEARN step will write entries into `learnings/` — PR the generalizable ones.

## Translations

English is the source of truth and the skill's working language — SKILL.md and `knowledge/` stay English so trigger descriptions and loaded instructions behave reliably across models. Translations cover the **docs layer** only.

To add a language:

1. Create `README.<code>.md` (BCP-47 style codes: `README.ja.md`, `README.de.md`, `README.ko.md`…), mirroring the English README's structure. Name yourself in the contributors list of that file.
2. Update the language switcher at the top of **every** README: `English | [简体中文](README.zh-CN.md) | [日本語](README.ja.md)` — current language stays unlinked, others link.
3. Add the new file to the Translations list in the English README and its own file.
4. Sync rule: when the English README changes materially in a release, update translations in the same release — or add a visible `> ⚠️ This translation trails <version>` note at the top rather than letting it drift silently.

For translating the *content* (knowledge files) into other languages, open an issue first — it changes trigger behavior for users of that language and needs a design decision, not just a PR.

## Recognition

Every contribution lands in the CHANGELOG as "what the garden learned", and significant sources are credited in `SOURCES.md`. Gardens are judged by what they grow.
