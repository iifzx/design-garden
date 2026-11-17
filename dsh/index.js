// Design Garden for the DeepSeek Harness (dsh).
//
// This package is a dsh bundle, not a tool plugin: it contributes the design-garden
// skill to dsh's native skill catalog through `ctx.skills.registerProvider(...)`, so
// the model discovers it with the `skill` tool and loads the body on demand. The
// skill's relative resources (knowledge/, learnings/) resolve through `resourceBase`.
//
// Rank 600 matches dsh's `BUNDLED_SKILL_RANK`: a project skill (.dsh/skills or
// .agents/skills, ranks 100/200) or a user skill (~/.dsh/skills or ~/.agents/skills,
// ranks 400/500) with the same name shadows this packaged copy, which is what a
// user's own checkout should do.
//
// No runtime dependencies: dsh services arrive through `inject`, everything else is
// a Node builtin, so the same entry point works from a local `file:` install, a Git
// install, or an npm install.
import { existsSync, statSync } from "node:fs";
import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/** Directory holding this plugin module. */
const PLUGIN_DIR = dirname(fileURLToPath(import.meta.url));
/** Skill root shipped inside this package. */
const DEFAULT_SKILLS_DIR = join(PLUGIN_DIR, "skills");
/** Provider name, unique within the calling context's layer. */
const PROVIDER_NAME = "design-garden";
/** Prompt-visible origin bucket used by packaged providers. */
const SKILL_SOURCE = "bundled";
/** Packaged-provider precedence rank (dsh `BUNDLED_SKILL_RANK`). */
const SKILL_RANK = 600;
/** Skill body filename inside a skill bundle directory. */
const SKILL_FILE = "SKILL.md";
/** dsh's public skill-name grammar. */
const SKILL_NAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Cordis plugin name. */
export const name = "design-garden";
/** dsh services this plugin registers against. */
export const inject = ["skills"];

/**
 * Register the design-garden skill catalog on dsh.
 *
 * @param {object} ctx - Cordis context carrying the injected `skills` service.
 * @param {object} [config] - optional plugin configuration.
 * @param {string} [config.skillsDir] - absolute or cwd-relative skill root override.
 */
export function apply(ctx, config = {}) {
  const logger = createLogger(ctx);
  if (ctx?.skills === undefined) {
    logger.warn("the skills service is unavailable — design-garden was not registered");
    return;
  }
  const skillsDir = resolveSkillsDir(config);
  if (!isDirectory(skillsDir)) {
    logger.warn(`skill root not found at ${skillsDir} — design-garden was not registered`);
    return;
  }
  ctx.skills.registerProvider((control) => createProvider({ skillsDir, logger, control }));
  logger.info(`registered the design-garden skill catalog from ${skillsDir}`);
}

/**
 * Build a logger that cannot break activation when the logger service is missing.
 *
 * @param {object} ctx - Cordis context.
 * @returns {{info: Function, warn: Function, error: Function}} logger.
 */
function createLogger(ctx) {
  try {
    if (typeof ctx?.logger === "function") return ctx.logger(name);
  } catch {
    // Sparse composition: fall through to the console logger.
  }
  const prefix = `[${name}]`;
  return {
    info() {},
    warn(message) {
      console.warn(`${prefix} ${message}`);
    },
    error(message) {
      console.error(`${prefix} ${message}`);
    },
  };
}

/**
 * Resolve the skill root: an explicit config path wins, otherwise the copy shipped
 * next to this module.
 *
 * @param {object} config - raw plugin config.
 * @returns {string} absolute skill root.
 */
function resolveSkillsDir(config) {
  const configured = typeof config?.skillsDir === "string" ? config.skillsDir.trim() : "";
  if (configured === "") return DEFAULT_SKILLS_DIR;
  return isAbsolute(configured) ? configured : resolve(process.cwd(), configured);
}

/**
 * Return whether a path exists and is a directory.
 *
 * @param {string} path - absolute path.
 * @returns {boolean} whether the path is a directory.
 */
function isDirectory(path) {
  try {
    return existsSync(path) && statSync(path).isDirectory();
  } catch {
    return false;
  }
}

