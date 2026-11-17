# GitHub 按钮与仓库内容导览

> 给第一次打开 GitHub 的人：每个按钮在哪、点了会发生什么、新手要不要点。
> 这不是 GitHub 官方文档，而是一张“先看哪里”的地图。界面会随 GitHub 改版轻微变化，认名字比记位置可靠。

## 先记住三件事

1. **仓库（repository / repo）** 是一个项目的家：文件、历史、讨论、自动检查都在里面。
2. **Issue** 是一个带编号的“可追踪问题或投稿”，可以回复、贴图、关闭。
3. **Pull request（PR）** 是“我改好了，请合并”的请求；合并后改动才进入主分支。

浏览不需要登录；Star、开 issue、点 👍、提交 PR 需要 GitHub 账号。

## 仓库首页的按钮

| 按钮 | 通常在哪 | 点了会怎样 | 新手要不要点 |
|---|---|---|---|
| **Star** | 右上角，Star 数字旁 | 收藏仓库，也给项目一个公开信号 | 要。需要登录；点完会记在你的账号里 |
| **Fork** | 右上角 | 在你的账号下建一份完整副本，方便你改 | 想改文件时再点；只浏览不用 |
| **Watch** | 右上角 | 订阅通知：新 issue、PR、讨论 | 想跟进时点；不想被通知打扰就先不点 |
| **Code**（绿色） | 文件列表上方 | 展开克隆地址，或下载 ZIP | 要。不会 git 就选 **Download ZIP** |
| **Issues** | 顶部标签行 | 提问、报知识错误、投稿作品 | 要。新手最常用 |
| **Pull requests** | 顶部标签行 | 看别人改了哪些文件、讨论、合并 | 想贡献内容时看；只使用技能可以先跳过 |
| **Actions** | 顶部标签行 | 看自动检查、站点部署、票数同步 | 不紧急。红叉表示检查失败，不是你做错了 |
| **Discussions** | 顶部标签行（可能被关闭） | 更松的论坛：投票帖、作品展示、开放问题 | 想聊天或找投票帖时点；没有这个标签就用 Issues |
| **Projects** | 顶部标签行（可能未启用） | 看任务看板、路线图 | 不紧急 |
| **Wiki** | 顶部标签行（可能未启用） | 看项目自己写的长文档 | 不紧急；先读 README |
| **Security** | 顶部标签行 | 看安全策略、漏洞报告入口 | 发现安全问题才点 |
| **Insights** | 顶部标签行 | 看访问量、贡献者、代码频率 | 不紧急 |
| **Settings** | 顶部标签行（通常只有维护者可见） | 改仓库设置、权限、删除仓库 | **不要点**。不是你的仓库就不要碰 |
| **About** | 文件列表右侧栏 | 看一句话介绍、网站、Topics、License、Star/Fork 数 | 要。先判断这个仓库能不能用 |
| **Releases** | About 下方 | 看打包版本和更新说明 | 不紧急；新手用 Code → Download ZIP 就够 |
| **Branch 选择器** | 文件列表左上 | 切换分支/版本线 | 不紧急。停在 `main` 最安全 |
| **Commits** | 文件列表上方，时钟图标 | 看这个仓库的修改历史 | 想查“这条规则什么时候改的”时点 |
| **Contributors** | About 下方或 Insights | 看谁参与过 | 不紧急 |
| **License** | About 下方 | 看能不能商用、能不能改 | 要用/要改之前点一下 |

## 按钮的颜色和状态

- **绿色 `Code`**：不是“运行代码”，只是打开克隆/下载菜单。
- **灰色按钮**：通常是次要操作；灰掉表示你没有权限或条件不满足。
- **红色叉 / 红色感叹号**：自动检查失败。看 Actions 日志里的第一条错误，不要盲目重跑。
- **黄色圆点**：检查还在跑，等它结束。
- **锁图标**：只读、私有、或需要权限。
- **Fork 箭头**：表示这个仓库是别人的副本；PR 通常从 fork 提到上游。

## 仓库里的内容

打开仓库首页，从上到下通常是：

1. **文件列表**：当前分支的文件和文件夹。
2. **README**：文件列表下方自动渲染的项目说明书。先读它。
3. **右侧 About**：项目简介、网站、Topics、License、Star/Fork。
4. **顶部标签行**：Code / Issues / Pull requests / Actions / Discussions 等。
5. **底部**：License、Contributors、Languages、Star 历史。

