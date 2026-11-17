# 社交发布包 · Social launch kit

给 design-garden 做的多平台发布文案库：**10 个国内平台 + 9 个海外平台**，每个平台一套自己的语气、结构和尺寸，中英双语。

- 平台正文：[cn-platforms.md](cn-platforms.md) · [global-platforms.md](global-platforms.md)
- 评论回复：[replies.md](replies.md)
- 成品图：[cards/](cards/)（HTML 源文件 + 已渲染 PNG）
- awesome-list 条目与提交追踪仍在 [../PROMOTION.md](../PROMOTION.md)，不放这里。

---

## 1. 定位：一句话，三种说法

**中文**

> 一句话：**一个会自己记笔记的设计 skill。**
>
> 展开：给 AI 编程助手用的通用设计能力，覆盖 9 个设计方向、18 套风格。动手前先出 2–3 个结构不同的方向，交付前只改最伤的 3 个问题，每次任务结束把这次什么管用写进笔记，下次先读。
>
> 它不是什么：不是提示词包，不是素材库，不是一键出图工具。

**English**

> One line: **A design skill that writes down what worked.**
>
> Expanded: A universal, self-improving design skill for AI coding agents — 9 domains, 18 style recipes. It deals 2–3 structurally different directions before drawing, runs a critique gate before shipping, and records a learning entry after every task.
>
> Not: a prompt pack, an asset library, a one-click image generator.

两个词要小心：`skill` 在中文 AI 圈已经是通用词，不要翻成"技能包"以外的怪词；`agent` 在面向大众的平台说"AI 编程助手"，在技术平台直接用 agent。

---

## 2. 三个叙事角度：每个平台只选一个

| 角度 | 一句话 | 可查的证据（都在 repo 里） | 适合 |
|---|---|---|---|
| **A · 流程** | AI 缺的不是审美，是改稿的规矩 | `SKILL.md` 的 DEAL / GATE；GATE 每轮只改最伤的 3 个问题，至少两轮 | 知乎、公众号、LinkedIn、Dev.to |
| **B · 成长** | 它每做完一次任务，就给自己写一条笔记 | `learnings/<domain>.md` 的四字段（situation / move / pitfall / confidence）；`learnings/_TEMPLATE.md` | X、即刻、Bluesky、Product Hunt |
| **C · 反 AI 味** | 16 条"一眼假"清单 + 评审门 | `knowledge/core/anti-slop.md`；条目由三份独立来源收敛而成 | 小红书、B站、抖音、Reddit |

规则：**一条内容讲一个角度，另外两个一句带过。** 三个都讲，等于一个都没讲清。

角度和平台不是死绑定——同一条 thread 可以 A 开头、C 收尾，但主线必须只有一个。

---

## 3. 平台矩阵

| # | 平台 | 主要人群 | 主角度 | 语言 | 形态 / 尺寸 | 发布日 |
|---|---|---|---|---|---|---|
| 1 | 小红书 | 设计师、AI 工具爱好者、学生 | C | 中主 + 英对照 | 图文 3:4，1080×1440 | D3 |
| 2 | 微博 | 泛科技、设计圈 | C | 中 | 短帖 ≤140 字 + 1 图 | D1 |
| 3 | 知乎 | 工程师、设计从业者 | A | 中 | 长答 1000–1400 字 | D4 |
| 4 | 微信公众号 | 订阅者、同行 | A | 中主 + 英摘要 | 长文 1500–1800 字 | D12 |
| 5 | 抖音 / 视频号 | 泛用户 | C | 中（英字幕可选） | 竖屏 9:16，30–40 秒 | D10 |
| 6 | B站 | 学生、年轻开发者 | C | 中 | 16:9 视频 + 封面 1920×1080 | D10 |
| 7 | 即刻 | 产品经理、独立开发者 | B | 中 | 短帖 + 链接卡 | D1 |
| 8 | V2EX | 后端 / 全栈、开源用户 | A | 中 | 技术自述贴 | D11 |
| 9 | 掘金 | 前端、工程化 | A | 中 | 教程长文 | D11 |
| 10 | 少数派 | 效率工具用户、非开发者 | A | 中 | 评测 / 上手指南 | D12 |
| 11 | X | AI agent 用户、独立开发者 | B | 英主 + 中对照 | Thread 7 条，首图 1600×900 | D2 |
| 12 | LinkedIn | 团队 lead、设计负责人 | A | 英主 + 中对照 | 长帖 1200 字符 | D8 |
| 13 | Reddit | r/ClaudeAI 等 agent 社区 | B | 英 | 自述贴，无图 | D9 |
| 14 | Hacker News | 工程师、早期用户 | A | 英 | Show HN，无图 | D5 |
| 15 | Product Hunt | 早期采用者 | B | 英 | Tagline + 3 张 1270×760 | D7 |
| 16 | Dev.to | 写代码的读者 | A | 英 | 技术长文 | D13 |
| 17 | Bluesky | 设计 / 开源圈 | B | 英 | ≤300 字符 | D2 |
| 18 | Mastodon | 开源社区 | B | 英 | ≤500 字符 + 标签 | D2 |
| 19 | YouTube | 搜索型学习者 | A | 英（可加中字幕） | 6–8 分钟 + 缩略图 1280×720 | D13 |

