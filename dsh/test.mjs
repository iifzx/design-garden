#!/usr/bin/env node
/**
 * Offline smoke test for the dsh bundle: fake the Cordis context, activate the
 * plugin, then exercise the registered provider exactly as dsh's registry does.
 *
 * Run: node dsh/test.mjs
 */
import assert from "node:assert/strict";
import { apply } from "./index.js";

const providers = [];
const logs = [];
const signal = new AbortController().signal;
const ctx = {
  skills: {
    registerProvider(factory) {
      providers.push(factory({ signal, invalidate() {} }));
    },
  },
  logger: () => ({
    info: (message) => logs.push(`info: ${message}`),
    warn: (message) => logs.push(`warn: ${message}`),
    error: (message) => logs.push(`error: ${message}`),
  }),
};

apply(ctx, {});
assert.equal(providers.length, 1, "plugin should register exactly one skill provider");

const provider = providers[0];
assert.equal(provider.name, "design-garden");
assert.equal(typeof provider.list, "function");
assert.equal(typeof provider.get, "function");

const candidates = await provider.list({ cwd: process.cwd(), signal });
assert.equal(candidates.length, 1, "bundle should expose exactly one skill");
const candidate = candidates[0];
assert.equal(candidate.name, "design-garden");
assert.match(candidate.description, /Use for ANY design/i);
assert.ok(candidate.description.length > 200, "routing description should be substantive");
assert.match(candidate.whenToUse, /visual or aesthetic/i);
assert.equal(candidate.invocation.modelInvocable, true);
assert.equal(candidate.invocation.userInvocable, true);
assert.equal(candidate.source, "bundled");
assert.equal(candidate.rank, 600);
assert.ok(candidate.path.endsWith("SKILL.md"));
assert.equal(candidate.resourceBase.kind, "directory");

const definition = await provider.get(candidate, { cwd: process.cwd(), signal });
assert.equal(definition.name, "design-garden");
assert.match(definition.content, /^# design-garden/m);
assert.ok(!definition.content.startsWith("---"), "frontmatter must be stripped from the body");
assert.match(definition.content, /knowledge\/INDEX\.md/);

console.log("dsh bundle smoke test: OK");
console.log(`  skill: ${definition.name}`);
console.log(`  candidate fields: rank=${candidate.rank} source=${candidate.source} path=${candidate.path}`);
console.log(`  body: ${definition.content.split(/\r?\n/).length} lines`);
console.log(`  log: ${logs.join(" | ")}`);
