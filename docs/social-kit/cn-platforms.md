# 国内平台文案 · China

10 个平台，10 种写法。每个平台先写"为什么这样写"，再给中文主版本和英文对照版。

通用链接（发布时记得加 utm）：

```text
https://github.com/iifzx/design-garden?utm_source=<platform>&utm_medium=social&utm_campaign=garden-v02
```

---

## 01 · 小红书

**机制**：双列瀑布流，封面决定点不点，正文决定收不收藏。用户默认"你在打广告"，第一人称的使用体验比"我们发布了"有效十倍。

**风格三词**：体验 · 具体 · 清单

**规格**：标题 ≤20 字；正文 ≤1000 字；封面 3:4（1080×1440）；标签 6–10 个；正文开头不要空行（会被折叠）。

### 标题（三选一）

```text
AI 做的图，为什么一眼假
我给 AI 装了套改稿规矩
AI 设计不丑，就是假
```

### 中文（主版本）

```text
AI 做的图，为什么一眼假？

不是它不会画。是它没有改稿的规矩。

紫渐变、三张圆角卡片、居中大标题、每行前面一个小图标——这套组合不用问，看一眼就知道是 AI 做的。

我拆过原因，基本三个：
① 一上来就画，没有方向。人做设计会先想三种可能，AI 通常只交第一种。
② 画完就交，没人挑错。真实项目里，第一版都是要被毙的。
③ 下次还是从零。上次哪招管用，它不记得。

所以我给 AI 装了一个 skill：design-garden。它做的事很笨，就是把这三点写进流程：
· 动手前先出 2–3 个方向，必须结构不同——只换配色不算数
· 交付前只挑最伤的 3 个问题改，改两轮
· 每次任务结束写一条笔记：这次什么管用、哪里踩坑。下次先读笔记

它的知识还是社区喂的：新内容先标"实验性"，盲测对比赢了才转正。所以它不会越吃越胖，也不会变成某一个人的口味合集。

装法（会命令行的话 30 秒）：
git clone https://github.com/iifzx/design-garden.git ~/.agents/skills/design-garden
不会命令行也没关系，有个新手站，每一步都写了点哪里。

它现在还不够好：18 套风格里，有成品图的还不多；评测集也才刚起步。所以我更想要的是有人拿它做点真东西，再把"哪招管用"发回来。

9 个设计方向 · 18 套风格 · MIT 开源 · 零依赖
github.com/iifzx/design-garden
```

### English（对照版，用于双语封面第二屏 / 同步到 X）

```text
Why does AI design look fake from across the room?

Purple gradients, three rounded cards, a centered headline, an icon above every line. You can spot it before you read a word.

The model can draw. What it doesn't have is a process:
- no directions before drawing
- no critique before shipping
- no memory of what worked last time

design-garden is a skill that puts those three steps in. 2–3 structurally different directions first; fix the 3 most damaging issues before delivery; one note after every task, read before the next one.

9 domains, 18 styles, MIT, zero dependencies.
github.com/iifzx/design-garden
```

### 标签

```text
#AI设计 #AI工具 #设计干货 #开源项目 #ClaudeCode #AI编程 #设计师日常 #效率工具
```

### 不要做

- 不写"重磅上线""全网首发"。这个平台对发布腔免疫。
- 封面不放 GitHub 截图——缩略后全是灰字，点开率会崩。
- 不堆 20 个标签，6–10 个就够，多了会被判营销号。
- 不写"姐妹们冲"这类与项目气质不符的套话。

---

## 02 · 微博

**机制**：信息流按互动排序，140 字以内最容易被完整读完；话题词决定能不能被搜索到。适合"一句断言 + 三条证据 + 链接"。

**风格三词**：断言 · 干脆 · 有态度

**规格**：短帖 ≤140 字；1 张图 1600×900；话题 1–2 个；不要连发多条刷屏。

### 中文（短帖，138 字）

```text
AI 做设计一眼假，不是不会画，是流程里没有改稿这一步。

design-garden：动手前先出 3 个结构不同的方向；交付前只改最伤的 3 个问题；每次任务把经验写进笔记，下次先读。

9 个设计域 · 18 套风格 · 零依赖 · MIT
github.com/iifzx/design-garden

#AI设计# #开源#
```

