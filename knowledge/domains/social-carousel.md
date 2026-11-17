---
id: social-carousel
kind: domain
applies: [social-carousel, poster-banner]
status: experimental
source: "distilled: huashu-design xiaohongshu module scope, banner-design platform specs"
updated: 2026-11-17
---

# Social carousels — 3:4 multi-image posts (小红书 / Instagram style)

A carousel is not N posters. It is one argument split across swipes: the cover buys the swipe, each inner page spends one beat of it, the last page cashes it out. Master canvas is **1080×1440 (3:4)** — 小红书's vertical ratio; Instagram takes the same file (it also accepts 4:5 at 1080×1350 — recompose for that ratio, never stretch). All px floors below are set at 1080px width, so they hold on both.

## 1 · Cover formula — hook + title stack

- The cover competes with a feed, not with the post. Feed thumbs render it at roughly 0.2–0.4× canvas width, so squint-test the cover at ~200px wide (the poster-banner thumbnail test) before judging anything else.
- Two layers, one job each: the **hook** (≤12 words — the promise or provocation) and the **title stack** (≤4 short lines — the concrete deliverable: "7 个动作 · 21 天 · 无器械" style enumeration). Total cover copy ≤20 words.
- Hierarchy inside the cover: title stack ≥72px per line, hook/subtitle ≥40px. Absolute floor for *any* text on the cover: 36px — below that the cover dies in the feed.
- One focal device per cover: a number, a face, a before/after, or a bold claim. Two focal devices compete and both lose.
- Skip a hand-drawn "1/9" marker if the platform renders its own page dots — duplicated cues read as noise.

## 2 · Inner-page rhythm — one beat per swipe

- One idea per page. If a page needs a sub-heading AND a body AND a list AND a figure, it is two pages.
- Page anatomy: headline zone (top ~25%), content zone (middle ~55%), footer zone (bottom ~20%: page number, continue-cue, brand mark).
- Inner headline ≥48px, body ≥28px (aim 32px), captions/footer ≥24px. Body lines ≤22 CJK characters or ≤10 English words; line-height ≥1.5.
- Whitespace ≥30% of each inner page — carousels are read at thumb speed, and density reads as effort.
- Alternate page forms so the swipe keeps paying: statement → evidence → list → figure. Never N identical layouts in a row; never a fresh layout on every page either.

## 3 · Cross-page continuity

- Swiping must feel like turning a page, not opening a new file: keep one constant across the series — palette, footer position, headline treatment, or motif — and vary the rest.
- Palette and type lock before page 2: tokens defined once, reused on every page. A color that shifts hue mid-series reads as a different brand.
- Headlines sit at the same y-position on consecutive pages (±16px) so the eye re-finds them instantly at swipe speed.
- Page numbers ("03 / 09") in the footer zone, ≥24px, same position every page. Dropout peaks mid-carousel; visible progress is the retention tool.

## 4 · Canvas font floors (1080×1440)

| Role | Floor (px) | Why |
|---|---|---|
| Cover title stack | 72 | survives ~0.36× feed reduction |
| Cover hook / subtitle | 40 | secondary layer, still feed-legible |
| Any cover text (absolute floor) | 36 | below this the feed crop erases it |
| Inner headline | 48 | page-level hierarchy |
| Body | 28 | ~10px on a 390px phone — floor, aim 32 |
| Caption / footer / page number | 24 | metadata only |
| Stat number | 96 | at most one per page |

At 4:5 (1080×1350) the width floors are unchanged; only the vertical rhythm recomposes.

## 5 · Slice & export — one HTML, N images

- Build one HTML document with N fixed-size sections (`.page { width: 1080px; height: 1440px; overflow: hidden; }`), not N files — shared tokens and continuity stay honest.
- Export at the exact canvas: `node scripts/shoot.mjs <file> --domain social-carousel --screens` slices one page per PNG. Never export a scaled screenshot; recompose at 1:1 if anything clips.
- File names = swipe order: `01.png … 09.png`, zero-padded, one dated folder — platforms sort by filename.
- PNG for type and flat color; JPEG only for photo-heavy series (quality ≥85) — text on JPEG grows halos that read as cheap at zoom.
- Decide the page count before designing the cover. Padding a 7-beat argument to 9 pages with filler is how carousels get skipped.

## 6 · Text-squeeze / overprint check

- Auto-fit is the enemy of the floors: shrinking type to fit is how a 28px body becomes a 19px apology. If text overflows its zone, cut words or split the page — never reduce below §4.
- Overprint rule: no text crosses an image edge, a shape, or another text block without a deliberate device — scrim band ≥70% opacity, solid plate, or knockout box. Decide the placement strategy before choosing the photo; retrofitted scrims over busy photos fail contrast.
- Contrast ≥4.5:1 body, ≥3:1 large text, checked against the pixels *behind the glyphs*, not the page average.
- Zoom test: every page must survive a 2× pinch-zoom without pixelation — platforms render zoomed, and blur is an instant quality tell.

## 7 · Swipe hook — make page 1 owe page 2

- The cover's job ends at the swipe: its hook opens a loop the inner pages close ("7 mistakes — #3 is the one everyone makes").
- Tease forward, never backward — a cover that points to the last slide has already lost. The only backward-facing exception: the final page may tease a *real* part 2 ("part 2 covers the tools"); a promised part 2 that does not exist is an invented fact (see core/facts.md).
- Between pages 2 and N−1, end each page with a reason to continue in the footer zone (≥24px): an unanswered question, a numbered list mid-run, a "next: the tool that does X" line.
- Never gate mid-carousel content behind "follow to read the rest" — platforms down-rank it and readers bounce.

## 8 · Platform safe zone

- 小红书 overlays: like/save buttons bottom-right (~200×160px), caption panel along the bottom (~120px). Hold all copy ≥96px off the bottom edge and ≥72px off the right edge.
- Instagram: the same 3:4 file works; feed UI chrome overlays the bottom ~170px. Keep footers above it.
- The outer 4% border is crop-risk on both platforms (rounded feed cards clip corners): nothing critical inside 48px of any edge.
- Design the cover to also stand alone — it travels solo in DMs and saves.

## Critique checklist

- [ ] Cover reads at ~200px wide: one focal device, hook ≤12 words, title stack ≤4 lines, no text under 36px
- [ ] Cover title ≥72px, hook ≥40px; inner headline ≥48px, body ≥28px, captions ≥24px (1080w)
- [ ] One idea per page; page anatomy holds the 25/55/20 zone split
- [ ] Body lines ≤22 CJK chars / ≤10 English words; line-height ≥1.5; whitespace ≥30% per inner page
- [ ] One constant (palette / footer / headline treatment) holds across all pages; headline y-position ±16px on consecutive pages
- [ ] Page numbers ≥24px, same position, on every page; page count decided before the cover
- [ ] Every page ends with a reason to swipe; last page closes the loop or teases a real part 2
- [ ] No type squeezed below the floors to fit; overflow was cut or split, not shrunk
- [ ] Overprints use deliberate devices (scrim ≥70%, plate, knockout); contrast checked behind the glyphs
- [ ] Exported at exactly 1080×1440 per page (or recomposed 1080×1350), zero-padded names in swipe order
- [ ] Nothing critical within 48px of edges; footers clear the bottom ~170px of platform chrome
- [ ] 2× zoom test passes: no pixelation, no haloed text
- [ ] Facts in the copy verified or visibly placeholdered (core/facts.md)