/**
 * Create the skill provider serving every bundle under the skill root.
 *
 * @param {object} options - provider inputs.
 * @param {string} options.skillsDir - absolute skill root.
 * @param {object} options.logger - plugin logger.
 * @param {object} options.control - registration-scoped provider control.
 * @returns {object} a `SkillProvider`.
 */
function createProvider({ skillsDir, logger, control }) {
  /** Absolute SKILL.md path → frontmatter parsed at that revision. */
  const cache = new Map();

  return {
    name: PROVIDER_NAME,
    async list(options) {
      throwIfAborted(control?.signal ?? options?.signal);
      let entries;
      try {
        entries = await readdir(skillsDir, { withFileTypes: true });
      } catch (error) {
        logger.warn(`cannot read the skill root ${skillsDir}: ${messageOf(error)}`);
        return [];
      }

      const candidates = [];
      for (const entry of entries) {
        if (entry.name.startsWith(".")) continue;
        let file;
        let directory;
        if (entry.isDirectory()) {
          file = join(skillsDir, entry.name, SKILL_FILE);
          directory = join(skillsDir, entry.name);
        } else if (entry.isFile() && entry.name.endsWith(".md")) {
          file = join(skillsDir, entry.name);
          directory = skillsDir;
        } else {
          continue;
        }
        const parsed = await readSkillMeta(file, cache, logger);
        if (parsed === null) continue;
        candidates.push({
          name: parsed.name,
          description: parsed.description,
          ...(parsed.whenToUse === undefined ? {} : { whenToUse: parsed.whenToUse }),
          invocation: parsed.invocation,
          provider: PROVIDER_NAME,
          source: SKILL_SOURCE,
          rank: SKILL_RANK,
          locator: { path: file, directory },
          resourceBase: { kind: "directory", path: directory },
          path: file,
        });
      }
      return candidates;
    },
    async get(candidate, options) {
      throwIfAborted(control?.signal ?? options?.signal);
      const locator = candidate?.locator;
      const file = typeof locator?.path === "string" ? locator.path : candidate?.path;
      if (typeof file !== "string") return undefined;
      const directory = typeof locator?.directory === "string" ? locator.directory : dirname(file);

      let raw;
      try {
        raw = await readFile(file, "utf8");
      } catch (error) {
        logger.warn(`cannot read ${file}: ${messageOf(error)}`);
        return undefined;
      }
      const parsed = parseSkillFile(raw);
      if (parsed === null) {
        logger.warn(`${file} has no usable name/description frontmatter — skill skipped`);
        return undefined;
      }
      return {
        name: parsed.name,
        description: parsed.description,
        ...(parsed.whenToUse === undefined ? {} : { whenToUse: parsed.whenToUse }),
        invocation: parsed.invocation,
        provider: PROVIDER_NAME,
        source: SKILL_SOURCE,
        resourceBase: { kind: "directory", path: directory },
        path: file,
        content: parsed.body,
      };
    },
  };
}

/**
 * Read and parse one skill file's frontmatter, reusing the previous parse while
 * the file's size and mtime are unchanged.
 *
 * @param {string} file - absolute SKILL.md path.
 * @param {Map} cache - parse cache owned by one provider.
 * @param {object} logger - plugin logger.
 * @returns {object|null} validated metadata, or `null` when unreadable or invalid.
 */
async function readSkillMeta(file, cache, logger) {
  let info;
  try {
    info = await stat(file);
  } catch {
    return null;
  }
  if (!info.isFile()) return null;

  const hit = cache.get(file);
  if (hit !== undefined && hit.mtimeMs === info.mtimeMs && hit.size === info.size) {
    return hit.meta;
  }

  let raw;
  try {
    raw = await readFile(file, "utf8");
  } catch (error) {
    logger.warn(`cannot read ${file}: ${messageOf(error)}`);
    return null;
  }

  const parsed = parseSkillFile(raw);
  let meta = null;
  if (parsed === null) {
    logger.warn(`${file} has no usable name/description frontmatter — skill skipped`);
  } else if (!SKILL_NAME_PATTERN.test(parsed.name)) {
    logger.warn(`${file}: "${parsed.name}" is not a valid kebab-case skill name — skill skipped`);
  } else {
    meta = parsed;
  }
  cache.set(file, { mtimeMs: info.mtimeMs, size: info.size, meta });
  return meta;
}

