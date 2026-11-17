# 海外平台文案 · Global

9 个平台，9 种写法。英文是主版本，中文是对照版（放进文末或折叠段，Cover 海外中文开发者）。**Reddit 和 HN 不要混排中英。**

通用链接：

```text
https://github.com/iifzx/design-garden?utm_source=<platform>&utm_medium=social&utm_campaign=garden-v02
```

---

## 01 · X

**机制**： 280 characters per tweet. A thread is sold by tweet 1 — if it doesn't stand alone, nobody reads 2. Links in the last tweet only; link-bearing tweets get less reach.

**风格**： 断言 · 具体 · 不解释第二遍

**规格**： 6–8 tweets, ≤280 chars each; first image 1600×900; 0–1 hashtags.

### Thread（主版本）

```text
1/
Ask an AI agent for a poster and you get the same four moves:
a purple gradient, three rounded cards, a centered headline, an icon above every line.

That's not a model problem. It's a process problem.
```

```text
2/
I built design-garden: a skill file plus a modular knowledge base for AI coding agents.
9 design domains, 18 style recipes, MIT, zero dependencies.

It doesn't make the model more creative. It gives it a workflow it has to follow.
```

```text
3/
Before it draws anything: 2–3 directions.

They have to differ in layout, type and composition. Swapping the palette is not a direction — that's the cheap version everyone ships.
```

```text
4/
Before it ships: a critique gate.

Fix only the 3 most damaging issues per round. Then run the gate again. Grades get written down (PASS / FIX / WAIVED), not vibes.
```

```text
5/
After every task: one learning entry.

Situation. Move. Pitfall. Confidence.
Appended to learnings/<domain>.md, read before the next task.

Your copy drifts away from the repo's. That's the design.
```

```text
6/
Community knowledge is eval-gated.

New entries land as experimental — loaded only on explicit match. They become proven only after winning a blind A/B against baseline.

Growth that's checked, not accumulated.
```

```text
7/
Browse the knowledge base: iifzx.github.io/design-garden
No-code start page: iifzx.github.io/design-garden/start
Repo: github.com/iifzx/design-garden

Plant something. 🌱
```

### 单条版（≤280，用于引用转发 / 不串 thread）

```text
Most AI design skills are frozen prompt packs: one person's taste, same on day 30 as day 1.

design-garden gives the agent a process instead — 3 directions, a critique gate, one learning note per task. 9 domains, 18 styles, MIT.

github.com/iifzx/design-garden
```

### 中文对照（发中文推 / 截图第二页）

```text
1/ 让 AI 做一张海报，你大概率会拿到同样的四样东西：紫色渐变、三张圆角卡片、居中大标题、每行前面一个小图标。
这不是模型的问题，是流程的问题。

2/ 所以做了 design-garden：一个 skill 文件 + 模块化知识库。9 个设计域，18 套风格，MIT，零依赖。
它不让模型更有创意，它给模型一套必须走完的流程。

3/ 动手前：2–3 个方向。版式、字体关系、构图必须不同。只换配色不算方向。

4/ 交付前：评审门。每轮只改最伤的 3 个问题，改完再跑一轮。判断写下来，不靠感觉。

5/ 每次任务后：一条经验笔记。situation / move / pitfall / confidence，写进 learnings，下次先读。

6/ 社区知识要过盲测：默认 experimental，只在显式匹配时加载；赢了 A/B 才转 proven。

7/ 知识库：iifzx.github.io/design-garden
仓库：github.com/iifzx/design-garden
```

### 不要做

- 不在第一条里放链接（会掉触达），链接放最后一条或回复区。
- 不堆 hashtag。0–1 个，多了像 bot。
- 不写 "Introducing…" 开头，X 上已经泛滥。
- 不把 thread 写满 12 条。7 条读完率最高。

---

## 02 · LinkedIn

**机制**： 3000-char limit; only ~210 characters show before "see more". Professional register, first-person builder voice, value framed for teams. Document (carousel) posts travel further than text-only.

**风格**： 专业 · 克制 · 可转发给 lead

**规格**： 1200–1500 chars; 3–5 short paragraphs; image 1200×627; 0–3 hashtags at the end.

### Post（主版本）

