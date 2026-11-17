import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { content as zh } from "../start/content.zh.mjs";
import { content as en } from "../start/content.en.mjs";
import { renderPage } from "../start/layout.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const START = join(ROOT, "start");
const COMMUNITY = join(ROOT, "community");
const OUT = join(ROOT, "site", "start");
const REPO = "https://github.com/iifzx/design-garden";

const readJson = (path) => {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    throw new Error(`Cannot read ${relative(ROOT, path)}: ${error.message}`);
  }
};

const walk = (dir, visit) => {
  for (const name of readdirSync(dir)) {
    if (name === ".git" || name === "node_modules" || name === ".DS_Store") continue;
    const full = join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full, visit);
    else visit(full);
  }
};

const mdCount = (dir, recursive = false) => {
  let count = 0;
  const countDir = (folder) => {
    for (const name of readdirSync(folder)) {
      const full = join(folder, name);
      const stat = statSync(full);
      if (stat.isDirectory()) {
        if (recursive) countDir(full);
      } else if (
        name.endsWith(".md") &&
        name !== "_TEMPLATE.md" &&
        name !== "INDEX.md"
      ) {
        count += 1;
      }
    }
  };
  countDir(dir);
  return count;
};

const stats = {
  core: mdCount(join(ROOT, "knowledge", "core")),
  domains: mdCount(join(ROOT, "knowledge", "domains")),
  styles: mdCount(join(ROOT, "knowledge", "styles")),
  cases: mdCount(join(ROOT, "knowledge", "case-studies")),
  learnings: mdCount(join(ROOT, "learnings")),
  knowledgeFiles: mdCount(join(ROOT, "knowledge"), true),
};

