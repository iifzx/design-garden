# 评论回复模板 · Replies

发布后 80% 的争论会集中在同样八个问题上。提前写好答案，现场只做微调。

## 五条原则

1. **先承认具体的那一半。** "大部分 AI 设计确实差"是真的，先说出来，再讲你改了什么。
2. **只辩论机制，不辩论品味。** 品味之争没有输赢；机制（加载预算、评审轮次、盲测）可以验证。
3. **给文件路径，不给形容词。** 说"它快"没用，说"单次最多 7 个知识文件"有用。
4. **一个问题只答一次。** 答完把链接放进去，后面同样的质疑引用第一条。
5. **不删差评。** 除非违反平台规则。删了会被截图，代价更大。

## 八个高频问题

### 1 · "这不就是写个更好的提示词吗？"

**中文**

```text
不只是提示词。提示词是一次性指令，没有状态：不会在动手前强制发散，不会在交付前强制评审，也不会记住上次哪招管用。

这里是三个可执行的步骤 + 一个会累积的笔记文件。你可以直接打开 learnings/<domain>.md 看它写了什么。

如果你已经有一套跑得很顺的流程，它可能不会让你更快——它的价值是减少下限事故。
```

**English**

```text
Not a bigger prompt. A prompt is one-shot and stateless: it doesn't force divergence before drawing, doesn't force a critique pass, and doesn't remember what worked.

This ships those as steps, plus a file that accumulates. You can open learnings/<domain>.md and read what it wrote.

If you already run a tight process, it may not speed you up. The value is fewer floor-level failures.
```

**不要回**："你不懂" / "用过再说"。

### 2 · "支持 Cursor / Copilot / Windsurf 吗？"

**中文**

```text
它是一个 SKILL.md 目录，按 Agent Skills 约定组织。Claude Code、ZCode、DeepSeek Harness 是验证过的；其他工具只要支持从目录发现 skill，一般也能读，但我没有逐个测过，别当成承诺。

装法在 README 里有四条路径，git clone 那条最通用。
```

**English**

```text
It's a SKILL.md directory following the Agent Skills convention. Verified on Claude Code, ZCode and DeepSeek Harness. Anything that discovers skills from a directory should pick it up, but I haven't tested Cursor or Copilot — treat that as unverified, not a promise.
```

**不要回**："都支持"（没测过就别承诺）。

### 3 · "真的有用吗？有对比数据吗？"

**中文**

```text
诚实说：目前没有严格的成品 A/B。有的是 3 个 case study 和一组 eval brief，都附了评审记录（改了什么、为什么改）。

盲测工具在 evals/ 里，但样本还小。这也是我最想让人帮的地方：同一个 brief 跑两遍，把对比投过来。
```

**English**

```text
Honest answer: no rigorous A/B of final artifacts yet. There are three case studies and a set of eval briefs with the critique notes attached.

The blind harness exists but the sample is small. That's the gap I most want help with: run the same brief twice and submit the pair.
```

**不要回**：编一个"提升 40%"。

### 4 · "AI 设计就是垃圾 / 设计师要失业了"

**中文**

```text
同意一半。大部分 AI 设计确实差，而且差得很有规律——anti-slop 清单就是把这些规律列出来。

没人说它替代设计师。这套东西是给已经在用 AI 的人，让下限别那么低。

你要是有具体的失败案例，发我一个，比一句"垃圾"有用得多。
```

**English**

```text
Half agree. Most AI design is bad, and bad in predictable ways — that's why the anti-slop list exists.

Nobody here claims it replaces designers. It's for people already using AI, to raise the floor.

If you have a specific failure, send it. That's more useful than the verdict.
```

**不要回**：嘲讽 / "你不懂设计" / 长篇辩护 AI。

### 5 · "怎么贡献？我不会写代码"

**中文**

