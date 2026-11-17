#!/usr/bin/env node
/**
 * design-garden :: shoot — render a deliverable at the sizes it will be judged at.
 *
 * Hard dependencies: none.
 *   1. Playwright if installed (simplest, handles everything).
 *   2. Local Chrome/Edge driven over the DevTools Protocol (exact viewports incl. 375px,
 *      full-page, per-screen slices) — no npm packages needed.
 *   3. Last resort: Chrome/Edge `--screenshot` CLI, viewport only, no sub-500px widths.
 *
 * Usage:
 *   node scripts/shoot.mjs <file.html> [options]
 *
 * Options:
 *   --domain <d>    viewport preset: ui-web | ui-mobile | poster-banner | slides | icon |
 *                   data-viz | video-motion | illustration-art | logo-brand
 *   --size <list>   explicit sizes, e.g. 1440x900,375x812 (overrides the preset)
 *   --out <dir>     output directory, default: <file dir>/shots
 *   --full          full-page capture
 *   --screens       slice the page into viewport-height screens
 *   --wait <ms>     settle time after load, default 600
 *   --scale <n>     device scale factor, default 1
 *   --json          machine-readable result on stdout
 *
 * Exit codes: 0 = captured, 1 = usage/file error, 2 = no renderer (degraded mode).
 */
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { mkdir, readFile, writeFile, stat } from "node:fs/promises";
import { spawn } from "node:child_process";
import os from "node:os";
import path from "node:path";

const PRESETS = {
  "ui-web": [[1440, 900], [375, 812]],
  "ui-mobile": [[390, 844]],
  "poster-banner": [[1080, 1350]],
  slides: [[1920, 1080]],
  icon: [[512, 512]],
  "data-viz": [[1200, 800]],
  "video-motion": [[1920, 1080]],
  "illustration-art": [[1200, 1200]],
  "logo-brand": [[1200, 800]],
};

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".htm": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".ico": "image/x-icon",
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function usage(exitCode = 0) {
  const out = exitCode ? console.error : console.log;
  out(`design-garden shoot — render a deliverable at the sizes it will be judged at.

Usage:
  node scripts/shoot.mjs <file.html> [options]

Options:
  --domain <d>    viewport preset: ${Object.keys(PRESETS).join(" | ")}
  --size <list>   explicit sizes, e.g. 1440x900,375x812
  --out <dir>     output directory (default: <file dir>/shots)
  --full          full-page capture
  --screens       slice into viewport-height screens
  --wait <ms>     settle time after load (default 600)
  --scale <n>     device scale factor (default 1)
  --json          machine-readable result

Renderer order: Playwright → local Chrome/Edge over CDP → Chrome CLI screenshot.
Exit 2 means "no renderer" — continue in degraded mode, do not fail the task.`);
  process.exit(exitCode);
}

function parseArgs(argv) {
  const opts = { file: null, domain: null, sizes: null, out: null, full: false, screens: false, wait: 600, scale: 1, json: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--help" || a === "-h") usage(0);
    else if (a === "--json") opts.json = true;
    else if (a === "--full") opts.full = true;
    else if (a === "--screens") opts.screens = true;
    else if (a === "--domain") opts.domain = argv[++i];
    else if (a === "--size") opts.sizes = argv[++i];
    else if (a === "--out") opts.out = argv[++i];
    else if (a === "--wait") opts.wait = Number(argv[++i]);
    else if (a === "--scale") opts.scale = Number(argv[++i]);
    else if (!a.startsWith("-") && !opts.file) opts.file = a;
    else {
      console.error(`Unknown option: ${a}`);
      usage(1);
    }
  }
  if (!opts.file) usage(1);
  if (opts.domain && !PRESETS[opts.domain]) {
    console.error(`Unknown domain "${opts.domain}". Known: ${Object.keys(PRESETS).join(", ")}`);
    process.exit(1);
  }
  if (opts.sizes) {
    const parsed = opts.sizes.split(",").map((s) => {
      const m = s.trim().match(/^(\d+)x(\d+)$/);
      return m ? [Number(m[1]), Number(m[2])] : null;
    });
    if (parsed.some((p) => !p)) {
      console.error(`Bad --size "${opts.sizes}". Expected e.g. 1440x900,375x812`);
      process.exit(1);
    }
    opts.parsedSizes = parsed;
  }
  if (!Number.isFinite(opts.wait) || opts.wait < 0) opts.wait = 600;
  if (!Number.isFinite(opts.scale) || opts.scale <= 0) opts.scale = 1;
  return opts;
}

