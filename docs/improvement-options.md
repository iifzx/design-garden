# 对标 huashu-design：12 个可选的完善方向

> 内部决策稿：每条都写清「改哪里、产出什么、成本、会不会让仓库变胖」。
> 参考对象：`github.com/alchaincyf/huashu-design`（29.7k stars，121 commits，3.x）。

## 0 · 先说结论

huashu 领先的不是知识量，是**把规则做成了可执行的工具**：截图环、机械体检、外观账本、参考板、导出链。
design-garden 领先的是**架构**：模块化知识 + 行数预算 + ≤7 文件加载上限、CI validator + 注入扫描、六维 rubric + 盲测、10 语言、新手站与社区循环。

所以只搬**机制**，不搬**体量**：新脚本单文件、stdlib、缺依赖自动降级；新知识仍受 200/220/120/150 行预算约束。

## 1 · 真的差在哪

| 维度 | huashu | design-garden 现状 | 差距性质 |
|---|---|---|---|
| 运行时工具 | 25 个脚本（截图、体检、账本、参考板、导出、渲染） | 0 个运行时脚本（11 个全是仓库维护） | **结构性** |
| 方向门 | 6 张缩略图 → 挑 3 张做完整初稿 → 摆出来停 | 2–3 个方向；多画布只给「名字 + 一句 + 小 spec」 | 体验性 |
| 风格库 | 84+ 种，每种带样张图 | 18 条配方，6 张样张 | 证据性 |
| 素材 | 品牌资产五步 + `ref_board` 截图参考板 | 一句「图片优先级」 | 真实性 |
| 交付格式 | HTML / PDF / PPTX / MP4 / GIF | HTML | 可用性 |
| 模块 | web / deck / infographic / xiaohongshu / app / motion | 9 域，缺 3 类 | 覆盖性 |
| 事实 | 先搜证再设计，写 `product-facts.md` | 「不编造」，但不要求核实 | 风险性 |
| 弱机降级 | 5 级降级阶梯 | 一段「没有渲染工具就降级」 | 稳健性 |
| 检查点 | gate 文件物化（brand-spec / direction-approved / polish-log） | 只写在 rationale 里 | 可靠性 |

反过来，huashu 没有、garden 已有的：知识 frontmatter + 状态机、CI 注入扫描、六维评测 rubric、十语言 README、新手站/提交/投票、eval 门禁的实验→proven 路径。这些不要为了"对标"丢掉。

## 2 · 十二个选项

> 状态（2026-11-17）：**1 截图环、2 机械红线、3 外观账本、4 三方向缩略图门、5 18 个 style 样张已落地**——`scripts/shoot.mjs` · `lint.mjs` · `ledger.mjs` · `directions.mjs` · `gallery.mjs`。依赖策略按选定方案执行：Playwright 可选，缺了走本机 Chrome/Edge 的 DevTools Protocol。

| # | 选项 | 成本 | 影响 | 依赖 |
|---|---|---|---|---|
| 1 | 截图环 `shoot.mjs` | M | 高 | — |
| 2 | 机械红线 `lint.mjs` | M | 高 | — |
| 3 | 外观账本 `ledger.mjs` | S–M | 高 | — |
| 4 | 三方向缩略图门 | M | 高 | 1 |
| 5 | 18 个 style 样张补齐 | M–L | 中高 | 1 |
| 6 | `social-carousel` 域 | S | 中高 | — |
| 7 | `infographic-long` 域 | S | 中 | — |
| 8 | 可点击原型 | M | 中 | — |
| 9 | `core/facts` 先核实 | XS | 中 | — |
| 10 | 导出链路 PDF/PNG/PPTX | L | 高 | — |
| 11 | 案例库升级 | M | 中 | — |
| 12 | 60 秒 demo + README 首屏 | M–L | 传播高 | 1、4 |

### A · 品控武器化

**1 · 截图环 `scripts/shoot.mjs`**
- 解决：GATE 现在写的是「如果有截图工具就渲染看看」，实际交付里没人验证。huashu 的打磨环（截图 → 写下最伤的三处 → 改 → 再截；正式版至少 2 轮）是它质量的核心引擎。
- 做什么：输入 HTML，按域自动取视口（web 1440 + 375、poster 画布实际尺寸、deck 1920×1080），输出逐屏 PNG + 一张 contact sheet；浏览器缺失时打印降级提示而不是报错。
- 依赖策略：原计划「本机 Chrome/Edge headless CLI，零 npm」；实测 CLI 有约 500px 最小窗口、`--window-size` 与真实 `innerWidth` 差约 22px，375px 视口会被横向裁切。已改为 CDP（`--remote-debugging-port=0` + `Emulation.setDeviceMetricsOverride`，`mobile:false` 才拿到精确宽度），Playwright 作为可选首选。
- 成本：M（1 天）。
- 影响：不动知识层，不占加载预算。