### 中文（长微博，可选）

```text
为什么 AI 做的设计，你一眼就能认出来？

不是因为丑。是因为它每次都交出同一种"标准答案"：居中标题、三张圆角卡片、一层紫色渐变。

我把原因拆成三条：
1. 不先想方向。设计师会发散三种再收敛，模型直接交第一个方案。
2. 没有评审。真实项目里第一版都要被毙，一次性生成没有这个环节。
3. 没有记忆。上次学到的偏好，换个对话就没了。

design-garden 是个给 AI 编程助手用的设计 skill，把这三件事写进流程：先出方向、交付前评审、任务后记笔记。知识由社区贡献，但新内容要先过盲测才能转正。

9 个设计方向、18 套风格、MIT 开源、零依赖。
github.com/iifzx/design-garden
```

### English（配图说明 / 同步用）

```text
AI design looks fake because the process has no revision step. design-garden adds three: structurally different directions before drawing, a critique gate that fixes only the 3 most damaging issues, and one learning note after every task. 9 domains, 18 styles, MIT, zero deps.
```

### 不要做

- 不买转发、不买热搜位。数据会好看，star 不会涨。
- 正文里不超过 2 个话题，堆话题会被限流。
- 不用"转发抽奖"式诱导——和开源项目的信任模型冲突。
- 同一天不要连发三条以上，第二条开始没人看。

---

## 03 · 知乎

**机制**：搜索长尾 + 赞同排序。读者预期"论证"，对"发布"极度反感。用问题当标题，先给结论，再拆机制，最后承认边界。

**风格三词**：论证 · 分层 · 克制

**规格**：标题 20–40 字；正文 1000–1400 字；配图 1–2 张（1080×608）；不要通篇加粗。

### 标题

```text
如何评价 design-garden：一个会自己记笔记的 AI 设计 skill？
```

### 中文（主版本）

```text
先说结论：它解决的不是"AI 不会设计"，而是"AI 没有设计流程"。这两件事经常被混在一起讨论，所以很多"优化提示词"的努力打在了错的地方。

一、AI 味的来源不是审美，是流程缺了三段

1）没有方向。人类设计师接到 brief 会先发散三种可能，再收敛；模型默认直接交第一个想到的方案，而第一个通常也是最常见的那个。

2）没有评审。真实项目里第一版几乎一定要被毙，改稿是常态。一次性生成没有"交出去之前有人挑错"这个环节。

3）没有记忆。这次它学到你的店不喜欢紫色，下次换个对话，还是给你紫色。

这三条不是模型能力问题，是工作方式问题。换更强的模型能提高上限，但下限事故照样发生。

二、对应到 design-garden 里，是三个可查的机制

DEAL：动手前必须给 2–3 个方向，而且要求结构不同——版式、字体关系、构图要变，只换配色不算。这一条卡住的正是"第一个方案直接交"。

GATE：交付前跑评审，每轮只改最伤的 3 个问题，至少两轮，评分要写进交付说明（PASS / FIX / WAIVED，waiver 要写理由）。为什么只改 3 个？因为一次改十个，等于一个都没改到位。

LEARN：每次任务往 learnings/<domain>.md 追加一条 situation / move / pitfall / confidence。下次同类任务先读这些笔记。

三、它和"提示词包"的结构差别

提示词包是静态的：一个人写，一个人用，第三十天和第一天一样。

design-garden 有三层是动的：
- 运行时学习：你自己的使用会改变它读到的内容，不用重装；
- 社区贡献：一个 PR 一个知识文件，小到一小时内能写完；
- 评测门禁：新知识先标 experimental（只在显式匹配时加载），盲测 A/B 赢了才转 proven。

第三点是它比较少见的地方：把"知识增长"和"质量验证"绑在一起。多数 skill 仓库只做前者，于是越加越水、越加越慢。

四、加载预算：为什么它不会越用越胖

知识拆成模块，SKILL.md 只做路由：先读 INDEX，再按任务类型加载 domain、core、style 文件。单次任务最多 7 个知识文件（learnings 不计），单文件有行数上限（core ≤200 行、domain ≤220 行、style ≤120 行），CI 会拦超标的 PR。

结果是上下文可预测：不会被某个巨型文件吃掉。

五、它解决不了什么

- 18 套风格配方里，有成品图的还不多。想"照着抄"的人会失望。
- 评测集还小，proven 条目不多，盲测结论只能算初步。
- 它本身不生成图，需要宿主 agent 有渲染或截图能力，否则会退化成交付代码和规格。
- 它不会让零基础的人直接出大师级作品。它补的是流程，不是判断力。

六、谁适合用

已经在用 Claude Code / ZCode / DeepSeek Harness 这类工具，并且真的会让 agent 做视觉交付的人。一行命令就能装，不写代码也行。

一句话总结：它不是一个"更强的提示词"，而是一套"让 AI 按设计流程干活"的约束。前者提高上限，后者减少下限事故。对大多数人来说，后者才是日常痛点。

项目地址：github.com/iifzx/design-garden（MIT，零依赖）
知识库可以直接在线逛：iifzx.github.io/design-garden
```

