# Roadmap — where the garden grows next

The garden's direction, in order of priority. Anything here is up for grabs — open an issue to claim it. This roadmap is a living document: what the community feeds changes what matters next.

## v0.2 — breadth through community

- [ ] **More style recipes** (target 30+): risograph, brutalist-web heritage, vaporwave-native, bento grids, maximalist editorial — each via the contribution protocol
- [ ] **More real eval briefs** — especially ones harvested from First bloom reports (real life is the best test set)
- [ ] **Domain deepening**: `data-viz` annotation grammar, `video-motion` gen-AI shot grammar, `ui-mobile` gesture catalog
- [ ] Beginner guide translations (first candidates: Japanese, Korean, Spanish — see CONTRIBUTING → Translations)

## v0.3 — verification machinery

- [ ] **Eval automation harness**: script that runs A/B variants through a local agent CLI and produces the blind page + rubric form automatically
- [ ] LLM-as-judge calibration study (judge scores vs human scores on 20+ pairs) — decide if automated judging can gate promotions
- [ ] Trigger tests: verify SKILL.md description fires on the phrasings it claims (a tiny eval suite for the router itself)

## v0.4 — distribution

- [x] Plugin/marketplace packaging — done in v0.2.0 (`.claude-plugin/marketplace.json` + CI-synced `skills/design-garden/` mirror + npm installer)
- [ ] Submission & listing in the agent-skill registries and awesome lists (copy ready in [docs/PROMOTION.md](docs/PROMOTION.md))
- [ ] Per-style example galleries (one rendered image per style recipe, grown from the evals) — first six shipped in examples/styles/ in v0.2.0, rest via community
- [ ] A public "what the garden learned" dashboard generated from `learnings/` + CHANGELOG

## Non-goals

- Becoming a general "everything prompt" collection — the garden stays design-scoped
- Bundling fonts or binaries — knowledge stays text; resources stay referenced, not vendored
- Auto-merging knowledge without eval or review — the promotion gate is the product