async function assertFile(file) {
  const abs = path.resolve(file);
  if (!existsSync(abs)) {
    console.error(`No such file: ${abs}`);
    process.exit(1);
  }
  const s = await stat(abs);
  if (!s.isFile() || !/\.html?$/i.test(abs)) {
    console.error(`shoot.mjs expects an .html file, got ${abs}`);
    process.exit(1);
  }
  return abs;
}

function safeJoin(root, target) {
  const abs = path.resolve(root, "." + path.sep + target);
  if (abs !== root && !abs.startsWith(root + path.sep)) return null;
  return abs;
}

function startServer(root) {
  return new Promise((resolve, reject) => {
    const server = createServer(async (req, res) => {
      try {
        const url = new URL(req.url || "/", "http://localhost");
        const rel = decodeURIComponent(url.pathname).replace(/^\/+/, "") || "index.html";
        const file = safeJoin(root, rel);
        if (!file) {
          res.writeHead(403).end("forbidden");
          return;
        }
        const body = await readFile(file);
        res.writeHead(200, {
          "content-type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream",
          "cache-control": "no-store",
        });
        res.end(body);
      } catch {
        res.writeHead(404).end("not found");
      }
    });
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

function chromeCandidates() {
  const env = process.env.CHROME_PATH || process.env.BROWSER_PATH;
  const list = env ? [env] : [];
  const home = os.homedir();
  if (process.platform === "win32") {
    const pf = process.env.ProgramFiles || "C:\\Program Files";
    const pf86 = process.env["ProgramFiles(x86)"] || "C:\\Program Files (x86)";
    const local = process.env.LOCALAPPDATA || path.join(home, "AppData", "Local");
    list.push(
      path.join(pf, "Google", "Chrome", "Application", "chrome.exe"),
      path.join(pf86, "Google", "Chrome", "Application", "chrome.exe"),
      path.join(local, "Google", "Chrome", "Application", "chrome.exe"),
      path.join(pf, "Microsoft", "Edge", "Application", "msedge.exe"),
      path.join(pf86, "Microsoft", "Edge", "Application", "msedge.exe"),
      path.join(local, "Microsoft", "Edge", "Application", "msedge.exe")
    );
  } else if (process.platform === "darwin") {
    list.push(
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
      "/Applications/Chromium.app/Contents/MacOS/Chromium"
    );
  } else {
    list.push("/usr/bin/google-chrome", "/usr/bin/google-chrome-stable", "/usr/bin/chromium", "/usr/bin/chromium-browser", "/usr/bin/microsoft-edge");
  }
  for (const p of list) if (p && existsSync(p)) return p;
  const pathExt = process.platform === "win32" ? (process.env.PATHEXT || ".EXE").split(";") : [""];
  const names = ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser", "microsoft-edge", "msedge"];
  for (const dir of (process.env.PATH || "").split(path.delimiter)) {
    for (const name of names) {
      for (const ext of pathExt) {
        const p = path.join(dir, name + (process.platform === "win32" ? ext : ""));
        if (existsSync(p)) return p;
      }
    }
  }
  return null;
}

async function loadPlaywright(cwd) {
  for (const name of ["playwright", "playwright-core"]) {
    try {
      const mod = await import(name);
      if (mod?.chromium) return mod;
    } catch {}
    try {
      const req = createRequire(path.join(cwd, "package.json"));
      const mod = req(name);
      if (mod?.chromium) return mod;
    } catch {}
  }
  return null;
}

/* ------------------------------- Playwright -------------------------------- */

async function createPlaywrightRenderer(pw) {
  const browser = await pw.chromium.launch();
  return {
    name: "playwright",
    async shoot(url, out, { width, height, scale, wait, full, screens }) {
      const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: scale });
      const shots = [];
      let pageHeight = 0;
      try {
        await page.goto(url, { waitUntil: "load", timeout: 30000 });
        await page.evaluate(async () => {
          if (document.fonts?.ready) await document.fonts.ready;
          await Promise.all(
            Array.from(document.images)
              .filter((img) => !img.complete)
              .map((img) => new Promise((r) => { img.onload = img.onerror = r; }))
          );
        });
        await page.waitForTimeout(wait);
        pageHeight = await page.evaluate(() => Math.max(document.body?.scrollHeight || 0, document.documentElement?.scrollHeight || 0, window.innerHeight));
        if (screens) {
          let index = 0;
          for (let y = 0; y < pageHeight; y += height) {
            const slice = Math.min(height, pageHeight - y);
            const file = out.replace(/\.png$/i, `-screen-${String(index + 1).padStart(2, "0")}.png`);
            await page.screenshot({ path: file, clip: { x: 0, y, width, height: slice } });
            shots.push({ file, width, height: slice, label: `screen ${index + 1}` });
            index++;
            if (index > 40) break;
          }
        } else {
          await page.screenshot({ path: out, fullPage: !!full });
          shots.push({ file: out, width, height: full ? pageHeight : height, label: full ? "full page" : "viewport" });
        }
        return { pageHeight, screens: screens ? shots.length : 0, shots };
      } finally {
        await page.close();
      }
    },
    async close() {
      await browser.close();
    },
  };
}

/* ------------------------------ Chrome via CDP ----------------------------- */

class Cdp {
  constructor(ws) {
    this.ws = ws;
    this.nextId = 0;
    this.pending = new Map();
    this.waiters = new Map();
    ws.addEventListener("message", (ev) => {
      let msg;
      try {
        msg = JSON.parse(ev.data);
      } catch {
        return;
      }
      if (msg.id) {
        const p = this.pending.get(msg.id);
        if (!p) return;
        this.pending.delete(msg.id);
        msg.error ? p.reject(new Error(msg.error.message)) : p.resolve(msg.result);
      } else if (msg.method) {
        const list = this.waiters.get(msg.method);
        if (list) {
          this.waiters.delete(msg.method);
          for (const fn of list) fn(msg.params);
        }
      }
    });
  }
  static async connect(url) {
    const ws = new WebSocket(url);
    await new Promise((resolve, reject) => {
      ws.addEventListener("open", resolve, { once: true });
      ws.addEventListener("error", () => reject(new Error("CDP socket failed")), { once: true });
    });
    return new Cdp(ws);
  }
  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = ++this.nextId;
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  waitFor(method, timeout = 30000) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error(`timeout waiting for ${method}`)), timeout);
      const list = this.waiters.get(method) || [];
      list.push((params) => {
        clearTimeout(timer);
        resolve(params);
      });
      this.waiters.set(method, list);
    });
  }
  close() {
    try {
      this.ws.close();
    } catch {}
  }
}