### English（对照版，可发知乎英文圈或转 LinkedIn）

```text
Short answer: design-garden doesn't make the model more creative. It gives the model a design process, which is a different problem.

Three things go missing when an agent "designs":

1. No directions. A designer diverges before converging. A model ships the first idea it has, and the first idea is usually the most common one.
2. No critique. In real projects the first version gets rejected. One-shot generation has no step where someone says "this part is wrong".
3. No memory. A preference learned in one conversation is gone in the next.

design-garden adds those three as mechanics, not advice:
- DEAL: 2–3 directions that differ in layout, type and composition. A palette swap doesn't count.
- GATE: fix only the 3 most damaging issues per round, at least two rounds, grades recorded.
- LEARN: append situation / move / pitfall / confidence to learnings/<domain>.md, read before the next task.

It also keeps a load budget: at most 7 knowledge files per task, with line caps per file, enforced by CI. That's why it can grow without getting slower.

What it doesn't do: few visual examples per style yet; a young eval set; it can't render images by itself. It raises your floor, not your ceiling.

github.com/iifzx/design-garden
```

### 不要做

- 不用"安利""种草""亲测好用"这类口吻。
- 不在开头写推销话，知乎读者会直接划走。
- 不只贴链接不写论证——这是这个平台最容易被踩的雷。
- 不关评论。知乎的评论区是二次传播的主要来源。

---

## 04 · 微信公众号

**机制**：订阅制，打开靠标题和封面，读完靠结构。读者愿意看长文，但需要一个叙事入口，不接受上来就讲功能。

**风格三词**：叙事 · 方法 · 克制

**规格**：标题 ≤24 字；导语 2–3 行；正文 1500–1800 字；小标题 4–5 个；首图 900×383，正文图 1080×608；结尾只留一个动作。

### 标题（三选一）

```text
AI 不缺审美，缺的是改稿的规矩
我给 AI 装了一个会记笔记的设计师
那张改了七版的海报，教会我一件事
```

### 中文（主版本）

