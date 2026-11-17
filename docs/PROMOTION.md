# Promotion kit — ready-to-paste entries for wherever designers and agent users gather

Maintainer-facing copy for listing design-garden in aggregators and social channels. Everything below is paste-ready; update the star count / learned counts before posting. After a listing lands, add the link here so we keep track of where the garden is planted.

Social-platform copy lives separately: [social-kit/](social-kit/README.md) — 10 China platforms + 9 global ones, each with its own voice, specs and a Chinese/English pair.

## Awesome lists (open a PR against each)

### 1. [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) — suggested entry under Design/UI category

```markdown
- [design-garden](https://github.com/iifzx/design-garden) — Universal self-improving design skill for AI agents: UI, posters, icons, logos, slides, data-viz, video, illustration. Learns from every task (structured learnings), community-fed knowledge with eval-gated promotion, 9 domains + 18 style recipes + anti-slop canon. EN/中文.
```

### 2. [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills)

```markdown
- [design-garden](https://github.com/iifzx/design-garden) — The design skill that grows. Covers anything aesthetic (UI, posters, icons, logos, slides, charts, video, illustration) with 3-direction art dealing, a critique gate, and a self-learning loop: every task records what worked into learnings/, and community PRs pass eval-gated promotion (experimental → proven via blind A/B).
```

### 3. [bergside/awesome-design-skills](https://github.com/bergside/awesome-design-skills) — design-system skill registry

```markdown
- [design-garden](https://github.com/iifzx/design-garden) — Self-growing universal design skill: 9 domain playbooks with critique checklists, 18 style recipes (unified schema), canonical anti-slop list merged from convergent sources, runtime self-learning (learnings/), eval harness with blind A/B promotion. Browsable knowledge base: https://iifzx.github.io/design-garden/
```

## Show HN draft

**Title**: `Show HN: Design-garden – a design skill for AI agents that learns from every task`

**Body**:

> I built design-garden because every "design skill" I tried was a frozen prompt pack: strong on day one, one author's taste, never improving.
>
> It's a SKILL.md + modular knowledge base covering anything aesthetic (UI, posters, icons, logos, slides, charts, video, illustration). Three things make it different:
>
> 1. It learns at runtime — after every task it appends a structured entry (situation / what worked / pitfall) to learnings/, which it reads before the next task. My copy has already diverged usefully from the repo's.
> 2. Community knowledge is promoted, not just accumulated — new contributions land as `experimental` (load only on explicit match) and become `proven` only after winning a blind A/B eval against the baseline. CI runs a validator + injection scan on every PR.
> 3. It fights AI-slop defaults explicitly — a canonical "tells and fixes" list merged from three independently convergent sources, plus a 3-direction art deal before executing anything.
>
> The knowledge base is browsable at https://iifzx.github.io/design-garden/ (EN/中文), works with ZCode/Claude Code, MIT, zero dependencies.
>
> QA-honest caveat: one fresh-agent end-to-end run found 9 real issues (all fixed) — the workflow works but styles have few visual examples yet; contributions welcome.

## 社交文案（中文 · 即刻/V2EX/微博）

**标题**：做了个会成长的设计 skill，给 AI 编程助手用

**正文**：

> 用 AI 做设计最大的痛点：市面上的设计 skill 都是写死的 prompt 包，第一版什么样永远什么样，而且全是作者一个人的品味。
>
> 所以我做了 design-garden：一个会成长的万能设计 skill。三个不同：
> 1. 越用越强——每次任务结束自动把"这次什么方法管用"记进经验库，下次先读
> 2. 社区喂养有质量门——新知识先标 experimental，盲测对比赢了才转正，PR 有 CI 查注入
> 3. 反 AI 味黑名单——三个独立设计 skill 各自收敛出的"一眼假"清单合并成了权威版，执行前还会先发 2-3 个艺术方向让你选
>
> 覆盖 UI/海报/图标/logo/幻灯片/图表/视频/插画，知识库可以直接在线逛：https://iifzx.github.io/design-garden/
> GitHub 开源 MIT：https://github.com/iifzx/design-garden 求个 ⭐，更求经验报告和风格配方 PR 🌱

## X/Twitter thread draft (EN)

> 1/ Most "design skills" for AI agents are frozen prompt packs. I built one that grows: design-garden — it records what worked after every task, and the community feeds it. github.com/iifzx/design-garden
>
> 2/ The loop: every task appends a structured learning (situation → move → pitfall). Before your next task, it reads its history. My install has already drifted usefully from the repo — that's the point.
>
> 3/ Community knowledge is eval-gated: new entries load as `experimental` (explicit match only) and promote to `proven` only after winning a blind A/B against baseline. Growth that's verified, not accumulated.
>
> 4/ Browsable knowledge base (9 domains, 18 style recipes, the merged anti-slop canon): iifzx.github.io/design-garden — MIT, zero deps. Plant something. 🌱

### 4. [awesome-deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) ecosystem (skills/plugins list; also add the `dsh` topic to the repo)

```markdown
- [design-garden](https://github.com/iifzx/design-garden) — Universal self-improving **skill** (behavior-layer, not a tool plugin): 9 design domains + 18 style recipes + anti-slop canon, runtime learnings, eval-gated promotion. Agent Skills standard with `whenToUse` metadata — drop `skills/design-garden/` into `~/.dsh/skills/` or clone to `~/.agents/skills/design-garden`. Knowledge base: https://iifzx.github.io/design-garden/
```

Also relevant: [dsh-skills-bridge](https://github.com/deepseek-ai/deepseek-harness/discussions/5213) mounts `~/.claude/skills` into dsh — design-garden installed the Claude way is auto-visible to dsh users with that bridge.

## Star History (add when stars exist)

```markdown
[![Star History Chart](https://api.star-history.com/svg?repos=iifzx/design-garden&type=Date)](https://star-history.com/#iifzx/design-garden&Date)
```

## Submission tracker

| Channel | Status | Link |
|---|---|---|
| VoltAgent/awesome-agent-skills | PR opened 2026-11-17 (new "Design and Media" community subcategory) | https://github.com/VoltAgent/awesome-agent-skills/pull/1439 |
| ComposioHQ/awesome-claude-skills | prepared 2026-11-17 — API refuses PR creation for this account (REST 404 / GraphQL FORBIDDEN; likely interaction limits); branch `add-design-garden` is committed on the fork, open it manually | https://github.com/ComposioHQ/awesome-claude-skills/compare/master...iifzx:awesome-claude-skills:add-design-garden |
| bergside/awesome-design-skills | deferred — their registry requires a `skills/<slug>/` folder with SKILL.md + DESIGN.md + `index.json` entry in their schema, not a one-line entry; needs a format-conversion session | — |
| awesome-deepseek-harness (DSH ecosystem) | posted 2026-11-17 in "Show Your Plugins!" | https://github.com/deepseek-ai/deepseek-harness/discussions/13620 |
| Show HN | not posted (manual — draft above) | — |
| 即刻/V2EX (中文) | not posted (manual — copy in social-kit) | — |
