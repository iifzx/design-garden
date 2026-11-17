---
id: facts
kind: core
applies: [any]
status: core
source: "distilled: huashu-design verify-first pre-step (product-facts.md), design-garden v0.1.4 placeholder-slot rule"
updated: 2026-11-17
---

# Facts — verify before you design

A pre-step that runs before BRIEF whenever the design will state facts about the real world: product names, versions, prices, dates, counts, quotes, awards, event history — the client's product or a competitor's ("like Notion's pricing page", "10 years of…", "M-series chip", "since 1998"). Model memory is confidently wrong about exactly these, and a design that ships one wrong fact is a lie in production, not a style flaw.

## Procedure

1. List every checkable fact the design will state. Superlatives count ("first", "largest") — they are facts.
2. Verify each with the session's verification tooling (web search when available) against a source the client can check: the official site, release notes, primary documentation.
3. Before any layout work, write one line per fact to `<output-dir>/product-facts.md`: the fact, the source, the date checked.
4. Anything unverified becomes a visible `[PLACEHOLDER: what goes here]` in the design — set at real size, in the real hierarchy, never as small muted type (see principles.md, Unknown client facts). The layout must feel finished; the client fills the blank.
5. In the rationale, state which facts were verified and which remain placeholders. Silence reads as asserted truth.

## Hard bans

- Never invent a name, number, date, price, version, quote, or award — not approximately, not for illustration.
- Never ship a plausible-looking value in place of a placeholder: plausible values get shipped as-is. `[PLACEHOLDER]` is unmissable; `$99` is not.
- Never paraphrase a verified number into vaguer marketing — "up to 30 hours" stays "up to 30 hours", not "all-day battery".
- A quote needs an attributable speaker and source; a paraphrase must be labeled as one.

## Scope

- Fully fictional briefs (concepts, demos, templates, the user's own invented product) skip the file — there is nothing to verify; keep invented facts internally consistent with the brief.
- The user's statements about their own product outrank external sources; record them as the source.
- No verification tooling available? Every real-world fact degrades to a placeholder, and the rationale says so.

## Why a file

`product-facts.md` survives handoff and revision: the client corrects one line when a fact changes, the next diff shows which claims moved, and the GATE can check every fact in the design against a line in the file — or find its placeholder.