```text
导语
上周我把一张海报改到第七版。不是 AI 画得难看，是每一版都"差不多对"，又每一版都差一点意思：居中标题、三张卡片、一层恰到好处的渐变。像一份没交过作业的学生写的标准答案。

那天晚上我想明白一件事：问题不在提示词。

一、AI 味的三个来源

第一个来源是"没有方向"。人接到 brief 会先想三种可能：走极简呢？走手作呢？干脆不要图呢？模型不这么干，它直接交第一个想到的方案。而第一个想到的，通常也是最常见的。

第二个来源是"没有评审"。真实项目里，第一版几乎一定要被毙。改稿不是能力问题，是流程问题——总有人在你交出去之前说一句"这里不对"。

第三个来源是"没有记忆"。这次它学会了你的店不喜欢紫色，下次换个对话，它还是给你紫色。

三条指向同一件事：AI 不是在"做设计"，是在"出图"。出图只要一次生成，做设计要方向、评审、积累。

二、把评审写进流程

design-garden 是我给 AI 编程助手写的一个 skill。它不神奇，只是把上面三段补上。

动手前，必须给出 2–3 个方向，而且必须结构不同：换版式、换字体关系、换构图。只换配色不算——那是最省事、也最没用的"三个方案"。

交付前，跑一遍评审：只挑最伤的 3 个问题改，改完再跑一轮。为什么是 3 个？因为一次改十个，等于一个都没改好。每一轮的判断还要写下来：哪些过了、哪些改了、哪些明确不改以及为什么。

任务结束，往笔记里写一条：这次什么管用、哪里踩坑、下次注意什么。下次遇到同类任务，先读笔记再动手。

这三步都不新鲜。设计师每天都在做。新鲜的是它们被写成了 AI 必须执行的步骤，而不是"希望它能想到"。

三、让技能自己长大

大部分设计 skill 是写死的提示词包：一个人写，一个人用，第三十天和第一天一样。

design-garden 想做的是花园，不是雕塑。三件事让它能长：

运行时学习。你自己的使用会改变它读到的内容，不用重装。
社区贡献。一个 PR 加一个知识文件，小到一小时内能写完。
盲测门禁。新知识先标"实验性"，只在明确匹配时加载；盲测 A/B 赢了才转正。

第三条最关键。没有它，社区贡献会让知识库越来越水；有了它，增长是被验证过的，而不是被堆积的。

四、它现在还不够好的地方

18 套风格里，有成品图的还不多。评测集刚起步，转正的条目很少。它自己不生成图，要靠宿主工具有截图能力。

写这些不是谦虚，是想让你知道该期待什么。一个把局限写在明面上的工具，比一个自称全能的工具更值得试。

五、怎么装

会命令行的话，一行：

git clone https://github.com/iifzx/design-garden.git ~/.agents/skills/design-garden

不会也没关系，有个新手站，从"什么是 AI 编程助手"讲到"怎么投稿"，每一步都写了点哪里。

花园不是种下去就完了。它长成什么样，取决于往里放什么。
```

### English (digest, for a bilingual send or LinkedIn)

```text
I spent a week rewriting one poster to its seventh version. Not because the model drew badly — because every version was "almost right": centered headline, three cards, a gradient. The standard answer of a student who never got feedback.

That week I stopped blaming the prompt.

AI design goes wrong in three places: no directions before drawing, no critique before shipping, no memory of what worked. design-garden is a skill that puts those three steps into the agent's workflow — 2–3 structurally different directions, a critique gate that fixes only the 3 most damaging issues, and one learning note after every task.

The part I care about most is the eval gate: community knowledge lands as `experimental` and becomes `proven` only after winning a blind A/B. Growth that is verified, not accumulated.

It is not finished. Few visual examples per style, a young eval set, no renderer of its own. That's what the next version is for.
```

### 不要做

- 不写"干货满满""建议收藏"当作开头。
- 不在正文里放超过 3 个外链，公众号对外链很敏感。
- 不用"点击阅读原文"当唯一动作——正文里就给命令。
- 不分三天连载同一篇。一次讲完。

---

## 05 · 抖音 / 视频号

**机制**：前 3 秒决定划不划走，完播率比点赞重要。口播每句 ≤15 字，画面必须有对比。竖屏、字幕大、节奏快。

**风格三词**：钩子 · 对比 · 口语

**规格**：9:16，1080×1920；30–40 秒；字幕 ≥60px；BGM 压低，人声优先。

### 中文 · 分镜脚本（35 秒）

| 时间 | 画面 | 口播 | 字幕 |
|---|---|---|---|
| 0–3s | 屏幕录制：输入"做一张咖啡店海报"，AI 吐出紫渐变海报 | "AI 做的设计，你一眼就能认出来，对吧？" | **一眼假** |
| 3–9s | 快速切三个特写：紫渐变、圆角卡片、居中标题 | "紫渐变、圆角卡片、居中大标题。" | 三个特征 |
| 9–15s | 白板上画三个流程框，前两个打叉 | "不是它不会画。是它没有改稿的规矩。" | 没方向 / 没评审 / 没记忆 |
| 15–27s | 屏幕录制：三个方向并排 → 评审清单 → 笔记文件 | "这个 skill 干的事很笨：先出三个方向；交付前只改最伤的三个问题；每次任务记一条笔记。" | 三个动作 |
| 27–35s | GitHub 页面 + 数据条 9 / 18 / 0 | "9 个设计方向，18 套风格，MIT 开源。链接在主页。" | 去主页看 |

