# Changelog — what the garden learned

Each entry records what design-garden *learned* in that version, not just what changed. Growth is the product.

## v0.1.1 — Community standards & showcase (2026-11-17)

**Learned — about itself**
- Examples gallery: the skill's own eval-brief outputs (landing page, poster, icon set) now live in `examples/` with rendered screenshots — including what the critique gate caught: brass text failing 4.5:1, a static "Open today" claim that lies every Monday, a mobile headline accent that needed `nowrap` (not `text-wrap: balance`), and webfont links that would have silently fallen back
- Multi-word headline accents are wrap-fragile: `white-space: nowrap` on the span, not `text-wrap: balance` on the parent (recorded in learnings/ui-web.md)

**Learned — about serving everyone**
- Zero-skill contribution ladder: beginner guides (`docs/start-here.md` + 中文版), 🌻 First bloom issue template, community blind votes via Discussions Polls
- Standalone Chinese README + translation convention for future languages

**Learned — housekeeping**
- CODE_OF_CONDUCT (Contributor Covenant 2.1), SECURITY policy (prompt-injection reporting), PR template, ROADMAP
- Script references fully migrated to Node (`validate_knowledge.mjs`, `ab_harness.mjs`)

## v0.1.0 — Planting (2026-11-16)

The garden opens with a full seed bed, distilled from 17 design skills and the shared craft canon (see [SOURCES.md](SOURCES.md)):

**Learned — process**
- The 8-step workflow: PARSE → ROUTE → BRIEF → DEAL → EXECUTE → GATE → DELIVER → LEARN
- Three-direction dealing: 2–3 structurally distinct art directions before executing anything above component scale
- The five form questions (narrative role / viewing distance / temperature / capacity / motif-from-content)
- Critique gate discipline: fix only the 3 most damaging issues per round, ≥2 rounds before delivery
- Runtime self-learning: one structured entry per task into `learnings/<domain>.md`

**Learned — knowledge (34 modules)**
- 6 core modules: principles · color (derivation protocol, OKLCH budgets, dark-mode parity) · typography (decision order, CJK rules) · layout (grid grammar, screen windows, spacing rhythm) · motion (easing/duration/spring tables) · anti-slop (the canonical merged tell list)
- 9 domain modules with per-domain critique checklists
- 18 style recipes with a unified schema
- Eval harness: rubric + blind A/B procedure + CI validation

**Learned — first field notes**
- Dark canvases kill saturated brand colors; tinted mid-lightness surfaces save them
- "It feels crowded" usually means uneven spacing rhythm, not insufficient space
- Restructure reading order instead of fighting clients over information count
