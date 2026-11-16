# 🌱 design-garden

English | **[简体中文](README.zh-CN.md)**

**The design skill that grows.** A universal, self-improving design skill for AI coding agents — covering anything aesthetic: UI, posters, banners, icons, logos, brand identity, slides, data visualization, video & motion, illustration, typography, and design critique.

![CI](https://github.com/iifzx/design-garden/actions/workflows/validate.yml/badge.svg)
![knowledge](https://img.shields.io/badge/knowledge-core%206%20%C2%B7%20domains%209%20%C2%B7%20styles%2018-2E7D32)

> 🌱 **New to AI tools?** No-code install, plain-language usage, and zero-skill ways to help: **[Start Here](docs/start-here.md)** (中文：[新手指南](docs/start-here.zh-CN.md))

## What it makes

Real outputs from the skill running its own eval briefs — every piece below went through the full workflow, critique gate included. More in [examples/](examples/README.md), with the fixes the gate caught.

| | | |
|---|---|---|
| <img src="examples/images/bike-shop-hero.png" width="270" alt="Bike repair shop landing page hero"> | <img src="examples/images/jazz-poster.png" width="270" alt="Jazz cafe opening night poster"> | <img src="examples/images/icon-sheet.png" width="270" alt="Plant-care icon set verification sheet"> |
| Landing page — [mobile 375px](examples/images/bike-shop-mobile.png) · [full](examples/images/bike-shop-full.png) | Opening-night poster, 1080×1350 | Icon set with 16/24/48 export ladder |

*Generated with **GLM-5.3-Flash** — per-example model attribution in [examples/README.md](examples/README.md). Run the same brief on another model and PR your result.*

Most agent "design skills" are frozen prompt packs: strong on day one, stale on day thirty, and always one author's taste. **design-garden is built to be fed** — by your daily design work, and by the community. It doesn't just execute design tasks; it *learns from every task it runs*.

---

## Why it's different: four growth loops

```
            ┌──────────────────────────────────────────────┐
            │  ① RUNTIME SELF-LEARNING                     │
            │  Every task appends a structured entry to    │
            │  learnings/<domain>.md — the skill gets      │
            │  better for YOU with every use, no reinstall │
            └──────────────────┬───────────────────────────┘
                               ▼  (generalizable entries get PR'd upstream)
            ┌──────────────────────────────────────────────┐
            │  ② COMMUNITY CONTRIBUTIONS                   │
            │  Knowledge = small modular files. One PR =   │
            │  one new style recipe / technique / case     │
            └──────────────────┬───────────────────────────┘
                               ▼
            ┌──────────────────────────────────────────────┐
            │  ③ EVAL-GATED PROMOTION (anti-bloat)         │
            │  New knowledge lands as `experimental`,      │
            │  loads only on explicit match, and becomes   │
            │  `proven` only after winning a blind A/B     │
            │  eval against the baseline                   │
            └──────────────────┬───────────────────────────┘
                               ▼
            ┌──────────────────────────────────────────────┐
            │  ④ VERSIONED LEARNING                        │
            │  Every release's CHANGELOG says what the     │
            │  garden LEARNED — growth you can read        │
            └──────────────────────────────────────────────┘
```

## What's inside

```
SKILL.md                  router + 8-step workflow (≤500 lines — the stable core)
knowledge/
  core/                   universal modules: principles · color · typography · layout · motion · anti-slop
  domains/                9 domains: ui-web · ui-mobile · poster-banner · icon · logo-brand · slides · data-viz · video-motion · illustration-art
  styles/                 18 style recipes (swiss, bauhaus, neo-brutalism, glassmorphism, dark-tech, y2k, japandi, memphis…) — one small file each
  case-studies/           before/after with reasoning
learnings/                the skill's field notes — starts seeded, grows with every task
evals/                    benchmark briefs with deliberate traps + rubric + blind A/B harness
scripts/                  validate_knowledge.mjs (CI gate) · ab_harness.mjs (blind eval pages)
```

Every knowledge file carries frontmatter (`id / kind / applies / status / source / updated`). `experimental` knowledge loads only on explicit match; `proven` loads by default. The router reads `knowledge/INDEX.md` and never loads more than ~6 files per task — **growing without bloating**.

The workflow itself is a distillation of the strongest process ideas in agent design practice: a **three-direction deal** (2–3 structurally distinct art directions before executing), the **five form questions**, a **critique gate** that fixes only the 3 most damaging issues per round, and a canonical **anti-slop list** merged from three independently-convergent sources. See [SOURCES.md](SOURCES.md).

## Install

Works with any agent that supports the SKILL.md convention (ZCode, Claude Code, and compatible CLIs):

```bash
# user-level (all projects)
git clone https://github.com/iifzx/design-garden.git ~/.agents/skills/design-garden

# or project-level
git clone https://github.com/iifzx/design-garden.git <your-project>/.zcode/skills/design-garden
```

No build step, no dependencies — it's markdown plus two optional Node scripts (stdlib only).

## Use it

Just design. The skill triggers on anything aesthetic:

- "Make a landing page for my ceramics studio" → deals 3 art directions, executes the strongest, critiques, delivers, records what it learned
- "Design an icon set for a plant-care app" → keyline grids, optical corrections, silhouette tests
- "This poster looks off — review it" → critique-first mode, runs the domain checklist, gives fixes ranked by damage
- "品牌海报 + 一套 PPT 模板" → routes both domains, learns both

## For contributors

**The garden grows on small PRs.** Add a style recipe (~1 hour), report a learning from your own use (minutes), or run an eval to promote an experimental rule to proven. Everything is in [CONTRIBUTING.md](CONTRIBUTING.md) — the short version:

1. Fork, add **one small file** following the schema (or one learning entry)
2. `node scripts/validate_knowledge.mjs` must pass (CI enforces it)
3. Open the PR — CHANGELOG will say "the garden learned X"

Community knowledge starts `experimental` (loads only on explicit match) and becomes `proven` by winning a blind A/B eval — so growth is *verified*, not just accumulated.

---

## Translations

English is the primary version — the skill content (SKILL.md, knowledge files) and trigger vocabulary stay English for model reliability. Community translations of the README live alongside it:

- 简体中文: [README.zh-CN.md](README.zh-CN.md)

To add a language, see the [Translations](CONTRIBUTING.md#translations) section in CONTRIBUTING.md.

## License & credits

MIT — see [LICENSE](LICENSE). Seeded by distilling 17 design skills and the shared craft canon; full credit in [SOURCES.md](SOURCES.md).

🌱 *Gardens are judged by what they grow.*
