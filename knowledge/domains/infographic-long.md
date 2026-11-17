---
id: infographic-long
kind: domain
applies: [infographic-long, data-viz]
status: experimental
source: "distilled: huashu-design infographic module scope, data-viz chart discipline"
updated: 2026-11-17
---

# Long-scroll infographics — vertical narrative

A long infographic is read top-down in one thumb motion, in roughly one screen-height window at a time. Nobody scrolls back up to re-read, so every section must land in a single pass. The craft is sequencing, not decoration — the scroll bar is the clock.

## Canvas & units

- Master canvas: **750×N px**, N ≤ 12000 (longer than ~9 screens and platforms recompress the file or refuse the preview). All floors below assume 750px width — 2× a 375pt phone, so 24px body = 12pt on screen.
- Designing at 800w (WeChat long image) or 1080w (high-DPI): multiply every floor by 1.07 / 1.44. 36px body at 1080w ≡ 25px at 750w — the same rule restated.
- One scroll = one argument: hook (first screen) → 3–6 numbered sections → close (recap + CTA). An argument that needs 10 sections is two infographics.
- Charts inside the piece follow data-viz.md — one color = one meaning holds across the whole scroll, not per section.

## First screen & scan path

- The first screen (~1334px of canvas) must state subject and payoff without a scroll: main title ≥64px, standfirst ≥28px, one anchor visual. A first screen that only decorates loses the reader before the argument starts.
- Reading is strictly linear: sequence sections so each needs the previous one, and number them — the reader should always know how far into the argument they are.
- One dominant element per screen. At scroll speed two competing stars become zero stars.

## Section transitions

- Every section opens with the same signature: number + headline, ≥40px, same position and style. The constant signature is what makes the scan fast; the content under it is what makes it worth scanning.
- Vary the content *form* under the signature (chart / list / timeline / quote / stat) — never 3 same-form sections in a row.
- Section length 1100–1600px; a section that will not fit splits with an explicit continuation cue ("continued"), never an arbitrary cut.
- Seam whitespace varies 120–200px between sections — one repeated gap at every seam reads machine-made.

## Seams — cross-screen rules

- A screen window is ~1334px at 750w. Walk the seams before delivery: a section signature never straddles one — the headline plus its first content line sit inside the same window (headline ≥120px above the seam line).
- Repeat an anchor at every seam so a mid-scroll entrant can orient in one glance: the numbered progress rail (section x / N) or a footer strip carrying the series title, ≥18px, identical position throughout.
- A seam never cuts an atomic block: a stat callout, a chart with its axis labels, a quote with its attribution stay whole — split the section instead.

## Stat callout rhythm

- Pattern per callout: number ≥88px (tabular numerals) + unit/label ≥24px + source line ≥18px. One hero stat per screen at most.
- Alternate hero stats with diagrams or prose — two hero-stat screens back to back go numb.
- Every stat carries its source (data-viz honesty); recency stated once near the first stat and at the recap.

## Ending & CTA

- The final screen: one takeaway sentence, ≤3 recap stats, one CTA. No new argument may start there.
- CTA block ≥88px tall (44pt touch target), text ≥26px, placed in the final ~800px and readable without zoom.
- On pieces longer than 6 sections, repeat a soft CTA at the midpoint — a scroll-ending CTA alone never sees half the readers, who stopped before arriving.
- The piece ends cleanly: no dangling section headline in the last 400px, and the CTA is the last thing on the canvas.

## Font floors (750w)

| Role | Floor (px) |
|---|---|
| Main title | 64 |
| Standfirst / lead | 28 |
| Section headline | 40 |
| Body | 24 |
| Caption / source / progress rail | 18 |
| Stat number | 88 |
| CTA text | 26 |

## Critique checklist

- [ ] Canvas 750×N, N ≤ 12000 (or floors scaled ×1.07 at 800w / ×1.44 at 1080w)
- [ ] First screen states subject + payoff within ~1334px: title ≥64px, standfirst ≥28px
- [ ] 3–6 numbered sections; each needs the previous one
- [ ] Section signature (number + headline ≥40px) identical in position and style throughout
- [ ] Content forms alternate; no 3 same-form sections in a row
- [ ] Sections 1100–1600px; splits carry an explicit continuation cue
- [ ] Seam whitespace varies 120–200px; no signature straddles a seam; headline ≥120px above it
- [ ] An anchor (progress rail or footer strip, ≥18px) repeats at every seam in the same position
- [ ] No atomic block (stat, chart + labels, quote + attribution) cut by a seam
- [ ] One hero stat per screen; number ≥88px tabular + label ≥24px + source ≥18px
- [ ] Every stat sourced; recency stated
- [ ] Final screen: takeaway + ≤3 recap stats + one CTA ≥88px tall, text ≥26px; midpoint CTA on >6 sections
- [ ] Nothing critical in the last 400px except the CTA; no dangling headline at the bottom
- [ ] Facts verified or visibly placeholdered (core/facts.md)
