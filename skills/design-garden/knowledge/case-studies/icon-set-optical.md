---
id: icon-set-optical
kind: case
applies: [icon, ui-mobile]
status: proven
source: "distilled: icon craft conventions (keyline grids, optical corrections)"
updated: 2026-11-16
---

# Case study — icon set: where optics beat geometry

Brief: 6 outlined icons for a fintech dashboard (transfer, card, analytics, alert, vault, support), 24px grid, 2px stroke.

## Before (the geometric-first run)

Each icon was individually correct but the set read as amateur:

- The circle-based "vault" sat visually smaller than the square-based "card" at identical math sizes — no keyline compensation.
- The "analytics" icon's diagonal line chart used the same 2px stroke as verticals, so diagonals read thinner.
- "Alert" triangle's exclamation dot was mathematically centered, leaving a heavy optical bottom gap.
- Mixed corner treatment: rounded stroke joins on some icons, miter joins on others.
- The alert icon was drawn at metaphor density 2 (triangle + dot + spark lines) while others were density 1 — it became the loudest icon in the nav.

## What changed (and why)

1. **Keyline grid first.** All shapes snapped to the keyline set (circle Ø20, square 18×18, landscape 20×16, portrait 16×20). Circles and diagonals overshoot the keylines ~2–3% so equal *optical* weight — geometry equal, perception unequal is the error.
2. **Stroke discipline per direction.** Kept 2px nominal, but diagonal strokes compensated optically (slightly heavier joins) and horizontal strokes trimmed ~0.25px — the perceived stroke became uniform across the set.
3. **Optical centering.** Exclamation dot placed optically (slightly below geometric center reads balanced in the triangle's visual mass); same correction applied to the vault dial.
4. **One join family.** Rounded joins everywhere, matching the app's 8px corner radius family — icon corners echo UI corners.
5. **Metaphor budget enforced.** Alert dropped to density 1 (triangle + dot). The spark lines moved to the analytics icon where density 2 was the norm.
6. **Tests run, not assumed.** Silhouette test (all 6 identifiable filled black), 16px squint (vault dial detail removed at 16px variant), pair test (card vs vault distinguished by shape class, not detail).

## After (observable signals)

- Any two icons distinguishable at a glance; the set reads as one hand.
- Exports: 16/24/32/48 with simplification ladder (16px: no dial detail, thicker relative stroke).
- `currentColor` strokes + consistent viewBox + ≤2-decimal paths.

## Transferable lessons

- A set is judged as a set: optical consistency across icons matters more than any icon's individual beauty.
- Overshoot circles/diagonals against keylines ~2–3%; optically center dots and holes.
- Metaphor density is a budget — keep it uniform, or you've built a loudest-icon problem.
- Run the three tests (silhouette / squint / pair) before calling a set done; they catch what the editor cannot.