**2 · 机械红线 `scripts/lint.mjs`**
- 解决：SKILL.md 的 15 条 Floors 和 Never list 全是文字，模型可以自称通过。能计算的应该交给脚本。
- 做什么：对比度（4.5:1 / 3:1）、最小字号（web 正文 16 / 标签 12；deck 24 / 16）、`transition: all`、动画布局属性、紫色区间、纯黑文字、>2 字体、>3 字重、统一圆角/统一间距、全大写 eyebrow、链接尾巴「→」、lorem/TODO。输出红/黄两级：红 = 必须修，黄 = 模板装饰。
- 诚实边界：静态解析是启发式的，只报高置信项，避免「狼来了」；复杂色彩叠加报黄灯人工确认。
- 成本：M。
- 影响：让每条 floor 有编号可查；CI 可以对 `examples/` 跑，防回归。

**3 · 外观账本 `scripts/ledger.mjs`**
- 解决：「越用越懂你」目前是承诺，不是事实——`learnings/` 是散文，ROUTE 时不会被真正回读。
- 做什么：`add <file>` 从交付物抽外观签名（色相家族、字体类别、版式形、风格配方、密度），写 `.design-garden/ledger.json`（gitignored）；`check` 输出最近 6 次签名，ROUTE 强制读一次。用户品味原话用 `--quote` 逐字存，并标适用范围。
- 成本：S–M。
- 影响：让 growth 可见、可测；不新增知识文件。

### B · 方向可视化

**4 · 三方向缩略图门**
- 解决：多画布任务现在只给文字 spec，用户在「读菜单」而不是「看设计」。huashu 的门是 6 张缩略图 → 挑 3 张做真稿 → 摆出来停。
- 做什么：DEAL 改为每个方向先出 1 张真实首屏（PNG，真标题真配色），三张并排；选定后才展开完整稿。**保留**「用户钉死风格就跳过 DEAL」——garden 比 huashu 省 token，这条不改。
- 成本：M（依赖 1）。
- 影响：SKILL.md DEAL 段改 8–10 行。
- 已落地（2026-11-17）：`scripts/directions.mjs` 接收 2–3 个 HTML，逐个渲染 1440×900，再合成一张深色标签页（Direction 01/02/03）；SKILL.md DEAL 已改成「每方向先出一张真实首屏，三张并排，选定才展开完整稿」，并保留「钉死风格跳过 DEAL」。

**5 · 18 个 style 的样张补齐**
- 解决：18 条配方只有 6 张图；选风格时模型读的是形容词，容易「读起来对、做出来不像」。
- 做什么：一个 `specimen.html` 模板（同一 brief、同一文案），批量渲染剩下 12 张 + 一张 18 格总览图；每张标配方名与关键 token。
- 成本：M–L（渲染 + 逐张过门）。
- 影响：`examples/` 增加约 2MB；知识文件不动。
- 已落地（2026-11-17）：18 张 1440×900 样张全部补齐（同一 Fern brief、同一文案），每张 HTML 顶部写 `RECIPE / MODE / MADE BY`；`examples/styles/specimens.json` 存 18 条 mode/配色/字体/token/producer，`scripts/gallery.mjs` 批渲并生成 `index.html` + `overview.png`。原 6 张标 `v0.2.0 gallery batch`（未记录模型，不臆造），新 12 张标 `Doubao · 2026-11-17`。

### C · 内容补位

**6 · `domains/social-carousel.md`（3:4 多图）**
- 解决：小红书 / IG 轮播是中文区最高频的设计需求之一，现在只能落到 poster-banner 单张。
- 做什么：8 种范式（封面公式、内页节奏、跨页连续性、画布字号下限 36/28、切片导出、压字检查），≤220 行 + checklist。
- 成本：S（半天）。

**7 · `domains/infographic-long.md`**
- 解决：长图/信息图塞在 data-viz 里，缺纵向叙事与跨屏接缝规则。
- 成本：S。

