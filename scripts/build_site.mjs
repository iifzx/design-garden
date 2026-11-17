#!/usr/bin/env node
/**
 * design-garden site builder — turns the knowledge base into a browsable,
 * self-contained single-file site (site/index.html) + stats.json for dynamic badges.
 * Zero dependencies: includes a small markdown renderer tuned to this repo's constructs.
 *
 * Usage: node scripts/build_site.mjs [--root PATH]
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";

const argRoot = process.argv.indexOf("--root");
const ROOT = path.resolve(argRoot > 0 ? process.argv[argRoot + 1] : path.join(import.meta.dirname, ".."));
const OUT = path.join(ROOT, "site");

// ---------- tiny markdown renderer ----------
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function inline(s) {
  // escape first, then process code spans, links, bold, italic — code spans protect their content
  const parts = esc(s).split(/`([^`]+)`/);
  return parts
    .map((part, i) => {
      if (i % 2 === 1) return `<code>${part}</code>`;
      return part
        .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, u) => `<a href="${u}">${t}</a>`)
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/\*([^*]+)\*/g, "<em>$1</em>");
    })
    .join("");
}

function renderTable(rows) {
  const cells = rows.map((r) => r.replace(/^\||\|$/g, "").split("|").map((c) => c.trim()));
  const isSep = (r) => r.every((c) => /^:?-{2,}:?$/.test(c) || c === "");
  let head = null;
  const bodyRows = [];
  for (const r of cells) {
    if (!head && isSep(r)) continue; // separator before header (tolerate)
    if (head === null && rows.length && cells.indexOf(r) === 0) head = r;
    else if (isSep(r)) continue;
    else bodyRows.push(r);
  }
  if (!head) return "";
  const th = head.map((c) => `<th>${inline(c)}</th>`).join("");
  const tb = bodyRows
    .map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`)
    .join("");
  return `<table><thead><tr>${th}</tr></thead><tbody>${tb}</tbody></table>`;
}

function render(md) {
  // strip frontmatter
  const lines = md.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "").split(/\r?\n/);
  const out = [];
  let i = 0;
  let para = [];
  let listBuf = null; // {ordered, items:[{depth,text,chk}]}

  const flushPara = () => {
    if (para.length) {
      out.push(`<p>${inline(para.join(" "))}</p>`);
      para = [];
    }
  };
  const flushList = () => {
    if (!listBuf) return;
    const tag = listBuf.ordered ? "ol" : "ul";
    let html = `<${tag}>`;
    let curDepth = 0;
    for (const it of listBuf.items) {
      if (it.depth > curDepth && html.endsWith(`</li>`)) {
        // open nested list inside previous li
        html = html.slice(0, -5) + `<${tag}>` + `<li>${fmtItem(it)}</li>`;
        curDepth = it.depth;
      } else {
        html += `<li>${fmtItem(it)}</li>`;
      }
    }
    html += `</${tag}>`;
    out.push(html);
    listBuf = null;
  };
  const fmtItem = (it) =>
    it.chk === undefined ? inline(it.text) : `<span class="chk">${it.chk ? "☑" : "☐"}</span> ${inline(it.text)}`;

  while (i < lines.length) {
    const line = lines[i];

    if (/^```/.test(line.trim())) {
      flushPara(); flushList();
      const buf = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i].trim())) buf.push(lines[i++]);
      i++;
      out.push(`<pre><code>${esc(buf.join("\n"))}</code></pre>`);
      continue;
    }

    if (/^\s*\|/.test(line) && i + 1 < lines.length && /^\s*\|[\s:|-]+\|?\s*$/.test(lines[i + 1])) {
      flushPara(); flushList();
      const rows = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) rows.push(lines[i++].trim());
      out.push(renderTable(rows));
      continue;
    }

    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      flushPara(); flushList();
      out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`);
      i++;
      continue;
    }

    if (/^---+\s*$/.test(line)) {
      flushPara(); flushList();
      out.push("<hr>");
      i++;
      continue;
    }

    if (/^>\s?/.test(line)) {
      flushPara(); flushList();
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) buf.push(lines[i++].replace(/^>\s?/, ""));
      out.push(`<blockquote><p>${inline(buf.join(" "))}</p></blockquote>`);
      continue;
    }

    const li = line.match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
    if (li) {
      flushPara();
      const depth = Math.min(1, Math.floor(li[1].replace(/\t/g, "  ").length / 2));
      const text = li[3];
      const chk = text.match(/^\[([ xX])\]\s*(.*)$/);
      const item = { depth, text: chk ? chk[2] : text, chk: chk ? chk[1].toLowerCase() === "x" : undefined };
      if (!listBuf) listBuf = { ordered: /\d\./.test(li[2]), items: [item] };
      else {
        if (listBuf.ordered !== /\d\./.test(li[2])) { flushList(); listBuf = { ordered: /\d\./.test(li[2]), items: [item] }; }
        else listBuf.items.push(item);
      }
      i++;
      continue;
    }

    // wrapped continuation of the previous list item (indented, no bullet)
    if (listBuf && /^\s{2,}\S/.test(line)) {
      const last = listBuf.items[listBuf.items.length - 1];
      if (last) { last.text += " " + line.trim(); i++; continue; }
    }

    if (line.trim() === "") { flushPara(); flushList(); i++; continue; }
    para.push(line.trim());
    i++;
  }
  flushPara(); flushList();
  return out.join("\n");
}

const stripTags = (html) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

// ---------- collect pages ----------
const KIND_LABEL = { core: "Core", domain: "Domains", style: "Styles", case: "Case studies", learning: "Learnings" };
const pages = [];

function addPage(file, category, summary, lang = "en", pair = "", titleOverride = "") {
  const md = readFileSync(file, "utf-8");
  const fmMatch = md.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const fm = {};
  if (fmMatch) for (const m of fmMatch[1].matchAll(/^(\w[\w-]*):\s*(.*)$/gm)) fm[m[1]] = m[2].trim().replace(/^['"]|['"]$/g, "");
  const titleMatch = md.match(/^#\s+(.+)$/m);
  const title = titleOverride || (titleMatch ? titleMatch[1].replace(/<!--.*?-->/g, "").trim() : path.basename(file, ".md"));
  const body = md.match(/^#\s+.+$\n?/m) ? md.replace(/^#\s+.+$\n?/m, "") : md;
  const html = render(body);
  pages.push({
    id: path.relative(ROOT, file).replace(/[\\/]/g, "__").replace(/\.md$/, ""),
    file: path.relative(ROOT, file).split(path.sep).join("/"),
    category,
    kind: fm.kind || "",
    status: fm.status || "",
    updated: fm.updated || "",
    lang,
    pair,
    title,
    summary: summary || "",
    html,
    text: stripTags(html).toLowerCase(),
  });
}

// SKILL.md as the router
addPage(path.join(ROOT, "SKILL.md"), "Router", "The 8-step workflow every design task runs through");

// knowledge per INDEX.md order
const indexText = readFileSync(path.join(ROOT, "knowledge", "INDEX.md"), "utf-8");
const indexRows = [];
for (const line of indexText.split(/\r?\n/)) {
  const m = line.match(/^\|\s*`?([\w\-/]+\.md)`?\s*\|/);
  if (!m) continue;
  const cells = line.split("|").map((c) => c.trim());
  indexRows.push({ file: m[1], status: cells[2] || "", summary: cells[3] || "", when: cells[4] || "" });
}
for (const row of indexRows) {
  const f = path.join(ROOT, "knowledge", row.file);
  if (!existsSync(f) || path.basename(f) === "_TEMPLATE.md") continue;
  const norm = row.file.replace(/\\/g, "/");
  const kind = norm.startsWith("core/") ? "core"
    : norm.startsWith("domains/") ? "domain"
    : norm.startsWith("styles/") ? "style" : "case";
  addPage(f, KIND_LABEL[kind], row.summary + (row.when ? ` · load: ${row.when}` : ""));
}

// learnings
const learnDir = path.join(ROOT, "learnings");
if (existsSync(learnDir)) {
  for (const f of readdirSync(learnDir).filter((f) => f.endsWith(".md") && f !== "_TEMPLATE.md").sort()) {
    addPage(path.join(learnDir, f), "Learnings", "Field notes from real design tasks");
  }
}

// guides & community docs (lang-tagged; zh variants replace en in zh mode)
const guideFiles = [
  ["README.md", "Project overview — what it is and how it grows", "en", "readme", "design-garden (README)"],
  ["README.zh-CN.md", "项目总览（中文）——是什么、怎么成长", "zh", "readme", "design-garden（中文版）"],
  ["docs/start-here.md", "Beginner guide (EN) — install, use, help out with zero code", "en", "start-here", "Start Here — beginner guide"],
  ["docs/start-here.zh-CN.md", "Beginner guide (中文) — 零代码安装、使用与贡献", "zh", "start-here", "新手指南（中文）"],
  ["CONTRIBUTING.md", "The growth protocol: schemas, quality bar, promotion, security rules", "en", "contributing", "CONTRIBUTING"],
  ["ROADMAP.md", "Where the garden grows next", "en", "roadmap", "ROADMAP"],
  ["CHANGELOG.md", "What the garden learned, per version", "en", "changelog", "CHANGELOG"],
  ["SOURCES.md", "What the garden was planted from", "en", "sources", "SOURCES"],
];
for (const [f, sum, lang, pair, tOverride] of guideFiles) {
  const p = path.join(ROOT, f);
  if (existsSync(p)) addPage(p, "Guides", sum, lang, pair, tOverride);
}

// stats
const stats = {
  core: pages.filter((p) => p.kind === "core").length,
  domains: pages.filter((p) => p.kind === "domain").length,
  styles: pages.filter((p) => p.kind === "style").length,
  cases: pages.filter((p) => p.kind === "case").length,
  learnings: pages.filter((p) => p.kind === "learning").length,
  generated: new Date().toISOString().slice(0, 10),
};

// ---------- html ----------
const STATUS_CLASS = { core: "s-core", proven: "s-proven", experimental: "s-exp", local: "s-local" };
const groups = ["Router", "Core", "Domains", "Styles", "Case studies", "Learnings", "Guides"];

const navItems = groups
  .filter((g) => pages.some((p) => p.category === g))
  .map((g) => {
    const items = pages
      .filter((p) => p.category === g)
      .map((p) => {
        const enChip = p.category === "Guides" && p.lang === "en" ? `<span class="chip s-lang">EN</span>` : "";
        return `<div class="nav-item" data-id="${p.id}" data-lang="${p.lang}"${p.pair ? ` data-pair="${p.pair}"` : ""} data-text="${esc((p.title + " " + p.summary + " " + p.text).slice(0, 3000))}">
  <button onclick="show('${p.id}')">${esc(p.title)}</button>
  ${p.status ? `<span class="chip ${STATUS_CLASS[p.status] || ""}">${p.status}</span>` : ""}${enChip}
