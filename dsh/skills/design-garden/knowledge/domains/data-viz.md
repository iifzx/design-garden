---
id: data-viz
kind: domain
applies: [data-viz, slides, ui-web]
status: core
source: "distilled: slides, ui-ux-pro-max, design-system, design-taste-frontend"
updated: 2026-11-16
---

# Charts & data visualization

## Pick the chart by relationship first
- Comparison across categories → bar.
- Trend over time → line.
- Composition → stacked bar or waterfall. Pie only at ≤5 slices with direct labels, and never for comparison.
- Distribution → histogram or box plot. Relationship → scatter.
- Single number → big number plus context (vs target, vs last period) — not a gauge.

## Axes & baselines
- Bars require a zero baseline; line charts may truncate only with a visible axis-break note.
- No dual y-axes by default.
- Sort bars by value, not alphabetically — unless a natural order exists (time, grade, size).

## Color discipline
- One color = one meaning. The same metric keeps the same color in every chart of the product.
- Highlight one series with the accent; gray the rest. Rainbow categorical palettes only when the categories themselves are the point.
- Never encode meaning in color alone: add direct labels, shape, or pattern; check the result under a deuteranopia simulation.

## Annotation
- ≤5 series → label lines directly at line-end; reserve legends for many-series charts.
- Annotate the takeaway on the chart itself ("Q3 spike: launch").
- Division of labor: chart states the insight, title states the takeaway, subtitle gives context.

## Chrome
- Horizontal-only light gridlines: `rgba(255,255,255,0.05)` on dark, 4–8% ink on light.
- Drop chart borders, 3D, drop shadows, and gradient fills on bars.
- All figures use `font-variant-numeric: tabular-nums`.
- Axis labels ≥12px on screen, ≥16px when projected.

## Alternatives
- Small multiples beat one busy multi-line chart.
- Sparklines carry trends inside tables.
- When users need exact lookups, a table beats a chart.
- Choose cumulative vs per-period deliberately and label which it is.

## Data honesty
- No truncated bar axes, no area distortion, no cherry-picked windows.
- State data recency and source.
- Never invent data — fabricated statistics are a hard fail.

## Size for context
- Dashboard tiles: small, minimal chrome.
- Report figures: generous annotations.
- Projected decks: huge type, one series per chart, no legends.
- Mobile: touch-friendly tooltips, horizontal scroll instead of cramming.

## Critique checklist
- [ ] Chart type chosen by the expressed relationship, not habit
- [ ] Pies ≤5 labeled slices and never used for comparison
- [ ] Bar charts start at zero; line truncation shows an axis-break note
- [ ] No dual y-axes
- [ ] Bars sorted by value (unless a natural order exists)
- [ ] Same metric = same color across all charts in the artifact
- [ ] One accent-highlighted series with the rest gray; no rainbow unless categories are the point
- [ ] Meaning not encoded in color alone (labels/shape/pattern); deuteranopia checked
- [ ] ≤5 series labeled at line-end instead of a legend
- [ ] Takeaway annotated; title = takeaway, subtitle = context
- [ ] Gridlines horizontal-only and light; no borders, 3D, shadows, or bar gradients
- [ ] tabular-nums on all figures; axis labels ≥12px (≥16px projected)
- [ ] Small multiples / sparklines / tables used where they beat the busy default
- [ ] No truncation, area distortion, or cherry-picked windows; source and recency stated
- [ ] Zero invented data points
- [ ] Sizing matches context (tile / report / projected / mobile)
