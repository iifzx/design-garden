# 🌱 design-garden

English | **[简体中文](README.zh-CN.md)** | [繁體中文](README.zh-TW.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [Español](README.es.md) | [Português](README.pt-BR.md) | [Français](README.fr.md) | [Deutsch](README.de.md) | [Русский](README.ru.md)

**The design skill that grows.** A universal, self-improving design skill for AI coding agents — covering anything aesthetic: UI, posters, banners, icons, logos, brand identity, slides, data visualization, video & motion, illustration, typography, and design critique.

![CI](https://github.com/iifzx/design-garden/actions/workflows/validate.yml/badge.svg)
![styles](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fiifzx.github.io%2Fdesign-garden%2Fstats.json&query=%24.styles&label=style%20recipes&color=2E7D32)
![domains](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fiifzx.github.io%2Fdesign-garden%2Fstats.json&query=%24.domains&label=domains&color=2E7D32)
![learnings](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fiifzx.github.io%2Fdesign-garden%2Fstats.json&query=%24.learnings&label=learnings%20files&color=A98A3D)

> 📚 **Browse the whole knowledge base online** — every playbook and style recipe, searchable: **[iifzx.github.io/design-garden](https://iifzx.github.io/design-garden/)**
>
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

## Why it's different

| | **design-garden** | Frozen prompt packs | Single-domain skills |
|---|---|---|---|
| Coverage | All 9 design domains + 18 styles | Varies | One domain, deep |
| Growth | Learns from every task + community PRs | Never changes | Manual forks |
| Quality control | Eval-gated promotion + CI injection scan | None | Rarely |
| Beginner paths | Designed-in (vote, report, translate) | None | None |
| Bloat control | ≤6 files loaded per task, line budgets | Grows forever | N/A |

### The four growth loops

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
# one command via plugin marketplace (Claude Code)
/plugin marketplace add iifzx/design-garden
/plugin install design-garden@design-garden

# via npm/github (cross-platform installer)
npm i -g github:iifzx/design-garden && design-garden

# classic git clone (user-level, all projects)
git clone https://github.com/iifzx/design-garden.git ~/.agents/skills/design-garden

# DeepSeek Harness (dsh) — skill roots are non-recursive, so clone to a skill root
git clone https://github.com/iifzx/design-garden.git ~/.dsh/skills/design-garden

# or project-level
git clone https://github.com/iifzx/design-garden.git <your-project>/.zcode/skills/design-garden
```

DeepSeek Harness note: dsh reads the same Agent Skills standard (SKILL.md dirs, non-recursive discovery under `~/.dsh/skills` or `~/.agents/skills`). The skill declares `whenToUse` for dsh's trigger metadata.

> ZCode desktop: **Plugin Marketplace → Add → paste `https://github.com/iifzx/design-garden`**. The marketplace layout follows the Claude Code plugin convention; if your CLI's loader expects different nesting, the git-clone path always works — report it as an issue so we can support your loader too.

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

- 简体中文: [README.zh-CN.md](README.zh-CN.md) · 繁體中文: [README.zh-TW.md](README.zh-TW.md)
- 日本語: [README.ja.md](README.ja.md) · 한국어: [README.ko.md](README.ko.md)
- Español: [README.es.md](README.es.md) · Português: [README.pt-BR.md](README.pt-BR.md)
- Français: [README.fr.md](README.fr.md) · Deutsch: [README.de.md](README.de.md) · Русский: [README.ru.md](README.ru.md)

The v0.1.5 translations were drafted by GLM-5.3-Flash — improvements from native speakers are very welcome (see [CONTRIBUTING.md](CONTRIBUTING.md#translations)).

## Contributors

This garden lives on contributions, recognized via [all-contributors](https://allcontributors.org) (`.all-contributorsrc`):

<!-- all-contributors table start -->
|                                                                                                            |
|------------------------------------------------------------------------------------------------------------|
| [@iifzx](https://github.com/iifzx) 💼 📖 🎨 🚧 🌍 — code, docs, design, maintenance, translations |
<!-- all-contributors table end -->

Feed it and add yourself: comment `@all-contributors please add @<you> for <contributions>` on any issue, or PR the table above.

## License & credits

MIT — see [LICENSE](LICENSE). Seeded by distilling 17 design skills and the shared craft canon; full credit in [SOURCES.md](SOURCES.md).

🌱 *Gardens are judged by what they grow.*