async function createCdpRenderer(bin) {
  const tmp = mkdtempSync(path.join(os.tmpdir(), "dg-cdp-"));
  const child = spawn(
    bin,
    ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", "--no-default-browser-check", "--mute-audio", "--remote-debugging-port=0", `--user-data-dir=${tmp}`, "about:blank"],
    { stdio: ["ignore", "ignore", "pipe"] }
  );
  child.stderr.on("data", () => {});
  const portFile = path.join(tmp, "DevToolsActivePort");
  for (let i = 0; i < 150; i++) {
    if (existsSync(portFile)) break;
    await sleep(100);
  }
  if (!existsSync(portFile)) throw new Error("Chrome did not expose a debugging port");
  const port = Number(readFileSync(portFile, "utf8").trim().split(/\r?\n/)[0]);
  if (!port) throw new Error("Bad DevToolsActivePort");
  const tab = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: "PUT" })).json();
  if (!tab.webSocketDebuggerUrl) throw new Error("Chrome refused a new tab");
  const cdp = await Cdp.connect(tab.webSocketDebuggerUrl);
  await cdp.send("Page.enable");

  return {
    name: "chrome-cdp",
    async shoot(url, out, { width, height, scale, wait, full, screens }) {
      await cdp.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: scale, mobile: false });
      const loaded = cdp.waitFor("Page.loadEventFired", 12000).catch(() => null);
      const nav = await cdp.send("Page.navigate", { url });
      if (nav?.errorText) throw new Error(nav.errorText);
      await loaded;
      for (let i = 0; i < 100; i++) {
        const state = await cdp.send("Runtime.evaluate", { expression: "document.readyState", returnByValue: true }).catch(() => null);
        if (!state || state.result?.value === "complete") break;
        await sleep(150);
      }
      await cdp.send("Runtime.evaluate", {
        expression: `(async()=>{
          await new Promise(r=>setTimeout(r,${Math.max(200, wait)}));
          if(document.fonts&&document.fonts.ready) await document.fonts.ready;
          await Promise.all(Array.from(document.images).filter(i=>!i.complete).map(i=>new Promise(r=>{i.onload=i.onerror=r;})));
        })()`,
        awaitPromise: true,
      });
      const metrics = await cdp.send("Page.getLayoutMetrics");
      const contentHeight = Math.ceil(metrics.cssContentSize?.height || height);
      const pageHeight = Math.min(20000, Math.max(height, contentHeight));
      const shots = [];
      const capture = async (file, clip) => {
        const params = { format: "png", fromSurface: true, captureBeyondViewport: !!clip };
        if (clip) params.clip = { x: 0, y: 0, ...clip, scale: 1 };
        const res = await cdp.send("Page.captureScreenshot", params);
        await writeFile(file, Buffer.from(res.data, "base64"));
      };
      if (screens) {
        let index = 0;
        for (let y = 0; y < pageHeight; y += height) {
          const slice = Math.min(height, pageHeight - y);
          const file = out.replace(/\.png$/i, `-screen-${String(index + 1).padStart(2, "0")}.png`);
          await capture(file, { x: 0, y, width, height: slice });
          shots.push({ file, width, height: slice, label: `screen ${index + 1}` });
          index++;
          if (index > 40) break;
        }
      } else if (full) {
        await capture(out, { x: 0, y: 0, width, height: pageHeight });
        shots.push({ file: out, width, height: pageHeight, label: "full page" });
      } else {
        await capture(out, null);
        shots.push({ file: out, width, height, label: "viewport" });
      }
      return { pageHeight, screens: screens ? shots.length : 0, shots };
    },
    async close() {
      cdp.close();
      try {
        await fetch(`http://127.0.0.1:${port}/json/close/${tab.id}`);
      } catch {}
      await new Promise((resolve) => {
        const done = () => resolve();
        child.once("exit", done);
        try {
          child.kill();
        } catch {
          done();
        }
        setTimeout(done, 2000);
      });
      for (let i = 0; i < 4; i++) {
        try {
          rmSync(tmp, { recursive: true, force: true, maxRetries: 2, retryDelay: 150 });
          break;
        } catch {
          await sleep(250);
        }
      }
    },
  };
}

