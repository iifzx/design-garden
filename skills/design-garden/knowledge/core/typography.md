---
id: typography
kind: core
applies: [any]
status: core
source: "distilled: huashu-design, hallmark, brand, apple-design, design-taste-frontend"
updated: 2026-11-16
---

# Typography — decision order, scales, and CJK

## The decision order (never pick a font first)

1. **Content type** — data dashboard, editorial longform, poster, deck?
2. **Language mix** — Latin only? CJK-heavy? Both? (Bilingual needs explicit fallback chains.)
3. **Temperature** — formal ↔ casual, quiet ↔ loud. The content's temperature, not the designer's mood.
4. **Only then: the font.** The face follows from 1–3; two candidates that fit beat one favorite imposed.

## Scale & hierarchy

- Modular scale by drama: 1.2 (dense dashboards) / 1.25 (general product) / 1.333 (editorial) / 1.5 (posters). Base 16px web; deck base ≥24px.
- Reference scale at 1440: hero 84 / section 52 / title 25 / lead 21 / body 16 / label 14. Section heads under 40px at 1440 read as unfinished.
- Style-recipe scales are body→section ladders — a hero display takes +1–2 more ratio steps above the recipe's top.
- Each level ≥1.3× the next smaller level; steps smaller than that read as accidents.
- Hierarchy is a set: weight + size + leading move together. Weight-contrast is the CJK display weapon (CJK has no italics — use weight or size jumps instead).
- 3 weights max, picked at extremes (300 + 400 + 800, not 400 + 500 + 600). Buttons 600, links 500, body 400.
- Tracking: −0.02 to −0.04em on large display; ~0 for body; +0.05em only on deliberate ALL-CAPS micro-labels (and those are usually slop — see anti-slop).
- Leading inverse to size: display 1.0–1.1, headings 1.1–1.3, body 1.5–1.6, CJK body +0.2.
- Measure 45–75ch (Latin); CJK 22–38 characters per line, best 28–32 (`max-width: 36em`).

## Pairing logic

- One family, many weights — the safest strong choice. Two families max, clearly distinct roles (display vs body).
- Three valid pairing strategies: **formal contrast** (didone display + humanist body), **superfamily** (same family's display + text cuts), **era contrast** (faces ≥200 years apart read as intentional; 40-year-apart faces read as accidents).
- Wordmark may take its own face — the one place a third family is allowed.
- Overused as display (pick substitutes): Inter, Roboto, Poppins, Montserrat, Space Grotesk, Playfair Display, Fraunces-as-display. They trigger the "AI default" read before a single word is parsed.
- Open-license pairing ideas: Bricolage Grotesque + IBM Plex Serif; Instrument Serif + Instrument Sans; Crimson Pro + Work Sans; Young Serif + Outfit; Lexend + JetBrains Mono for data; Libre Baskerville + DM Mono for editorial-tech.

## Craft details

- `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs; widow/orphan control on any print output.
- Tabular-nums (`font-variant-numeric: tabular-nums`) for all data figures — proportional digits in a chart label is a silent fail.
- No font below 400 weight at small sizes (thin strokes break on low-DPI); body ≥16px web, ≥14px absolute floor with justification, ≥24px projected.
- Faux styles are failures: `font-synthesis: none` when the family lacks the weight; never fake italic CJK (use weight, 楷体, or `text-emphasis`).
- Fonts-as-art: on posters and art canvases, typography may come ONTO the canvas as image (cropped, outlined, textured) — thin weights 200–300 for art labels, but never below 400 for reading text.

## CJK specifics (Chinese/Japanese/Korean)

- Fallback chain Latin-first: `"Inter", "PingFang SC", "Microsoft YaHei", sans-serif` pattern — Latin renders in the Latin face, CJK falls through.
- Body 17–18px web (16px CJK reads small); line-height +0.2 over Latin equivalent; 「」 corner quotes, not "".
- `line-break: strict` + `halt`-style punctuation squeeze for clean edges; `text-emphasis` for soft emphasis.
- Vertical writing (`writing-mode: vertical-rl`) is a legitimate CJK display tool for posters — most Latin-first designs never think of it.
- Subset loading for CJK web fonts (pyftsubset / cn-font-split) — full CJK fonts are megabytes; subsetting is not optional.

## Readability floors (non-negotiable)

| Context | Body | Labels |
|---|---|---|
| Web | ≥16px | ≥12px |
| Mobile app | ≥16px (avoids iOS zoom) | ≥12px |
| Deck (1m viewing) | ≥24px | ≥16px |
| Deck (projected 10m) | ≥32px | ≥20px |
| Poster A2–A0 | ≥24pt at 3m | headline 70pt+ per 3–5m |
| Social image 1080w | ≥36px | ≥28px |

- Don't justify long text; don't ALL-CAPS long text; hyphenation only with justified text and language tags.
- Every claim of "elegant typography" must survive this: correct measure, correct leading, correct scale steps. A beautiful face badly set is still bad typography.
