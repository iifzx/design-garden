<sub>🌐 [English](README.md) · **简体中文** · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Português](README.pt-BR.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Русский](README.ru.md)</sub>

<div align="center">
  <img src="assets/banner.svg" width="100%" alt="design-garden — the design skill that grows · 会成长的设计技能">

  # 🌱 design-garden

  > *Plant a design skill. Watch it grow.*
  > *「种下一个设计技能，然后看着它长大。」*

  [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
  [![GitHub stars](https://img.shields.io/github/stars/iifzx/design-garden?style=social)](https://github.com/iifzx/design-garden/stargazers)
  ![CI](https://github.com/iifzx/design-garden/actions/workflows/validate.yml/badge.svg)
  ![styles](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fiifzx.github.io%2Fdesign-garden%2Fstats.json&query=%24.styles&label=%E9%A3%8E%E6%A0%BC%E9%85%8D%E6%96%B9&color=2E7D32)
  ![domains](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fiifzx.github.io%2Fdesign-garden%2Fstats.json&query=%24.domains&label=%E9%A2%86%E5%9F%9F&color=2E7D32)
  ![learnings](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fiifzx.github.io%2Fdesign-garden%2Fstats.json&query=%24.learnings&label=%E7%BB%8F%E9%AA%8C%E5%BA%93&color=A98A3D)

  **面向 AI 编程 agent 的、自我改进的通用设计 skill**——覆盖一切与审美相关的工作：UI、海报横幅、图标、logo 品牌、幻灯片、数据图表、视频动效、插画、字体排印与设计评审。

  [▶ 60 秒 demo](https://iifzx.github.io/design-garden/demo/) · [知识库](https://iifzx.github.io/design-garden/) · [它能做出什么](#它能做出什么) · [为什么不同](#为什么不同四条成长循环) · [里面有什么](#里面有什么) · [安装](#安装) · [参与贡献](#参与贡献)
</div>

> 🌻 **完全没接触过 AI 工具？** 不用写代码就能安装、使用、甚至帮上忙：**[新手指南](docs/start-here.zh-CN.md)**（English: [Start Here](docs/start-here.md)）——[新手站](https://iifzx.github.io/design-garden/start/) 把每个 GitHub 按钮、仓库地图、下载、作品馆、投稿和投票放在一页，全程不用写代码。

## 它能做出什么

<p align="center">
  <img src="examples/styles/overview.png" width="100%" alt="同一份蕨类落地页 brief 的 18 张风格样张——同一副骨架，18 种皮肤">
</p>
<p align="center"><sub>▲ <b>同一份 brief 的 18 张风格样张</b>——同一份文案、同一副排版骨架，18 种不同皮肤。本 README 里的每一张图都是 skill 自己做的。<a href="examples/styles/">逛样张</a></sub></p>

**▶ [看 60 秒完整循环](https://iifzx.github.io/design-garden/demo/)**——一次真实任务的全程旁白：brief、三方向 DEAL、评审门真实抓到的 RED（CTA hover 3.3:1、导航 2.6:1、11.5px 标签）、修复，以及写回的学习笔记。每一帧都来自本仓库的文件。克隆仓库也可直接打开 [demo/demo.html](demo/demo.html)。

静帧同样是 skill 跑自己评测任务产出的真实作品——每一件都走完了完整工作流（含评审门）。更多见 [examples/](README.md)（含评审门抓到的问题清单）。

| | | |
|---|---|---|
| <img src="examples/images/bike-shop-hero.png" width="270" alt="自行车店落地页首屏"> | <img src="examples/images/jazz-poster.png" width="270" alt="爵士咖啡店开业海报"> | <img src="examples/images/icon-sheet.png" width="270" alt="植物养护图标集校验页"> |
| 落地页（[移动端 375px](examples/images/bike-shop-mobile.png) · [全页](examples/images/bike-shop-full.png)） | 开业海报 1080×1350 | 图标集，16/24/48 导出阶梯 |

*由 **GLM-5.3-Flash** 生成——每个示例的模型署名见 [examples/README.md](README.md)。欢迎用别的模型跑同一 brief 并提 PR 对比。*

大多数 agent"设计 skill"是冻结的 prompt 包：第一天很强，第三十天就过时，而且永远只是一个人的品味。**design-garden 是被设计来"被喂养"的**——被你的日常设计工作喂养，被社区喂养。它不只是执行设计任务；它**从自己跑过的每个任务中学习**。

---

## 为什么不同：四条成长循环

1. **① 运行时自学习** —— 每个任务结束，自动把一条结构化经验追加到 `learnings/<领域>.md`：对你个人来说，装上就越用越强，不用重装
2. **② 社区贡献** —— 知识 = 小而模块化的文件。一次 PR = 一条新风格配方 / 领域技法 / 案例
3. **③ 评测门晋升（防膨胀）** —— 新知识以 `experimental` 状态落地（仅在明确匹配时加载），必须赢得盲测对比才能升为 `proven`
4. **④ 版本化学习** —— 每个版本的 CHANGELOG 都写明"这个版本学会了什么"——成长是可阅读的

```
 ① 每次任务 → learnings/ 沉淀经验
        ↓（可泛化的条目被 PR 回上游）
 ② 社区 PR 加入 knowledge/
        ↓（新知识标 experimental）
 ③ 盲评 A/B 胜出 → 晋升 proven
        ↓
 ④ CHANGELOG 记录"学会了什么"
```

## 里面有什么

```
SKILL.md                  路由器 + 8 步工作流（≤500 行——稳定的核心）
knowledge/
  core/                   通用模块：原则 · 色彩 · 字体排印 · 版式 · 动效 · anti-slop 黑名单
  domains/                9 大领域：ui-web · ui-mobile · 海报横幅 · 图标 · logo 品牌 ·
                          幻灯片 · 数据图表 · 视频动效 · 插画艺术（各带评审清单）
  styles/                 18 个风格配方（瑞士、包豪斯、新粗野、玻璃拟态、暗黑科技、
                          Y2K、日式侘寂、孟菲斯……）——每个都是一个小文件
  case-studies/          改造前后对比 + 推理过程
learnings/                skill 的田野笔记——有种子起步，随每个任务生长
evals/                    带陷阱的基准任务 + 评分标准 + 盲评 A/B 工具
scripts/                  validate_knowledge.mjs（CI 门禁）· ab_harness.mjs（盲评页）
                          shoot.mjs · lint.mjs · ledger.mjs · directions.mjs（交付工具）
                          gallery.mjs（18 风格样张构建器，仓库维护用）
```

每个知识文件都带 frontmatter（`id / kind / applies / status / source / updated`）。`experimental` 知识仅在显式匹配时加载；`proven` 默认加载。路由器读 `knowledge/INDEX.md`，每个任务**最多加载约 6 个文件**——**成长而不膨胀**。

工作流本身蒸馏自 agent 设计实践中最强的过程模式：**三方向发牌**（执行前先出 2–3 个结构性差异的艺术方向，每个方向先给 1 张真实 1440×900 首屏）、**形式五问**、每轮只修最伤 3 个问题的**评审门**，以及三源独立收敛合并出的权威 **anti-slop 清单**。详见 [SOURCES.md](SOURCES.md)。

四件交付工具在 `scripts/`：`shoot.mjs` 按精确尺寸截图并拼版；`lint.mjs` 跑 GATE 的机械半场（对比度、字号下限、`transition: all`、动效逃逸、Never list）；`ledger.mjs` 记住最近交付的外观，避免下一次重复；`directions.mjs` 把 2–3 个真实 1440×900 首屏拼成 DEAL 决策板，选定方向后才展开完整稿。它们都不阻塞：装了 Playwright 就用，否则走本机 Chrome/Edge 的 DevTools Protocol，两者都没有时 exit 2 并说明未能验证什么。`gallery.mjs` 是仓库维护工具：重渲 18 张风格样张并生成 `examples/styles/index.html` + `overview.png`。

## 安装

**一条命令，20+ 个 agent。** [skills CLI](https://skills.sh)（开放的 agent 技能注册表）会把 design-garden 装进 Claude Code、Codex、Cursor、Windsurf、Gemini CLI、OpenCode、ZCode 及其他支持 SKILL.md 约定的加载器——它自动检测你装了哪些 agent，交互式让你选：

```bash
npx skills add iifzx/design-garden      # 交互式选 agent
npx skills add iifzx/design-garden -g   # 用户级，所有项目生效
```

其他安装路径，殊途同归：

```bash
# 插件市场一条命令（Claude Code）
/plugin marketplace add iifzx/design-garden
/plugin install design-garden@design-garden

# npm/github 安装器（跨平台）
npm i -g github:iifzx/design-garden && design-garden

# 经典 git clone（用户级，所有项目生效）
git clone https://github.com/iifzx/design-garden.git ~/.agents/skills/design-garden

# DeepSeek Harness（dsh）——技能根目录不递归，直接克隆到技能根
git clone https://github.com/iifzx/design-garden.git ~/.dsh/skills/design-garden

# 或项目级
git clone https://github.com/iifzx/design-garden.git <你的项目>/.zcode/skills/design-garden
```

所有路径安装的是同一棵经过审查的树：CI 在每次提交上跑知识校验器 + 注入扫描，社区知识保持 `experimental`（仅显式匹配时加载）直到赢得盲测对比——安装包里永远不会出现未经评审就默认加载的规则。

DeepSeek Harness 说明：dsh 读取同一套 Agent Skills 标准（SKILL.md 目录，`~/.dsh/skills` 或 `~/.agents/skills` 下非递归发现），本 skill 已声明 `whenToUse` 触发元数据。

> ZCode 桌面版：**插件市场 → 添加 → 粘贴 `https://github.com/iifzx/design-garden`**。市场布局遵循 Claude Code 插件约定；如果你的 CLI 加载器要求不同的嵌套结构，git clone 路径永远可用——也请提 issue 让我们支持你的加载器。

无构建步骤；Node 标准库是唯一必需依赖，整页截图可用可选的 Playwright，缺了也能用本机 Chrome/Edge。

## 用起来

直接说设计就行，skill 会被任何审美任务触发：

- "给我的陶艺工作室做个落地页" → 先发牌 3 个艺术方向，执行最强的那个，评审，交付，记录学到的东西
- "给植物养护 app 设计一套图标" → keyline 网格、光学修正、剪影测试
- "这张海报看着不对——帮我审一下" → 评审优先模式，跑领域清单，按伤害程度排序给修复建议
- "landing page + 一套 PPT 模板" → 双领域路由，双域学习

## 参与贡献

**花园靠小 PR 生长。** 加一条风格配方（约 1 小时），报告一条你自己使用中的经验（几分钟），或者跑一次评测把 experimental 规则转正为 proven。全部流程见 [CONTRIBUTING.md](CONTRIBUTING.md)——简版：

1. Fork，加**一个小文件**（按 schema 写，或一条学习条目）
2. `node scripts/validate_knowledge.mjs` 必须通过（CI 强制）
3. 提 PR——CHANGELOG 会写上"花园学会了 X"

社区知识以 `experimental` 起步（仅在显式匹配时加载），赢下盲评 A/B 后转 `proven`——所以成长是**被验证的**，而不只是被累积的。

## 多语言

英文是主版本（知识文件与触发词对模型最稳）。翻译随行：

- 简体中文：[README.zh-CN.md](README.zh-CN.md)（本文件）· 繁體中文：[README.zh-TW.md](README.zh-TW.md)
- 日本語：[README.ja.md](README.ja.md) · 한국어：[README.ko.md](README.ko.md)
- Español：[README.es.md](README.es.md) · Português：[README.pt-BR.md](README.pt-BR.md)
- Français：[README.fr.md](README.fr.md) · Deutsch：[README.de.md](README.de.md) · Русский：[README.ru.md](README.ru.md)

v0.1.5 的翻译由 GLM-5.3-Flash 起草——母语者的润色非常欢迎（见 [CONTRIBUTING.md](CONTRIBUTING.md#translations)）。想新增语言？见 CONTRIBUTING 的 "Translations" 一节。

## 贡献者

花园靠贡献生存，通过 [all-contributors](https://allcontributors.org)（`.all-contributorsrc`）记录认可：

<!-- all-contributors table start -->
|                                                                                                            |
|------------------------------------------------------------------------------------------------------------|
| [@iifzx](https://github.com/iifzx) 💼 📖 🎨 🚧 🌍 — 代码 · 文档 · 设计 · 维护 · 翻译 |
<!-- all-contributors table end -->

喂它并加上自己：在任意 issue 里评论 `@all-contributors please add @<你> for <贡献类型>`，或直接 PR 上面的表格。

## 星标历史

[![Star History Chart](https://api.star-history.com/svg?repos=iifzx/design-garden&type=Date)](https://star-history.com/#iifzx/design-garden)

## 许可与致谢

MIT——见 [LICENSE](LICENSE)。由 17 个设计 skill 与设计行业共有工艺准则蒸馏播种；完整致谢见 [SOURCES.md](SOURCES.md)。

🌱 *花园好不好，看它长出了什么。*
