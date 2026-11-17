# Eval task: city-transit-dashboard

- domain: data-viz
- split: dev
- doc-derived: gridline and tabular-nums criteria quote knowledge/domains/data-viz.md — never holdout
- deliverable: single-file HTML dashboard with Chart.js, 6–8 tiles, dark theme; glanceable at 3m, mobile horizontal scroll

## Brief

Operations dashboard for a mid-sized city's bus network. Users: duty officers
at the control center glancing during incidents, and planners on laptops who
want exact numbers on demand. Required tiles: on-time performance this week
against an 87% target (this week: 84.2%), per-line delay distribution, boarding
counts by neighborhood (range 1,200–9,800/day), vehicle availability (41 of 46
in service), and active service alerts (3). Line 27 is suspended for
water-main work and this alert should dominate the alert presentation. Use only
the supplied figures; where a requested chart would need data you don't have,
flag the gap rather than filling it. Dark control-room theme; text and chart
elements must stay readable from three meters. The most important tile must be
identifiable within one second of looking at the screen. The dashboard runs on
a wall-mounted 1080p screen as well as on planners' laptops.

## Deliberate traps

- A pie chart for per-line delay distribution and a gauge for on-time %
- Dual y-axes and rainbow per-line colors with no meaning discipline
- Truncated bar baselines exaggerating small differences
- Gray-on-gray dark theme failing contrast at control-room distance
- Exact figures reachable only through hover tooltips — useless for glanceable ops

## What strong output looks like

- Delay distribution as a histogram or box form; on-time shown with target context
- Consistent line/metric colors across tiles; one accent highlight, rest neutral
- Alert tile visually dominant; the Line 27 suspension readable in one second
- tabular-nums figures, horizontal-only light gridlines, axis labels ≥12px
- Mobile fallback scrolls horizontally instead of cramming tiles
