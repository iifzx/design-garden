# WorkBuddy 版本

这个目录把仓库里运行的 design-garden 技能打包成 **WorkBuddy 可用的技能包**，并负责把它同步到本机 WorkBuddy、上传到公开技能市场。**仓库根目录的 SKILL.md 与 knowledge/ 一行都不改** —— WorkBuddy 的格式要求只影响这里生成的副本。

```
workbuddy/
├── config.json     # 市场上架用的元信息（展示名、中英文简介、示例问题、作者）
├── build.mjs       # 生成 workbuddy/dist/design-garden/ + zip
├── sync.mjs        # 生成并镜像到 ~/.workbuddy/skills/design-garden
├── avatar.ps1      # 画 512×512 市场头像（avatar.png）
├── avatar.png      # 头像产出，上传市场时用这个文件
└── dist/           # 生成物，已 gitignore
```

## 常用命令

```bash
node workbuddy/build.mjs            # 打包（含 zip），产物进 workbuddy/dist/
node workbuddy/build.mjs --no-zip   # 只生成目录，本地预览用
node workbuddy/sync.mjs             # 打包并镜像到 ~/.workbuddy/skills/design-garden
node workbuddy/sync.mjs --no-build  # 只镜像 dist/ 里已有的产物
node workbuddy/sync.mjs --target D:\some\dir   # 镜像到别处
pwsh workbuddy/avatar.ps1           # 重画头像
```

改了知识库或 SKILL.md 之后，跑一次 `node workbuddy/sync.mjs`，本机 WorkBuddy 里的技能就是最新版；**WorkBuddy 需要重启**才会重新读取技能目录（它启动时建立技能索引）。

## 同步是怎么做到的（以及哪里做不到）

| 位置 | 能否跟随仓库自动更新 | 机制 |
|---|---|---|
| 本机 `~/.workbuddy/skills/design-garden` | 能 | `sync.mjs` 单向覆盖镜像；`git pull` 后由 `.git/hooks/post-merge` 自动跑一次 |
| WorkBuddy 公开技能市场（open.workbuddy.cn） | **不能** | 上架是审核制：每次更新要重新上传 zip 走一遍审核，平台不接受仓库直连 |

想让本机更新更"自动"，还有两种可选做法（都没默认开启）：

- 提交即同步：在 `.git/hooks/post-commit` 里追加一行 `node "$root/workbuddy/sync.mjs" >/dev/null 2>&1 || true`。仓库的 post-commit 现在负责自动 push，追加前先备份该文件。
- 定时拉取：把 `git pull && node workbuddy/sync.mjs` 交给系统计划任务（`schtasks`）。

镜像目录里的文件不要手改：下一次 sync 会整个覆盖。要改就改仓库，再 sync。

## 上架流程（公开市场）

1. `node workbuddy/build.mjs` 产出 `workbuddy/dist/design-garden-<version>.zip`。
2. 打开 https://open.workbuddy.cn → 发布管理 → 技能。
   - 首次：点「创建」上传 zip，平台解析出技能 ID。
   - 之后：在技能列表里对该技能点「更新版本」上传新 zip（**不能再用「创建」**，同名会被拒：`技能 "design-garden" 已存在，请携带其 assetId 发布新版本`）。
3. 配置页：市场展示分类（内容创作）、服务类目（工具 → 图片处理）、头像（`avatar.png`）、价格（当前观察期只能免费）。
4. 确认信息 → 提交 → 审核，约 7 个工作日。审核结果走站内通知。

发布新版本前先把 `package.json` 的 `version` 提上去，包里和市场上都会读这个值。

## 平台硬约束（踩过的坑）

- **只接受两级目录**：`根/一级目录/文件`，`knowledge/core/x.md` 这种三层会被拒：`目录层级超限`。`build.mjs` 把桶名并入文件名（`knowledge/core-anti-slop.md`），并把包内所有相对引用重写一遍；构建时自带两级校验与悬空引用校验。
- **zip 根目录必须是技能目录本身**（`design-garden/...`），不能把文件摊在 zip 根上。
- **≤3MB**；当前约 120KB。
- **SKILL.md frontmatter 必填**：`name`、`display_name`、`display_name_en`、`description`、`description_zh`、`description_en`、`version`、`author`；可选 `examples_zh` / `examples_en`（详情页的「试试这样问我」）。
- **YAML 值不能含 `: `**（会被当成嵌套映射）**、不能含 ` #`**、不能以指示符开头。`build.mjs` 在写盘前逐字段校验。
- **技能 `name` 全局唯一**：`design-garden` 一旦上架，改展示名也只能走「更新版本」，不能新建。
- 包里不放的东西：`examples/`（6.3MB 风格样张）、`evals/`、`site/`、`selftest/`、`gallery.mjs`。这些是仓库维护用的，技能运行时不需要；SKILL.md 里提到它们的地方属于"维护者工具"，缺失就跳过。
- 包内 `scripts/` 只有运行时四件套：`shoot` / `lint` / `ledger` / `directions`。

## 头像

`avatar.ps1` 用 GDI+ 画：深松绿底、三块米色模块、一朵珊瑚色花 —— 网格里有一个格子开花，对应"会生长的设计技能"。4× 超采样再缩到 512，边缘干净、无渐变、无文字、32px 下仍可辨。改颜色或构图就改脚本里的常量，别手改 PNG。
