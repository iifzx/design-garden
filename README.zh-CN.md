# 🌱 design-garden

**会成长的设计 skill。** 一个面向 AI 编程 agent 的、自我改进的通用设计 skill——覆盖一切与审美相关的工作：UI、海报横幅、图标、logo 品牌、幻灯片、数据图表、视频动效、插画、字体排印与设计评审。

English | **简体中文**

![CI](https://github.com/iifzx/design-garden/actions/workflows/validate.yml/badge.svg)
![knowledge](https://img.shields.io/badge/知识-核心%206%20%C2%B7%20领域%209%20%C2%B7%20风格%2018-2E7D32)

> 🌻 **完全没接触过 AI 工具？** 不用写代码就能安装、使用、甚至帮上忙：**[新手指南](docs/start-here.zh-CN.md)**（English: [Start Here](docs/start-here.md)）

## 它能做出什么

以下是 skill 跑自己评测任务产出的真实作品——每一件都走完了完整工作流（含评审门）。更多见 [examples/](README.md)（含评审门抓到的问题清单）。

| | | |
|---|---|---|
| <img src="examples/images/bike-shop-hero.png" width="270" alt="自行车店落地页首屏"> | <img src="examples/images/jazz-poster.png" width="270" alt="爵士咖啡店开业海报"> | <img src="examples/images/icon-sheet.png" width="270" alt="植物养护图标集校验页"> |
| 落地页（[移动端 375px](examples/images/bike-shop-mobile.png) · [全页](examples/images/bike-shop-full.png)） | 开业海报 1080×1350 | 图标集，16/24/48 导出阶梯 |

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
```

每个知识文件都带 frontmatter（`id / kind / applies / status / source / updated`）。`experimental` 知识仅在显式匹配时加载；`proven` 默认加载。路由器读 `knowledge/INDEX.md`，每个任务**最多加载约 6 个文件**——**成长而不膨胀**。

工作流本身蒸馏自 agent 设计实践中最强的过程模式：**三方向发牌**（执行前先出 2–3 个结构性差异的艺术方向）、**形式五问**、每轮只修最伤 3 个问题的**评审门**，以及三源独立收敛合并出的权威 **anti-slop 清单**。详见 [SOURCES.md](SOURCES.md)。

## 安装

适用于任何支持 SKILL.md 约定的 agent（ZCode、Claude Code 及兼容 CLI）：

```bash
# 用户级（所有项目生效）
git clone https://github.com/iifzx/design-garden.git ~/.agents/skills/design-garden

# 或项目级
git clone https://github.com/iifzx/design-garden.git <你的项目>/.zcode/skills/design-garden
```

无构建步骤、无依赖——就是 markdown 加两个可选的 Node 脚本（仅标准库）。

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

- 简体中文：[README.zh-CN.md](README.zh-CN.md)（本文件）

想新增语言？见 [CONTRIBUTING.md](CONTRIBUTING.md) 的 "Translations" 一节——加一个 `README.<语言代码>.md` 并在两份 README 的语言条中互相链接即可。

## 许可与致谢

MIT——见 [LICENSE](LICENSE)。由 17 个设计 skill 与设计行业共有工艺准则蒸馏播种；完整致谢见 [SOURCES.md](SOURCES.md)。

🌱 *花园好不好，看它长出了什么。*