点一个文件会进入代码视图；Markdown 文件（`.md`）默认渲染成可读页面，右上角有 **Raw** 看源码，**Blame** 看每一行是谁改的。

## 这个仓库的目录地图

| 路径 | 是什么 | 你在这里做什么 |
|---|---|---|
| `SKILL.md` | 技能的路由器：AI 先读它，再按任务加载知识 | 想知道技能怎么决定用哪套知识，读这个 |
| `knowledge/` | 设计手册：核心原则、9 个领域、18 个风格、3 个案例 | 找具体做法；每个文件开头写着“什么时候加载” |
| `learnings/` | 实战笔记：每次任务后记下的“什么管用、什么踩坑” | 看别人真实用出来的经验，也可以投一条 |
| `evals/` | 自测题与评分表 | 想知道“凭什么说这条规则好”，看这里 |
| `examples/` | 真实产出：海报、网页、图标、社交图，带模型署名 | 找灵感，或看这套流程实际能做成什么样 |
| `scripts/` | 零依赖 Node 脚本：构建站点、校验知识、跑盲测 | 想改网站或加检查，从这里开始 |
| `docs/` | 新人指南、GitHub 导览、投稿指南、推广素材 | 第一次来，先读 `start-here` 和 `github-tour` |
| `dsh/` | DeepSeek Harness 插件：自包含 bundle、索引、同步脚本 | DSH 用户安装；改插件读它的 README |
| `start/` | 独立新手站的源码：内容、布局、CSS、JS、构建脚本 | 想改新手站，从这里开始；不要手改 `site/` |
| `community/` | 社区作品与票数数据：featured、submissions、votes、themes | 投稿合并后，JSON 会出现在 `submissions/` |
| `.github/` | Issue 模板、PR 模板、Actions 工作流 | 改投稿表单或同步任务，在这里改 |
| `site/` | **自动生成**的站点输出，不手改，也在 `.gitignore` 里 | 看构建结果；不要直接编辑 |

## 第一次来，按这个顺序点

1. 读 **README** 和 **About**：确认这是什么、License 能不能用。
2. 点 **Star**：收藏，之后能在自己的 Stars 里找到。
3. 点 **Code → Download ZIP**：不装 git 也能拿到全部文件。
4. 点 **Issues**：看别人的问题；想投稿就选“作品投稿”模板。
5. 想投票时，打开作品 issue，点正文里的 **👍**。

## 权限：哪些按钮不要碰

- **Settings**：改仓库设置、权限、删除仓库。不是维护者不要点。
- **Merge pull request**：只有维护者或有写权限的人该点；不要替别人合并。
- **Close issue**：关闭别人的 issue 前先说明原因；不要静默关闭。
- **Delete branch**：删掉别人的分支可能丢工作；不确定就不要点。
- **Force push**：会覆盖远端历史；本项目明确禁止。
- **Approve and run workflows**：来自 fork 的 PR 可能需要维护者批准才跑 CI；不要替维护者点。

## 术语小词典

| 词 | 人话 |
|---|---|
| repo | 项目的家：文件 + 历史 + 讨论 |
| branch | 一条版本线；`main` 是主线 |
| commit | 一次带说明的存档 |
| issue | 带编号的问题或投稿，可以回复和贴图 |
| PR | “我改好了，请合并”的请求 |
| reaction | issue/PR 上的表情回应；👍 在本项目算一票 |
| label | 给 issue 分类的小标签 |
| Actions | GitHub 的自动检查/部署机器人 |
| fork | 把别人的仓库复制到你的账号下 |
| clone | 把仓库下载到本地，带 git 历史 |

## 遇到问题去哪

- **“这个按钮能不能点？”** → 先看本页对应的“新手要不要点”一列。
- **“安装/使用问题”** → [零代码新手指南](start-here.zh-CN.md)。
- **“想投稿/投票”** → [投稿指南](community-submit.zh-CN.md)。
- **“页面/规则有错”** → 开一个 `knowledge_bug` issue，附上文件路径和截图。
- **“想讨论一个开放问题”** → Discussions（如果可用），否则开 issue。

## 相关入口

- 独立新手站：[/start/](https://iifzx.github.io/design-garden/start/)
- 知识库站点：[iifzx.github.io/design-garden](https://iifzx.github.io/design-garden/)
- 仓库：[github.com/iifzx/design-garden](https://github.com/iifzx/design-garden)
- 新手指南：[docs/start-here.zh-CN.md](start-here.zh-CN.md)
- 投稿指南：[docs/community-submit.zh-CN.md](community-submit.zh-CN.md)
