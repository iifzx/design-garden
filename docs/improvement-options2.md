# 对标高星项目：分发与内容的下一个台阶

> 内部决策稿，姊妹篇：huashu-design 对标见 [improvement-options.md](improvement-options.md)（其 P1–P3 已基本落地）。
> 调研日期：2026-11-19。对象换了一批——不再看单个设计 skill，看**整个 agent-skill 生态里星数最高的玩家怎么分发、怎么叙事**。

## 0 · 先说结论

huashu 教我们的是「把规则做成可执行工具」；这一批高星项目教的是**分发即产品**：两个 10 万星级设计 skill 的第一增长引擎都不是知识量，而是一条安装命令 + 一个支持面 + 一篇方法论文章。其中**最关键的一条已经免费到手**：skills CLI 扫描本仓库的 `skills/design-garden/` 镜像即可发现并安装本 skill（2026-11-19 实测 `npx skills add iifzx/design-garden --list` 成功带出完整 description），此前 README 完全没写这条路径——本次已补上。

## 1 · 对标对象

| 项目 | 星数（约） | 打法核心 | 对 garden 的启示 |
|---|---|---|---|
| [ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | 150k | CSV 知识库 + Python BM25 检索（80 风格 / 192 调色板 / 74 字体配对 / 13 技术栈）；独立官网 uupm.cc | **数字即卖点**：它 README 晒的是可检索条目数。garden 的 18→30+ 风格目标应被当作传播指标对待 |
| [taste-skill](https://github.com/Leonxlnx/taste-skill) | 117k | `npx skills add` 一行装 + 独立文档站 tasteskill.dev + 伴生仓库 classics；技能内含真实浏览器检查 | 单命令分发 + 「用浏览器验货」叙事——后者 garden 已有（shoot/lint），前者当时缺 |
| [obra/superpowers](https://github.com/obra/superpowers-marketplace) | 41k | 9 个 agent 兼容 + 进官方 `claude-plugins-official` 市场 + 伴生 marketplace 仓库；一篇博客引爆（2025-10） | 支持面宽度 = 触达面宽度；方法论文章是引爆点，不是 README |
| [sickn33/agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills) | 2,960+ 技能 | 聚合收录库 | 收录入口要主动送稿 |
| [anthropics/skills](https://github.com/anthropics/skills) | 官方 | 官方技能库 + worked examples 目录 | 「examples 目录」是官方背书的组织方式，garden 的 examples/ 结构与之同型 |
| 生态 | — | [skills.sh](https://skills.sh)（Vercel 开放注册表 + leaderboard，自动索引 GitHub 仓库，20+ agent）；Vercel × Snyk 做生态安全扫描 | **安全叙事顺风**：garden 的 CI 注入扫描 + experimental 隔离加载正是生态在推的安全姿势，应放大成卖点 |

## 2 · 差距清单（按性价比排序）

### P0 · 分发层（几乎零成本）

**1 · `npx skills add` 设为首选安装** —— ✅ 已落地（2026-11-19，README.md + README.zh-CN.md）
- 成本：十几行文字。实测 CLI 已能发现 skill（得益于 `skills/design-garden/` CI 镜像）。
- 后续：确认 [skills.sh](https://skills.sh) 上 `iifzx/design-garden` 的索引页已生成，关注 leaderboard 排名。

**2 · 多 agent 支持矩阵** —— ✅ 已落地（同上）
- superpowers 靠 9-agent 兼容起量，skills CLI 号称 20+。README 安装段现在首推一条命令覆盖 Claude Code / Codex / Cursor / Windsurf / Gemini CLI / OpenCode / ZCode。

**3 · 把 PROMOTION.md 写好的稿子真正发出去**（roadmap v0.4 未勾选项）
- awesome 列表 PR（[VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) 里 uupm 和 tasteskill 都在列）→ Show HN → 官方 marketplace 申请。
- 成本：纯文案，全部现成。这是当前**唯一阻塞分发的事**。

**4 · 一篇署名方法论文章**
- superpowers 的爆发源自 Jesse Vincent 的博客；tasteskill 有 Medium 深度文。平台建议：掘金/知乎（中文）+ Dev.to/HN（英文）。
- 角度不用编：「一个会成长的设计技能」四循环叙事 + 60 秒 demo + 盲测门禁证据。

### P1 · 内容层（huashu 对标遗留 + roadmap 未勾项）

**5 · 导出链 `scripts/export.mjs`**（improvement-options #10，仍未做）
- slides 是 9 域里唯一没有交付格式的。v1 只做 PDF + PNG，PPTX 单独立项。成本 L。
- 对标：uupm 用「13 个技术栈支持」表达广覆盖——garden 的等价物是「9 域 × 18 风格 × 可交付 HTML/PDF/PNG」。

**6 · 案例库升级**（improvement-options #11，仍未做）
- 3 个完整 case（web / deck / carousel），每个含 brief → 三方向 → gate 抓到什么 → 最终图 + 六维评分。
- 这是「盲测门禁是真的」的最佳传播证据；文章（P0-4）写作时正好需要。

**7 · learnings 公开 dashboard**（roadmap v0.4 未勾项）
- 从 stats.json + CHANGELOG 生成一页挂到 site，对标 uupm 官网晒数据库量。成本 S–M。

**8 · 可点击原型**（improvement-options #8）—— ui-mobile 加一节或新域，成本 M，排最后。

### P2 · 可选 / 观察

- **独立域名**（uupm.cc / tasteskill.dev 都用自有域名）：GH Pages 够用，等有流量再上。
- **README 首屏动图**：huashu 用 32 秒视频做首屏；garden 的 demo 是外链 HTML loop。可把 demo 转成 GIF/MP4 内嵌，提升首屏转化。
- **FUNDING.yml**：无，可加可不加。
- **伴生仓库**（taste-skill-classics 模式）：garden 的 community/ 目录已承担同职能，不单开。

## 3 · 不抄清单（边界不变）

1. **CSV + BM25 的一次性大库**——与「模块化文件 + ≤6 文件加载上限」的架构直接冲突；garden 的检索层就是 INDEX.md + 路由，不引入第二套检索机制。
2. **体量竞赛**——uupm 的 150k 星不证明 CSV 是对的结构，只证明分发的重要性。数字上追赶用「30+ 风格 × 全部有样张」就够。
3. **知识无门禁累积**——任何新内容仍走 experimental → 盲测 → proven。

## 4 · 已具备、别丢掉的优势

这批高星项目**都没有**、garden 已有的：eval 门禁的实验→proven 状态机、CI 注入扫描、加载上限、六维 rubric + 盲测 harness、触发测试、10 语言 README、新手站与社区循环。分发动作做完后，这些差异点就是文章与 HN 评论区的核心弹药——尤其 Vercel × Snyk 把生态安全当头等事的现在。