/**
 * Split a skill file into validated metadata and body.
 *
 * @param {string} raw - file content.
 * @returns {object|null} `{ name, description, whenToUse?, invocation, body }`.
 */
function parseSkillFile(raw) {
  const text = raw.charCodeAt(0) === 0xfeff ? raw.slice(1) : raw;
  const { fields, body } = parseFrontmatter(text);

  const skillName = fields.name;
  const description = fields.description;
  if (typeof skillName !== "string" || skillName === "") return null;
  if (typeof description !== "string" || description === "") return null;

  const modelFlag = readBoolean(fields["disable-model-invocation"]);
  const userFlag = readBoolean(fields["user-invocable"]);
  if (modelFlag === null || userFlag === null) return null;

  return {
    name: skillName,
    description,
    ...(typeof fields.whenToUse === "string" && fields.whenToUse !== ""
      ? { whenToUse: fields.whenToUse }
      : {}),
    invocation: {
      modelInvocable: modelFlag !== true,
      userInvocable: userFlag !== false,
    },
    body,
  };
}

/**
 * Parse the leading `---` fenced block and return the remaining body.
 *
 * @param {string} text - file content without a BOM.
 * @returns {{fields: object, body: string}} frontmatter fields and trimmed body.
 */
function parseFrontmatter(text) {
  const lines = text.split(/\r?\n/);
  if (lines[0]?.trim() !== "---") return { fields: {}, body: text.trim() };

  let end = -1;
  for (let index = 1; index < lines.length; index += 1) {
    if (lines[index].trim() === "---") {
      end = index;
      break;
    }
  }
  if (end === -1) return { fields: {}, body: text.trim() };

  const fields = {};
  for (let index = 1; index < end; index += 1) {
    const line = lines[index];
    if (/^\s/.test(line)) continue;
    const match = /^([A-Za-z0-9_-]+)\s*:\s*(.*)$/.exec(line);
    if (match === null) continue;
    const key = match[1];
    let value = match[2].trim();

    // Folded (`>`) and literal (`|`) block scalars: collect the following indented lines.
    if (/^[>|][+-]?$/.test(value)) {
      const folded = value.startsWith(">");
      const block = [];
      let next = index + 1;
      for (; next < end; next += 1) {
        const blockLine = lines[next];
        if (blockLine.trim() !== "" && !/^\s/.test(blockLine)) break;
        block.push(blockLine.trim());
      }
      index = next - 1;
      value = folded ? block.join(" ").trim() : block.join("\n").trim();
    } else {
      value = unquote(value);
    }
    fields[key] = value;
  }

  return { fields, body: lines.slice(end + 1).join("\n").trim() };
}

/** Strip one layer of matching quotes from a scalar value. */
function unquote(value) {
  if (value.length >= 2) {
    const first = value[0];
    const last = value[value.length - 1];
    if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
      return value.slice(1, -1);
    }
  }
  return value;
}

/**
 * Read a YAML-ish boolean the way dsh's filesystem provider does.
 *
 * @param {string|undefined} value - raw scalar.
 * @returns {boolean|null|undefined} parsed value, `null` when the spelling is invalid.
 */
function readBoolean(value) {
  if (value === undefined) return undefined;
  if (typeof value !== "string") return null;
  switch (value.trim().toLowerCase()) {
    case "true":
    case "yes":
    case "on":
    case "1":
      return true;
    case "false":
    case "no":
    case "off":
    case "0":
      return false;
    default:
      return null;
  }
}

/** Throw the caller's abort reason when the surrounding lookup was cancelled. */
function throwIfAborted(signal) {
  if (signal?.aborted) throw signal.reason ?? new Error("aborted");
}

/** Render an unknown thrown value as a message. */
function messageOf(error) {
  return error instanceof Error ? error.message : String(error);
}

export default { name, inject, apply };
