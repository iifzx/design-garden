import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const API = "https://api.github.com";
const TOKEN = process.env.GITHUB_TOKEN || "";
const REPO = process.env.GITHUB_REPOSITORY || "iifzx/design-garden";
const ISSUE_NUMBER = Number(process.env.ISSUE_NUMBER || 0);
const BASE_BRANCH = process.env.BASE_BRANCH || "main";
const [OWNER, NAME] = REPO.split("/");
const MAX_IMAGES = 3;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MIN_EDGE = 800;

const TYPE_MAP = [
  { keys: ["海报", "poster"], type: "海报", typeEn: "Poster" },
  { keys: ["网页", "web page", "webpage", "web"], type: "网页", typeEn: "Web page" },
  { keys: ["图标", "icon"], type: "图标", typeEn: "Icon" },
  { keys: ["品牌", "brand", "logo"], type: "品牌", typeEn: "Brand" },
  { keys: ["幻灯片", "slides", "slide", "ppt"], type: "幻灯片", typeEn: "Slides" },
  { keys: ["插画", "illustration"], type: "插画", typeEn: "Illustration" },
  { keys: ["其他", "other"], type: "其他", typeEn: "Other" },
];

const cleanText = (value) =>
  String(value || "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .replace(/\r/g, "")
    .replace(/^\s*[-*]\s*\[[ xX]\]\s*/gm, "")
    .trim();

const section = (body, label) => {
  const lines = String(body || "").split(/\r?\n/);
  const start = lines.findIndex(
    (line) => line.trim().startsWith("### ") && line.includes(label),
  );
  if (start < 0) return "";
  let end = start + 1;
  while (end < lines.length && !/^###\s/.test(lines[end])) end += 1;
  return cleanText(lines.slice(start + 1, end).join("\n"));
};

const normalizeType = (value) => {
  const lower = String(value || "").toLowerCase();
  const matches = TYPE_MAP.filter((entry) => entry.keys.some((key) => lower.includes(key)));
  if (matches.length !== 1) return null;
  return matches[0];
};

const normalizeTags = (value) =>
  String(value || "")
    .split(/[,，、;；]/)
    .map((tag) => tag.replace(/^#/, "").trim())
    .filter(Boolean)
    .slice(0, 6)
    .map((tag) => tag.slice(0, 24));

const imageUrls = (body) => {
  const found = [];
  const push = (url) => {
    const value = String(url || "").replace(/&amp;/g, "&").trim();
    if (!value || found.includes(value)) return;
    found.push(value);
  };
  for (const match of String(body || "").matchAll(/!\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/g)) {
    push(match[1]);
  }
  for (const match of String(body || "").matchAll(
    /(https?:\/\/github\.com\/user-attachments\/assets\/[A-Za-z0-9-]+)/g,
  )) {
    push(match[1]);
  }
  return found;
};

const isAllowedImageUrl = (value) => {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return false;
    if (url.hostname === "github.com" && url.pathname.startsWith("/user-attachments/assets/")) return true;
    if (url.hostname === "user-images.githubusercontent.com") return true;
    if (url.hostname === "private-user-images.githubusercontent.com") return true;
    return false;
  } catch {
    return false;
  }
};

export const probeImage = (buffer) => {
  if (!buffer || buffer.length < 12) return null;

  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    return {
      ext: "png",
      width: buffer.readUInt32BE(16),
      height: buffer.readUInt32BE(20),
    };
  }

  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset + 4 < buffer.length) {
      if (buffer[offset] !== 0xff) {
        offset += 1;
        continue;
      }
      const marker = buffer[offset + 1];
      if (marker === 0xd8 || marker === 0xd9 || marker === 0x01) {
        offset += 2;
        continue;
      }
      if (marker >= 0xd0 && marker <= 0xd7) {
        offset += 2;
        continue;
      }
      const length = buffer.readUInt16BE(offset + 2);
      if (length < 2) return null;
      if (
        [0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(
          marker,
        )
      ) {
        return {
          ext: "jpg",
          height: buffer.readUInt16BE(offset + 5),
          width: buffer.readUInt16BE(offset + 7),
        };
      }
      offset += 2 + length;
    }
    return null;
  }

  if (
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    const chunk = buffer.toString("ascii", 12, 16);
    if (chunk === "VP8X" && buffer.length >= 30) {
      return {
        ext: "webp",
        width: 1 + buffer.readUIntLE(24, 3),
        height: 1 + buffer.readUIntLE(27, 3),
      };
    }
    if (chunk === "VP8 " && buffer.length >= 30) {
      const offset = 20;
      if (buffer[offset + 3] !== 0x9d || buffer[offset + 4] !== 0x01 || buffer[offset + 5] !== 0x2a) {
        return null;
      }
      return {
        ext: "webp",
        width: buffer.readUInt16LE(offset + 6) & 0x3fff,
        height: buffer.readUInt16LE(offset + 8) & 0x3fff,
      };
    }
    if (chunk === "VP8L" && buffer.length >= 25) {
      const b0 = buffer[21];
      const b1 = buffer[22];
      const b2 = buffer[23];
      const b3 = buffer[24];
      return {
        ext: "webp",
        width: 1 + ((b0 | (b1 << 8)) & 0x3fff),
        height: 1 + (((b1 >> 6) | (b2 << 2) | (b3 << 10)) & 0x3fff),
      };
    }
  }

  return null;
};

export const parseSubmission = (body, meta = {}) => {
  const errors = [];
  const title = (section(body, "作品标题") || section(body, "Title") || "")
    .replace(/^\s*\[(作品|Work)\]\s*/i, "")
    .trim();
  const typeRaw = section(body, "类型") || section(body, "Type");
  const type = normalizeType(typeRaw);
  const description = section(body, "一句话说明") || section(body, "Three sentences");
  const descriptionEn = section(body, "English note") || section(body, "英文说明");
  const tags = normalizeTags(section(body, "标签") || section(body, "Tags"));
  const sourceRaw = section(body, "来源链接") || section(body, "Source");
  const urls = imageUrls(body);

  if (!title) errors.push("缺少作品标题 / Title is missing.");
  if (title.length < 4 || title.length > 120) {
    errors.push("标题需要 4–120 个字符 / Title must be 4–120 characters.");
  }
  if (!type) {
    errors.push("类型无法识别：请选 海报 / 网页 / 图标 / 品牌 / 其他。 / Type not recognized.");
  }
  if (!description) errors.push("缺少一句话说明 / Three sentences are missing.");
  if (description.length < 30 || description.length > 800) {
    errors.push("说明需要 30–800 个字符：背景 + 一个取舍 + 一个没解决的问题。 / Note must be 30–800 characters.");
  }
  if (descriptionEn && descriptionEn.length > 800) {
    errors.push("English note is longer than 800 characters.");
  }
  if (!urls.length) errors.push("缺少图片：请把 PNG/JPG/WebP 拖进 issue 正文。 / At least one image is required.");
  if (urls.length > MAX_IMAGES) errors.push(`最多 ${MAX_IMAGES} 张图片 / At most ${MAX_IMAGES} images.`);
  for (const url of urls) {
    if (!isAllowedImageUrl(url)) {
      errors.push(`只接受 GitHub issue 附件图片，不接受这个地址：${url}`);
    }
  }
  if (!/- \[[xX]\]\s*我同意/.test(body) && !/- \[[xX]\]\s*I agree/i.test(body)) {
    errors.push("请勾选授权框：同意以 CC BY 4.0 在作品馆展示并署名。 / Please check the license box.");
  }
  if (sourceRaw) {
    try {
      const url = new URL(sourceRaw);
      if (!["http:", "https:"].includes(url.protocol)) throw new Error("bad protocol");
    } catch {
      errors.push("来源链接需要是完整的 http(s) 地址 / Source must be a full http(s) URL.");
    }
  }

  const aiAssisted =
    /- \[[xX]\]\s*如果用了 AI/.test(body) || /- \[[xX]\]\s*AI-assisted/i.test(body);

  return {
    ok: errors.length === 0,
    errors,
    data: {
      id: meta.issue ? `issue-${meta.issue}` : "",
      issue: meta.issue || 0,
      title,
      type: type ? type.type : "",
      typeEn: type ? type.typeEn : "",
      tags: aiAssisted ? [...new Set([...tags, "AI-assisted"])] : tags,
      description,
      descriptionEn,
      author: meta.author || "",
      authorUrl: meta.authorUrl || "",
      images: [],
      sourceUrl: meta.sourceUrl || "",
      license: "CC BY 4.0",
      created: meta.created || "",
    },
    urls,
  };
};

const api = async (path, options = {}) => {
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "design-garden-intake",
    ...(options.headers || {}),
  };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;
  const response = await fetch(API + path, {
    ...options,
    headers,
  });
  if (!response.ok) {
    const text = await response.text();
    const error = new Error(`GitHub API ${response.status}: ${text.slice(0, 300)}`);
    error.status = response.status;
    throw error;
  }
  if (response.status === 204) return null;
  return response.json();
};