/* ------------------------------- Chrome CLI -------------------------------- */

function createCliRenderer(bin) {
  return {
    name: "chrome-cli",
    async shoot(url, out, { width, height, scale, wait }) {
      const tmp = mkdtempSync(path.join(os.tmpdir(), "dg-shot-"));
      const args = [
        "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", "--no-default-browser-check",
        "--disable-extensions", "--mute-audio", `--user-data-dir=${tmp}`, `--window-size=${width},${height}`,
        `--force-device-scale-factor=${scale}`, `--virtual-time-budget=${Math.max(1500, wait + 900)}`,
        `--screenshot=${out}`, url,
      ];
      try {
        await new Promise((resolve, reject) => {
          const child = spawn(bin, args, { stdio: ["ignore", "ignore", "pipe"] });
          let stderr = "";
          child.stderr.on("data", (d) => (stderr += d.toString()));
          child.on("error", reject);
          child.on("close", (code) => (existsSync(out) ? resolve() : reject(new Error((stderr || `chrome exited with ${code}`).slice(-600)))));
        });
      } finally {
        rmSync(tmp, { recursive: true, force: true });
      }
      return { pageHeight: height, screens: 0, shots: [{ file: out, width, height, label: "viewport" }] };
    },
    async close() {},
  };
}

/* --------------------------------- Sheet ----------------------------------- */

