export const content = {
  lang: "en",
  htmlLang: "en",
  title: "Design Garden · Start",
  description:
    "For first-time GitHub and AI-agent users: download the design-garden skill or DSH plugin, learn the repo buttons, submit a work, and vote.",
  switchLabel: "简体中文",
  switchHref: "../",
  repo: "https://github.com/iifzx/design-garden",
  skip: "Skip to content",
  menu: "Contents",
  nav: [
    { href: "#use", label: "Install" },
    { href: "#tour", label: "Buttons" },
    { href: "#map", label: "Map" },
    { href: "#gallery", label: "Works" },
    { href: "#contribute", label: "Submit" },
    { href: "#vote", label: "Vote" },
    { href: "#toys", label: "Tools" },
  ],

  hero: {
    kicker: "DESIGN GARDEN · FIELD GUIDE",
    title: ["Look around first.", "Then plant", "your first flower."],
    accent: "your first flower.",
    dek:
      "A design skill that grows, and a community that listens when you say “something feels off”. You do not need code. You only need to know which button to press now.",
    primary: { label: "Download the skill", href: "#use" },
    secondary: { label: "Tour the GitHub buttons", href: "#tour" },
    packet: {
      top: "SEED PACKET / 2026",
      label: "design-garden",
      sub: "a design manual that grows",
      stats: [
        { key: "domains", suffix: "design domains" },
        { key: "styles", suffix: "style recipes" },
        { key: "core", suffix: "core modules" },
      ],
      seal: "OPEN SOURCE",
      foot: "plant · use · learn · share",
    },
    margin: "You do not have to be a designer first.",
  },

  paths: [
    {
      no: "01",
      title: "I want to use it",
      text: "Download, install, copy the first prompt. If installation fails, you can still look around.",
      cta: "Go to install",
      href: "#use",
    },
    {
      no: "02",
      title: "I want to look around",
      text: "Star, Fork, Issues, Actions — learn them once, stop fearing the wrong click.",
      cta: "Open the button tour",
      href: "#tour",
    },
    {
      no: "03",
      title: "I want to help",
      text: "Submit one work, tap one 👍, or write one sentence about what felt off.",
      cta: "Go to contribute",
      href: "#contribute",
    },
  ],

  use: {
    title: "Install",
    lead:
      "Three paths. The skill ZIP works with most agents; the DSH plugin is for DeepSeek Harness; if you do not want to install anything, jump to the gallery.",
    packets: [
      {
        tag: "Recommended · any agent",
        title: "Download the skill",
        body:
          "One ZIP, one complete design-garden. Works with ZCode, Claude Code, and any agent that reads SKILL.md.",
        action: {
          type: "download",
          label: "Download design-garden-skill.zip",
          href: "downloads/design-garden-skill.zip",
          note: "About 200 KB · unzip into ~/.agents/skills/",
        },
        micro: "The unzipped folder should contain SKILL.md at its root.",
      },
      {
        tag: "One command",
        title: "Install from GitHub",
        body: "Already use a terminal? This line is enough. Update later with git pull.",
        action: {
          type: "code",
          code:
            "git clone https://github.com/iifzx/design-garden.git ~/.agents/skills/design-garden",
          note: "Works in Windows PowerShell too; ~ is your home directory.",
        },
        link: {
          label: "Read the zero-code install guide",
          href: "https://github.com/iifzx/design-garden/blob/main/docs/start-here.md",
        },
      },
      {
        tag: "DeepSeek Harness",
        title: "Install the DSH plugin",
        body:
          "The plugin carries the skill and an index. Once installed, DSH can call design-garden directly — no manual skills folder.",
        action: {
          type: "code",
          code:
            'dsh plugin --profile web add "git+https://github.com/iifzx/design-garden.git#af66da5a4c6633a9393b0615ceff2532f387db20&path:/dsh"',
          note: "Pinned to a commit, so upstream changes cannot break the install.",
        },
        link: {
          label: "Read the DSH plugin notes",
          href: "https://github.com/iifzx/design-garden/blob/main/dsh/README.md",
        },
        alt: {
          label: "Download the plugin source ZIP",
          href: "downloads/dsh-design-garden.zip",
        },
      },
    ],
    more: {
      summary: "Other agent installs",
      rows: [
        {
          label: "Claude Code",
          code: "/plugin marketplace add iifzx/design-garden",
        },
        {
          label: "ZCode (inside a project)",
          code:
            "git clone https://github.com/iifzx/design-garden.git <your-project>/.zcode/skills/design-garden",
        },
      ],
    },
    prompts: {
      title: "Try one sentence after installing",
      items: [
        {
          label: "Make a poster",
          text:
            "Use design-garden to make a poster for our neighborhood stray-cat adoption day. A3, for the elevator, something people will stop for.",
        },
        {
          label: "Fix an existing piece",
          text:
            "This image feels too busy. Use design-garden to find what is wrong and give me two fixes: one safe, one bold.",
        },
        {
          label: "Name a style",
          text:
            "I want it to feel like a botanical field guide: chalk paper, thin rules, handwritten labels — not techy.",
        },
      ],
      copyLabel: "Copy this sentence",
      copiedLabel: "Copied",
      note: "If it does not trigger at first, add “use design-garden” to the sentence.",
    },
    noInstall: {
      title: "Use it without installing",
      body:
        "Browse the knowledge base, view works, vote, and submit. Installation only lets your own agent call the skill.",
      links: [
        { label: "Browse the knowledge base", href: "https://iifzx.github.io/design-garden/" },
        { label: "See real works", href: "#gallery" },
        { label: "Submit a work", href: "#contribute" },
      ],
    },
  },

  tour: {
    title: "GitHub button tour",
    lead:
      "GitHub is not an exam. It puts “look, ask, change, vote” in a few fixed places. Every button below tells you where it is, what it does, and whether a beginner needs it.",
    filters: [
      { id: "all", label: "All" },
      { id: "must", label: "Start here" },
      { id: "contribute", label: "To contribute" },
      { id: "later", label: "Not urgent" },
      { id: "maintainer", label: "Maintainers" },
    ],
    needLabels: {
      must: "Start here",
      contribute: "Only to contribute",
      later: "Not urgent",
      maintainer: "Maintainers only",
    },
    items: [
      {
        id: "star",
        glyph: "star",
        name: "Star",
        cn: "Save",
        where: "Top right of the repository, next to the Star count",
        does:
          "Saves the repo and gives the project a public signal. The Star count is the first thing visitors use to judge whether a project is worth reading.",
        advice: "Press this first. You can Star without signing in, but only a signed-in Star is remembered.",
        need: "must",
        specimen: "Star",
      },
      {
        id: "code",
        glyph: "code",
        name: "Code",
        cn: "Download / clone",
        where: "The green button above the file list",
        does:
          "Downloads the whole repo as a ZIP, or copies the git clone URL. No git? Choose Download ZIP.",
        advice: "Press it to install the skill. The green button does not “run code”; it only gives you the code.",
        need: "must",
        specimen: "Code ▾",
      },
      {
        id: "issues",
        glyph: "issue",
        name: "Issues",
        cn: "Questions and submissions",
        where: "The tab row at the top of the repository",
        does:
          "Ask a question, report a knowledge bug, or submit a work. Each template gives you the shape to fill.",
        advice: "The most useful tab for beginners. Pick a template, fill the title; no code.",
        need: "must",
        specimen: "Issues",
      },
      {
        id: "new-issue",
        glyph: "plus",
        name: "New issue",
        cn: "Create",
        where: "Top right of the Issues page",
        does:
          "Opens a submission or question form. Write a clear title and fill the template; you can drag images straight into the editor.",
        advice: "Press it to submit. GitHub turns the dropped image into a link for you.",
        need: "contribute",
        specimen: "New issue",
      },
      {
        id: "readme",
        glyph: "book",
        name: "README",
        cn: "Project home page",
        where: "Below the file list, rendered automatically",
        does:
          "The project's own manual: what it is, how to install, how to use. Much faster than reading the file tree.",
        advice: "Read the README before installing anything.",
        need: "must",
        specimen: "README.md",
      },
      {
        id: "fork",
        glyph: "fork",
        name: "Fork",
        cn: "Copy to your account",
        where: "Top right, next to Star",
        does:
          "Copies the repo to your account. Your edits happen in your copy and do not touch the original.",
        advice: "Only needed if you want to edit files and open a PR. Using the skill does not require a Fork.",
        need: "contribute",
        specimen: "Fork",
      },
      {
        id: "pr",
        glyph: "pr",
        name: "Pull requests",
        cn: "Merge requests",
        where: "The tab row at the top",
        does:
          "After someone edits files, they ask for the change to be merged into the main line. Every diff and discussion lives here.",
        advice: "Look here if you want to contribute content; ignore it if you only use the skill.",
        need: "contribute",
        specimen: "Pull requests",
      },
      {
        id: "discussions",
        glyph: "chat",
        name: "Discussions",
        cn: "Forum",
        where: "The tab row (maintainers can disable it)",
        does:
          "A looser space than Issues. Vote threads, work showcases, and open questions often live here.",
        advice: "Use it to talk or find vote threads. If the tab is missing, use Issues.",
        need: "contribute",
        specimen: "Discussions",
      },
      {
        id: "actions",
        glyph: "play",
        name: "Actions",
        cn: "Automation",
        where: "The tab row at the top",
        does:
          "Runs checks, deploys the site, and syncs votes after each push. A red cross means a check failed, not that you did something wrong.",
        advice: "Not urgent. Open it if you want to see how the site updates itself.",
        need: "later",
        specimen: "Actions",
      },
      {
        id: "watch",
        glyph: "eye",
        name: "Watch",
        cn: "Subscribe",
        where: "Top right, next to Star",
        does:
          "Notifies you about new Issues, PRs, or Releases. You can choose to receive only threads you participate in.",
        advice: "Not urgent. Skip it if you do not want the email.",
        need: "later",
        specimen: "Watch",
      },
      {
        id: "about",
        glyph: "info",
        name: "About",
        cn: "Sidebar",
        where: "The right side of the file list",
        does:
          "One-line description, website, topics, license, Stars and Forks. The fastest way to judge whether a repo is usable.",
        advice: "Press this first. License and website tell you more than the Star count.",
        need: "must",
        specimen: "About",
      },
      {
        id: "releases",
        glyph: "tag",
        name: "Releases",
        cn: "Versions",
        where: "Below the About sidebar",
        does:
          "Packaged versions and release notes. Some projects only offer downloads here.",
        advice: "Not urgent. For beginners, Code → Download ZIP usually works.",
        need: "later",
        specimen: "Releases",
      },
      {
        id: "branch",
        glyph: "branch",
        name: "Branch",
        cn: "Version line",
        where: "Above the file list, on the left",
        does:
          "Switches the version you are viewing. main is the main line; other branches may be experiments or a PR.",
        advice: "Not urgent. Stay on main unless someone asks you to inspect a branch.",
        need: "later",
        specimen: "main ▾",
      },
      {
        id: "history",
        glyph: "clock",
        name: "History",
        cn: "File history",
        where: "Top right after opening a file",
        does:
          "Shows who changed a file, when, and why. You can compare old versions and read the exact diff.",
        advice: "Open it when curious or looking for an older version. Useful when reading the knowledge base.",
        need: "later",
        specimen: "History",
      },
      {
        id: "settings",
        glyph: "gear",
        name: "Settings",
        cn: "Repository settings",
        where: "Far right of the tab row",
        does:
          "Permissions, webhooks, and Pages deployment. You cannot see it without maintainer access.",
        advice: "Maintainers only. If the tab is missing, you do not need it.",
        need: "maintainer",
        specimen: "Settings",
      },
    ],
    summary: {
      title: "Three buttons are enough",
      body:
        "Star saves, Issues asks and submits, Code downloads. Learn the rest only when you need them; not knowing them will not stop you from using the project.",
      chips: ["Star", "Issues", "Code"],
    },
    footerNote:
      "GitHub moves things slightly between redesigns; trust the name, not the exact position.",
  },

  map: {
    title: "Repository map",
    lead:
      "This repo is not only code. It is a manual, a gallery, a set of automated checks, and an entrance for beginners. Follow this order and you will not get lost.",
    first: {
      title: "First visit: only these three",
      links: [
        { label: "SKILL.md", href: "https://github.com/iifzx/design-garden/blob/main/SKILL.md" },
        {
          label: "docs/start-here.md",
          href: "https://github.com/iifzx/design-garden/blob/main/docs/start-here.md",
        },
        { label: "examples/", href: "https://github.com/iifzx/design-garden/tree/main/examples" },
      ],
    },
    columns: ["Path", "What it is", "What you can do here"],
    items: [
      {
        path: "SKILL.md",
        href: "https://github.com/iifzx/design-garden/blob/main/SKILL.md",
        what: "The skill's router: the agent reads it first, then loads knowledge for the task.",
        action: "Read it to see how the skill chooses which knowledge to load.",
      },
      {
        path: "knowledge/",
        href: "https://github.com/iifzx/design-garden/tree/main/knowledge",
        what: "The design manual: core principles, 9 domains, 18 styles, 3 case studies.",
        action: "Find a specific technique; every file opens with when to load it.",
        count: "{knowledge} knowledge files",
      },
      {
        path: "learnings/",
        href: "https://github.com/iifzx/design-garden/tree/main/learnings",
        what: "Field notes: what worked and what failed after real tasks.",
        action: "Read what real use taught, or contribute an entry.",
        count: "{learnings} notes",
      },
      {
        path: "evals/",
        href: "https://github.com/iifzx/design-garden/tree/main/evals",
        what:
          "Blind tasks and rubrics: new knowledge has to beat the old version to move from experimental to proven.",
        action: "Open it when you want the evidence behind a rule.",
      },
      {
        path: "examples/",
        href: "https://github.com/iifzx/design-garden/tree/main/examples",
        what: "Real outputs: posters, pages, icons, social images, each with model credit.",
        action: "Look for inspiration, or see what the workflow actually ships.",
      },
      {
        path: "scripts/",
        href: "https://github.com/iifzx/design-garden/tree/main/scripts",
        what: "Zero-dependency Node scripts: build the sites, validate knowledge, run blind tests.",
        action: "Start here to change the site or add a check.",
      },
      {
        path: "docs/",
        href: "https://github.com/iifzx/design-garden/tree/main/docs",
        what: "Beginner guides, the GitHub tour, and promo material.",
        action: "First visit: read start-here and github-tour.",
      },
      {
        path: "dsh/",
        href: "https://github.com/iifzx/design-garden/tree/main/dsh",
        what: "DeepSeek Harness plugin: a self-contained bundle, index, and sync scripts.",
        action: "DSH users install it; read its README to change it.",
      },
      {
        path: "start/",
        href: "https://github.com/iifzx/design-garden/tree/main/start",
        what: "The standalone beginner site you are reading (source).",
        action: "Copy, styles, and data rendering live here.",
      },
      {
        path: "community/",
        href: "https://github.com/iifzx/design-garden/tree/main/community",
        what: "Community works and vote data: featured, submissions, votes, themes.",
        action: "After a submission is merged, its JSON appears in submissions/.",
      },
      {
        path: ".github/",
        href: "https://github.com/iifzx/design-garden/tree/main/.github",
        what: "Issue templates, PR template, and Actions workflows.",
        action: "Change the submission form or the sync jobs here.",
      },
      {
        path: "site/",
        what: "Generated site output; do not edit by hand (also gitignored).",
        action: "Generated by scripts/build_site.mjs and build_start_site.mjs.",
      },
    ],
    note: "The numbers come from the repository at build time, not from a marketing deck.",
  },

  gallery: {
    title: "Works",
    lead:
      "See what the workflow actually makes before you decide to submit one. The exhibits are the project's own outputs; the community section is waiting for its first flower.",
    filterLabel: "Filter by type",
    allLabel: "All",
    featuredLabel: "Exhibit",
    communityLabel: "Community",
    featuredNote: "Exhibits are real project outputs and do not enter the community vote.",
    communityNote: "Community works are ordered by submission time; counts come from GitHub 👍 and sync on a schedule.",
    emptyTitle: "The first flower has not opened yet",
    emptyBody:
      "Approved community works will live here. You can be the first: one image, three sentences, no code.",
    emptyCta: "Submit the first work",
    submitLabel: "Submit your work",
    voteLabel: "Vote on GitHub",
    votesLabel: "votes",
    creditLabel: "Model",
    sourceLabel: "View source",
    noVotes: "No votes yet",
    typeAll: "All",
    showing: "Showing",
  },

  contribute: {
    title: "Submit",
    lead:
      "Submission is not an exam. We check three things: it is yours, the image is legible, and the note says something. We do not grade “professional polish”.",
    steps: [
      {
        no: "01",
        title: "Pick one real work",
        body: "A poster, icon, logo, page, slide, or illustration. One image is enough; no nine-grid dump.",
      },
      {
        no: "02",
        title: "Open the submission form",
        body: "A GitHub account is your identity; you can look around without one. The template lists what to fill.",
      },
      {
        no: "03",
        title: "Drag the image into the body",
        body:
          "Drop a PNG/JPG/WebP into the issue editor; GitHub creates the link. Three sentences: context, one design decision, one unsolved problem.",
      },
      {
        no: "04",
        title: "Wait for review",
        body:
          "A maintainer reads the image and the note in a PR. Once merged, it enters the gallery and the current vote. Usually 24–72 hours.",
      },
    ],
    cta: {
      label: "Open the work submission form",
      href: "https://github.com/iifzx/design-garden/issues/new?template=community_work.md&title=%5BWork%5D+",
    },
    secondary: [
      {
        label: "Read the submission guide",
        href: "https://github.com/iifzx/design-garden/blob/main/docs/community-submit.md",
      },
      { label: "See community works", href: "#gallery" },
    ],
    checklistTitle: "60-second self-check",
    checklist: [
      "PNG/JPG/WebP, ≤5 MB, shortest edge ≥800px",
      "The subject is complete, not cropped; the background is not a raw white screenshot",
      "The note gives context, one trade-off, and one unsolved problem",
      "No client secrets, unreleased brand names, or other people's work",
      "AI-generated parts are disclosed in the note",
      "You agree to display under CC BY 4.0 with credit",
    ],
    notTitle: "Do not submit",
    notItems: [
      "Someone else's work, or a client draft that is not public",
      "A pure AI collage with no explanation",
      "“Is this pretty?” with no context",
      "An ad built around a QR code or contact details",
      "SVG files (bitmap only in the first version, for safety)",
    ],
    licenseTitle: "License and credit",
    licenseBody:
      "You keep the copyright. Submission agrees to display under CC BY 4.0 with your name. Do not submit client work you cannot publish.",
    reviewNote: "Review checks only the three things above. A rejection names what is missing, not just “not suitable”.",
    quickTitle: "Not submitting? Four five-minute actions",
    quick: [
      {
        label: "Star the repo",
        body: "Help more people find it",
        href: "https://github.com/iifzx/design-garden",
      },
      { label: "Vote", body: "Tap 👍 on a work you like", href: "#vote" },
      {
        label: "Write a first-bloom report",
        body: "Three questions, plain words",
        href: "https://github.com/iifzx/design-garden/issues/new?template=beginner_bloom.yml",
      },
      {
        label: "Post a real need",
        body: "“I need a lost-cat flyer”",
        href: "https://github.com/iifzx/design-garden/discussions",
      },
    ],
  },

  vote: {
    title: "Vote",
    lead:
      "Voting does not happen on this site — it happens on the work's GitHub issue. You tap 👍; the site shows the count at the next sync.",
    themeLabel: "This month",
    deadlineLabel: "Deadline",
    entriesTitle: "Current board",
    entriesEmpty:
      "No works this month yet. The first submission starts the board.",
    entryCta: "Tap 👍 on GitHub",
    voteCount: "votes",
    updatedLabel: "Counts synced",
    notSynced: "Not synced yet",
    rulesTitle: "Rules",
    blindTitle: "Blind pick first, then vote",
    blindBody:
      "Ignore the author; choose on first look. This choice stays in your browser and does not count. After the reveal, go to GitHub for the real vote.",
    blindLeft: "Left is better",
    blindRight: "Right is better",
    blindSkip: "Try another pair",
    blindResult: "You chose {side}. The real vote is the 👍 on the work's issue.",
    blindNote: "The blind pick uses exhibit works; it is practice, not the official vote.",
    emptyCta: "Submit the first work",
  },

  toys: {
    title: "Design tools",
    lead: "Three 30-second tools: spin a style, run the delivery checklist, and turn a need into a sentence.",
    roulette: {
      title: "Style roulette",
      body: "Not sure what it should feel like? Spin a style, then ask the agent to work inside it.",
      button: "Spin a style",
      resultPrefix: "Try today:",
      linkLabel: "Open the style recipe",
      note: "All 18 recipes live in knowledge/styles/. Spin again if you dislike it.",
      empty: "Press once to see what today brings.",
    },
    checklist: {
      title: "Delivery checklist",
      body: "Ten items, 30 seconds. Tick them before shipping.",
      items: [
        "Squint or zoom to 25%: is there still one clear star?",
        "Heading and body differ by at least 2.5×, not 4px.",
        "Body ≥16px; CJK line length ≤34 characters.",
        "Body contrast ≥4.5:1; buttons and icons ≥3:1.",
        "Every button ≥44px; a finger can hit it.",
        "Keyboard Tab shows a clear focus ring.",
        "No card carries both a border and a shadow.",
        "Within-group spacing is smaller than between-group spacing.",
        "Motion ≤300ms, transform and opacity only.",
        "An empty state tells the user the next action.",
      ],
      copyLabel: "Copy the checklist",
      copiedLabel: "Copied",
    },
    glossary: {
      title: "Six words are enough",
      items: [
        { term: "agent", def: "A program on your computer that can do tasks for you." },
        { term: "skill", def: "A professional manual installed into an agent; design-garden is a design manual." },
        { term: "repo", def: "The project's home on GitHub: files, history, and discussion." },
        { term: "issue", def: "A trackable question or submission with a number; it can be replied to and closed." },
        { term: "PR", def: "A “please merge my change” request; review happens here." },
        { term: "reaction / 👍", def: "An emoji response on GitHub; this project uses 👍 as the vote." },
      ],
    },
    recipe: {
      title: "Turn a need into plain words",
      body: "Three blanks make one sentence an agent can follow.",
      fields: [
        { id: "what", label: "What", placeholder: "a neighborhood adoption-day poster" },
        { id: "where", label: "For whom / where", placeholder: "the building elevator, A3" },
        { id: "feel", label: "The feel", placeholder: "like a botanical guide: chalk paper, thin rules, handwritten labels" },
      ],
      template: "Use design-garden to make {what}, for {where}. I want it to feel {feel}.",
      button: "Copy this sentence",
      copied: "Copied",
      note: "Blank fields fall back to the grey example.",
    },
  },

  footer: {
    tagline: "Design Garden · Start",
    note:
      "This is a new standalone beginner site; it does not replace the knowledge base. Knowledge stays in English; translated guides live in docs/.",
    columns: [
      {
        title: "Use",
        links: [
          { label: "Download the skill", href: "#use" },
          { label: "Install the DSH plugin", href: "#use" },
          { label: "GitHub buttons", href: "#tour" },
        ],
      },
      {
        title: "Look",
        links: [
          { label: "Repository map", href: "#map" },
          { label: "Works", href: "#gallery" },
          { label: "Submission guide", href: "https://github.com/iifzx/design-garden/blob/main/docs/community-submit.md" },
        ],
      },
      {
        title: "Repository",
        links: [
          { label: "GitHub repo", href: "https://github.com/iifzx/design-garden" },
          { label: "Knowledge site", href: "https://iifzx.github.io/design-garden/" },
          { label: "Start here", href: "https://github.com/iifzx/design-garden/blob/main/docs/start-here.md" },
        ],
      },
    ],
    license: "Code and docs MIT (see LICENSE); community works stay with their authors and display under CC BY 4.0.",
    made: "Designed with design-garden; works and counts come from repository JSON at build time.",
    backTop: "Back to top",
  },

  ui: {
    copy: "Copy",
    copied: "Copied",
    copyFailed: "Copy failed; select it manually",
    filterAll: "All",
    noMatch: "No matching item. Try another filter.",
    open: "Open",
    close: "Close",
    external: "Open in a new tab",
    langSwitch: "Switch language",
    menu: "Open contents",
  },
};