const styles = readdirSync(join(ROOT, "knowledge", "styles"))
  .filter((name) => name.endsWith(".md") && name !== "_TEMPLATE.md")
  .map((name) => {
    const md = readFileSync(join(ROOT, "knowledge", "styles", name), "utf8");
    const title = (md.match(/^#\s+(.+)$/m) || [])[1] || name.replace(/\.md$/, "");
    const status = (md.match(/^status:\s*(\S+)/m) || [])[1] || "";
    return {
      slug: name.replace(/\.md$/, ""),
      title: title.replace(/<!--.*?-->/g, "").trim(),
      status,
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title, "en"));

const featuredJson = readJson(join(COMMUNITY, "featured.json"));
const themesJson = readJson(join(COMMUNITY, "themes.json"));
const votesJson = readJson(join(COMMUNITY, "votes.json"));
const voteCounts = votesJson.counts || {};

rmSync(OUT, { recursive: true, force: true });
mkdirSync(join(OUT, "assets"), { recursive: true });
mkdirSync(join(OUT, "en"), { recursive: true });
mkdirSync(join(OUT, "downloads"), { recursive: true });
cpSync(join(START, "assets"), join(OUT, "assets"), { recursive: true });

const featured = featuredJson.items.map((item) => {
  if (!item.id || !item.title || !item.image || !item.source) {
    throw new Error("community/featured.json: id, title, image and source are required");
  }
  const sourcePath = join(ROOT, item.image);
  if (!existsSync(sourcePath)) {
    throw new Error(`Featured image missing: ${item.image}`);
  }
  const destRel = `assets/featured/${item.id}${extname(item.image)}`;
  cpSync(sourcePath, join(OUT, destRel));
  return {
    ...item,
    imagePath: destRel,
    sourceUrl: `${REPO}/blob/main/${item.source}`,
  };
});

const submissionsDir = join(COMMUNITY, "submissions");
const submissions = readdirSync(submissionsDir)
  .filter((name) => /^issue-\d+\.json$/.test(name))
  .map((name) => {
    const item = readJson(join(submissionsDir, name));
    if (!item.issue || !item.title) {
      throw new Error(`community/submissions/${name}: issue and title are required`);
    }
    const id = item.id && /^issue-\d+$/.test(item.id) ? item.id : `issue-${item.issue}`;
    const images = [];
    for (const image of item.images || []) {
      const value = String(image).replace(/^\.\//, "");
      if (/^https?:/.test(value)) {
        images.push({ path: value, remote: true });
        continue;
      }
      const source = join(COMMUNITY, value);
      if (!existsSync(source)) {
        console.warn(`Missing community image: ${value}`);
        continue;
      }
      const destRel = `assets/community/${id}/${basename(value)}`;
      mkdirSync(join(OUT, dirname(destRel)), { recursive: true });
      cpSync(source, join(OUT, destRel));
      images.push({ path: destRel, remote: false });
    }
    return {
      ...item,
      id,
      images,
      sourceUrl:
        item.sourceUrl || `${REPO}/issues/${item.issue}`,
      votes: voteCounts[id] || 0,
      created: item.created || "",
    };
  })
  .sort((a, b) => String(b.created).localeCompare(String(a.created)));

const pageData = (base, content) => ({
  base,
  lang: content.lang,
  repo: REPO,
  generated: new Date().toISOString().slice(0, 10),
  stats,
  featured: featured.map((item) => ({
    ...item,
    imageUrl: item.imagePath ? base + item.imagePath : "",
  })),
  submissions: submissions.map((item) => ({
    ...item,
    imageUrl: item.images[0]
      ? item.images[0].remote
        ? item.images[0].path
        : base + item.images[0].path
      : "",
    images: item.images.map((image) =>
      image.remote ? image.path : base + image.path,
    ),
  })),
  theme: themesJson.current || {},
  rules: themesJson.rules || [],
  rulesEn: themesJson.rulesEn || [],
  votes: votesJson,
  styles,
  ui: content.ui,
});

writeFileSync(
  join(OUT, "index.html"),
  renderPage(zh, pageData("./", zh), "./"),
);
writeFileSync(
  join(OUT, "en", "index.html"),
  renderPage(en, pageData("../", en), "../"),
);

writeFileSync(
  join(OUT, "data.json"),
  JSON.stringify(
    {
      generated: new Date().toISOString(),
      stats,
      featured: featured.map(({ imageUrl, ...item }) => item),
      submissions: submissions.map(({ imageUrl, ...item }) => item),
      theme: themesJson.current || {},
      votes: votesJson,
      styles,
    },
    null,
    2,
  ) + "\n",
);

// Minimal, dependency-free ZIP writer (store method; UTF-8 names).
let crcTable;
const crc32 = (buffer) => {
  if (!crcTable) {
    crcTable = new Uint32Array(256);
    for (let n = 0; n < 256; n += 1) {
      let c = n;
      for (let k = 0; k < 8; k += 1) {
        c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      }
      crcTable[n] = c >>> 0;
    }
  }
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
};

const makeZip = (entries) => {
  const local = [];
  const central = [];
  let offset = 0;
  for (const entry of entries) {
    const name = Buffer.from(entry.name.replace(/\\/g, "/"), "utf8");
    const data = Buffer.isBuffer(entry.data)
      ? entry.data
      : Buffer.from(entry.data);
    const crc = crc32(data);
    const header = Buffer.alloc(30);
    header.writeUInt32LE(0x04034b50, 0);
    header.writeUInt16LE(20, 4);
    header.writeUInt16LE(0x0800, 6);
    header.writeUInt16LE(0, 8);
    header.writeUInt16LE(0, 10);
    header.writeUInt16LE(0x21, 12);
    header.writeUInt32LE(crc, 14);
    header.writeUInt32LE(data.length, 18);
    header.writeUInt32LE(data.length, 22);
    header.writeUInt16LE(name.length, 26);
    header.writeUInt16LE(0, 28);
    local.push(header, name, data);

    const cd = Buffer.alloc(46);
    cd.writeUInt32LE(0x02014b50, 0);
    cd.writeUInt16LE(20, 4);
    cd.writeUInt16LE(20, 6);
    cd.writeUInt16LE(0x0800, 8);
    cd.writeUInt16LE(0, 10);
    cd.writeUInt16LE(0, 12);
    cd.writeUInt16LE(0x21, 14);
    cd.writeUInt32LE(crc, 16);
    cd.writeUInt32LE(data.length, 20);
    cd.writeUInt32LE(data.length, 24);
    cd.writeUInt16LE(name.length, 28);
    cd.writeUInt16LE(0, 30);
    cd.writeUInt16LE(0, 32);
    cd.writeUInt16LE(0, 34);
    cd.writeUInt16LE(0, 36);
    cd.writeUInt32LE(0, 38);
    cd.writeUInt32LE(offset, 42);
    central.push(cd, name);

    offset += header.length + name.length + data.length;
  }
  const centralSize = central.reduce((sum, buffer) => sum + buffer.length, 0);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4);
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(centralSize, 12);
  end.writeUInt32LE(offset, 16);
  end.writeUInt16LE(0, 20);
  return Buffer.concat([...local, ...central, end]);
};

const addTree = (root, prefix, entries) => {
  walk(root, (full) => {
    const rel = relative(root, full).replace(/\\/g, "/");
    entries.push({
      name: `${prefix}/${rel}`,
      data: readFileSync(full),
    });
  });
};

const skillEntries = [];
for (const name of ["SKILL.md", "README.md", "LICENSE", "CONTRIBUTING.md"]) {
  const file = join(ROOT, name);
  if (existsSync(file)) {
    skillEntries.push({ name: `design-garden/${name}`, data: readFileSync(file) });
  }
}
addTree(join(ROOT, "knowledge"), "design-garden/knowledge", skillEntries);
addTree(join(ROOT, "learnings"), "design-garden/learnings", skillEntries);
const skillZip = makeZip(skillEntries);
writeFileSync(join(OUT, "downloads", "design-garden-skill.zip"), skillZip);

const dshEntries = [];
addTree(join(ROOT, "dsh"), "dsh", dshEntries);
const dshZip = makeZip(dshEntries);
writeFileSync(join(OUT, "downloads", "dsh-design-garden.zip"), dshZip);

console.log(
  `Built ${relative(ROOT, OUT)}: ${featured.length} featured, ${submissions.length} community, ` +
    `${skillZip.length} B skill zip, ${dshZip.length} B dsh zip`,
);
