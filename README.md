# 🌱 design-garden

**The design skill that grows.** A universal, self-improving design skill for AI coding agents — covering anything aesthetic: UI, posters, banners, icons, logos, brand identity, slides, data visualization, video & motion, illustration, typography, and design critique.

![CI](https://github.com/iifzx/design-garden/actions/workflows/validate.yml/badge.svg)
![knowledge](https://img.shields.io/badge/knowledge-core%206%20%C2%B7%20domains%209%20%C2%B7%20styles%2018-2E7D32)

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
scripts/                  validate_knowledge.py (CI gate) · ab_harness.py (blind eval pages)
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
2. `python scripts/validate_knowledge.py` must pass (CI enforces it)
3. Open the PR — CHANGELOG will say "the garden learned X"

Community knowledge starts `experimental` (loads only on explicit match) and becomes `proven` by winning a blind A/B eval — so growth is *verified*, not just accumulated.

---

## 中文说明

**design-garden（设计花园）是一个会成长的万能设计 skill**，覆盖一切与审美相关的工作：UI 界面、落地页、海报横幅、图标、logo 品牌、幻灯片、数据图表、视频动效、插画、字体排印与设计评审。

**它和普通设计 skill 的区别：会学习。**

1. **越用越强**：每次设计任务结束，它会自动把一条结构化经验（场景 → 有效做法 → 踩坑）写进 `learnings/`，下次同类任务优先读取——不用重装、不用改代码，装上就在成长
2. **人人可喂**：所有知识都是小文件，一次 PR = 一条新风格配方 / 一条领域技法 / 一份案例。不会写代码也能贡献
3. **有晋升机制**：新知识先标 `experimental`（仅在明确匹配时加载），必须通过盲测对比评测才能转正为 `proven`——保证它"变好"而不只是"变多"，这是大多数 prompt 合集做不到的
4. **成长可读**：每个版本的 CHANGELOG 记录"这个版本学会了什么"

**安装**：把仓库 clone 到 agent 的 skills 目录（`~/.agents/skills/design-garden` 或项目内 `.zcode/skills/design-garden`）即可，无任何依赖。

**工作流**：解析任务 → 按需加载知识（≤6 个文件，永不爆上下文）→ 2–3 个差异化艺术方向 → 执行 → 评审门（每轮只修最伤的 3 个问题）→ 交付 → 记录经验。内置三源合并的"AI 味"黑名单和 9 大领域的评审清单。

**参与共建**：见 [CONTRIBUTING.md](CONTRIBUTING.md)，或直接提一个 🧠 Learning Report issue 分享你的设计经验。

## License & credits

MIT — see [LICENSE](LICENSE). Seeded by distilling 17 design skills and the shared craft canon; full credit in [SOURCES.md](SOURCES.md).

🌱 *Gardens are judged by what they grow.*