发布日对应第 5 节的两周节奏。国内和海外可以并行，但**同一天最多两个平台**，否则评论区守不过来。

---

## 4. 双语规则

1. **国内平台**：中文是主版本；英文是**对照版**，用于双语封面、图文第二屏、或同步到 X / LinkedIn。不要把英文硬塞进正文开头。
2. **海外平台**：英文是主版本；中文是**对照版**，放在文末或折叠段，覆盖海外中文开发者。Reddit 和 HN 不要中英混排——会立刻被当成机器翻译的推广。
3. 同一句话不要两边直译。英文重动词和数字，中文重节奏和具体场景；改语言时重写开头，保留论点和证据。
4. 产品名永远写 `design-garden`，不缩写、不加空格、不音译。

**术语对照**

| 原文 | 中文口径 | 备注 |
|---|---|---|
| skill | skill（不翻） | 中文 AI 圈通用；面向大众时补一句"给 AI 装的一套方法" |
| agent | AI 编程助手 / agent | 小红书、抖音用前者；技术平台用后者 |
| eval / blind A/B | 盲测 / 盲测对比 | 不写"评测体系"这种大词 |
| learnings | 经验笔记 | repo 里是文件名，正文说"笔记" |
| anti-slop | 反 AI 味清单 | 不写"反低质" |
| DEAL | 出方向 | 只在技术平台用原名 |
| GATE | 评审门 | 只在技术平台用原名 |

---

## 5. 两周发布节奏

| 时间 | 动作 |
|---|---|
| D-3 | 备料：三张成品图、UTM 链接、README 首屏、issue 模板、FAQ 十条 |
| D1 | 即刻（中文首发）+ 微博（短宣告） |
| D2 | X thread + Bluesky + Mastodon（英文首发三连，同一天） |
| D3 | 小红书（图文笔记） |
| D4 | 知乎（长答） |
| D5 | Hacker News（美东周二至周四 8–10 点发） |
| D7 | Product Hunt（太平洋时间 00:01，选周二或周三） |
| D8 | LinkedIn（工作日早上） |
| D9 | Reddit（r/ClaudeAI 主发；其他 sub 隔天，改标题和开头） |
| D10 | B站（视频）+ 抖音 / 视频号（切片） |
| D11 | V2EX + 掘金（技术贴，两版不同语气） |
| D12 | 少数派 + 公众号（深度长文） |
| D13 | Dev.to + YouTube（如果有视频） |
| D14 | 复盘：把评论区的高质量问题整理成 FAQ，回写 repo |

三条排期理由：
- **HN 和 PH 不同日。** 两个都是"当天冲榜"型，同一天发等于自己打自己，而且回复不过来。
- **Reddit 在 HN 之后。** HN 的批评会先暴露问题，改完再去 Reddit，少挨一轮。
- **周末不发工作向内容。** 知乎、LinkedIn、V2EX 的周末流量和互动都低。

---

## 6. UTM 规范

所有对外链接统一加参数，campaign 按版本改（当前 `garden-v02`）：

```text
https://github.com/iifzx/design-garden?utm_source=<platform>&utm_medium=social&utm_campaign=garden-v02
```

| 平台 | utm_source | 平台 | utm_source |
|---|---|---|---|
| 小红书 | `xiaohongshu` | X | `x` |
| 微博 | `weibo` | LinkedIn | `linkedin` |
| 知乎 | `zhihu` | Reddit | `reddit` |
| 公众号 | `wechat` | Hacker News | `hackernews` |
| 抖音 / 视频号 | `douyin` | Product Hunt | `producthunt` |
| B站 | `bilibili` | Dev.to | `devto` |
| 即刻 | `jike` | Bluesky | `bluesky` |
| V2EX | `v2ex` | Mastodon | `mastodon` |
| 掘金 | `juejin` | YouTube | `youtube` |
| 少数派 | `sspai` | | |

图片里不放二维码，链接只放正文和首评——二维码会被平台压图压糊，也会降低可信度。

---

## 7. 视觉系统

所有平台图共用一套 tokens，直接从 [../../start/DESIGN.md](../../start/DESIGN.md) 取，不要另起一套配色。

| Token | 值 | 用途 |
|---|---|---|
| paper | `#F1F0E4` | 底色（冷纸白，不是暖米色） |
| paper-2 | `#E7E6D6` | 次级块面 |
| ink | `#1B2620` | 正文（带绿的墨色，不用纯黑） |
| forest | `#24402F` | 深绿块、按钮 |
| sage | `#8EA289` | 分隔线、弱标签 |
| brass | `#B98A2E` | 唯一强调色，只做线和小面积 |
| brass-ink | `#6E5015` | 需要小字时的深黄铜 |

字体：词标用衬线斜体（Source Serif 4 / Georgia italic）；中文大标题用宋体族（Noto Serif SC Black，缺字时退思源宋体 Heavy），英文大标题用 Bricolage Grotesque，缺字时用 Georgia 斜体；小字标签用 Noto Sans SC Light，不用微软雅黑常规字重。