### 口播完整稿

```text
AI 做的设计，你一眼就能认出来，对吧？
紫色渐变、三张圆角卡片、居中大标题。
不是它不会画。是它没有改稿的规矩。
没方向，没评审，没记忆。
我给它装了个 skill，叫 design-garden。
干的事很笨：动手前先出三个方向，结构必须不一样；
交付前只改最伤的三个问题；
每次任务记一条笔记，下次先读。
9 个设计方向，18 套风格，MIT 开源，零依赖。
链接在主页，自己拿。
```

### English（字幕版 / 同步到 Shorts、Reels）

```text
Can you spot AI design from across the room? Purple gradient, three rounded cards, centered headline. Not a drawing problem — a process problem: no directions, no critique, no memory. design-garden adds all three. 9 domains, 18 styles, MIT. Link in bio.
```

### 不要做

- 前 3 秒不要说"大家好，今天给大家分享"。
- 不做纯口播不动画面。这条内容的核心是"前后对比"。
- 不把 GitHub 页面当主画面超过 2 秒，观众看不懂代码。
- 不用 AI 配音念完整条，真人口播的完播率高一倍。

---

## 06 · B站

**机制**：标题 + 封面决定点击，前 30 秒决定留存。观众接受"UP 主讲自己的项目"，但讨厌硬广；接受玩梗，但不喜欢油。

**风格三词**：信息差 · 坦诚 · 有梗

**规格**：标题 ≤30 字；封面 1920×1080，主标题 ≤8 字；视频 6–8 分钟；简介带时间轴。

### 标题（三选一）

```text
我给 AI 装了个会记笔记的设计师，它开始自己改稿了
AI 设计为什么一眼假？我拆了 18 套风格找到原因
别再让 AI 直接出图了，先让它学会改稿
```

### 封面文案

```text
主标题：AI 设计为什么一眼假
副标题：因为它不会改稿
```

### 简介

```text
这期不讲玄学，讲流程。

00:00 开场：一张改了七版的海报
01:20 AI 味的三个来源：没方向、没评审、没记忆
03:40 design-garden 的八步工作流拆解
06:10 装上试一次：从一句话到一个方向
08:30 它还不够好的地方

项目：github.com/iifzx/design-garden
知识库：iifzx.github.io/design-garden
新手站（不用写代码）：iifzx.github.io/design-garden/start

MIT 开源，零依赖。有问题评论区问，我会回。
```

### 开场 30 秒口播

```text
先看这张海报。第七版。
不是难看，是每一版都"差不多对"，又每一版都差一点意思。
我一开始以为是我提示词写得不好，后来发现不是。
问题在流程：AI 没有方向、没有评审、没有记忆。
这期就把这三件事拆开讲，然后告诉你怎么把它补上。
不吹，先说它哪里不行。
```

### 弹幕互动点

- 01:20 处："你见过最典型的 AI 味是什么？弹幕里说，我置顶。"
- 06:10 处："想让我拿你的 brief 试一次的，把需求打在弹幕里。"

### English（同步到 YouTube 时用）

```text
Title: Why AI design looks fake — and the skill that fixes the process
Description: A walkthrough of design-garden: three directions before drawing, a critique gate before shipping, and a learning note after every task. 9 domains, 18 styles, MIT.
```

### 不要做

- 不做"三分钟带你入门"这种标题，内容撑不住。
- 不在开头放 30 秒片头动画，B站观众会直接退。
- 不隐藏缺点。这个项目最大的说服力是"它知道自己哪里不行"。
- 不在视频里念安装命令超过 3 行，放简介里。

---

## 07 · 即刻

**机制**：圈子式社区，产品发布贴很常见。短、有信息量就够，链接卡片会自动展开。用力过猛反而显得不真诚。

**风格三词**：产品 · 短 · 真诚

**规格**：≤300 字；方图 1080×1080 或不配图；不加话题（即刻的话题生态很弱）。

### 中文