const comment = async (body) => {
  if (!ISSUE_NUMBER) return;
  const comments = await api(
    `/repos/${OWNER}/${NAME}/issues/${ISSUE_NUMBER}/comments?per_page=100`,
  );
  const existing = comments.find((item) => String(item.body || "").includes("<!-- community-intake -->"));
  if (existing) {
    await api(`/repos/${OWNER}/${NAME}/issues/comments/${existing.id}`, {
      method: "PATCH",
      body: JSON.stringify({ body }),
    });
  } else {
    await api(`/repos/${OWNER}/${NAME}/issues/${ISSUE_NUMBER}/comments`, {
      method: "POST",
      body: JSON.stringify({ body }),
    });
  }
};

const downloadImage = async (url, index) => {
  const response = await fetch(url, {
    headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {},
    redirect: "follow",
  });
  if (!response.ok) {
    throw new Error(`图片下载失败（${response.status}）：${url}`);
  }
  const declared = Number(response.headers.get("content-length") || 0);
  if (declared > MAX_IMAGE_BYTES) {
    throw new Error("图片超过 5 MB / Image is larger than 5 MB.");
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length > MAX_IMAGE_BYTES) {
    throw new Error("图片超过 5 MB / Image is larger than 5 MB.");
  }
  const info = probeImage(buffer);
  if (!info) throw new Error("无法读取图片尺寸，只接受 PNG/JPG/WebP / Unsupported image.");
  if (Math.min(info.width, info.height) < MIN_EDGE) {
    throw new Error(
      `图片最短边需要 ≥ ${MIN_EDGE}px（这张是 ${info.width}×${info.height}） / Shortest edge must be ≥ ${MIN_EDGE}px.`,
    );
  }
  return {
    ...info,
    buffer,
    filename: `${String(index + 1).padStart(2, "0")}.${info.ext}`,
    path: `community/assets/issue-${ISSUE_NUMBER}/${String(index + 1).padStart(2, "0")}.${info.ext}`,
  };
};

