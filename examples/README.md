# Examples — grown by the garden itself

Every piece here was produced by **design-garden running its own workflow** (PARSE → ROUTE → BRIEF → DEAL → EXECUTE → GATE → DELIVER → LEARN) against the eval briefs in [`evals/tasks/`](../evals/tasks/) — the three 2026-11-19 pieces ran briefs written for the example set instead, and are marked per row. These are not hand-polished portfolio pieces — they are what the skill actually ships, including visible `[PLACEHOLDER]` markers and labeled demo datasets where inventing facts would have been the slop move.

**Model attribution is part of the record.** Output quality comes from the model and the skill together, so every example states the model that produced it. Running the same brief on a different model? PR your result with the model named — cross-model results are exactly what the evals want to compare.

| Example | Eval brief | Model | Images | Source |
|---|---|---|---|---|
| Bike repair shop landing page | `ui-web-01` | **GLM-5.3-Flash** | [hero](images/bike-shop-hero.png) · [mobile 375px](images/bike-shop-mobile.png) · [full page](images/bike-shop-full.png) | [landing.html](bike-shop-landing/landing.html) |
| Jazz café opening poster (1080×1350) | `poster-banner-01` | **GLM-5.3-Flash** | [poster](images/jazz-poster.png) | [late-set-1080x1350.html](jazz-cafe-poster/late-set-1080x1350.html) |
| Jazz café poster — direction 2 "Cut Record" | `poster-banner-01` (the DEAL's dealt variant) | **GLM-5.3-Flash** | [poster](images/jazz-poster-cut-record.png) | [cut-record-1080x1350.html](jazz-cafe-poster/cut-record-1080x1350.html) |

The two jazz posters are the DEAL output in the flesh: same subject world (ink black, brass, cream), structurally different compositions (a void with one spotlight vs a cropped record where type is the image). See [case-studies/poster-dealing.md](../knowledge/case-studies/poster-dealing.md) for why directions must differ in structure, not palette.
| Plant-care app icon set (8 glyphs) | `icon-01` | **GLM-5.3-Flash** | [verification sheet](images/icon-sheet.png) | [icon-sheet.html](plant-icons/icon-sheet.html) + [svg/](plant-icons/svg/) |
| Social preview (1280×640) | repo promo | **GLM-5.3-Flash** | [preview](images/social-preview.png) | [preview-1280x640.html](social-preview/preview-1280x640.html) |
| Flower-shop anniversary poster (朋友圈 1080×1350) | independent QA run of the installed skill (fresh agent session) | **GLM-5.3-Flash** | [poster](images/flower-poster.png) | [poster.html](flower-shop/poster.html) |
| Quarterly member report deck (7 slides, 1920×1080) | example-set brief — fictional apiary, demo dataset labeled on every data slide | **GLM-5.3-Flash** | [DEAL sheet](images/deck-directions.png) · [cover](images/deck-01-cover.png) · [harvest chart](images/deck-03-harvest.png) · [all 7 + wall](apiary-quarterly-deck/index.html) | [slides/](apiary-quarterly-deck/slides/) |
| Night-run beginner carousel (7 pages, 1080×1440, 中文) | example-set brief — first run of the experimental social-carousel domain | **GLM-5.3-Flash** | [cover](images/night-run-01.png) · [route rules](images/night-run-03.png) · [closing CTA](images/night-run-07.png) · [rejected cover](images/night-run-cover-b.png) | [carousel.html](night-run-carousel/carousel.html) |
| Bike-share monthly rider report (1200px data page) | example-set brief — synthetic demo dataset, stated on the page | **GLM-5.3-Flash** | [full report](images/bike-report-full.png) · [lead variant 1](images/bike-report-lead-line.png) · [variant 2](images/bike-report-lead-smallmultiples.png) | [report.html](bike-share-report/report.html) |

The three 2026-11-19 pieces extend the set into the domains the earlier examples didn't cover — slides, social carousel, data-viz — and each keeps its DEAL evidence: the deck dealt **three full direction screens** before the build ([apiary-quarterly-deck/deal/](apiary-quarterly-deck/deal/), chosen: Swiss ledger), the report dealt its **lead figure** (annotated line vs weekly small multiples — the line won, small multiples stayed as the hour-of-day section), the carousel dealt its **cover** (big-numeral plate beat the diagonal band at feed size). The deck ships the multi-file + overview-wall mechanic from `domains/slides.md`; the carousel is one HTML sliced into seven exactly-1080×1440 pages. All three went through `lint.mjs` and were rendered at delivery size with `shoot.mjs`.

The flower poster is the first output from a **fresh agent session running the installed skill** — it dealt 3 directions (vertical market board / paper-cut wreath / seed-packet label), executed the wreath, and its GATE caught the SVG wreath falling off-canvas plus a broken type-scale chain before delivery. The visible `[店名]`/`[促销主打]` slots are the no-invented-facts rule in action.

## Style gallery — one brief, eighteen styles

Same product ("Fern", plant-care subscription), same copy, eighteen style recipes — **the only variable is the style system**. Every specimen is labeled twice: **Mode** names the style recipe that produced it; **Made by** names the session/model that rendered the specimen. The twelve new ones were made in this repo on 2026-11-17 by a Doubao agent session; the original six are the v0.2.0 gallery batch, whose model was not recorded and is not guessed.

![Eighteen styles, one brief](styles/overview.png)

Open [styles/index.html](styles/index.html) for the labeled 18-tile wall (mode, palette, type, tokens, recipe path, producer), or open any specimen's `.html` to read its top-of-file `RECIPE / MODE / MADE BY` block.

| Mode · Style | Mode · Style | Mode · Style |
|---|---|---|
| **01 · Swiss International**<br>[png](styles/swiss-international.png) · [html](styles/swiss-international.html)<br><sub>v0.2.0 batch · model not recorded</sub> | **02 · Neo-Brutalism**<br>[png](styles/neo-brutalism.png) · [html](styles/neo-brutalism.html)<br><sub>v0.2.0 batch · model not recorded</sub> | **03 · Dark Tech**<br>[png](styles/dark-tech.png) · [html](styles/dark-tech.html)<br><sub>v0.2.0 batch · model not recorded</sub> |
| **04 · Glassmorphism**<br>[png](styles/glassmorphism.png) · [html](styles/glassmorphism.html)<br><sub>v0.2.0 batch · model not recorded</sub> | **05 · Y2K Retro**<br>[png](styles/y2k-retro.png) · [html](styles/y2k-retro.html)<br><sub>v0.2.0 batch · model not recorded</sub> | **06 · Japandi**<br>[png](styles/japandi.png) · [html](styles/japandi.html)<br><sub>v0.2.0 batch · model not recorded</sub> |
| **07 · Art Deco**<br>[png](styles/art-deco.png) · [html](styles/art-deco.html)<br><sub>Doubao · 2026-11-17</sub> | **08 · Bauhaus**<br>[png](styles/bauhaus.png) · [html](styles/bauhaus.html)<br><sub>Doubao · 2026-11-17</sub> | **09 · Claymorphism**<br>[png](styles/claymorphism.png) · [html](styles/claymorphism.html)<br><sub>Doubao · 2026-11-17</sub> |
| **10 · Corporate Flat**<br>[png](styles/corporate-flat.png) · [html](styles/corporate-flat.html)<br><sub>Doubao · 2026-11-17</sub> | **11 · Editorial Magazine**<br>[png](styles/editorial-magazine.png) · [html](styles/editorial-magazine.html)<br><sub>Doubao · 2026-11-17</sub> | **12 · Handcrafted Organic**<br>[png](styles/handcrafted-organic.png) · [html](styles/handcrafted-organic.html)<br><sub>Doubao · 2026-11-17</sub> |
| **13 · High-Contrast Editorial**<br>[png](styles/high-contrast-editorial.png) · [html](styles/high-contrast-editorial.html)<br><sub>Doubao · 2026-11-17</sub> | **14 · Luxury Serif**<br>[png](styles/luxury-serif.png) · [html](styles/luxury-serif.html)<br><sub>Doubao · 2026-11-17</sub> | **15 · Memphis**<br>[png](styles/memphis.png) · [html](styles/memphis.html)<br><sub>Doubao · 2026-11-17</sub> |
| **16 · Minimal Clean**<br>[png](styles/minimal-clean.png) · [html](styles/minimal-clean.html)<br><sub>Doubao · 2026-11-17</sub> | **17 · Playful Toy**<br>[png](styles/playful-toy.png) · [html](styles/playful-toy.html)<br><sub>Doubao · 2026-11-17</sub> | **18 · Retro-Futurism**<br>[png](styles/retro-futurism.png) · [html](styles/retro-futurism.html)<br><sub>Doubao · 2026-11-17</sub> |

All PNGs are 1440×900; every tile's Mode label is authoritative (the folio `NN / 18` inside most specimens matches it). Rebuild the wall with `node scripts/gallery.mjs` (renders all 18, then writes `styles/index.html` and `styles/overview.png`); `--skip-render` rebuilds the tiles and overview from existing PNGs.

Honest caption: glassmorphism's vivid gradient is the style's own signature (opted in by choosing the recipe) — outside a glassmorphism brief, that gradient sits on our Never list.

## What the critique gate caught in these very outputs

Real fixes the GATE round made before delivery — evidence the quality loop works:

- **Landing**: brass text at 3.0:1 contrast demoted to borders; five font-weight roles, now flagged yellow by the lint; uniform section gaps re-rhythmed to 96/144; a static "Open today" claim (which would lie every Monday) replaced with real hour ranges; the mobile headline accent re-wrapped as a unit (`white-space: nowrap` on the span — `text-wrap: balance` alone was not enough).
- **Poster**: webfont link missing (would silently fall back to Georgia); the "where" line failed the squint test at 90% ink strength — smallest line kept its size, restored to full strength.
- **Icons**: gear glyph rejected for metaphor-density drift (sliders instead); 16px exports re-drawn with detail ladders rather than scaled.
- **Deck**: the shared `tokens.css` sat one directory above the slide files and the render server never served it — folio, accent dot and paper ground silently missing on first render (moved beside the slides); three chart-text collisions on the varroa slide (legend over the headline, unit label over "September", annotation clipped at the SVG viewBox edge); the tasting slide praised the linden flow in a September-dated jar while slide 3 placed that flow in August — the narrative re-read re-dated it to the August batch; January's tasting line compared the wrong vintage.
- **Carousel**: page 7's page number printed on top of the chartreuse CTA plate (plate lifted, folio back on canvas color); ASCII quotes in CJK copy (`"专业"`, `"沉"`) swapped for 「」; continue-cue arrows removed as the anti-slop link-tail tell before lint ran.
- **Report**: the marathon annotation clipped at the figure's right edge (re-anchored `text-anchor:end`, grows leftward into empty plot); an axis caption contradicted itself ("zero omitted, scale starts at 0" → "axis starts at zero").

Run `examples/*/…html` locally (or any static server) to inspect the source. Reuse them freely under the repo license.