function sheetHtml(file, captures, renderer) {
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  const cards = captures
    .map(
      (c) => `<figure>
  <figcaption>${esc(c.label)} <span>${c.width}×${c.height}</span></figcaption>
  <img src="${esc(path.basename(c.file))}" alt="${esc(c.label)}">
</figure>`
    )
    .join("\n");
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>design-garden · ${esc(path.basename(file))}</title>
<style>
  *{box-sizing:border-box}
  body{margin:0;background:#f3f1ec;color:#1b1b1b;font:14px/1.45 ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif}
  header{padding:24px 32px 8px;display:flex;justify-content:space-between;align-items:baseline;gap:24px;border-bottom:1px solid #d8d4cb}
  h1{font-size:18px;margin:0;font-weight:600}
  .meta{color:#666;font-size:12px}
  main{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;padding:24px 32px 40px}
  figure{margin:0;background:#fff;border:1px solid #ddd8ce;border-radius:6px;padding:10px;break-inside:avoid}
  figcaption{display:flex;justify-content:space-between;font-size:12px;color:#333;margin-bottom:8px}
  figcaption span{color:#888}
  img{display:block;width:100%;height:380px;object-fit:contain;object-position:top center;background:#fafafa}
</style></head>
<body>
<header><h1>${esc(path.basename(file))}</h1><div class="meta">${esc(renderer)} · ${captures.length} captures</div></header>
<main>${cards}</main>
</body></html>`;
}

/* --------------------------------- Main ------------------------------------ */

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const file = await assertFile(opts.file);
  const sizes = opts.parsedSizes || PRESETS[opts.domain] || PRESETS["ui-web"];
  const outDir = path.resolve(opts.out || path.join(path.dirname(file), "shots"));
  await mkdir(outDir, { recursive: true });

  const pw = await loadPlaywright(process.cwd());
  const chrome = pw ? null : chromeCandidates();
  let renderer = null;
  let notes = [];

  if (pw) renderer = await createPlaywrightRenderer(pw);
  else if (chrome && typeof WebSocket === "function") {
    try {
      renderer = await createCdpRenderer(chrome);
    } catch (e) {
      notes.push(`CDP failed (${e.message}); falling back to Chrome CLI.`);
    }
  }
  if (!renderer && chrome) renderer = createCliRenderer(chrome);

  if (!renderer) {
    const note =
      "No renderer found. Install playwright (npm i -D playwright) or set CHROME_PATH to Chrome/Edge.\n" +
      "Degraded mode: run the GATE against the code and state what you could not verify.";
    if (opts.json) console.log(JSON.stringify({ ok: false, reason: "no-renderer", degraded: true, note }, null, 2));
    else console.error(note);
    process.exit(2);
  }

  if (renderer.name === "chrome-cli") {
    notes.push("Chrome CLI fallback is approximate: viewport minus window chrome, no sub-500px widths, no full page. Install Playwright for exact mobile verification.");
  }

  const server = await startServer(path.dirname(file));
  const port = server.address().port;
  const url = `http://127.0.0.1:${port}/${encodeURIComponent(path.basename(file))}`;
  const captures = [];
  let pageHeight = 0;
  let screens = 0;

  for (const [width, height] of sizes) {
    if (renderer.name === "chrome-cli" && width < 500) {
      notes.push(`Skipped ${width}×${height}: Chrome CLI cannot go below a 500px window.`);
      continue;
    }
    const base = `${path.basename(file, path.extname(file))}-${width}x${height}`;
    const out = path.join(outDir, `${base}.png`);
    const result = await renderer.shoot(url, out, { width, height, scale: opts.scale, wait: opts.wait, full: opts.full, screens: opts.screens });
    pageHeight = Math.max(pageHeight, result.pageHeight || 0);
    screens += result.screens || 0;
    for (const s of result.shots) captures.push({ ...s, cssWidth: width, cssHeight: height });
  }
  server.close();

  if (!captures.length) {
    if (opts.json) console.log(JSON.stringify({ ok: false, reason: "nothing-captured", renderer: renderer.name, notes }, null, 2));
    else console.error(`Nothing captured with ${renderer.name}.\n${notes.join("\n")}`);
    await Promise.resolve(renderer.close()).catch(() => {});
    process.exit(2);
  }

  let sheet = null;
  if (captures.length > 1) {
    sheet = path.join(outDir, "sheet.html");
    await writeFile(sheet, sheetHtml(file, captures, renderer.name), "utf-8");
    const sheetPng = path.join(outDir, "sheet.png");
    const sheetServer = await startServer(outDir);
    const sheetUrl = `http://127.0.0.1:${sheetServer.address().port}/sheet.html`;
    try {
      await renderer.shoot(sheetUrl, sheetPng, { width: 1500, height: 1000, scale: 1, wait: 200, full: true, screens: false });
      sheet = sheetPng;
    } catch {
      sheet = null;
    } finally {
      sheetServer.close();
    }
  }
  await Promise.resolve(renderer.close()).catch(() => {});

  const result = {
    ok: true,
    file,
    renderer: renderer.name,
    domain: opts.domain || null,
    sizes,
    pageHeight: pageHeight || null,
    screens,
    outDir,
    shots: captures.map((c) => ({ file: c.file, label: c.label, width: c.width, height: c.height })),
    sheet,
    notes,
  };

  if (opts.json) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.log(`Rendered ${captures.length} capture(s) with ${renderer.name} → ${outDir}`);
    for (const c of captures) console.log(`  ${path.basename(c.file)}  ${c.width}×${c.height}  ${c.label}`);
    if (sheet) console.log(`  sheet.png  ← look at this first`);
    for (const n of notes) console.log(`Note: ${n}`);
  }
  process.exit(0);
}

main().catch((e) => {
  console.error(`shoot failed: ${e.message}`);
  process.exit(1);
});