```text
Most AI design output fails review for the same reason junior work fails review: no process.

It skips the three steps every designer runs without thinking.

No directions before drawing. It ships the first idea it has, and the first idea is the most common one.
No critique before shipping. Nothing gets rejected, so nothing gets fixed.
No memory. What worked yesterday is gone by the next conversation.

I built design-garden to put those three steps into the agent's workflow.

Before it draws: 2–3 structurally different directions. Swapping the palette does not count.
Before it ships: a critique gate that fixes only the 3 most damaging issues, then runs again.
After every task: one learning entry — situation, move, pitfall — read before the next one.

The part I would point a design lead at is the eval gate. Community knowledge lands as experimental and becomes proven only after a blind A/B win against a baseline. Contributions are verified, not collected.

9 domains. 18 style recipes. MIT. Zero dependencies. Works with Claude Code, ZCode and DeepSeek Harness.

Repo in the comments.

Which step does your team keep redoing by hand because the AI skips it?
```

### Carousel（6 页，可选）

```text
1. AI design fails review for a reason that isn't taste.
2. No directions: it ships idea #1. Designers ship idea #3 after killing two.
3. No critique: nothing gets rejected, so nothing gets fixed.
4. No memory: yesterday's lesson dies with the context window.
5. Three mechanics: deal directions → gate issues → write learnings.
6. 9 domains, 18 styles, MIT. github.com/iifzx/design-garden
```

### 中文对照

```text
大部分 AI 设计过不了评审，原因和新人过不了一样：没有流程。

它跳过了设计师的三步：动手前不发散方向，交付前没有评审，做完不积累记忆。

design-garden 把这三步写成必须执行的机制：先出 2–3 个结构不同的方向；评审门每轮只改最伤的 3 个问题；每次任务写一条经验笔记。

对设计负责人来说最值得看的是盲测门禁：社区知识默认 experimental，赢了 A/B 才转 proven。增长是被验证的，不是被堆出来的。

9 个设计域 · 18 套风格 · MIT · 零依赖
github.com/iifzx/design-garden
```

### 不要做

- 不用 "I'm thrilled to announce"。LinkedIn 上这句话已经等于"广告"。
- 第一段不要超过 2 行，否则"see more"之前就把人劝退了。
- 不把 GitHub 链接放正文第一段。
- 不发纯文字 + 一张截图的懒人组合，做 carousel 或单图。

---

## 03 · Reddit

**机制**： Anti-marketing by default. Self-promo without disclosure gets removed. Value-first, plain text, no emoji, and you must answer criticism in the thread. r/ClaudeAI and r/AI_Agents are the right rooms; design subs are not.

**风格**： 平实 · 披露 · 求拆台

**规格**： No image. Title ≤300 chars. Body 250–400 words. One link at the end. Reply to every critical comment within the first 2 hours.

### 主贴（r/ClaudeAI）

```text
Title: I built a design skill for coding agents that writes down what worked after every task (9 domains, 18 styles, MIT)

Body:

Disclosure: I built this. Not asking for stars — asking what breaks.

The problem I kept hitting: every design skill I tried was a frozen prompt pack. Same taste on day 30 as on day 1. And the output had the same four tells: purple gradient, rounded cards, centered headline, an icon over every line.

design-garden is my attempt at a different structure.

Router plus modular knowledge. SKILL.md routes; knowledge lives in small files with frontmatter and line budgets. Max 7 knowledge files per task (learnings excluded). Per-file caps: core 200 lines, domain 220, style 120. A validator in CI enforces it.

A real critique step. Fix only the 3 most damaging issues per round, at least two rounds, grades recorded as PASS / FIX / WAIVED.

Runtime learning. After each task it appends situation / move / pitfall / confidence to learnings/<domain>.md and reads them before the next one.

Eval-gated contributions. New knowledge is experimental (loads only on explicit match) and promotes to proven after a blind A/B win.

What it doesn't do: few visual examples per style, a small eval set, and no renderer of its own — it needs the host agent to screenshot.

Install: git clone https://github.com/iifzx/design-garden.git ~/.agents/skills/design-garden

Repo: github.com/iifzx/design-garden

If you try it, tell me which domain file gave you the worst output. That's the most useful signal I can get.
```

### 变体（r/AI_Agents，换开头）

```text
Title: A skill that improves itself at runtime — structured learnings + eval-gated knowledge promotion

Body: Most agent skills are static prompt packs. I wanted one that accumulates. After every task it appends a structured entry (situation / move / pitfall / confidence) to a knowledge file it reads next time. Community PRs land as experimental and only become proven after winning a blind A/B against baseline. Load budget keeps it from bloating: max 7 knowledge files per task, line caps per file, enforced in CI. Happy to go into the eval harness or the router design.
```

### 变体（r/opensource，换重心）

