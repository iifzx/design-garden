---
id: data-viz
kind: learning
status: local
updated: 2026-11-19
---

# Learnings — data-viz

Field notes recorded by design-garden while working on `data-viz` tasks. Most specific knowledge lives here; the domain reference in `knowledge/domains/` holds the general rules.

- Append entries under `## Entries` — newest first, one entry per situation.
- ≤6 lines per entry. Only generalizable content (no client secrets, no private data).
- User taste statements go in verbatim quotes.
- `Confidence`: `one-off` (single occurrence) → `repeated` (seen 2–3×) → `user-confirmed` (user reacted positively/negatively and confirmed why).
- When 3+ entries repeat the same Move, promote it into `knowledge/domains/data-viz.md` via PR (see CONTRIBUTING.md).

## Entries

### 2026-11-19 | Deal the lead figure by relationship, ship the runner-up as a section
- Situation: monthly report needed a lead figure; dealt one annotated line vs weekly small multiples as two real renders
- Move: the month had one dominant event (a record spike inside a repeating weekend rhythm) — one annotated line tells that fastest; the small-multiples instinct stayed in the report as the hour-of-day comparison
- Pitfall: small multiples are the right tool for comparing shapes across panels, not for one series with one dramatic event — the deal is between relationships, not between chart fashion
- Confidence: one-off

### 2026-11-19 | An anchor direction for chart annotations
- Situation: marathon annotation written left-anchored next to a right-edge spike clipped at the figure edge
- Move: anchor takeaway annotations `text-anchor:end` at the plot's right margin, stacked on two short lines (event / value), so text grows leftward into empty plot space
- Pitfall: annotations near right-edge data must grow left; left-anchored text near a right spike always runs out of figure
- Confidence: one-off

### 2026-11-19 | Axis self-description must not contradict itself
- Situation: axis caption read "zero omitted, scale starts at 0" — two halves saying opposite things about the same axis
- Move: one claim per caption: "axis starts at zero"; honesty notes live in exactly one place per figure
- Pitfall: stacking honest-sounding phrases produces contradictions; read captions as claims, not decoration
- Confidence: one-off