const createPr = async (data, images) => {
  const branch = `community/issue-${ISSUE_NUMBER}`;
  const jsonPath = `community/submissions/issue-${ISSUE_NUMBER}.json`;
  let parentSha;
  let baseTree;
  let branchExists = false;

  try {
    const branchRef = await api(`/repos/${OWNER}/${NAME}/git/ref/heads/${branch}`);
    parentSha = branchRef.object.sha;
    branchExists = true;
  } catch (error) {
    if (error.status !== 404) throw error;
  }

  if (!parentSha) {
    const baseRef = await api(`/repos/${OWNER}/${NAME}/git/ref/heads/${BASE_BRANCH}`);
    parentSha = baseRef.object.sha;
  }
  baseTree = (await api(`/repos/${OWNER}/${NAME}/git/commits/${parentSha}`)).tree.sha;

  data.images = images.map((image) => image.path);
  data.width = images[0].width;
  data.height = images[0].height;

  const blobs = [];
  const tree = [];
  for (const image of images) {
    const blob = await api(`/repos/${OWNER}/${NAME}/git/blobs`, {
      method: "POST",
      body: JSON.stringify({ content: image.buffer.toString("base64"), encoding: "base64" }),
    });
    tree.push({ path: image.path, mode: "100644", type: "blob", sha: blob.sha });
  }
  const jsonBlob = await api(`/repos/${OWNER}/${NAME}/git/blobs`, {
    method: "POST",
    body: JSON.stringify({
      content: Buffer.from(`${JSON.stringify(data, null, 2)}\n`).toString("base64"),
      encoding: "base64",
    }),
  });
  tree.push({ path: jsonPath, mode: "100644", type: "blob", sha: jsonBlob.sha });

  const newTree = await api(`/repos/${OWNER}/${NAME}/git/trees`, {
    method: "POST",
    body: JSON.stringify({ base_tree: baseTree, tree }),
  });
  const commit = await api(`/repos/${OWNER}/${NAME}/git/commits`, {
    method: "POST",
    body: JSON.stringify({
      message: `feat(community): intake issue #${ISSUE_NUMBER} — ${data.title}`,
      tree: newTree.sha,
      parents: [parentSha],
    }),
  });

  if (branchExists) {
    await api(`/repos/${OWNER}/${NAME}/git/refs/heads/${branch}`, {
      method: "PATCH",
      body: JSON.stringify({ sha: commit.sha }),
    });
  } else {
    await api(`/repos/${OWNER}/${NAME}/git/refs`, {
      method: "POST",
      body: JSON.stringify({ ref: `refs/heads/${branch}`, sha: commit.sha }),
    });
  }

  const pulls = await api(
    `/repos/${OWNER}/${NAME}/pulls?head=${encodeURIComponent(`${OWNER}:${branch}`)}&state=open&per_page=5`,
  );
  if (pulls.length) {
    return { number: pulls[0].number, branch, existing: true };
  }

  const pr = await api(`/repos/${OWNER}/${NAME}/pulls`, {
    method: "POST",
    body: JSON.stringify({
      title: `[community] ${data.title}`,
      head: branch,
      base: BASE_BRANCH,
      maintainer_can_modify: true,
      body:
        `从 issue #${ISSUE_NUMBER} 自动生成。\n\n` +
        `- [x] 图片已下载并通过类型 / 5 MB / 最短边 800px 检查\n` +
        `- [x] 标题、类型、说明、授权已填写\n` +
        `- [ ] 维护者人工检查版权、隐私与说明质量\n\n` +
        `合并后，\`scripts/build_start_site.mjs\` 会把作品加入 \`/start/\` 的作品馆。`,
    }),
  });
  return { number: pr.number, branch, existing: false };
};

