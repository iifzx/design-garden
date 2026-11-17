# design-garden for DeepSeek Harness（dsh）

这是一个 dsh **组合包（bundle）插件**，把 [design-garden](../SKILL.md) 技能接入 dsh 原生技能目录。装好后，模型会通过 `skill` 工具发现它，并在 UI、海报、图标、Logo、幻灯片、图表、视频分镜、插画等视觉任务中按需加载。

- **包名：** `dsh-design-garden`
- **类型：** bundle 插件（技能提供方），不是工具插件——不新增工具、命令或界面。
- **提供：** 一个技能 `design-garden`，rank 600（`bundled` 层）。
- **运行依赖：** 无，只用 Node 内置模块。

## 安装

三种方式任选其一。

**从本仓库本地安装**（在仓库根目录执行）：

```sh
dsh plugin --profile web add file:./dsh
dsh web
```

**从 Git 安装，固定到提交**（把 `<40 位 SHA>` 换成真实提交；不要装浮动分支）：

```sh
dsh plugin --profile web add "git+https://github.com/iifzx/design-garden.git#<40 位 SHA>&path:/dsh"
dsh web
```

**从「发现」页安装**（需要 dsh ≥ 0.2.1-alpha.4 的实验性自定义索引）：打开 **插件 → 发现 → 添加索引源**，填入：

```text
https://raw.githubusercontent.com/iifzx/design-garden/main/dsh/index.json
```

然后搜索「设计花园 / Design Garden」，按索引列出的版本安装。索引由 [`build-index.mjs`](build-index.mjs) 生成，并把版本固定到某个提交。

## 验证

- **技能列表：** 设置 → 技能（或会话技能目录）中应出现 `design-garden`。
- **配置层：** `dsh --profile web --dump-config` 中应有一行 `design-garden-skills`，其 `name` 为 `dsh-design-garden`。
- **端到端：** 让 agent 做一次视觉任务（例如「设计一张活动海报」），它应先加载 `design-garden` 技能再动手。

## 为什么是 rank 600

dsh 在同一层内按 rank 解决同名技能：项目根（`.dsh/skills` = 100、`.agents/skills` = 200）高于用户根（`~/.dsh/skills` = 400、`~/.agents/skills` = 500），两者都高于打包技能（600）。因此本地 checkout 或用户级副本总会覆盖这个随包副本——插件只是图方便，不会锁死你的版本。

## 配置

默认技能根是包内 `skills/` 的副本。只有想让插件指向另一份 checkout 时才需要覆盖：

```yaml
# 该 profile 的 cordis.patch.yml
- id: design-garden-skills
  name: dsh-design-garden
  config:
    skillsDir: /absolute/path/to/design-garden
```

## 包内内容

| 路径 | 作用 |
|---|---|
| `index.js` | Cordis 插件入口：注册一个技能提供方 |
| `cordis.patch.yml` | 组合包补丁，把插件行插入配置树 |
| `skills/design-garden/` | 打包副本：`SKILL.md`、`knowledge/`、`learnings/`、`VERSION` |
| `index.json` | dsh 插件索引（format 1），供「发现」页使用 |
| `icon.svg` | 索引图标 |
| `build-index.mjs` | 按 Git 提交重建 `index.json` |
| `sync-skills.mjs` | 把仓库运行版技能同步到 `skills/design-garden/` |
| `test.mjs` | 离线提供方冒烟测试 |

`skills/design-garden/` 是生成出来的副本，不要手改。

## 维护流程

改动技能或调整插件版本后：

```sh
node dsh/sync-skills.mjs      # 刷新打包副本
node dsh/test.mjs             # 提供方冒烟测试
node dsh/build-index.mjs      # 固定到最近一次改动 dsh/package.json 的提交
```

先提交组合包，再提交新生成的索引——索引固定的是真正包含 `dsh/` 的那次提交。

## 说明

- 本插件不替换、不修改仓库根目录的运行版技能；它只是打包一份副本，让 Git/npm 安装保持自包含。
- 卸载：`dsh plugin --profile web remove dsh-design-garden`。
- 许可：MIT，见 [LICENSE](LICENSE)。技能内容来源见 [SOURCES.md](../SOURCES.md)。

[English](README.md) · [项目 README](../README.zh-CN.md) · [知识索引](../knowledge/INDEX.md)