```text
给 AI 编程助手写了个会成长的设计 skill，今天开源了。

三个我觉得值得说的点：

1. 它会记笔记。每次任务结束写一条 situation / move / pitfall，下次同类任务先读。你自己的那份会和仓库里的慢慢不一样，这是设计好的。

2. 社区喂的知识要过盲测。新条目先 experimental，只显式匹配才加载；A/B 赢了才 proven。所以它不会越加越水。

3. 有加载预算。单次任务最多 7 个知识文件，单文件有行数上限。长知识，但不臃肿。

9 个设计域·18 套风格·MIT·零依赖
github.com/iifzx/design-garden
```

### English

```text
Open-sourced a design skill for AI coding agents that keeps notes on itself.

Three things worth a look:

1. It writes a learning entry after every task (situation / move / pitfall) and reads them before the next one. Your copy drifts from the repo's on purpose.

2. Community knowledge is eval-gated: new entries load as `experimental`, promote to `proven` only after a blind A/B win. Growth that's checked.

3. Load budget: max 7 knowledge files per task, line caps per file. It can grow without getting fat.

9 domains · 18 styles · MIT · zero deps
github.com/iifzx/design-garden
```

### 不要做

- 不写"重磅""终于来了"。
- 不发九宫格。即刻的图越小越好，文字才是主体。
- 不在评论区自己顶帖三次以上。

---

## 08 · V2EX

**机制**：程序员社区，对营销极度敏感。标题要具体，正文要有技术信息，结尾求批评。发错版块会被移帖。

**风格三词**：技术 · 具体 · 求批评

**规格**：发在"分享创造"节点；标题 ≤30 字；正文 400–700 字；代码块给目录树；不放图。

### 标题

```text
做了一个会自己写笔记的设计 skill（9 域 / 18 风格 / 单次加载 ≤7 文件）
```

### 中文

```text
地址：github.com/iifzx/design-garden

先说结构，不吹效果。

SKILL.md 只做路由，不塞知识：PARSE → ROUTE → BRIEF → DEAL → EXECUTE → GATE → DELIVER → LEARN。
知识拆在三个目录，每个文件带 frontmatter（id / kind / applies / status / source / updated）：

knowledge/
  core/       6 个通用模块（principles / color / typography / layout / motion / anti-slop）
  domains/    9 个设计域，每个文件末尾有 critique checklist
  styles/     18 套风格配方，统一 schema
learnings/    运行时笔记，每次任务追加一条
evals/        盲测任务 + rubric + A/B 脚本

几个我踩过的坑，可能对做 skill 的人有用：

1. 知识一定会膨胀。第一版我什么都往里塞，单次加载 12 个文件，模型开始忽略后面的内容。现在硬性预算：单次最多 7 个知识文件（learnings 不计），core ≤200 行、domain ≤220 行、style ≤120 行，CI 拦超标 PR。

2. 社区贡献会稀释质量。解法是把"收录"和"生效"分开：新条目 status: experimental，路由只在显式匹配时加载；盲测 A/B 赢了才改 proven，proven 才默认加载。

3. 风格文件最容易写成形容词堆。统一 schema 之后好很多：每个配方必须给 palette、type scale、layout grammar、signature moves、never list，写不出具体值就说明没想清楚。

4. 评审要限量。一开始 GATE 让模型列 10 条问题，改完更差。现在只改最伤的 3 条，至少两轮，每轮记 PASS / FIX / WAIVED。

校验脚本：node scripts/validate_knowledge.mjs（schema、行数预算、INDEX 同步、注入扫描），CI 里跑。

它现在的问题：18 套风格里成品图很少；评测集刚起步；不生成图，要靠宿主有渲染能力。

求骂。尤其是"加载预算"这条，有没有更好的做法。
```

### English

```text
A design skill for coding agents, structured as a router plus modular knowledge files. Hard load budget (≤7 knowledge files per task), per-file line caps, frontmatter schema, and eval-gated promotion (experimental → proven via blind A/B). Validator runs in CI. Looking for criticism on the load-budget design.
```

### 不要做

- 不发"分享创造"以外的节点。
- 不在标题里写"开源""免费"当卖点——这里没人关心。
- 不放效果图当主证据，这里看代码和结构。
- 不回复"这不就是提示词"时抬杠，给文件路径就行。

---

## 09 · 掘金

**机制**：技术文章为主，教程体吃香，能被站内搜索长期带到。标题带"怎么做"比带"是什么"稳。