const main = async () => {
  if (!ISSUE_NUMBER) throw new Error("ISSUE_NUMBER is missing.");
  if (!TOKEN) throw new Error("GITHUB_TOKEN is missing.");

  const issue = await api(`/repos/${OWNER}/${NAME}/issues/${ISSUE_NUMBER}`);
  if (issue.pull_request) {
    console.log("Skip pull request event.");
    return;
  }
  const body = String(issue.body || "");
  if (!body.includes("<!-- community-work -->")) {
    console.log("Not a community-work issue; skip.");
    return;
  }

  const parsed = parseSubmission(body, {
    issue: ISSUE_NUMBER,
    author: issue.user?.login || "",
    authorUrl: issue.user?.html_url || "",
    sourceUrl: issue.html_url || "",
    created: issue.created_at || "",
  });

  if (!parsed.ok) {
    await comment(
      `<!-- community-intake -->\n` +
        `这次没有通过自动检查：\n\n` +
        parsed.errors.map((error) => `- ${error}`).join("\n") +
        `\n\n直接编辑本 issue 修正，保存后会自动重试。模板：\`.github/ISSUE_TEMPLATE/community_work.md\`。`,
    );
    console.log("Validation failed:", parsed.errors.join("; "));
    return;
  }

  const images = [];
  try {
    for (const [index, url] of parsed.urls.entries()) {
      images.push(await downloadImage(url, index));
    }
  } catch (error) {
    await comment(
      `<!-- community-intake -->\n` +
        `图片检查失败：\`${String(error.message || error).slice(0, 300)}\`\n\n` +
        `请确认图片是 PNG/JPG/WebP、单张 ≤ 5 MB、最短边 ≥ 800px，并且是直接拖进 issue 的 GitHub 附件。修正后保存 issue 会自动重试。`,
    );
    throw error;
  }
  let result;
  try {
    result = await createPr(parsed.data, images);
  } catch (error) {
    await comment(
      `<!-- community-intake -->\n` +
        `自动生成 PR 失败：\`${String(error.message || error).slice(0, 300)}\`\n\n` +
        `维护者可以检查仓库设置 **Settings → Actions → General → Allow GitHub Actions to create and approve pull requests**，` +
        `或从 \`community/issue-${ISSUE_NUMBER}\` 分支手动开 PR。`,
    );
    throw error;
  }

  const prUrl = issue.html_url.replace(
    /\/issues\/\d+$/,
    `/pull/${result.number}`,
  );
  await comment(
    `<!-- community-intake -->\n` +
      `已收到投稿，并${result.existing ? "更新" : "生成"} PR #${result.number}：${prUrl}\n\n` +
      `维护者会检查三件事：是不是你的作品、图片能不能看清、说明里有没有背景/取舍/未解决的问题。通过后合并，下一轮站点构建就会出现在 \`/start/\` 的作品馆。\n\n` +
      `如果还想改，直接编辑本 issue；保存后会自动更新同一个 PR。`,
  );
  console.log(`Created/updated PR #${result.number} for issue #${ISSUE_NUMBER}`);
};

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  main().catch((error) => {
    console.error(error.stack || error.message);
    process.exitCode = 1;
  });
}
