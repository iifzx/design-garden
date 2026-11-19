---
id: infographic-long
kind: learning
status: local
updated: 2026-11-20
---

# Learnings — infographic-long

Field notes recorded by design-garden while working on infographic-long tasks. Most specific knowledge lives here; the domain reference in `knowledge/domains/infographic-long.md` holds the general rules.

- Append entries under `## Entries` — newest first, one entry per situation.
- ≤6 lines per entry. Only generalizable content (no client secrets, no private data).
- User taste statements go in verbatim quotes.
- `Confidence`: `one-off` (single occurrence) → `repeated` (seen 2–3×) → `user-confirmed` (user reacted positively/negatively and confirmed why).
- When 3+ entries repeat the same Move, promote it into `knowledge/domains/infographic-long.md` via PR (see CONTRIBUTING.md).

## Entries

### 2026-11-20 | Sections sized to content orphaned every signature at a window bottom
- Situation: with sections stacked and windows ~1334px, content-height sections put each section signature at a window edge — headline in one window, first content line in the next
- Move: meter every section to exactly one window (min-height + varied seam margin = 1334) with the signature at window top +88px; walk the seams from --screens slices of the real render, never from the DOM
- Pitfall: chart geometry eyeballed at draft time lied — an 8h baseline drawn at 12.5% of a 10h track and uneven y-gridlines both survived one full render; recompute every axis/bar coordinate from the stated 口径 before shooting
- Confidence: repeated