```text
三条路，都不用写代码：

1. 跑一次真实任务，把"这次哪招管用"写成一条 learning 提 PR（有模板，六行）；
2. 照模板写一个风格配方，大约一小时；
3. 把做出来的作品投到 gallery，参与月度主题投票。

新手站里有零代码的完整路径，从"什么是 issue"讲起。
```

**English**

```text
Three ways, none require code: PR one learning entry from a real task (six lines, template included); write one style recipe from the template (~1 hour); or submit a work to the gallery.

The start page has a no-code path that begins with "what is an issue".
```

**不要回**：只丢一句"看 CONTRIBUTING.md"。

### 6 · "为什么不用 Figma / 现成模板 / 别的 skill？"

**中文**

```text
不冲突。Figma 是画布，这个补的是"让 agent 动手"那一段的流程。模板回答"长什么样"，它回答"怎么改到能交付"。

常见的用法是两个一起：让 agent 出方向、做第一版，人在 Figma 里收尾。
```

**English**

```text
Different problems. Figma is the canvas; this is the process for when an agent does the first pass. Templates answer "what should it look like"; this answers "how do we get it to shippable".

Using both is normal: agent deals directions and drafts, human finishes in Figma.
```

**不要回**："Figma 过时了"（会被围攻）。

### 7 · "装不上 / 报错了"

**中文**

```text
把报错原文和你的环境贴一下（Windows 还是 macOS、用的哪个 CLI）。

最常见的是目录多套了一层：skill 根目录是非递归的，要正好放在 ~/.agents/skills/design-garden，不能再往下套 design-garden/。
```

**English**

```text
Paste the error and your setup (OS, CLI). The most common issue is nesting: skill roots are non-recursive, so it must sit at ~/.agents/skills/design-garden, not one level deeper.
```

**不要回**："按文档来"（等于没帮）。

### 8 · "能商用吗？"

**中文**

```text
MIT，可以商用，保留版权声明就行。你用它做出来的东西归你，仓库不主张任何权利。
```

**English**

```text
MIT. Commercial use is fine; keep the license notice. Output is yours — the repo claims no rights over it.
```

**不要回**："随便用"（不准确）。

## 置顶首评模板

发布后立刻自己发一条首评并置顶，把链接、装法、局限一次讲清，能挡掉一半重复提问。

**中文**

```text
装法（一行，复制就能用）：
git clone https://github.com/iifzx/design-garden.git ~/.agents/skills/design-garden

不用命令行的话，新手站每一步都写了点哪里：iifzx.github.io/design-garden/start

它现在不够好的地方，我先说：18 套风格里成品图还少；评测集刚起步；它自己不生成图，要靠宿主工具截图。

想帮忙又不想写代码：跑一次你自己的任务，把"哪招管用"发个 issue 就行。
```

**English**

```text
Install (one line):
git clone https://github.com/iifzx/design-garden.git ~/.agents/skills/design-garden

What it still lacks, up front: few visual examples per style, a young eval set, and no renderer of its own.

If you want to help without writing code: run one real task and open an issue with what worked.
```

## 负面评论处理

- **先复述，再回应。** "你说的是它和提示词没区别——这点值得说清楚，因为……" 复述本身就是灭火。
- **只接可验证的部分。** 对方说"你这个没用"，问"你试的是哪个域、什么 brief"。拿到具体信息，回复才成立。
- **公开修，公开认。** 有人指出真问题，改完后在原评论下回一句"已修，改动在 X"，比私下解释有效十倍。
- **不追着吵。** 两轮之内没达成共识就停，把结论留在那里给后来的人看。
- **举报而不是对骂。** 人身攻击、刷屏、广告，直接举报，不回复。

## 回复节奏

| 时间 | 频率 |
|---|---|
| 发布后 0–2 小时 | 每 10 分钟看一次（决定当天排名） |
| 2–24 小时 | 每 1–2 小时一次 |
| 第 2–7 天 | 每天两次 |
| 之后 | 每周一次，把新问题补进这份文档 |