</div>`;
      })
      .join("\n");
    return `<h3 class="nav-group" data-group="${g}">${g}</h3>${items}`;
  })
  .join("\n");

const pageData = {};
for (const p of pages) {
  pageData[p.id] = { title: esc(p.title), status: p.status, updated: p.updated, file: p.file, html: p.html, lang: p.lang, category: p.category };
}

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>design-garden — knowledge base</title>
<style>
  :root{
    --paper:#F6F3EA; --paper-well:#EFEADC; --green:#2E4B3C; --green-deep:#22382D;
    --brass:#A98A3D; --ink:#1E241F; --muted:#5D655B; --hairline:#D9D4C2;
  }
  *{box-sizing:border-box}
  html,body{margin:0;overflow-x:clip}
  body{background:var(--paper);color:var(--ink);font:400 15px/1.6 "Archivo",system-ui,sans-serif}
  header{position:sticky;top:0;z-index:10;background:var(--green);color:var(--paper);
    display:flex;align-items:center;gap:16px;padding:12px 20px}
  header .brand{font-weight:900;font-size:18px;letter-spacing:.01em;text-decoration:none;color:var(--paper)}
  header .brand span{color:var(--brass)}
  header .repo{margin-left:auto;font-size:13px;color:var(--paper);opacity:.9}
  header .start{font-size:13px;color:var(--paper);border:1px solid rgba(246,243,234,.45);
    padding:6px 12px;border-radius:6px;text-decoration:none;white-space:nowrap}
  header .start:hover{background:rgba(246,243,234,.14)}
  #lang{all:unset;cursor:pointer;font-size:13px;border:1px solid rgba(246,243,234,.45);
    padding:6px 14px;border-radius:6px;color:var(--paper)}
  #lang:hover{background:rgba(246,243,234,.14)}
  .lang-note{display:none;background:rgba(169,138,61,.16);color:#7A5F1D;
    padding:8px 20px;font-size:13px;border-bottom:1px solid var(--hairline)}
  .s-lang{color:var(--muted);border-color:var(--hairline)}
  #q{flex:0 1 320px;min-height:36px;padding:6px 12px;border:1px solid rgba(246,243,234,.4);
    border-radius:6px;background:rgba(246,243,234,.12);color:var(--paper);font:inherit}
  #q::placeholder{color:rgba(246,243,234,.6)}
  .layout{display:grid;grid-template-columns:300px minmax(0,1fr);min-height:calc(100vh - 61px)}
  nav{border-right:1px solid var(--hairline);padding:16px 12px 40px;background:var(--paper-well);
    max-height:calc(100vh - 61px);overflow-y:auto;position:sticky;top:61px}
  .nav-group{font-size:12px;font-weight:900;letter-spacing:.1em;text-transform:uppercase;
    color:var(--green);margin:18px 8px 6px}
  .nav-item{display:flex;align-items:center;gap:6px}
  .nav-item button{all:unset;cursor:pointer;flex:1;padding:5px 8px;border-radius:5px;font-size:13.5px}
  .nav-item button:hover{background:rgba(46,75,60,.1)}
  .nav-item.hidden{display:none}
  .chip{font-size:10px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;
    border-radius:4px;padding:1px 5px;border:1px solid}
  .s-core{color:var(--green-deep);border-color:var(--green)}
  .s-proven{color:#1F5C4D;border-color:#3E6B4A}
  .s-exp{color:#8A6B1F;border-color:var(--brass)}
  .s-local{color:var(--muted);border-color:var(--hairline)}
  main{padding:36px clamp(20px,6vw,90px) 80px;max-width:940px}
  .page-head{border-bottom:2px solid var(--ink);padding-bottom:12px;margin-bottom:22px}
  .page-head h1{margin:0 0 8px;font-size:clamp(28px,4vw,42px);font-weight:900;letter-spacing:-.01em}
  .meta{display:flex;gap:10px;align-items:center;flex-wrap:wrap;color:var(--muted);font-size:13px}
  .meta a{color:var(--green)}
  main h2{font-size:26px;font-weight:900;margin:34px 0 10px;letter-spacing:-.01em}
  main h3{font-size:19px;font-weight:700;margin:24px 0 8px}
  main p{margin:10px 0}
  main ul,main ol{margin:10px 0;padding-left:22px}
  main li{margin:4px 0}
  main .chk{color:var(--green);font-weight:700}
  main table{border-collapse:collapse;width:100%;margin:14px 0;font-size:14px}
  main th{text-align:left;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;
    color:var(--muted);border-bottom:2px solid var(--ink);padding:6px 10px}
  main td{padding:8px 10px;border-bottom:1px solid var(--hairline);vertical-align:top}
  main pre{background:var(--green-deep);color:var(--paper);padding:16px 18px;border-radius:8px;
    overflow-x:auto;font:400 13px/1.6 ui-monospace,monospace}
  main code{background:rgba(46,75,60,.09);padding:1px 5px;border-radius:4px;
    font:400 13px ui-monospace,monospace}
  main pre code{background:none;padding:0}
  main blockquote{border-left:3px solid var(--brass);margin:14px 0;padding:4px 16px;color:var(--muted)}
  main hr{border:0;border-top:1px solid var(--hairline);margin:26px 0}
  footer{border-top:1px solid var(--hairline);margin-top:50px;padding-top:14px;
    color:var(--muted);font-size:12.5px}
  .no-match{text-align:center;color:var(--muted);padding:40px 0}
  @media (max-width:860px){
    .layout{grid-template-columns:1fr}
    nav{position:static;max-height:none;border-right:0;border-bottom:1px solid var(--hairline)}
  }
</style></head><body>
<header>
  <a class="brand" href="#">design<span>-garden</span> 🌱</a>
  <input id="q" type="search" placeholder="Search the knowledge base…" oninput="filter()">
  <button id="lang" onclick="toggleLang()" title="切换语言 / switch language">中文</button>
  <a class="start" href="./start/" title="新手站 / beginner site">新手站 →</a>
  <a class="repo" href="https://github.com/iifzx/design-garden">GitHub ↗</a>
</header>
<div id="note" class="lang-note"></div>
<div class="layout">
  <nav id="nav">${navItems}</nav>
  <main id="main"></main>
</div>
<script>
const PAGES=${JSON.stringify(pageData)};
const UI={
 en:{search:"Search the knowledge base…",groups:{Router:"Router",Core:"Core",Domains:"Domains",Styles:"Styles","Case studies":"Case studies",Learnings:"Learnings",Guides:"Guides"},toggle:"中文",note:""},
 zh:{search:"搜索知识库…（标题/正文均可）",groups:{Router:"路由器",Core:"核心",Domains:"领域",Styles:"风格","Case studies":"案例",Learnings:"经验",Guides:"指南"},toggle:"English",note:"🌱 知识内容刻意保持英文（保证模型触发稳定性）；中文版新手指南与项目总览在下方「指南」区。"}
};
let LANG=localStorage.getItem("dg-lang");
if(!LANG){LANG=(navigator.language||"en").toLowerCase().indexOf("zh")===0?"zh":"en";}
function chipsFor(p){
  let c="";
  if(p.status) c+='<span class="chip '+(p.status==="core"?"s-core":p.status==="proven"?"s-proven":p.status==="experimental"?"s-exp":"s-local")+'">'+p.status+"</span>";
  if(p.category==="Guides"&&p.lang==="en") c+='<span class="chip s-lang">EN</span>';
  return c;
}
function show(id){
  const p=PAGES[id]; if(!p) return;
  document.getElementById("main").innerHTML=
    '<div class="page-head"><h1>'+p.title+'</h1><div class="meta">'+chipsFor(p)+
    '<span>'+p.file+'</span>'+(p.updated?'<span>updated '+p.updated+'</span>':"")+
    '<a href="https://github.com/iifzx/design-garden/blob/main/'+p.file+'">view source ↗</a></div></div>'
    + p.html +
    '<footer>design-garden knowledge base · <a href="https://github.com/iifzx/design-garden">github.com/iifzx/design-garden</a></footer>';
  window.scrollTo(0,0);
}
function langOk(el){
  const lang=el.dataset.lang||"en", pair=el.dataset.pair;
  if(LANG!=="zh") return lang!=="zh";
  if(lang==="en"&&pair){ return !document.querySelector('.nav-item[data-pair="'+pair+'"][data-lang="zh"]'); }
  return true;
}
function updateNav(){
  const q=(document.getElementById("q").value||"").trim().toLowerCase();
  let any=false;
  document.querySelectorAll(".nav-item").forEach(el=>{
    const visible=langOk(el)&&(!q||el.dataset.text.indexOf(q)>=0);
    el.classList.toggle("hidden",!visible); if(visible)any=true;
  });
  document.querySelectorAll(".nav-group").forEach(el=>{el.style.display=any?"":"none";});
  let empty=document.getElementById("no-match");
  if(!any){ if(!empty){empty=document.createElement("p");empty.id="no-match";empty.className="no-match";
    empty.textContent=LANG==="zh"?"没有匹配的知识——换个更短的词试试。":"No knowledge matches — try fewer words.";
    document.getElementById("nav").appendChild(empty);} }
  else if(empty) empty.remove();
}
function filter(){updateNav();}
function applyLang(){
  const t=UI[LANG];
  document.getElementById("q").placeholder=t.search;
  document.getElementById("lang").textContent=t.toggle;
  document.getElementById("note").textContent=t.note;
  document.getElementById("note").style.display=t.note?"block":"none";
  document.querySelectorAll(".nav-group").forEach(el=>{el.textContent=t.groups[el.dataset.group]||el.textContent;});
  localStorage.setItem("dg-lang",LANG);
}
function toggleLang(){LANG=LANG==="zh"?"en":"zh";applyLang();updateNav();}
applyLang();updateNav();
show(${JSON.stringify(pages[0]?.id ?? "")});
</script>
</body></html>`;

mkdirSync(OUT, { recursive: true });
writeFileSync(path.join(OUT, "index.html"), html);
writeFileSync(path.join(OUT, "stats.json"), JSON.stringify(stats, null, 2));
console.log(`site built: ${pages.length} pages → ${path.join(OUT, "index.html")}`);
console.log(`stats: ${JSON.stringify(stats)}`);
