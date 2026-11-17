const esc = (value = "") =>
  String(value).replace(/[&<>"']/g, (ch) => {
    switch (ch) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&#39;";
    }
  });

const href = (value, base) => {
  const raw = String(value || "");
  if (/^(https?:|mailto:|#)/.test(raw)) return raw;
  return base + raw.replace(/^\.\//, "");
};

const icon = (name) => {
  const paths = {
    star: '<path d="M12 3.6l2.5 5.2 5.7.8-4.1 4 1 5.6-5.1-2.7-5.1 2.7 1-5.6-4.1-4 5.7-.8z"/>',
    code: '<path d="M8.5 7.5L4 12l4.5 4.5"/><path d="M15.5 7.5L20 12l-4.5 4.5"/><path d="M13.5 5l-3 14"/>',
    issue: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="2.2"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    book: '<path d="M5 5.5A2.5 2.5 0 017.5 3H19v18H7.5A2.5 2.5 0 005 18.5z"/><path d="M5 18.5A2.5 2.5 0 017.5 16H19"/>',
    fork: '<circle cx="7" cy="5" r="2"/><circle cx="17" cy="5" r="2"/><circle cx="12" cy="19" r="2"/><path d="M7 7v3c0 3 2 4 5 4s5-1 5-4V7"/><path d="M12 14v3"/>',
    pr: '<circle cx="6" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/><path d="M8 6h5a4 4 0 014 4v6"/><path d="M16 14l2 2 2-2"/>',
    chat: '<path d="M4 12a8 8 0 0116 0c0 4-3.5 7-8 7a9 9 0 01-3-.5L4 20l1.2-4A7 7 0 014-4z"/>',
    play: '<circle cx="12" cy="12" r="8.5"/><path d="M10 8.5l6 3.5-6 3.5z"/>',
    eye: '<path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6S3 12 3 12z"/><circle cx="12" cy="12" r="2.5"/>',
    info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 8.5v.5M12 11v5"/>',
    tag: '<path d="M4 12.5V5h7.5L20 13.5 13.5 20z"/><circle cx="8.5" cy="8.5" r="1.2"/>',
    branch: '<circle cx="7" cy="5" r="2"/><circle cx="7" cy="19" r="2"/><circle cx="17" cy="8" r="2"/><path d="M7 7v10M9 12h4a4 4 0 004-4V8"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
  };
  const body = paths[name] || paths.info;
  return `<svg class="glyph" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${body}</svg>`;
};

const sealLines = (text) =>
  String(text || "")
    .split(/\s+/)
    .filter(Boolean)
    .map((line) => `<span>${esc(line)}</span>`)
    .join("");

const chapter = ({ id, no, title, className = "", body }) => `
<section class="chapter ${className}" id="${esc(id)}" aria-labelledby="${esc(id)}-title">
  <div class="wrap chapter-grid">
    <header class="chapter-rail">
      <span class="chapter-no" aria-hidden="true">${esc(no)}</span>
      <h2 id="${esc(id)}-title">${esc(title)}</h2>
    </header>
    <div class="chapter-body">
      ${body}
    </div>
  </div>
</section>`;

const renderNav = (content, mobile = false) => `
<nav class="${mobile ? "mobile-nav" : "desk-nav"}" aria-label="${mobile ? "Sections" : "Sections"}">
  ${content.nav
    .map(
      (item) =>
        `<a href="${esc(item.href)}" class="nav-link">${esc(item.label)}</a>`,
    )
    .join("")}
</nav>`;

const renderHeader = (content, base) => `
<header class="site-header">
  <div class="wrap header-inner">
    <a class="wordmark" href="${base}" aria-label="${esc(content.title)}">
      <span class="wordmark-mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M12 21V10"/>
          <path d="M12 13c-1-4-4-5-7-4 0 3 3 5 7 4"/>
          <path d="M12 10c1-4 4-5 7-4 0 3-3 5-7 4"/>
        </svg>
      </span>
      <span class="wordmark-text">${esc(content.footer.tagline)}</span>
    </a>
    ${renderNav(content)}
    <div class="header-tools">
      <a class="tool-link" href="${base}${content.lang === "zh" ? "en/" : ""}" hreflang="${content.lang === "zh" ? "en" : "zh-CN"}">${esc(content.switchLabel)}</a>
      <a class="tool-link tool-link--repo" href="${esc(content.repo)}" target="_blank" rel="noreferrer">GitHub</a>
      <details class="mobile-menu">
        <summary aria-label="${esc(content.ui.menu)}"><span>${esc(content.menu)}</span><span class="menu-plus" aria-hidden="true">+</span></summary>
        ${renderNav(content, true)}
      </details>
    </div>
  </div>
</header>`;

const renderHero = (content, data) => {
  const { hero } = content;
  const title = hero.title
    .map((line, index) =>
      index === hero.title.length - 1
        ? `<span class="accent${content.lang === "zh" ? " accent--nowrap" : ""}">${esc(line)}</span>`
        : `<span>${esc(line)}</span>`,
    )
    .join("");
  const stats = hero.packet.stats
    .map(
      (stat) =>
        `<li><strong>${esc(data.stats?.[stat.key] ?? "—")}</strong><span>${esc(stat.suffix)}</span></li>`,
    )
    .join("");
  return `
<section class="hero" aria-labelledby="hero-title">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="kicker">${esc(hero.kicker)}</p>
      <h1 id="hero-title">${title}</h1>
      <p class="hero-dek">${esc(hero.dek)}</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="${esc(hero.primary.href)}">${esc(hero.primary.label)}</a>
        <a class="text-link" href="${esc(hero.secondary.href)}">${esc(hero.secondary.label)}</a>
      </div>
      <p class="hero-margin">${esc(hero.margin)}</p>
    </div>
    <aside class="packet" aria-label="${esc(hero.packet.label)}">
      <div class="packet-top"><span>${esc(hero.packet.top)}</span><span>2026</span></div>
      <div class="packet-main">
        <span class="packet-label">${esc(hero.packet.label)}</span>
        <p class="packet-sub">${esc(hero.packet.sub)}</p>
        <ul class="packet-stats">${stats}</ul>
        <div class="packet-seal" aria-hidden="true">${sealLines(hero.packet.seal)}</div>
      </div>
      <div class="packet-foot"><span>${esc(hero.packet.foot)}</span><span class="packet-barcode" aria-hidden="true"></span></div>
    </aside>
  </div>
</section>
<nav class="doors" aria-label="Paths">
  <div class="wrap doors-grid">
    ${content.paths
      .map(
        (path) => `
      <a class="door" href="${esc(path.href)}">
        <span class="door-no">${esc(path.no)}</span>
        <span class="door-main"><strong>${esc(path.title)}</strong><span>${esc(path.text)}</span></span>
        <span class="door-cta">${esc(path.cta)}</span>
      </a>`,
      )
      .join("")}
  </div>
</nav>`;
};

const renderUse = (content, base) => {
  const packets = content.use.packets
    .map((packet, index) => {
      let action = "";
      if (packet.action.type === "download") {
        action = `
          <a class="btn btn-primary btn-download" href="${href(packet.action.href, base)}" download>${esc(packet.action.label)}</a>
          <p class="micro">${esc(packet.action.note)}</p>`;
      } else {
        action = `
          <div class="code-block">
            <code>${esc(packet.action.code)}</code>
            <button class="copy-btn" type="button" data-copy="${esc(packet.action.code)}">${esc(content.ui.copy)}</button>
          </div>
          <p class="micro">${esc(packet.action.note)}</p>`;
      }
      const links = [packet.link, packet.alt]
        .filter(Boolean)
        .map(
          (link) =>
            `<a class="quiet-link" href="${href(link.href, base)}" target="_blank" rel="noreferrer">${esc(link.label)}</a>`,
        )
        .join("");
      return `
      <article class="install-cell${index === 0 ? " install-cell--lead" : ""}">
        <p class="cell-tag">${esc(packet.tag)}</p>
        <h3>${esc(packet.title)}</h3>
        <p>${esc(packet.body)}</p>
        ${action}
        <div class="quiet-links">${links}</div>
        ${packet.micro ? `<p class="cell-micro">${esc(packet.micro)}</p>` : ""}
      </article>`;
    })
    .join("");

  const moreRows = content.use.more.rows
    .map(
      (row) => `
      <div class="more-row">
        <span>${esc(row.label)}</span>
        <div class="code-block code-block--small">
          <code>${esc(row.code)}</code>
          <button class="copy-btn" type="button" data-copy="${esc(row.code)}">${esc(content.ui.copy)}</button>
        </div>
      </div>`,
    )
    .join("");

  const prompts = content.use.prompts.items
    .map(
      (item, index) => `
      <li class="prompt-row">
        <span class="prompt-no" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
        <div class="prompt-main">
          <p class="prompt-label">${esc(item.label)}</p>
          <blockquote>${esc(item.text)}</blockquote>
        </div>
        <button class="copy-btn copy-btn--quiet" type="button" data-copy="${esc(item.text)}">${esc(content.use.prompts.copyLabel)}</button>
      </li>`,
    )
    .join("");

  const noInstallLinks = content.use.noInstall.links
    .map(
      (link) =>
        `<a class="quiet-link" href="${href(link.href, base)}">${esc(link.label)}</a>`,
    )
    .join("");

  return `
<p class="section-lead">${esc(content.use.lead)}</p>
<div class="install-strip">${packets}</div>
<details class="more-install">
  <summary>${esc(content.use.more.summary)}</summary>
  <div class="more-rows">${moreRows}</div>
</details>
<div class="prompts">
  <div class="subhead">
    <h3>${esc(content.use.prompts.title)}</h3>
    <p class="micro">${esc(content.use.prompts.note)}</p>
  </div>
  <ol class="prompt-list">${prompts}</ol>
</div>
<div class="no-install">
  <div>
    <h3>${esc(content.use.noInstall.title)}</h3>
    <p>${esc(content.use.noInstall.body)}</p>
  </div>
  <div class="quiet-links quiet-links--row">${noInstallLinks}</div>
</div>`;
};

const renderTour = (content) => {
  const counts = { all: content.tour.items.length };
  for (const item of content.tour.items) counts[item.need] = (counts[item.need] || 0) + 1;
  const filters = content.tour.filters
    .map(
      (filter, index) => `
      <button class="filter-chip" type="button" data-filter="${esc(filter.id)}" aria-pressed="${index === 0 ? "true" : "false"}">
        ${esc(filter.label)}<span class="filter-count">${counts[filter.id] ?? 0}</span>
      </button>`,
    )
    .join("");

  const items = content.tour.items
    .map(
      (item, index) => `
      <details class="tour-item" data-need="${esc(item.need)}"${index === 0 ? " open" : ""}>
        <summary>
          <span class="tour-index" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
          <span class="tour-specimen">${icon(item.glyph)}<span>${esc(item.specimen)}</span></span>
          <span class="tour-title"><strong>${esc(item.name)}</strong><span>${esc(item.cn)}</span></span>
          <span class="need need--${esc(item.need)}">${esc(content.tour.needLabels[item.need])}</span>
          <span class="tour-plus" aria-hidden="true">+</span>
        </summary>
        <div class="tour-body">
          <dl>
            <div><dt>${content.lang === "zh" ? "在哪" : "Where"}</dt><dd>${esc(item.where)}</dd></div>
            <div><dt>${content.lang === "zh" ? "干什么" : "What it does"}</dt><dd>${esc(item.does)}</dd></div>
          </dl>
          <p class="tour-advice"><span class="advice-label">${content.lang === "zh" ? "新手建议" : "Beginner advice"}</span>${esc(item.advice)}</p>
        </div>
      </details>`,
    )
    .join("");

  const chips = content.tour.summary.chips.map((chip) => `<span>${esc(chip)}</span>`).join("");
  return `
<p class="section-lead">${esc(content.tour.lead)}</p>
<div class="filter-row" role="group" aria-label="${content.lang === "zh" ? "筛选按钮" : "Filter buttons"}">${filters}</div>
<div class="tour-list">${items}</div>
<div class="tour-summary">
  <div>
    <h3>${esc(content.tour.summary.title)}</h3>
    <p>${esc(content.tour.summary.body)}</p>
  </div>
  <div class="summary-chips">${chips}</div>
</div>
<p class="section-note">${esc(content.tour.footerNote)}</p>`;
};

const renderMap = (content, data) => {
  const fillCount = (value) =>
    String(value || "")
      .replace("{knowledge}", String(data.stats?.knowledgeFiles ?? "—"))
      .replace("{learnings}", String(data.stats?.learnings ?? "—"));
  const rows = content.map.items
    .map((item, index) => {
      const path = item.href
        ? `<a href="${esc(item.href)}" target="_blank" rel="noreferrer"><code>${esc(item.path)}</code></a>`
        : `<code>${esc(item.path)}</code>`;
      const count = item.count ? `<span class="map-count">${esc(fillCount(item.count))}</span>` : "";
      return `
      <tr>
        <td class="map-path">${path}${count}</td>
        <td>${esc(item.what)}</td>
        <td>${esc(item.action)}</td>
      </tr>`;
    })
    .join("");
  const firstLinks = content.map.first.links
    .map(
      (link) =>
        `<a class="quiet-link" href="${esc(link.href)}" target="_blank" rel="noreferrer">${esc(link.label)}</a>`,
    )
    .join("");
  return `
<p class="section-lead">${esc(content.map.lead)}</p>
<div class="map-first">
  <h3>${esc(content.map.first.title)}</h3>
  <div class="quiet-links quiet-links--row">${firstLinks}</div>
</div>
<table class="map-table">
  <caption class="sr-only">${esc(content.map.title)}</caption>
  <thead><tr>${content.map.columns.map((column) => `<th scope="col">${esc(column)}</th>`).join("")}</tr></thead>
  <tbody>${rows}</tbody>
</table>
<p class="section-note">${esc(content.map.note)}</p>`;
};

const renderWork = (content, base, work, index, kind) => {
  const title = content.lang === "en" ? work.titleEn || work.title : work.title;
  const type = content.lang === "en" ? work.typeEn || work.type : work.type;
  const note = content.lang === "en" ? work.noteEn || work.note || work.descriptionEn || work.description : work.note || work.description;
  const tags = (work.tags || []).map((tag) => `<span class="tag">${esc(tag)}</span>`).join("");
  const image = work.imageUrl
    ? `<img src="${esc(work.imageUrl)}" alt="${esc(title)}" width="${esc(work.width || 1200)}" height="${esc(work.height || 900)}" loading="lazy" decoding="async">`
    : `<span class="work-placeholder">${icon("book")}<span>${content.lang === "zh" ? "图片审核中" : "Image in review"}</span></span>`;
  const ratio = work.width && work.height ? `${work.width}/${work.height}` : "4/3";
  const meta =
    kind === "featured"
      ? `<span>${esc(content.gallery.creditLabel)} ${esc(work.credit || "—")}</span><a href="${esc(work.sourceUrl)}" target="_blank" rel="noreferrer">${esc(content.gallery.sourceLabel)}</a>`
      : `<span>${esc(work.author ? "@" + work.author : content.gallery.communityLabel)}</span><a href="${esc(work.sourceUrl)}" target="_blank" rel="noreferrer">${esc(content.gallery.voteLabel)} <span class="vote-count">${esc(work.votes ?? 0)}</span></a>`;
  const label = kind === "featured" ? content.gallery.featuredLabel : content.gallery.communityLabel;
  return `
<article class="work work--${kind} span-${work.span || 6}" data-type="${esc(type)}" style="--ratio:${esc(ratio)}">
  <a class="work-media" href="${esc(work.sourceUrl)}" target="_blank" rel="noreferrer" aria-label="${esc(title)}">
    ${image}
  </a>
  <div class="work-meta">
    <p class="work-kicker"><span class="work-label">${esc(label)}</span><span>${esc(type)}</span></p>
    <h3>${esc(title)}</h3>
    ${note ? `<p class="work-note">${esc(note)}</p>` : ""}
    <div class="work-tags">${tags}</div>
    <p class="work-foot">${meta}</p>
  </div>
</article>`;
};

const renderGallery = (content, data) => {
  const items = [
    ...data.featured.map((work) => ({ ...work, kind: "featured", span: work.span })),
    ...data.submissions.map((work) => ({ ...work, kind: "community", span: work.span })),
  ];
  const types = [...new Set(items.map((work) => (content.lang === "en" ? work.typeEn || work.type : work.type)))].filter(Boolean);
  const filters = [
    `<button class="filter-chip" type="button" data-gallery-filter="all" aria-pressed="true">${esc(content.gallery.allLabel)}<span class="filter-count">${items.length}</span></button>`,
    ...types.map(
      (type) =>
        `<button class="filter-chip" type="button" data-gallery-filter="${esc(type)}" aria-pressed="false">${esc(type)}<span class="filter-count">${items.filter((work) => (content.lang === "en" ? work.typeEn || work.type : work.type) === type).length}</span></button>`,
    ),
  ].join("");

  const featured = data.featured
    .map((work, index) =>
      renderWork(content, data.base, { ...work, span: [7, 5, 4, 8, 7, 5][index] || 6 }, index, "featured"),
    )
    .join("");
  const submissions = data.submissions
    .map((work, index) =>
      renderWork(content, data.base, { ...work, span: [6, 6, 7, 5, 12][index] || 6 }, index, "community"),
    )
    .join("");

  const empty =
    data.submissions.length === 0
      ? `<div class="community-empty">
          <div class="empty-mark" aria-hidden="true">${icon("star")}</div>
          <h3>${esc(content.gallery.emptyTitle)}</h3>
          <p>${esc(content.gallery.emptyBody)}</p>
          <a class="btn btn-primary" href="${esc(content.contribute.cta.href)}" target="_blank" rel="noreferrer">${esc(content.gallery.emptyCta)}</a>
        </div>`
      : "";

  return `
<p class="section-lead">${esc(content.gallery.lead)}</p>
<div class="filter-row filter-row--gallery" role="group" aria-label="${esc(content.gallery.filterLabel)}">${filters}</div>
<div class="gallery-grid">
  ${featured}
  ${submissions}
  ${empty}
</div>
<div class="gallery-notes">
  <p>${esc(content.gallery.featuredNote)}</p>
  <p>${esc(content.gallery.communityNote)}</p>
  <a class="btn btn-outline" href="${esc(content.contribute.cta.href)}" target="_blank" rel="noreferrer">${esc(content.gallery.submitLabel)}</a>
</div>`;
};

const renderContribute = (content) => {
  const steps = content.contribute.steps
    .map(
      (step) => `
      <li class="trail-step">
        <span class="trail-no" aria-hidden="true">${esc(step.no)}</span>
        <div><h3>${esc(step.title)}</h3><p>${esc(step.body)}</p></div>
      </li>`,
    )
    .join("");
  const checks = content.contribute.checklist
    .map(
      (item, index) => `
      <li><label class="check-row" for="check-${index}"><input type="checkbox" id="check-${index}"><span>${esc(item)}</span></label></li>`,
    )
    .join("");
  const notItems = content.contribute.notItems
    .map((item) => `<li><span class="no-mark" aria-hidden="true">×</span>${esc(item)}</li>`)
    .join("");
  const quick = content.contribute.quick
    .map(
      (item) => `
      <li><a href="${esc(item.href)}"${/^https?:/.test(item.href) ? ' target="_blank" rel="noreferrer"' : ""}>
        <strong>${esc(item.label)}</strong><span>${esc(item.body)}</span>
      </a></li>`,
    )
    .join("");
  const secondary = content.contribute.secondary
    .map(
      (link) =>
        `<a class="quiet-link" href="${esc(link.href)}"${/^https?:/.test(link.href) ? ' target="_blank" rel="noreferrer"' : ""}>${esc(link.label)}</a>`,
    )
    .join("");

  return `
<p class="section-lead">${esc(content.contribute.lead)}</p>
<ol class="trail">${steps}</ol>
<div class="contribute-cta">
  <a class="btn btn-primary btn-lg" href="${esc(content.contribute.cta.href)}" target="_blank" rel="noreferrer">${esc(content.contribute.cta.label)}</a>
  <div class="quiet-links">${secondary}</div>
</div>
<div class="contribute-grid">
  <div class="checklist-well">
    <h3>${esc(content.contribute.checklistTitle)}</h3>
    <ul class="checklist">${checks}</ul>
  </div>
  <div class="avoid-well">
    <h3>${esc(content.contribute.notTitle)}</h3>
    <ul class="avoid-list">${notItems}</ul>
  </div>
</div>
<div class="license-note">
  <div><h3>${esc(content.contribute.licenseTitle)}</h3><p>${esc(content.contribute.licenseBody)}</p></div>
  <p class="review-note">${esc(content.contribute.reviewNote)}</p>
</div>
<div class="quick">
  <h3>${esc(content.contribute.quickTitle)}</h3>
  <ul class="quick-list">${quick}</ul>
</div>`;
};

const renderVote = (content, data) => {
  const theme = data.theme || {};
  const themeTitle = content.lang === "en" ? theme.titleEn || theme.title : theme.title;
  const themePrompt = content.lang === "en" ? theme.promptEn || theme.prompt : theme.prompt;
  const rules = (content.lang === "en" ? data.rulesEn || data.rules : data.rules) || [];
  const sorted = [...data.submissions].sort((a, b) => (b.votes || 0) - (a.votes || 0) || String(a.created).localeCompare(String(b.created)));
  const maxVotes = Math.max(1, ...sorted.map((item) => item.votes || 0));
  const board = sorted.length
    ? sorted
        .map(
          (work, index) => `
        <li class="board-row">
          <span class="board-rank" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
          <div class="board-main">
            <h3>${esc(content.lang === "en" ? work.titleEn || work.title : work.title)}</h3>
            <p>${esc(work.author ? "@" + work.author : content.gallery.communityLabel)} <span class="board-type">${esc(content.lang === "en" ? work.typeEn || work.type : work.type)}</span></p>
            <div class="board-bar" aria-hidden="true"><span style="--bar:${Math.max(2, Math.round(((work.votes || 0) / maxVotes) * 100))}%"></span></div>
          </div>
          <div class="board-votes"><strong>${esc(work.votes || 0)}</strong><span>${esc(content.vote.voteCount)}</span></div>
          <a class="board-link" href="${esc(work.sourceUrl)}" target="_blank" rel="noreferrer">${esc(content.vote.entryCta)}</a>
        </li>`,
        )
        .join("")
    : `<li class="board-empty">
        <h3>${esc(content.vote.entriesEmpty)}</h3>
        <a class="btn btn-primary" href="${esc(content.contribute.cta.href)}" target="_blank" rel="noreferrer">${esc(content.vote.emptyCta)}</a>
      </li>`;

  const rulesList = rules.map((rule) => `<li>${esc(rule)}</li>`).join("");
  const blind = data.featured.slice(0, 2);
  const blindHtml = blind.length
    ? `<div class="blind-grid">
        ${blind
          .map(
            (work, index) => `
          <figure class="blind-card" data-blind-index="${index}">
            <a href="${esc(work.sourceUrl)}" target="_blank" rel="noreferrer" class="blind-media"><img src="${esc(work.imageUrl)}" alt="${esc(content.lang === "en" ? work.titleEn || work.title : work.title)}" loading="lazy"></a>
            <figcaption><span class="blind-letter">${index === 0 ? "A" : "B"}</span><span class="blind-caption-title">${esc(content.lang === "en" ? work.titleEn || work.title : work.title)}</span><span class="blind-credit">${esc(work.credit || "")}</span></figcaption>
          </figure>`,
          )
          .join("")}
      </div>
      <div class="blind-actions">
        <button class="btn btn-outline" type="button" data-blind-side="left">${esc(content.vote.blindLeft)}</button>
        <button class="btn btn-outline" type="button" data-blind-side="right">${esc(content.vote.blindRight)}</button>
        <button class="text-link" type="button" data-blind-skip>${esc(content.vote.blindSkip)}</button>
      </div>
      <p class="blind-result" data-blind-result data-template="${esc(content.vote.blindResult)}" aria-live="polite"></p>
      <p class="section-note">${esc(content.vote.blindNote)}</p>`
    : "";

  return `
<p class="section-lead">${esc(content.vote.lead)}</p>
<div class="theme-banner">
  <div class="theme-copy">
    <p class="cell-tag">${esc(content.vote.themeLabel)} · ${esc(theme.id || "—")}</p>
    <h3>${esc(themeTitle || "—")}</h3>
    <p>${esc(themePrompt || "")}</p>
  </div>
  <div class="theme-meta">
    <span class="theme-deadline">${esc(content.vote.deadlineLabel)} ${esc(theme.deadline || "—")}</span>
    <span class="theme-status">${esc(theme.status === "open" ? (content.lang === "zh" ? "开放投稿" : "Open") : theme.status || "")}</span>
  </div>
</div>
<div class="board-head">
  <h3>${esc(content.vote.entriesTitle)}</h3>
  <p class="micro">${esc(content.vote.updatedLabel)} ${esc(data.votes?.updated ? String(data.votes.updated).slice(0, 10) : content.vote.notSynced)}</p>
</div>
<ol class="board">${board}</ol>
<div class="vote-grid">
  <div class="rules-well">
    <h3>${esc(content.vote.rulesTitle)}</h3>
    <ol>${rulesList}</ol>
  </div>
  <div class="blind-well">
    <h3>${esc(content.vote.blindTitle)}</h3>
    <p>${esc(content.vote.blindBody)}</p>
    ${blindHtml}
  </div>
</div>`;
};

const renderToys = (content, data) => {
  const styles = data.styles || [];
  const roster = styles
    .map(
      (style) =>
        `<li><a href="${esc(data.repo)}/blob/main/knowledge/styles/${esc(style.slug)}.md" target="_blank" rel="noreferrer">${esc(style.title)}</a><span>${esc(style.status || "")}</span></li>`,
    )
    .join("");
  const checks = content.toys.checklist.items
    .map(
      (item, index) => `
      <li><label class="check-row" for="tool-check-${index}"><input type="checkbox" id="tool-check-${index}"><span>${esc(item)}</span></label></li>`,
    )
    .join("");
  const glossary = content.toys.glossary.items
    .map(
      (item) =>
        `<li><strong>${esc(item.term)}</strong><span>${esc(item.def)}</span></li>`,
    )
    .join("");
  const fields = content.toys.recipe.fields
    .map(
      (field) => `
      <label class="recipe-field" for="recipe-${esc(field.id)}">
        <span>${esc(field.label)}</span>
        <input id="recipe-${esc(field.id)}" type="text" placeholder="${esc(field.placeholder)}" autocomplete="off">
      </label>`,
    )
    .join("");
  const template = content.toys.recipe.template
    .replace("{what}", `<span data-slot="what">${esc(content.toys.recipe.fields[0].placeholder)}</span>`)
    .replace("{where}", `<span data-slot="where">${esc(content.toys.recipe.fields[1].placeholder)}</span>`)
    .replace("{feel}", `<span data-slot="feel">${esc(content.toys.recipe.fields[2].placeholder)}</span>`);

  return `
<p class="section-lead">${esc(content.toys.lead)}</p>
<div class="tools-grid">
  <section class="tool tool--roulette">
    <p class="cell-tag">${content.lang === "zh" ? "30 秒" : "30 sec"}</p>
    <h3>${esc(content.toys.roulette.title)}</h3>
    <p>${esc(content.toys.roulette.body)}</p>
    <div class="roulette-result" data-roulette-result data-prefix="${esc(content.toys.roulette.resultPrefix)}">${esc(content.toys.roulette.empty)}</div>
    <button class="btn btn-primary" type="button" data-roulette>${esc(content.toys.roulette.button)}</button>
    <details class="style-roster">
      <summary>${content.lang === "zh" ? `看全部 ${styles.length} 个风格` : `See all ${styles.length} styles`}</summary>
      <ul>${roster}</ul>
    </details>
    <p class="micro">${esc(content.toys.roulette.note)}</p>
  </section>
  <section class="tool tool--checklist">
    <p class="cell-tag">${content.lang === "zh" ? "30 秒" : "30 sec"}</p>
    <h3>${esc(content.toys.checklist.title)}</h3>
    <p>${esc(content.toys.checklist.body)}</p>
    <ul class="checklist" id="tool-checklist">${checks}</ul>
    <button class="btn btn-outline" type="button" data-copy-target="#tool-checklist">${esc(content.toys.checklist.copyLabel)}</button>
  </section>
  <section class="tool tool--glossary">
    <p class="cell-tag">${content.lang === "zh" ? "词典" : "Glossary"}</p>
    <h3>${esc(content.toys.glossary.title)}</h3>
    <ul class="glossary">${glossary}</ul>
  </section>
  <section class="tool tool--recipe">
    <p class="cell-tag">${content.lang === "zh" ? "一句话" : "One sentence"}</p>
    <h3>${esc(content.toys.recipe.title)}</h3>
    <p>${esc(content.toys.recipe.body)}</p>
    <div class="recipe-fields">${fields}</div>
    <p class="recipe-output" data-recipe-output>${template}</p>
    <button class="btn btn-primary" type="button" data-copy-recipe>${esc(content.toys.recipe.button)}</button>
    <p class="micro">${esc(content.toys.recipe.note)}</p>
  </section>
</div>`;
};

const renderFooter = (content, base) => {
  const columns = content.footer.columns
    .map(
      (column) => `
      <div class="footer-col">
        <h3>${esc(column.title)}</h3>
        <ul>${column.links
          .map(
            (link) =>
              `<li><a href="${href(link.href, base)}">${esc(link.label)}</a></li>`,
          )
          .join("")}</ul>
      </div>`,
    )
    .join("");
  return `
<footer class="site-footer">
  <div class="wrap footer-grid">
    <div class="footer-brand">
      <p class="footer-tagline">${esc(content.footer.tagline)}</p>
      <p>${esc(content.footer.note)}</p>
      <p class="footer-license">${esc(content.footer.license)}</p>
    </div>
    ${columns}
  </div>
  <div class="wrap footer-bottom">
    <p>${esc(content.footer.made)}</p>
    <a href="#main">${esc(content.footer.backTop)}</a>
  </div>
</footer>`;
};

export function renderPage(content, data, base) {
  const hero = renderHero(content, data);
  const use = renderUse(content, base);
  const tour = renderTour(content);
  const map = renderMap(content, data);
  const gallery = renderGallery(content, data);
  const contribute = renderContribute(content);
  const vote = renderVote(content, data);
  const toys = renderToys(content, data);
  const safeData = JSON.stringify(data).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  const canonical = content.lang === "zh" ? "https://iifzx.github.io/design-garden/start/" : "https://iifzx.github.io/design-garden/start/en/";
  return `<!doctype html>
<html lang="${esc(content.htmlLang)}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(content.title)}</title>
  <meta name="description" content="${esc(content.description)}">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="${base}assets/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,700;12..96,800&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${base}assets/start.css">
</head>
<body>
  <a class="skip-link" href="#main">${esc(content.skip)}</a>
  ${renderHeader(content, base)}
  <main id="main">
    ${hero}
    ${chapter({ id: "use", no: "01", title: content.use.title, body: use })}
    ${chapter({ id: "tour", no: "02", title: content.tour.title, body: tour, className: "chapter--well" })}
    ${chapter({ id: "map", no: "03", title: content.map.title, body: map })}
    ${chapter({ id: "gallery", no: "04", title: content.gallery.title, body: gallery })}
    ${chapter({ id: "contribute", no: "05", title: content.contribute.title, body: contribute })}
    ${chapter({ id: "vote", no: "06", title: content.vote.title, body: vote })}
    ${chapter({ id: "toys", no: "07", title: content.toys.title, body: toys })}
  </main>
  ${renderFooter(content, base)}
  <script type="application/json" id="dg-data">${safeData}</script>
  <script src="${base}assets/start.js" defer></script>
</body>
</html>`;
}