```text
Title: Open-sourced a design skill for AI agents — MIT, zero deps, 9 domains, 18 style recipes

Body: Markdown and two stdlib Node scripts. No build step. The interesting part is the growth model: contributions are eval-gated, so the knowledge base is verified rather than accumulated. Also a load budget (max 7 files per task) so it doesn't get slower as it grows. Feedback on repo structure welcome.
```

### 中文对照（用于中文 sub 或即刻）

```text
做了个会给 AI 编程助手用的设计 skill。不要求 star，求拆台。

核心是四条：路由与知识分离（单次最多 7 个知识文件，有行数上限）；评审门每轮只改最伤的 3 个问题；每次任务写一条 situation / move / pitfall 的经验笔记；社区知识要过盲测才转正。

它不做什么：风格成品图少、评测集小、自己不渲染。

github.com/iifzx/design-garden
```

### 不要做

- 第一句不披露作者身份。这是被删帖的第一原因。
- 不放图、不用 emoji、不加粗满屏。Reddit 的富文本会显得像广告。
- 不在多个 sub 同一天发同样的标题。改开头，隔天发。
- 不回避"这不就是提示词"的质疑。正面回答，给文件路径。
- 不在 r/design、r/graphic_design、r/web_design 发。这三个社区对 AI 出图明确反感。

---

## 04 · Hacker News

**机制**： Show HN. Titles over 80 chars get truncated; marketing language gets flagged. The audience rewards mechanism, numbers, and admitted limitations. Comments will find the weakest claim — write the caveat yourself first.

**风格**： 干 · 技术 · 自曝短板

**规格**： Title ≤80 chars, no emoji, no "revolutionary". Body 200–300 words. Two links max. No image.

### Title

```text
Show HN: Design-garden – a design skill for AI agents that learns from every task
```

### Body

```text
I built a design skill for AI coding agents. The premise: most agent design failures are not taste failures, they're process failures — no directions, no critique, no memory.

Mechanically it's a SKILL.md router plus small markdown files with frontmatter. The router reads an index and loads at most 7 knowledge files per task (learnings excluded), with per-file line caps: core 200, domain 220, style 120. A validator runs in CI and enforces schema, budgets, index sync, plus an injection scan.

Three steps are mandatory:
- Deal: 2–3 directions that differ in layout, type and composition.
- Gate: fix the 3 most damaging issues per round, at least two rounds, grades recorded.
- Learn: append situation / move / pitfall / confidence to learnings/<domain>.md.

Community knowledge is eval-gated: experimental by default, proven only after a blind A/B against the baseline. The harness builds blind pages; scoring is manual.

Caveats: the 18 style recipes barely have visual examples yet, the eval set is small, and the skill can't render on its own. It's markdown plus two stdlib Node scripts, MIT, zero dependencies.

https://github.com/iifzx/design-garden
https://iifzx.github.io/design-garden/

I'd especially like criticism on the load-budget design — whether fixed file counts are the right lever compared to token budgeting.
```

### 中文对照

```text
给 AI 编程助手做的设计 skill。前提假设：agent 的设计失败大多不是审美问题，是流程问题——没有方向、没有评审、没有记忆。

实现上是 SKILL.md 路由 + 带 frontmatter 的小 markdown 文件。单次最多加载 7 个知识文件，单文件有行数上限，CI 校验 schema、预算、索引同步和注入扫描。

三步强制：出方向、评审门、写笔记。社区知识默认 experimental，盲测赢了才 proven。

短板：风格成品图少、评测集小、自身不渲染。MIT，零依赖。

特别想要关于"加载预算"的批评：固定文件数是不是对的杠杆？
```

### 不要做

- 标题里不写 "revolutionary" "game-changing" "AI-powered"。
- 不在正文里请求 upvote。HN 会直接反噬。
- 不回复每一条质疑，只回有技术含量的。情绪化的无视。
- 不在发布后 1 小时内改标题——会重置排名。

---

## 05 · Product Hunt

**机制**： Launches run 24h from 12:01am PT. Tagline is 60 chars and does most of the work. Comments matter as much as upvotes; the maker's first comment sets the tone. Gallery images are 1270×760.

**风格**： 产品化 · 具体 · 有 maker 视角

**规格**： Tagline ≤60 chars; description ≤260 chars; 3–5 gallery images 1270×760; 4 topics; first comment 120–160 words.

### Tagline

```text
A design skill that writes down what worked
```

### Description

```text
An open-source design skill for AI coding agents. It deals 2–3 structurally different directions before drawing, fixes only the 3 most damaging issues before shipping, and writes one learning note after every task. 9 domains, 18 style recipes, MIT, zero dependencies.
```

### Maker's first comment