**风格三词**：教程 · 可复现 · 有取舍

**规格**：标题 ≤30 字；正文 1200–1800 字；封面 16:9；代码块 3–5 个；文末给仓库地址。

### 标题

```text
从 0 搭一个会自我进化的 Agent Skill：模块化知识库 + 盲测晋升
```

### 中文（大纲 + 关键段）

```text
一、为什么要做"会成长"的 skill
   提示词包的三个死穴：静态、单一口味、无法验证

二、目录结构：路由与知识分离
   SKILL.md 只负责 PARSE → ROUTE → … → LEARN 八步
   knowledge/core、domains、styles 三层，frontmatter 统一

三、加载预算：让上下文可预测
   规则：单次 ≤7 个知识文件，learnings 不计
   行数上限：core ≤200 / domain ≤220 / style ≤120
   CI 用 validate_knowledge.mjs 拦超标

四、盲测晋升：experimental → proven
   新条目默认 experimental，只在显式匹配时加载
   ab_harness.mjs 生成盲测页，人工打分
   赢了才改 status，proven 才进默认加载

五、踩坑
   1. 一开始什么都塞 → 模型忽略尾部内容
   2. 风格文件写成形容词堆 → 改成强制 schema
   3. GATE 列 10 条问题 → 改成只改最伤 3 条

六、结果与边界
   9 域 / 18 风格 / 0 依赖
   不足：成品图少、评测集小、自身不渲染
```

关键代码块（frontmatter schema）：

```yaml
id: swiss-international
kind: style
applies: [poster-banner, ui-web]
status: proven
source: distilled
updated: 2026-11-16
```

### English (abstract)

```text
How to build a skill that evolves: separate the router from the knowledge, cap what gets loaded, and gate promotions behind a blind A/B. Includes the frontmatter schema, the load-budget rules, and three mistakes that made the first version worse.
```

### 不要做

- 不写"一文读懂"，内容撑不住标题。
- 不放没有上下文的截图，代码块要给完整路径。
- 不在文末堆五个互推链接。

---

## 10 · 少数派

**机制**：评测 + 教程，读者里非开发者居多。需要步骤、图注、适用边界。愿意读长文，但要求"我真的能照着做"。

**风格三词**：上手 · 边界 · 细节

**规格**：标题 ≤24 字；正文 1200–1600 字；[图1]–[图8] 标注；头图 16:9（1600×900）。

### 标题

```text
把 AI 的设计从"能用"拉到"能交付"：design-garden 上手指南
```

### 中文（结构 + 开头）

```text
开头：
如果你的 AI 助手做出来的东西总是"能用但不像人做的"，问题通常不在模型，而在它没有一套交付前的检查流程。这篇讲一个补流程的工具，以及怎么在 15 分钟里用上它。

一、它是什么（不写代码也能看懂）
   [图1] 一句话：给 AI 编程助手装的一本设计工作手册
   三层：手册、笔记、社区

二、为什么不是又一个提示词包
   [图2] 静态 vs 会成长：一张对比表

三、15 分钟上手
   [图3] 安装命令（一行）
   [图4] 第一次对话：让它做一张海报，观察它先给方向
   [图5] 交付前它会列评审清单

四、三个真实任务
   1. 海报：给社区旧书交换活动
   2. 图标：给植物养护 App 画一套
   3. 幻灯片：把一份周报变成 6 页
   [图6] 三张成品并排

五、适合谁 / 不适合谁
   适合：已经在用 AI 编程助手、需要交付视觉的人
   不适合：想一键出图、不想看过程的人

六、进阶：给它喂经验
   [图7] learnings 文件长什么样
   [图8] 怎么提一个知识 PR

结尾：工具的上限取决于你喂它什么。
```

### English (summary)

```text
A 15-minute guide for people who use AI assistants but don't write code: what design-garden is, why it isn't another prompt pack, three real tasks (poster, icon set, slides), who it fits and who it doesn't, and how to feed it your own experience.
```

### 不要做

- 不假设读者知道什么是 git、什么是终端。每个命令都给"在哪里输、按什么键"。
- 不放没有图注的截图。
- 不隐藏"不适合谁"。少数派的读者最信这一节。
- 不写"神器""生产力爆炸"。
