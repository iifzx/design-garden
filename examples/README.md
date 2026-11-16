# Examples — grown by the garden itself

Every piece here was produced by **design-garden running its own workflow** (PARSE → ROUTE → BRIEF → DEAL → EXECUTE → GATE → DELIVER → LEARN) against the eval briefs in [`evals/tasks/`](../evals/tasks/). They are not hand-polished portfolio pieces — they are what the skill actually ships, including visible `[PLACEHOLDER]` markers where inventing facts would have been the slop move.

| Example | Eval brief | Images | Source |
|---|---|---|---|
| Bike repair shop landing page | `ui-web-01` | [hero](images/bike-shop-hero.png) · [mobile 375px](images/bike-shop-mobile.png) · [full page](images/bike-shop-full.png) | [landing.html](bike-shop-landing/landing.html) |
| Jazz café opening poster (1080×1350) | `poster-banner-01` | [poster](images/jazz-poster.png) | [late-set-1080x1350.html](jazz-cafe-poster/late-set-1080x1350.html) |
| Plant-care app icon set (8 glyphs) | `icon-01` | [verification sheet](images/icon-sheet.png) | [icon-sheet.html](plant-icons/icon-sheet.html) + [svg/](plant-icons/svg/) |
| Social preview (1280×640) | repo promo | [preview](images/social-preview.png) | [preview-1280x640.html](social-preview/preview-1280x640.html) |

## What the critique gate caught in these very outputs

Real fixes the GATE round made before delivery — evidence the quality loop works:

- **Landing**: brass text at 3.0:1 contrast demoted to borders; 4 font weights trimmed to 3; uniform section gaps re-rhythmed to 96/144; a static "Open today" claim (which would lie every Monday) replaced with real hour ranges; the mobile headline accent re-wrapped as a unit (`white-space: nowrap` on the span — `text-wrap: balance` alone was not enough).
- **Poster**: webfont link missing (would silently fall back to Georgia); the "where" line failed the squint test at 90% ink strength — smallest line kept its size, restored to full strength.
- **Icons**: gear glyph rejected for metaphor-density drift (sliders instead); 16px exports re-drawn with detail ladders rather than scaled.

Run `examples/*/…html` locally (or any static server) to inspect the source. Reuse them freely under the repo license.