```text
I built this after rewriting the same poster seven times.

Every "design skill" I tried was a frozen prompt pack — one person's taste, unchanged on day 30, and no step where anything gets rejected. design-garden is my attempt at the other structure: the agent deals three directions, runs a critique gate that fixes only the three most damaging issues, and writes a learning note after every task.

The part I'm proudest of is the eval gate: community knowledge stays experimental until it wins a blind A/B against the baseline. Growth that's checked.

What's next: visual examples for all 18 style recipes, a bigger eval set, and a proper before/after gallery.

If you try it, tell me which domain gave you the worst output — that's what I'll fix first.
```

### Topics

```text
Design Tools · Open Source · Artificial Intelligence · Developer Tools
```

### Gallery（3 张）

```text
1. cards/ph-gallery.png — 主图：三个动作 + 9/18/0
2. 工作流截图：PARSE → … → LEARN 八步
3. 一张 before/after：同一 brief，冻结提示词 vs design-garden
```

### 中文对照

```text
标语：一个会写下"哪招管用"的设计 skill。

简介：给 AI 编程助手用的开源设计 skill。动手前先出 2–3 个结构不同的方向，交付前只改最伤的 3 个问题，每次任务写一条经验笔记。9 个设计域，18 套风格，MIT，零依赖。

Maker 留言：我把同一张海报改了七遍，然后决定不再怪提示词。
```

### 不要做

- 不用 "Launching today!" 当第一条评论。
- 不在 tagline 里塞 "AI-powered"。
- 不要让朋友只 upvote 不评论。PH 的排序里评论权重很高。
- 不选周五、周末或重大发布会当天。

---

## 06 · Dev.to

**机制**： Tag-driven feed plus search. Tutorials and honest build logs do well; pure announcements don't. Cover image 1000×420. Max 4 tags.

**风格**： 教程 · 复盘 · 可复现

**规格**： 1200–2000 words; cover 1000×420; 3 tags; canonical URL to the repo or your blog.

### Title（三选一）

```text
A skill that keeps notes on itself: building design-garden
Router, budgets, and an eval gate: how to build an agent skill that grows
What I learned capping an agent skill at 7 files per task
```

### Intro

```text
Every agent skill I tried had the same failure mode: it was a snapshot.

Strong on day one, one author's taste, and identical on day thirty. The fix isn't a bigger prompt. It's a structure that (a) loads less, (b) checks itself, and (c) remembers.

This is a build log of design-garden, a design skill for coding agents: what the router does, why there's a hard file budget, and how a blind A/B gate keeps community contributions from diluting the knowledge base.
```

### Outline

```text
1. The failure mode: static knowledge, no feedback loop
2. Structure: router vs knowledge, frontmatter, three tiers
3. The load budget: 7 files, line caps, and why the 12-file version got worse
4. The critique gate: fix 3 issues per round, two rounds, recorded grades
5. The learning loop: one structured entry per task
6. Eval-gated promotion: experimental → proven
7. Three mistakes I'd avoid next time
8. What's still missing
```

### 关键代码块 1：learning entry

```markdown
### 2026-11-16 | poster brief with no fixed palette
- Situation: brief allowed any palette; first direction went warm-neutral
- Move: forced two structurally different directions before rendering
- Pitfall: skipped the 375px check on the mobile variant
- Confidence: repeated
```

### 关键代码块 2：frontmatter

```yaml
id: swiss-international
kind: style
applies: [poster-banner, ui-web]
status: proven
source: distilled
updated: 2026-11-16
```

### 中文对照

```text
标题：一个会给自已记笔记的 skill：design-garden 的搭法

摘要：静态知识一定会过期。解法不是更大的提示词，而是三件事：加载更少、自己检查、记住上次。这篇拆路由、文件预算、评审门和盲测晋升。
```

### 不要做

- 不写"Introducing my new project"式开头。
- 不贴没有上下文的代码片段。
- 不在文末放三个互推链接。
- 不用超过 4 个 tag，Dev.to 按 tag 分发。

---

## 07 · Bluesky

**机制**： 300 chars. No algorithm boost for hashtags; they're used for discovery but sparingly. Plain, human, no marketing cadence.

**风格**： 轻 · 平实 · 一句话说完

**规格**： ≤300 chars; image 1200×675; 0–1 hashtag.

### Post

```text
Shipped design-garden: a design skill for AI coding agents that writes down what worked after each task.

9 domains, 18 styles, a critique gate that fixes only the 3 most damaging issues per round. MIT, zero deps.

github.com/iifzx/design-garden
```

### 中文对照

