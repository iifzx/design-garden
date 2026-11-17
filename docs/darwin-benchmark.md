# 对标 darwin-skill：把「进化」做成带证据等级的实验循环

> 内部决策稿。对象：[alchaincyf/darwin-skill](https://github.com/alchaincyf/darwin-skill)（达尔文.skill 3.0，6961 星，与 huashu-design 同作者，见 [improvement-options.md](improvement-options.md)）。
> 只搬机制，不搬体量；任何新知识仍走 garden 的验证门。ideas 来源已具名，措辞全部重写。

## 0 · 先说结论

darwin 把「skill 自我进化」做成了**实验循环**：E0 体检 → E1 读评 → E2 实跑盲评 → E3 真机，读评只诊断不裁决，保留/回滚由实跑盲评的计票决定，平局归短版，一切写进 results.tsv。

design-garden 的进化单元是**设计知识文件**（不是 SKILL.md 路由器本身），promotion 门已经是 E2 形态——盲评产出、不评文档。darwin 3.0 引述的实证（读文档打分与实跑增益的相关系数 −0.02 / −0.03，见其 v3-evidence）恰好证明我们「评产出不评 prose」这条路选对了。**差距不在评什么，在测试集纪律、裁决语义、实验台账、复测协议这四件配套。**

## 1 · 机制对齐表

| 机制 | darwin-skill | design-garden 现状 | 判断 |
|---|---|---|---|
| E0 体检（脚本读文件） | `darwin.py check`：frontmatter、路由、体积、引用、密钥 | `validate_knowledge.mjs` + 注入扫描 | ✅ 等价 |
| 裁决对象 | 盲评两版 skill 跑出的**产出**（2.x 评文档，3.0 改掉） | 盲评两版**产出页面**（ab_harness + rubric） | ✅ 等价，且我们起步就是 3.0 形态 |
| 对照组 | 带 skill vs 裸模型 | with/without 候选知识 | ✅ 等价（文件粒度的裸跑） |
| 测试集纪律 | dev/holdout 分离；来源分级 real > user > doc；全是 doc 来源要标「用文档出题考文档」 | `evals/tasks/` 单组任务，无分离 | ⚠️ 最大缺口 |
| 裁决语义 | **计票**：胜平负 + 检查项通过，接近时重跑；平局归短版 | 平均分差（严格更高且任一维掉幅 ≤0.5），平局即 fail | ⚠️ 规则更严但仍基于分数；darwin 引述绝对分跨评委噪音 ±8 |
| 实验台账 | results.tsv 9 列（时间/commit/裁决/证据/eval_mode），被回滚的假设也记 | CHANGELOG 叙事；降级只散落在 issue | ⚠️ 不可机读，没法喂「learned 看板」 |
| 触发测试 | 完整协议：8–10 条该/不该触发各半、邻居 description 一起给、80% 命中线、防过拟合对半分 | ROADMAP v0.3 挂账待做 | ⚠️ 他们已把协议写好，照结构重写即可 |
| 复测 | 模型升级后用存量测试集重跑，和上次增益对比——基座变强后 skill 增益常缩水甚至变负 | 无；`proven` 永久有效 | ⚠️ 与「生长即产品」的定位相悖 |
| 增长约束 | 单轮体积超旧版 110% 必须指出修掉了哪条失败检查项 | 静态行预算（200/220/120/150），预算内增长无证据要求 | ⚠️ 只有天花板没有棘轮 |
| 证据阶梯 | E0–E3 显式分级，报告不许把低一级说成高一级；跑不了就标「缺实测，不可比」 | 无此词汇 | ✗ |
| 成本明账 | 全流程约 23 次子 agent；「预算紧就只做评估」；无 python3 有手工清单 | 评测成本无标价 | ✗ |
| 反例黑名单 | 12 条真实事故（自改自评、打平就保留、一轮多改、推演代实跑…） | evals/README 有 4 条诚实规则 | ⚠️ 可补 3–4 条 |

## 2 · 值得学的九条

| # | 学什么 | 落在哪 | 成本 |
|---|---|---|---|
| 1 | **证据阶梯词汇**：e0 脚本体检 / e1 读评 / e2 实跑盲评 / e3 真机；promotion 与 CHANGELOG 标注到了哪一级，缺实测标「不可比」 | CONTRIBUTING + evals/README | XS |
| 2 | **dev/holdout 分离**：每个 eval task 带 `split` 字段；转 proven 需要 dev 集（找毛病）+ holdout 集（验收，只跑一次）双胜，全 doc 来源的任务不许单独作验收集 | evals/tasks schema + evals/README | S |
| 3 | **裁决改计票制**：候选在更多维度上胜出即赢（而非平均分）；票数接近且评委有分歧 → 该任务双版各重跑一次再计；平局仍 fail，但「平局归短版」——改短了算赢 | evals/README 裁决规则 | S |
| 4 | **evals/results.tsv 台账**：timestamp / commit / file / verdict / 证据摘要 / eval_mode（promotion、retest、trigger）；回滚也要记，供以后避开 | evals/results.tsv | XS |
| 5 | **触发测试协议**：该触发与不该触发各半，该触发的至少 2 条不含触发词，不该触发的选真邻居的本职；邻居 description 一起进清单；命中 <80% 或有误触就改 description；请求对半分防过拟合，后半验证；description 改动只走这条裁决通道 | scripts/trigger_test 系（JS 重写，ROADMAP v0.3 提前） | S |
| 6 | **诚实规则扩容**：补我们缺的测反陷阱——①对照组产出目录互不可见且 prompt 禁止列目录（我们未明写）；②runtime 内置同类 skill 会抬高对照组，发现要标注；③产出里抹掉来历线索（路径、水印、时间戳）；④「一轮只验一个假设」写进 promotion PR 模板 | evals/README「Rules that keep evals honest」 | XS |
| 7 | **复测协议（proven 有保质期）**：基座模型大版本升级后，对 `proven` 文件按存量任务重跑盲评，增益消失或变负 → 降回 experimental 并记录 | ROADMAP v0.3 新条目，依赖评测自动化 harness | M |
| 8 | **增长棘轮**：知识文件单次增长 >10% 时，PR 必须引用它要修的失败检查项或真实 learning 条目；没有证据就只许删改，不许加 | CONTRIBUTING 提交规则 | XS |
| 9 | **成本明账**：evals/README 标注一次 promotion A/B 的实际开销（跑几次任务、几位评委）；没有子 agent 环境时的降级路径：只做 E0+人工盲投票，报告标「缺实跑」 | evals/README | XS |

## 3 · 建议打包与顺序

| 包 | 内容 | 理由 |
|---|---|---|
| D1 台账与诚实规则 | 1 + 4 + 6 + 8 + 9 | 全是 XS 文字活，一次 commit，立刻让已有评测更可信 |
| D2 裁决与测试集 | 2 + 3 | 改 evals 规则本体；需要同步改 tasks schema 和 INDEX 无关，validator 不受影响 |
| D3 触发测试 | 5 | 直接顶掉 ROADMAP v0.3 一项挂账 |
| D4 复测协议 | 7 | 等 v0.3 自动化 harness 落地后才有性价比 |

## 4 · 不学什么（边界）

- **不把 SKILL.md 变成自动进化的对象**。darwin 进化的是 skill 文档本身（Phase 3 循环 + git 棘轮 + 3 评委）；garden 的 SKILL.md 是路由器，进化单元是知识文件与 learnings——后者已有 promotion 门。引入全自动进化循环（每个假设 5 次子 agent）成本高、收益落在文档措辞上，darwin 自己的反例 5 就是「为凑分加章节」。
- **不移植 darwin.py**（Python，400 行）。pair/tally 若要自动化，进 v0.3 的 Node harness（stdlib 约束不变）。
- **不导入 9 维 rubric 权重**。它评的是 skill 文档质量（结构 59 分），我们评的是设计产出（六维）；对象不同，硬套会双输。
- **不为「看起来完备」往 SKILL.md 加机制章节**——双方证据一致：读起来更像好 skill ≠ 干活更好。

## 5 · 已有等价物（不要重复建设）

- E0 体检 = validate_knowledge.mjs（且多了 CI 注入扫描）
- 产出盲评 = ab_harness.mjs 随机左右 + reveal + 六维 rubric
- 「平局即 fail：knowledge must earn its lines」我们已有，与 SkillOpt 的「平局拒绝」同源
- learnings/ 的 situation/move/pitfall/confidence 四字段 ≈ darwin 的执行记录诊断，但我们的发生在真实任务侧，不需要评测环境