三条构图规则：
1. **左纸右林**：纸色区放论点，深绿区放证据或流程，比例约 60/40。
2. **一条数字带**：`9 个方向 · 18 套风格 · 4 个回路 · 0 依赖`，数字大、标签小。
3. **只用一个强调色**：brass 只出现在一条分隔线和一个小圆点上，不做渐变、不做发光。

尺寸表：

| 用途 | 尺寸 | 比例 |
|---|---|---|
| 小红书封面 / 内页 | 1080×1440 | 3:4 |
| 微博配图 | 1600×900 | 16:9 |
| 公众号首图 | 900×383 | 2.35:1 |
| 公众号正文图 | 1080×608 | 16:9 |
| 知乎配图 | 1080×608 | 16:9 |
| B站封面 | 1920×1080 | 16:9 |
| 抖音 / 视频号 | 1080×1920 | 9:16 |
| X / Bluesky 单图 | 1600×900 | 16:9 |
| LinkedIn | 1200×627 | 1.91:1 |
| Product Hunt 画廊 | 1270×760 | 5:3 |
| GitHub social preview | 1280×640 | 2:1 |
| YouTube 缩略图 | 1280×720 | 16:9 |

成品：[cards/xhs-cover.png](cards/xhs-cover.png)（小红书 3:4）、[cards/launch-card.png](cards/launch-card.png)（X / LinkedIn 16:9）、[cards/ph-gallery.png](cards/ph-gallery.png)（Product Hunt 5:3）。HTML 源文件在同目录，改字后重新截图即可，不依赖设计软件。

小红书封面留了三个方向，同名 HTML 各一份，选定后删掉其余两份：

| 文件 | 方向 | 适合 |
|---|---|---|
| `xhs-cover` | 宋体海报 + 深绿数据带（默认） | 贴合仓库气质，可信度优先 |
| `xhs-cover-bold` | 深绿满版 + 170px 黑体 | 信息流里抢注意力，适合投放/大号转发 |
| `xhs-cover-editorial` | 杂志封面 + 目录式名录 | 长文配套，显得"有内容"而不是"有广告" |

**图里不要做**：假 star 数、假用户评价、假产品截图、"AI 生成插画"当案例、紫渐变、九宫格套同一模板。

---

## 8. 一稿多用：改写而不是复制

1. **一条主线五个切面**：流程 / 笔记 / 反 AI 味 / 加载预算 / 社区盲测。每个平台拿一个切面当标题，其余降为一句。
2. **长文 → thread**：每段抽出一句能独立成立的断言，删掉所有过渡句。7 条以内，第 1 条必须能单独转发。
3. **thread → 小红书**：7 条并成 3 块，加一段"我自己用了两周"的体验，把术语全换成场景。
4. **同论点换证据**：技术平台给文件路径和数字（`learnings/`、`≤7 个知识文件`），生活平台给前后对比图和使用场景。
5. **一平台一主图**：同一个论点换构图，不要一张图铺满所有平台。

长度不是重点，"这个平台的人为什么要在意"才是。

---

## 9. 度量与复盘

**看这些**
- GitHub stars 的日均增量（发帖后 48 小时曲线）
- GitHub Insights → Traffic → Referrers，按 utm_source 对账
- 新开 issue 数、community submission 数（说明有人真的用了）
- 评论区"具体问题"的比例（问怎么装、问某个风格怎么调 = 触达对的人；只有"厉害" = 没触达）

**不看这些**：点赞、播放量、转发数。它们和 star 没有相关性。

复盘表模板：

| 平台 | 曝光（估） | 点击 | star | 有效提问 | 结论（下次改什么） |
|---|---|---|---|---|---|
| | | | | | |

---

## 10. 红线

- 不买 star、不刷赞、不进互赞群。被发现一次，这个项目的可信度就没了。
- HN 不写营销句，不在评论里请求 upvote。
- Reddit 第一句必须披露 `I built this`，否则会被当成软文删帖。
- 不在 r/design、r/graphic_design 发 AI 生成的作品图——这两个社区对 AI 出图明确反感，发了会反噬到项目。
- 国内平台不写"全网最强""第一""颠覆"。
- 不编数据、不编用户评价、不伪造 star 截图。所有数字必须能在 repo 或 GitHub 页面上查到。
- 承认局限是内容的一部分：风格配方缺成品图、评测集还小——写出来，比藏起来有用。

---

## 11. 发布前 10 分钟清单

- [ ] 首屏 3 秒能看懂"这是什么、给谁用"
- [ ] 安装命令能直接复制，且只有一行
- [ ] 链接带了正确的 utm_source
- [ ] 图是 2x 导出，缩略状态下标题仍可读
- [ ] 首评/置顶已经准备好（放链接和 FAQ 第一条）
- [ ] 发布后 2 小时有人守着回评论
- [ ] 没有出现"最强""颠覆""赋能"这类词
- [ ] 事实核对：9 个方向 / 18 套风格 / 4 个成长回路 / 0 依赖 / MIT