**8 · 可点击原型**
- 解决：ui-mobile 只讲静态屏；「能点的原型」是另一套语法（转场、状态、热点、真实性）。
- 成本：M（新域，或 ui-mobile 加一节）。

**9 · `core/facts.md`（先核实再设计）**
- 解决：涉及真实产品/版本/事件的稿子，凭记忆会硬错。huashu 把「WebSearch 核实 + product-facts.md」放在所有步骤之前。
- 做什么：20–30 行的前置步骤 + 占位约定（`[PLACEHOLDER: …]`），不新增域文件。
- 成本：XS。

### D · 交付与传播

**10 · 导出链路（HTML → PDF / PNG / PPTX）**
- 解决：用户说「做份 PPT」拿到 HTML 会卡住；这是 9 个域里唯一没有交付格式的环节。
- 做什么：`scripts/export.mjs`，deck 优先——PDF（print CSS + 分页）、PNG（逐页）、PPTX（python-pptx 或 pptxgenjs，可选依赖）。失败就明确说「只交付 HTML」。
- 成本：L。建议 v1 只做 PDF + PNG，PPTX 单独立项。

**11 · 案例库升级**
- 解决：现在 1 个 landing、1 张海报、1 套图标、1 张社交预览；huashu 有 7 个带设计理由的案例。
- 做什么：3 个完整 case（web / deck / carousel），每个含 brief → 三方向 → gate 抓到什么 → 最终图，外加 eval 分数表（模型 + 六维得分）。
- 成本：M。

**12 · 60 秒 demo + README 首屏**
- 解决：README 首屏是 3 张缩略图；huashu 首屏是一支 32 秒片 + 案例。
- 成本：M–L（要渲染、剪辑）。传播价值最高，质量价值最低。

### E · 小件（随任一包一起做）

- **gate 文件物化**：大任务在输出目录落 `brief.md / directions.md / gate.md`，文件不在 = 环节没做。
- **降级阶梯**：把「没有渲染工具」扩成 5 级（并行→串行→1 主版 + 2 轻变体→只读当前模块→检查点改 assumption 清单）。
- **版本一致**：`package.json` = 0.2.0、`skills/design-garden/VERSION` = 0.2.0、最新 tag = v0.2.1，三处不一致且 CI 没校验。
- **触发边界**：description 加负向句（生产级 Web App / 需后端的系统不适用），减少误触发。

## 3 · 建议的打包与顺序

| 包 | 内容 | 工期 | 理由 |
|---|---|---|---|
| **P1 品控武器化** | 1 + 2 + 3 + 小件 | 2–3 天 | 先把规则变成证据，每个任务都受益；不依赖素材生产 |
| **P2 方向可视化** | 4 + 5 | 1–2 天 | 依赖 1 的截图环，正好接上 |
| **P3 内容补位** | 6 + 7 + 9 | 1 天 | 单价最低，直接扩大可触发面 |
| **P4 交付与传播** | 10 + 11 + 12 | 单独排期 | 最重，且需要真实产出做素材 |

**如果只做三件**：1 截图环、2 机械红线、4 三方向缩略图门。
理由是它们把「写在文档里的标准」变成「交付时能看见的证据」——这也是 huashu 与 garden 目前最大的体感差。

## 4 · 边界（不做什么）

- 不搬 huashu 的 430 文件体量：它每次读一本 module 手册，garden 是每任务 ≤7 个小文件，后者更适合弱 runtime。
- 新脚本必须：单文件、stdlib、缺依赖打印降级而非失败、输出落项目目录而不是 skill 目录。
- 新增知识仍受预算：core ≤200 / domain ≤220 / style ≤120 / case ≤150；`INDEX.md` 同步；`validate_knowledge.mjs` 必须过。
- 不抄「三方向 100% 不豁免」：garden 的「钉死风格就跳过」更省 token，保留。
- 不引入二进制大件（字体、模型、视频素材），素材仍以引用为主。

## 5 · 需要你先定的一件事

截图与导出脚本的依赖策略，三选一：

1. **零依赖**：只调本机 Chrome/Edge headless，能截视口，整页截图降级为「逐屏滚动拼接由人看图」。
2. **可选依赖**：检测到 playwright 就用它（整页、逐屏、导出更稳），没有就退回方案 1。
3. **不截图**：只做静态 lint 与账本，GATE 仍靠读代码。

选 2 最平衡，但会让「无依赖」的说法需要加一句「可选增强」。
