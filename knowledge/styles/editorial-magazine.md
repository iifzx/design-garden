---
id: editorial-magazine
kind: style
applies: [ui-web, poster-banner, slides]
status: proven
source: "distilled: design-garden v0.1 synthesis"
updated: 2026-11-16
---
# Editorial Magazine

**Identity:** Asymmetric columns, oversized serif headlines crossing the grid, drop caps, and hairline rules that group — printed-matter intelligence on screen.
**Temperature:** neutral
**Best for:** long-form journalism, brand magazines, cultural essays, decks that narrate rather than list.
**Avoid when:** UI is task-driven or data-dense — editorial drama slows scanability.

## Palette
- Paper `#F7F4EE` — warm ground; ~70%
- Ink `#1C1B18` — text and rules; ~20%
- Editorial red `#B33A2B` — kickers, folios, links; ~4%
- Warm gray `#8A857C` — captions, metadata; ~6%
- Ink blue `#2E4A8F` — swap for red in conservative brands
- Keep photos warm-graded; cold stock photography breaks the paper illusion

## Type
- Display serif: **Instrument Serif** (open license); Fraunces works when chosen deliberately but is reflex-overused as display; avoid Playfair Display
- Body sans: **Work Sans** (open license); alternative **Inter**
- Scale 1.333 display jumps: 16 / 21 / 28 / 38 / 51 / 68; body 16/26
- Drop caps run 3 lines into the text column
- Kickers: caps +0.12em, 13px, sitting above a short rule

## Layout grammar
- Asymmetric 12-column grid; headlines span 8–10 columns and may cross into the image column
- Images interleave with wrapped text; captions sit ON images with hairline leaders
- Baseline grid 8px; body respects it strictly
- Hairline rules (0.5–1px ink) group related items — rules group, boxes never
- Whitespace concentrates at outer margins; the interior stays lively
- Text measure 55–65 characters

## Signature moves
- Oversized headline overlapping the image column
- 3-line drop cap opening each feature
- Small-caps kicker + short rule starting every story
- Pull quote breaking the grid by exactly one gutter
- Folio line — page number · section · date — in editorial red

## Motion & interaction
- Static-leaning: 200ms fades on reveals, 4px rise on images
- Link underlines grow from left over 150ms
- Scroll: stories settle, never parallax
- Reading progress as a hairline at the viewport top

## Do / Don't
- Do: keep one ragged edge — left-aligned text against a hard image edge
- Do: let the headline break a column boundary; that tension is the style
- Do: use rules to group, not to decorate
- Don't: center-spread symmetry; centered layouts kill editorial energy
- Don't: exceed two families; hierarchy comes from scale and rules
- Don't: wrap text too tightly around images (≥16px gutter)
- Don't: drop-cap every paragraph; one opener per story
- AI failure mode: politely symmetric layouts and headlines confined to their own column — break one boundary per spread, that is where the energy lives

## Prompt handles
- editorial magazine layout
- asymmetric grid
- oversized serif headline
- drop cap
- baseline grid typography
- image-text interleave
- hairline rules
- kicker small caps