```text
开源了 design-garden：给 AI 编程助手用的设计 skill。每次任务后写一条经验笔记，下次先读。9 个设计域、18 套风格、评审门每轮只改最伤的 3 个问题。MIT，零依赖。
```

### 不要做

- 不加一串 hashtag。
- 不用全大写。
- 不发长 thread 的前 300 字然后引流——Bluesky 用户不喜欢。

---

## 08 · Mastodon

**机制**： 500 chars, chronological, hashtag-driven discovery, community norms against promo. Hashtags in CamelCase for screen readers.

**风格**： 社区 · 具体 · 带标签

**规格**： ≤500 chars; image 1200×675; 3–5 hashtags.

### Post

```text
design-garden: a design skill for AI coding agents that writes down what worked.

9 domains, 18 style recipes. Before drawing it deals 2–3 structurally different directions; before shipping it fixes the 3 most damaging issues; after every task it appends a learning note.

Community knowledge is eval-gated — experimental until it wins a blind A/B.

MIT, zero deps: github.com/iifzx/design-garden

#OpenSource #Design #AI #Agents #Markdown
```

### 中文对照

```text
开源了一个会记笔记的设计 skill。9 个设计域、18 套风格；先出方向、再评审、最后写笔记。社区知识要过盲测才转正。MIT，零依赖。
```

### 不要做

- 不把 Mastodon 当 Twitter 用，不发 7 条 thread。
- 不加无关的流行标签（#AI 之外别乱挂）。
- 不在正文里 @ 一堆人求转发。

---

## 09 · YouTube

**机制**： Search plus suggested. Title and thumbnail do the click; first 30 seconds decide retention. Long-form tutorials on "how an agent works" travel well.

**风格**： 教学 · 具体 · 不吹

**规格**： 6–8 min; 16:9; thumbnail 1280×720 with ≤6 words; description with chapters.

### Title

```text
This AI design skill critiques its own work (design-garden)
```

### Thumbnail text

```text
主文案：IT CRITIQUES ITSELF
角标：design-garden
```

### Description

```text
Most AI design skills are frozen prompt packs. design-garden gives the agent a process: three directions before drawing, a critique gate before shipping, and a learning note after every task.

In this video I walk through the eight-step workflow, show where the AI-slop tells come from, and run one real brief end to end.

Chapters
00:00 Why AI design looks the same
01:10 The three missing steps
03:00 The workflow: parse → route → brief → deal → execute → gate → deliver → learn
05:20 One brief, start to finish
07:10 What it still can't do

Repo: github.com/iifzx/design-garden
Knowledge base: iifzx.github.io/design-garden
Beginner site: iifzx.github.io/design-garden/start
```

### 中文对照

```text
标题：这个 AI 设计 skill 会自己改稿

简介：拆八步工作流，讲 AI 味从哪来，然后拿一个真实 brief 跑一遍。仓库地址在简介里。
```

### 不要做

- 缩略图不放超过 6 个词。
- 不在前 30 秒放片头。
- 不在视频里念完整安装命令，放描述里。
- 不做"10 个 AI 设计工具测评"这种大而空的标题。

---

## 附 · 两个高杠杆渠道（不计入 9 个平台）

### A. GitHub 仓库本身

仓库的 description 和 topics 是搜索入口，价值高于大多数社交平台。

Description（≤350 字符）：

```text
The design skill that grows — universal, self-improving design for AI agents: 9 domains, 18 style recipes, a critique gate, and learnings that accumulate. MIT, zero dependencies. Works with Claude Code, ZCode and DeepSeek Harness.
```

Topics：

```text
ai-agents, agent-skills, claude-code, design, design-system, ui-design, poster-design, prompt-engineering, llm, open-source, skill, zcode, deepseek-harness, graphic-design
```

Discussions 发一条 Announcement，把 X thread 的 7 条并成一段，置顶。

### B. Newsletter pitch（100 词）

```text
Subject: A design skill that writes down what worked

Hi — one thing that might fit your AI/design coverage: design-garden, an open-source skill for coding agents that treats design as a process rather than a prompt. It deals three directions before drawing, runs a critique gate that fixes only the three most damaging issues, and records a learning note after every task. Community knowledge is eval-gated (experimental → proven via blind A/B). 9 domains, 18 styles, MIT, zero deps.

Repo: github.com/iifzx/design-garden
Happy to send screenshots or answer questions.
```

投递对象按相关性排序：AI 工具类（Ben's Bites、The Rundown）→ 设计类（TLDR Design、Design Milk 的 newsletter）→ 开源类（Console、Bytes）。
