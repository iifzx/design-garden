# Security Policy

This repository ships **instructions that AI agents will follow** — knowledge files, prompts, and small helper scripts. That makes certain "content bugs" security bugs here.

## What counts as a security issue

1. **Prompt injection in knowledge** — any file under `knowledge/`, `learnings/`, or `SKILL.md` that tries to steer an agent beyond design work (role rewrites, "ignore instructions", hidden commands, exfiltration attempts).
2. **Malicious payloads** — scripts or code in unexpected places, obfuscated content (base64 blobs), or knowledge that instructs the agent to fetch/execute external resources at runtime.
3. **Supply-chain concerns** — a dependency or suggested external resource that shouldn't be trusted.
4. Conventional vulnerabilities in `scripts/` (path traversal, unsafe writes, etc.).

## How to report

- **Preferred**: GitHub's private vulnerability reporting — **Security tab → Report a vulnerability**. This keeps details private until a fix lands.
- If you cannot use it, open a **plain issue titled only "security contact requested"** (no details) and the maintainer will follow up privately.

Please do **not** open a public issue or PR with injection payloads or exploit details.

## Response

- Triage within **3 days**; fix or mitigation for knowledge-injection reports within **7 days** (a fast mitigation is demoting the file to `experimental` or reverting it — the promotion system exists partly to make this cheap).
- Confirmed injection content is removed immediately on main, and affected releases get a note in the CHANGELOG.

## Preventive measures already in place

- `scripts/validate_knowledge.mjs` runs on every PR (CI): schema checks, line budgets, INDEX sync, and injection-pattern scans.
- Knowledge files may not contain executable payloads or runtime URL fetches (see CONTRIBUTING → Security & safety rules).
- New knowledge lands as `status: experimental` — it loads only on explicit match, limiting blast radius while under review.
