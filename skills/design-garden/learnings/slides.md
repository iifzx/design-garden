---
id: slides
kind: learning
status: local
updated: 2026-11-19
---

# Learnings — slides

Field notes recorded by design-garden while working on `slides` tasks. Most specific knowledge lives here; the domain reference in `knowledge/domains/` holds the general rules.

- Append entries under `## Entries` — newest first, one entry per situation.
- ≤6 lines per entry. Only generalizable content (no client secrets, no private data).
- User taste statements go in verbatim quotes.
- `Confidence`: `one-off` (single occurrence) → `repeated` (seen 2–3×) → `user-confirmed` (user reacted positively/negatively and confirmed why).
- When 3+ entries repeat the same Move, promote it into `knowledge/domains/slides.md` via PR (see CONTRIBUTING.md).

## Entries

### 2026-11-19 | The render server only serves the slide file's own directory
- Situation: multi-file deck with a shared `tokens.css` one level above the slide files; rendered folio, accent dot and paper background all silently missing in screenshots
- Move: keep per-deck token files in the SAME directory as the slide files (`href="tokens.css"`), not `../tokens.css` — the screenshot server roots at the file's directory and the parent path 404s without an error
- Pitfall: a dead stylesheet fails silently on slides because local element styles still render; only the shared-token pieces vanish
- Confidence: repeated

### 2026-11-19 | SVG chart text needs reserved slots, not vibes
- Situation: one line-chart slide produced three collisions on first render — legend over the headline, axis-unit label over a month label, annotation clipped by the SVG viewBox edge
- Move: fixed slots: y-axis unit text sits top-left above the numbers; legend reserves whitespace right of the headline block (below it, not beside line 1); annotations anchor `text-anchor:end` at the plot's right edge so they grow leftward
- Pitfall: SVG text clips at the viewBox boundary silently — width-check long annotations against the plot, not the slide
- Confidence: repeated

### 2026-11-19 | Gate the deck's story, not just its slides
- Situation: tasting slide dated "drawn September 20" praised the linden flow that slide 3 had placed in August (week 33) — each slide passed its own gate, the sequence contradicted itself
- Move: after per-slide GATE, re-read the deck's data claims in order (dates, batches, vintages, totals) as one narrative
- Pitfall: per-slide checking misses cross-slide factual drift; a quarterly deck is an argument, and arguments have tenses
- Confidence: one-off
