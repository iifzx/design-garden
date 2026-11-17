export const content = {
  lang: "zh",
  htmlLang: "zh-CN",
  title: "设计花园 · 新手站",
  description:
    "给第一次用 GitHub 和 AI agent 的人：下载 design-garden 技能包或 DSH 插件，认全仓库按钮，提交作品，参与投票。",
  switchLabel: "English",
  switchHref: "en/",
  repo: "https://github.com/iifzx/design-garden",
  skip: "跳到正文",
  menu: "目录",
  nav: [
    { href: "#use", label: "装上" },
    { href: "#tour", label: "按钮" },
    { href: "#map", label: "地图" },
    { href: "#gallery", label: "作品" },
    { href: "#contribute", label: "投稿" },
    { href: "#vote", label: "投票" },
    { href: "#toys", label: "小工具" },
  ],

  hero: {
    kicker: "DESIGN GARDEN · FIELD GUIDE",
    title: ["先看懂，", "再种下你的", "第一朵花。"],
    accent: "第一朵花。",
    dek:
      "这是一个会生长的设计技能，也是一个愿意听你说「哪里不对劲」的社区。你不需要懂代码，只需要知道现在该点哪个按钮。",
    primary: { label: "下载技能包", href: "#use" },
    secondary: { label: "先逛 GitHub 按钮", href: "#tour" },
    packet: {
      top: "SEED PACKET / 2026",
      label: "design-garden",
      sub: "一本会生长的设计手册",
      stats: [
        { key: "domains", suffix: "个设计领域" },
        { key: "styles", suffix: "个风格配方" },
        { key: "core", suffix: "个核心模块" },
      ],
      seal: "OPEN SOURCE",
      foot: "plant · use · learn · share",
    },
    margin: "不需要先成为设计师。",
  },

  paths: [
    {
      no: "01",
      title: "我想用",
      text: "下载、安装、复制第一句提示词。装不上也没关系，不装也能看。",
      cta: "去装上",
      href: "#use",
    },
    {
      no: "02",
      title: "我想逛",
      text: "Star、Fork、Issues、Actions——一次认全，不再怕点错。",
      cta: "看按钮导览",
      href: "#tour",
    },
    {
      no: "03",
      title: "我想帮",
      text: "投一张作品、点一个 👍、写一句「哪里不对劲」，都算数。",
      cta: "去帮忙",
      href: "#contribute",
    },
  ],

  use: {
    title: "装上",
    lead:
      "三条路，选一条。技能包适合大多数 agent；DSH 插件给 DeepSeek Harness 用户；不想装就直接跳到作品馆。",
    packets: [
      {
        tag: "推荐 · 任何 agent",
        title: "下载技能包",
        body:
          "一个 ZIP，解开就是一个完整的 design-garden。适合 ZCode、Claude Code，以及认 SKILL.md 的 agent。",
        action: {
          type: "download",
          label: "下载 design-garden-skill.zip",
          href: "downloads/design-garden-skill.zip",
          note: "约 200 KB · 解压后放到 ~/.agents/skills/",
        },
        micro: "解压后的目录里应该直接看到 SKILL.md。",
      },
      {
        tag: "一行命令",
        title: "从 GitHub 装",
        body: "已经会用终端？这一行就够了。以后 git pull 就能更新。",
        action: {
          type: "code",
          code:
            "git clone https://github.com/iifzx/design-garden.git ~/.agents/skills/design-garden",
          note: "Windows PowerShell 同样可用；~ 是你的用户目录。",
        },
        link: {
          label: "看零代码安装指南",
          href: "https://github.com/iifzx/design-garden/blob/main/docs/start-here.zh-CN.md",
        },
      },
      {
        tag: "DeepSeek Harness",
        title: "装 DSH 插件",
        body:
          "插件自带技能包和索引。装完在 DSH 里就能直接调用 design-garden，不用再手动放技能目录。",
        action: {
          type: "code",
          code:
            'dsh plugin --profile web add "git+https://github.com/iifzx/design-garden.git#af66da5a4c6633a9393b0615ceff2532f387db20&path:/dsh"',
          note: "固定 commit，避免上游改动把插件装坏。",
        },
        link: {
          label: "DSH 插件说明",
          href: "https://github.com/iifzx/design-garden/blob/main/dsh/README.zh-CN.md",
        },
        alt: {
          label: "下载插件源码 ZIP",
          href: "downloads/dsh-design-garden.zip",
        },
      },
    ],
    more: {
      summary: "其他 agent 的装法",
      rows: [
        {
          label: "Claude Code",
          code: "/plugin marketplace add iifzx/design-garden",
        },
        {
          label: "ZCode（项目内）",
          code:
            "git clone https://github.com/iifzx/design-garden.git <你的项目>/.zcode/skills/design-garden",
        },
      ],
    },
    prompts: {
      title: "装完先试这一句",
      items: [
        {
          label: "做一张海报",
          text:
            "用 design-garden 帮我给小区流浪猫领养日做一张海报，A3，贴在电梯里，要让人愿意停下来看。",
        },
        {
          label: "改一版现有的",
          text:
            "这张图我觉得太花了。用 design-garden 看看问题在哪，给我两个改法，一个保守一个大胆。",
        },
        {
          label: "说清一个风格",
          text:
            "我想要「像植物图鉴」的感觉：米白纸、细线、手写标注，不要科技感。",
        },
      ],
      copyLabel: "复制这句话",
      copiedLabel: "已复制",
      note: "第一次没触发？在句子里加上「用 design-garden」。",
    },
    noInstall: {
      title: "不想装也能用",
      body: "直接逛知识库、看作品、投票、投稿。安装只是让你自己的 agent 也能调用它。",
      links: [
        {
          label: "逛知识库",
          href: "https://iifzx.github.io/design-garden/",
        },
        {
          label: "看真实作品",
          href: "#gallery",
        },
        {
          label: "去投稿",
          href: "#contribute",
        },
      ],
    },
  },

  tour: {
    title: "GitHub 按钮导览",
    lead:
      "GitHub 不是考试。它只是把「看、问、改、投票」放在几个固定位置。下面每个按钮都告诉你：在哪、干什么、新手要不要点。",
    filters: [
      { id: "all", label: "全部" },
      { id: "must", label: "先点这个" },
      { id: "contribute", label: "想贡献" },
      { id: "later", label: "不用急" },
      { id: "maintainer", label: "维护者" },
    ],
    needLabels: {
      must: "先点这个",
      contribute: "想贡献再点",
      later: "不用急着点",
      maintainer: "维护者专用",
    },
    items: [
      {
        id: "star",
        glyph: "star",
        name: "Star",
        cn: "收藏",
        where: "仓库右上角，Star 数字旁边",
        does:
          "收藏这个仓库，也给项目一个公开信号。Star 数是别人判断「值不值得看」的第一眼。",
        advice: "先点这个。不登录也能点，但登录后才会记住。",
        need: "must",
        specimen: "Star",
      },
      {
        id: "code",
        glyph: "code",
        name: "Code",
        cn: "下载 / 克隆",
        where: "文件列表右上角的绿色按钮",
        does:
          "把整个仓库打包成 ZIP，或复制 git clone 地址。不想装 git 就选 Download ZIP。",
        advice: "想安装技能，点它。绿色按钮不是「运行代码」，只是「拿到代码」。",
        need: "must",
        specimen: "Code ▾",
      },
      {
        id: "issues",
        glyph: "issue",
        name: "Issues",
        cn: "问题与投稿",
        where: "仓库顶部标签栏",
        does:
          "提问、报告知识错误、提交作品都从这里进。每个模板会给你填好的骨架。",
        advice: "新手最常用。先选模板，再填标题；不用写代码。",
        need: "must",
        specimen: "Issues",
      },
      {
        id: "new-issue",
        glyph: "plus",
        name: "New issue",
        cn: "新建",
        where: "Issues 页面右上角",
        does:
          "打开一个投稿或提问表单。标题写清楚，正文按模板填；图片可以直接拖进编辑框。",
        advice: "想投稿就点它。图片拖进去后，GitHub 会自动生成链接。",
        need: "contribute",
        specimen: "New issue",
      },
      {
        id: "readme",
        glyph: "book",
        name: "README",
        cn: "项目首页",
        where: "文件列表下面，自动渲染",
        does:
          "项目自己写的说明书：它是什么、怎么装、怎么用。比读文件树快得多。",
        advice: "先读 README，再决定要不要装。",
        need: "must",
        specimen: "README.md",
      },
      {
        id: "fork",
        glyph: "fork",
        name: "Fork",
        cn: "复制一份",
        where: "右上角，Star 旁边",
        does:
          "把仓库复制到你的账号下。你改的是自己那份，不会直接影响原项目。",
        advice: "只有想改文件、提 PR 时才需要。只是用技能，不用 Fork。",
        need: "contribute",
        specimen: "Fork",
      },
      {
        id: "pr",
        glyph: "pr",
        name: "Pull requests",
        cn: "合并请求",
        where: "仓库顶部标签栏",
        does:
          "别人改完文件后，请求把改动合进主线。你能在这里看到每一处改动和讨论。",
        advice: "想贡献内容就看它；只使用技能不用管。",
        need: "contribute",
        specimen: "Pull requests",
      },
      {
        id: "discussions",
        glyph: "chat",
        name: "Discussions",
        cn: "讨论区",
        where: "仓库顶部标签栏（可能被维护者关闭）",
        does:
          "比 Issue 更轻松的聊天区。投票贴、作品展示、问答常在这里。",
        advice: "想找人聊、想看投票贴，来这。没有这个标签就用 Issues。",
        need: "contribute",
        specimen: "Discussions",
      },
      {
        id: "actions",
        glyph: "play",
        name: "Actions",
        cn: "自动任务",
        where: "仓库顶部标签栏",
        does:
          "每次提交后自动跑校验、部署、同步票数。红色叉是检查没过，不是你的错。",
        advice: "不用急着点。想看网站是怎么自动更新的，再进来。",
        need: "later",
        specimen: "Actions",
      },
      {
        id: "watch",
        glyph: "eye",
        name: "Watch",
        cn: "订阅",
        where: "右上角，Star 旁边",
        does:
          "有新 Issue、PR 或 Release 时通知你。可以只接收参与的通知。",
        advice: "不用急着点。不想被邮件打扰就别开。",
        need: "later",
        specimen: "Watch",
      },
      {
        id: "about",
        glyph: "info",
        name: "About",
        cn: "右侧简介",
        where: "文件列表右侧",
        does:
          "项目一句话、官网、主题、许可证、Star/Fork 数。判断一个仓库靠不靠谱，先看这里。",
        advice: "先点这个。看许可证和官网，比看 Star 数更能判断能不能用。",
        need: "must",
        specimen: "About",
      },
      {
        id: "releases",
        glyph: "tag",
        name: "Releases",
        cn: "版本",
        where: "右侧简介下方",
        does:
          "打包好的版本和更新说明。有些项目只在这里提供下载。",
        advice: "不用急着点。新手用 Code → Download ZIP 通常就够。",
        need: "later",
        specimen: "Releases",
      },
      {
        id: "branch",
        glyph: "branch",
        name: "Branch",
        cn: "分支",
        where: "文件列表左上方",
        does:
          "切换当前查看的版本。main 是主线，其他分支可能是实验或某个 PR。",
        advice: "不用急着点。除非有人让你看某个分支，否则留在 main。",
        need: "later",
        specimen: "main ▾",
      },
      {
        id: "history",
        glyph: "clock",
        name: "History",
        cn: "历史",
        where: "打开某个文件后，右上角",
        does:
          "谁、什么时候、为什么改了这个文件。可以看旧版本和具体改动。",
        advice: "好奇或查旧版本时再点。读知识库时很好用。",
        need: "later",
        specimen: "History",
      },
      {
        id: "settings",
        glyph: "gear",
        name: "Settings",
        cn: "设置",
        where: "仓库顶部标签栏最右",
        does:
          "权限、Webhooks、Pages 部署都在这里。没有维护者权限就看不到。",
        advice: "维护者专用。你找不到这个标签，说明你不需要它。",
        need: "maintainer",
        specimen: "Settings",
      },
    ],
    summary: {
      title: "只记三个就够",
      body:
        "Star 收藏，Issues 提问和投稿，Code 下载。其余按钮等你真的需要时再认，不会影响你用好这个项目。",
      chips: ["Star", "Issues", "Code"],
    },
    footerNote:
      "界面位置会随 GitHub 改版轻微变化；认名字比记位置可靠。",
  },

  map: {
    title: "仓库地图",
    lead:
      "这个仓库不只是代码。它是一本手册、一间作品馆、一套自动检查，和一个给新手的入口。按下面的顺序逛，不会迷路。",
    first: {
      title: "第一次来，只看这三处",
      links: [
        { label: "SKILL.md", href: "https://github.com/iifzx/design-garden/blob/main/SKILL.md" },
        {
          label: "docs/start-here.zh-CN.md",
          href: "https://github.com/iifzx/design-garden/blob/main/docs/start-here.zh-CN.md",
        },
        { label: "examples/", href: "https://github.com/iifzx/design-garden/tree/main/examples" },
      ],
    },
    columns: ["路径", "是什么", "你能在这里做什么"],
    items: [
      {
        path: "SKILL.md",
        href: "https://github.com/iifzx/design-garden/blob/main/SKILL.md",
        what: "技能的路由器：AI 先读它，再按任务加载对应的知识。",
        action: "想知道它怎么决定用哪套知识，读这个。",
      },
      {
        path: "knowledge/",
        href: "https://github.com/iifzx/design-garden/tree/main/knowledge",
        what: "设计手册：核心原则、9 个领域、18 个风格、3 个案例。",
        action: "找具体做法；每个文件开头都写着「什么时候加载」。",
        count: "{knowledge} 个知识文件",
      },
      {
        path: "learnings/",
        href: "https://github.com/iifzx/design-garden/tree/main/learnings",
        what: "实战笔记：每次任务后记下的「什么管用、什么踩坑」。",
        action: "看别人真实用出来的经验，也可以投一条。",
        count: "{learnings} 条经验",
      },
      {
        path: "evals/",
        href: "https://github.com/iifzx/design-garden/tree/main/evals",
        what: "盲测题与评分表：新知识要赢过旧版，才能从 experimental 升到 proven。",
        action: "想知道「凭什么说这条规则好」，看这里。",
      },
      {
        path: "examples/",
        href: "https://github.com/iifzx/design-garden/tree/main/examples",
        what: "真实产出：海报、网页、图标、社交图，每件都带模型署名。",
        action: "找灵感，或看这套流程实际能做成什么样。",
      },
      {
        path: "scripts/",
        href: "https://github.com/iifzx/design-garden/tree/main/scripts",
        what: "零依赖 Node 脚本：构建站点、校验知识、跑盲测。",
        action: "想改网站或加检查，从这里开始。",
      },
      {
        path: "docs/",
        href: "https://github.com/iifzx/design-garden/tree/main/docs",
        what: "新人指南、GitHub 导览、推广素材。",
        action: "第一次来，先读 start-here 和 github-tour。",
      },
      {
        path: "dsh/",
        href: "https://github.com/iifzx/design-garden/tree/main/dsh",
        what: "DeepSeek Harness 插件：自包含 bundle、索引、同步脚本。",
        action: "DSH 用户装它；想改插件看 README。",
      },
      {
        path: "start/",
        href: "https://github.com/iifzx/design-garden/tree/main/start",
        what: "你正在看的独立新手站（源码）。",
        action: "改文案、样式、数据渲染都在这里。",
      },
      {
        path: "community/",
        href: "https://github.com/iifzx/design-garden/tree/main/community",
        what: "社区作品与投票数据：featured、submissions、votes、themes。",
        action: "投稿被合并后，JSON 会出现在 submissions/。",
      },
      {
        path: ".github/",
        href: "https://github.com/iifzx/design-garden/tree/main/.github",
        what: "Issue 模板、PR 模板、Actions 工作流。",
        action: "想改投稿表单或自动同步，来这。",
      },
      {
        path: "site/",
        what: "自动生成的站点，不手改（也在 .gitignore 里）。",
        action: "由 scripts/build_site.mjs 和 build_start_site.mjs 生成。",
      },
    ],
    note: "路径后面的数字来自仓库当前文件，构建时自动统计；不是营销数字。",
  },

  gallery: {
    title: "作品馆",
    lead:
      "先看真的做出来是什么样，再决定要不要投一张。馆藏是项目自己跑出来的；社区区等你开第一朵。",
    filterLabel: "按类型筛",
    allLabel: "全部",
    featuredLabel: "馆藏",
    communityLabel: "社区",
    featuredNote: "馆藏为项目真实产出，不参与社区评选。",
    communityNote: "社区作品按投稿时间排序；票数来自 GitHub 👍，定时同步。",
    emptyTitle: "第一朵花还没开",
    emptyBody:
      "这里会放通过审核的社区作品。你可以是第一个：一张图、三句话，不用写代码。",
    emptyCta: "提交第一张作品",
    submitLabel: "提交你的作品",
    voteLabel: "去投票",
    votesLabel: "票",
    creditLabel: "模型",
    sourceLabel: "看源文件",
    noVotes: "还没有票",
    typeAll: "全部",
    showing: "正在显示",
  },

  contribute: {
    title: "投稿",
    lead:
      "投稿不是考试。我们只看三件事：是不是你的、图片能不能看清、说明有没有信息。不按「专业不专业」打分。",
    steps: [
      {
        no: "01",
        title: "选一张真的作品",
        body: "海报、图标、Logo、网页、幻灯片、插画都行。一张就够，不要九宫格。",
      },
      {
        no: "02",
        title: "打开投稿表",
        body: "GitHub 账号是身份；没有账号可以先看。模板会把要填的都列好。",
      },
      {
        no: "03",
        title: "把图片拖进正文",
        body:
          "在 issue 编辑框里直接拖入 PNG/JPG/WebP；GitHub 会自动生成链接。三句话：背景、一个设计决定、一个没解决的问题。",
      },
      {
        no: "04",
        title: "等审核上线",
        body:
          "维护者会在 PR 里看图和文字；通过后进入作品馆，并自动参加本月评选。通常 24–72 小时。",
      },
    ],
    cta: {
      label: "打开作品投稿表",
      href: "https://github.com/iifzx/design-garden/issues/new?template=community_work.md&title=%5B%E4%BD%9C%E5%93%81%5D+",
    },
    secondary: [
      {
        label: "看投稿指南",
        href: "https://github.com/iifzx/design-garden/blob/main/docs/community-submit.zh-CN.md",
      },
      {
        label: "看已有社区作品",
        href: "#gallery",
      },
    ],
    checklistTitle: "投稿前 60 秒自检",
    checklist: [
      "图片是 PNG/JPG/WebP，单张 ≤5 MB，最短边 ≥800px",
      "主体完整，没有被裁掉；背景不是纯白截图",
      "说明写了背景、一个取舍、一个没解决的问题",
      "没有客户隐私、未公开的品牌名、他人作品",
      "用了 AI 生成的部分，已经在说明里写明",
      "同意以 CC BY 4.0 在作品馆展示并署名",
    ],
    notTitle: "这些别投",
    notItems: [
      "别人的作品，或客户还没公开的稿子",
      "纯 AI 拼贴、没有一句说明",
      "只有「好看吗」、没有背景的图",
      "二维码、联系方式为主的广告图",
      "SVG 文件（为安全，第一期只收位图）",
    ],
    licenseTitle: "授权与署名",
    licenseBody:
      "你保留作品版权；投稿即同意以 CC BY 4.0 在作品馆展示并署名。不想公开的客户作品不要投。",
    reviewNote: "审核只看上面三件事。被拒时会告诉你缺什么，不会只说「不合适」。",
    quickTitle: "不想投稿？还有四个 5 分钟动作",
    quick: [
      {
        label: "点 Star",
        body: "让更多人刷到这个项目",
        href: "https://github.com/iifzx/design-garden",
      },
      {
        label: "去投票",
        body: "给喜欢的作品点 👍",
        href: "#vote",
      },
      {
        label: "写小白报告",
        body: "3 个问题，说感受就行",
        href: "https://github.com/iifzx/design-garden/issues/new?template=beginner_bloom.yml",
      },
      {
        label: "提真实需求",
        body: "「我需要一张寻猫启事」",
        href: "https://github.com/iifzx/design-garden/discussions",
      },
    ],
  },

  vote: {
    title: "投票",
    lead:
      "投票不在这个网站里发生——它在 GitHub 的作品 issue 上发生。你点一个 👍，网站下次同步时会显示出来。",
    themeLabel: "本月主题",
    deadlineLabel: "截止",
    entriesTitle: "当前榜单",
    entriesEmpty:
      "本期还没有作品。第一张投进来，榜单就从你开始。",
    entryCta: "去 GitHub 点 👍",
    voteCount: "票",
    updatedLabel: "票数同步于",
    notSynced: "尚未同步",
    rulesTitle: "规则",
    blindTitle: "先盲选，再投票",
    blindBody:
      "不看作者，凭第一眼选一个。这里的选择只存在你的浏览器里，不计入正式票数；选完可以去 GitHub 投真票。",
    blindLeft: "左边更好",
    blindRight: "右边更好",
    blindSkip: "换一组",
    blindResult: "你选了{side}。正式票请去作品 issue 点 👍。",
    blindNote: "盲选使用馆藏作品，仅作练习，不代表评选。",
    emptyCta: "去投第一张",
  },

  toys: {
    title: "设计小工具",
    lead: "三个 30 秒的小工具：转一个风格、过一遍评审清单、把需求说成人话。",
    roulette: {
      title: "风格轮盘",
      body: "不知道要什么感觉？先转一个风格，再让 agent 按它做。",
      button: "转一个风格",
      resultPrefix: "今天就试：",
      linkLabel: "看这个风格的配方",
      note: "18 个配方都在 knowledge/styles/；转到不喜欢的就再转。",
      empty: "按一下，看看今天轮到什么。",
    },
    checklist: {
      title: "交付前评审清单",
      body: "十项，30 秒。勾完再交付。",
      items: [
        "眯眼或缩到 25%：还能看出一个主角吗？",
        "标题和正文至少差 2.5 倍，不是只差 4px。",
        "正文 ≥16px；中文行宽不超过 34 个字。",
        "正文对比度 ≥4.5:1；按钮和图标 ≥3:1。",
        "每个按钮 ≥44px，手指点得到。",
        "键盘 Tab 能看到清晰的焦点环。",
        "没有「边框 + 阴影」同时上的卡片。",
        "组内间距比组间小；段落之间能看出层次。",
        "动效 ≤300ms，只动 transform 和 opacity。",
        "空状态有一句话告诉用户下一步做什么。",
      ],
      copyLabel: "复制清单",
      copiedLabel: "已复制",
    },
    glossary: {
      title: "六个词，够了",
      items: [
        { term: "agent / AI 助手", def: "运行在你电脑上、能帮你干活的 AI 程序。" },
        { term: "skill / 技能包", def: "给 agent 装的一本专业手册；design-garden 是设计手册。" },
        { term: "repo / 仓库", def: "项目在 GitHub 上的家，文件、历史、讨论都在里面。" },
        { term: "issue", def: "一条可追踪的提问或投稿；有编号，能被回复和关闭。" },
        { term: "PR / 合并请求", def: "「我改好了，请合并」的请求；审核在这里发生。" },
        { term: "reaction / 👍", def: "GitHub 上的表情回应；本项目用 👍 当投票。" },
      ],
    },
    recipe: {
      title: "把需求说成人话",
      body: "三个空，拼一句 agent 能听懂的话。",
      fields: [
        { id: "what", label: "做什么", placeholder: "一张社区领养日海报" },
        { id: "where", label: "给谁 / 用在哪", placeholder: "贴在小区电梯里，A3" },
        { id: "feel", label: "想要的感觉", placeholder: "像植物图鉴：米白、细线、手写标注" },
      ],
      template: "用 design-garden 帮我做{what}，{where}。想要{feel}。",
      button: "复制这句话",
      copied: "已复制",
      note: "空着也没关系，会用灰色示例补上。",
    },
  },

  footer: {
    tagline: "设计花园 · 新手站",
    note:
      "这是新增的独立新手站，不替代知识库。知识内容仍以英文维护；中文指南在 docs/。",
    columns: [
      {
        title: "先用",
        links: [
          { label: "下载技能包", href: "#use" },
          { label: "装 DSH 插件", href: "#use" },
          { label: "GitHub 按钮", href: "#tour" },
        ],
      },
      {
        title: "再看",
        links: [
          { label: "仓库地图", href: "#map" },
          { label: "作品馆", href: "#gallery" },
          { label: "投稿指南", href: "https://github.com/iifzx/design-garden/blob/main/docs/community-submit.zh-CN.md" },
        ],
      },
      {
        title: "去仓库",
        links: [
          { label: "GitHub 仓库", href: "https://github.com/iifzx/design-garden" },
          { label: "知识库站点", href: "https://iifzx.github.io/design-garden/" },
          { label: "新手指南", href: "https://github.com/iifzx/design-garden/blob/main/docs/start-here.zh-CN.md" },
        ],
      },
    ],
    license: "代码与文档 MIT（见 LICENSE）；社区作品由作者保留版权，以 CC BY 4.0 展示。",
    made: "网站由 design-garden 设计；作品与票数来自仓库 JSON，构建时同步。",
    backTop: "回到顶部",
  },

  ui: {
    copy: "复制",
    copied: "已复制",
    copyFailed: "复制失败，请手动选中",
    filterAll: "全部",
    noMatch: "没有匹配的条目，换个筛选试试。",
    open: "展开",
    close: "收起",
    external: "在新标签打开",
    langSwitch: "切换语言",
    menu: "打开目录",
  },
};
