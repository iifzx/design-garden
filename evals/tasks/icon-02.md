# Eval task: icon-02
- domain: icon
- split: dev
- doc-derived: optical-centering criteria quote knowledge/domains/icon.md and case-studies/icon-set-optical.md — never holdout
- deliverable: 6 outlined SVG icons (24px grid, 1.5px stroke) + accessibility
  naming table + pair-test sheet at 16px

## Brief

Ledgerline, a fintech analytics dashboard, needs six outlined icons:
portfolio, transactions, invoices, forecasts, alerts, settings. They run
in a desktop sidebar at 24px and inside dense table rows at 16px, next to
monochrome, data-heavy UI. Style: sharp, technical, 1.5px stroke, minimal
interior detail; every icon must stay distinguishable when two sit
adjacent in the sidebar at a glance. Use conventional metaphors wherever
they exist — gear for settings; do not invent hybrids for standard
actions. Deliver currentColor SVGs on a shared 24px viewBox with paths at
≤2 decimals, named by concept, plus a small table giving each icon an
accessible name and a note on where it would be decorative versus
meaningful in the dashboard. Include a quick pair-test sheet showing the
six side by side at 16px.

## Deliberate traps

- Over-detailed glyphs that blur at 16px in dense table rows
- Invented metaphor mashups for standard actions (gear-plus-wrench
  settings)
- Stroke or radius drift across the six; one glyph quietly isometric
- Dots and holes math-centered so they read off-center optically
- Appearance-based filenames and paths full of transforms and 4-decimal
  coordinates

## What strong output looks like

- Sharp outlined set, 1.5px stroke held across all six, keyline-fitted
- Pair test and 16px squint pass; silhouette test documented
- Conventional metaphors used; any deviation justified in writing
- Clean currentColor SVG: ≤2 decimals, shared viewBox, concept names
- Accessible-name table separates meaningful from decorative use
