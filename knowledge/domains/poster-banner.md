---
id: poster-banner
kind: domain
applies: [poster-banner, any]
status: core
source: "distilled: banner-design, canvas-design, design"
updated: 2026-11-16
---

# Poster & banner design

## Canvas sizes — match platform specs exactly
| Placement | Pixels |
|---|---|
| Facebook cover | 820×312 |
| X header | 1500×500 |
| LinkedIn banner | 1584×396 |
| YouTube channel art | 2560×1440 (guaranteed-visible band 1546×423) |
| Instagram story | 1080×1920 |
| Instagram post | 1080×1080 |
| Instagram carousel slide | 1080×1350 |
| YouTube thumbnail | 1280×720 |
| Pinterest pin | 1000×1500 |
| Web hero | 1920×600 to 1920×1080 |

Google Display kit: 300×250 (highest CTR — build it first), 336×280,
728×90, 300×600, 160×600, 970×250, 320×50, 320×100. One art direction,
re-composed per ratio — never one layout force-stretched into all eight.

## Safe zones
- Hold all critical content inside the central 70–80% of the canvas.
- Keep text and CTAs 50–100px off the edges on web-scale canvases.
- Meta/IG crops edges with UI chrome (profile ring, caption buttons): the
  central 80% is the only guaranteed-visible region.
- YouTube channel art: only the middle 1546×423 band shows everywhere;
  logo and tagline live there.
- Preview at the exact target pixel size. A layout that reads at
  1080×1350 collapses at 320×50 — redesign for small ratios, don't scale.

## 3-zone hierarchy
- Top: logo + value proposition. Middle: core message + hero visual.
  Bottom: CTA.
- One CTA per banner, parked bottom-right in the terminal area where the
  eye exits.
- CTA: ≥44px tall, action verb (Get / Start / Download / Claim), highest
  contrast on the canvas.
- Ad copy: ≤3 lines, ≤7 words per line.
- Ads keep text under 20% of canvas area — Meta down-ranks text-heavy
  creative.
- Social covers balance ~60/40 image-to-text. Posters may lean
  typographic but still carry one message.
- Example: "Meal kits from €6" top → dish photo middle → "Get started"
  bottom-right.

## Typography
- Max 2 typefaces per piece.
- Web-scale canvases: headline ≥32px, body ≥16px, text contrast ≥4.5:1.
- Print read at 3–5m needs 70pt+ headlines. Rule of thumb: 1pt of type
  per foot of viewing distance.

## Print production
- 300 DPI for hand-held print; 150 DPI suffices for large format seen
  from distance.
- 3–5mm bleed; keep critical content another 5mm inside the trim line.
- Design in RGB, convert to CMYK late — late conversion keeps the file
  editable longer.
- Large dark areas use rich black (e.g. C60 M40 Y40 K100); flat K100
  prints as weak gray.

## Art direction selection
Offer 2–3 complementary directions side-by-side, each with a one-line
rationale tied to the brief:

| Direction | Best for |
|---|---|
| Minimalist | SaaS, enterprise |
| Bold typography | Announcements, sales events |
| Gradient | Modern consumer brands |
| Glassmorphism | SaaS, app feature reveals |
| Neon | Gaming, nightlife, events |
| Editorial | Luxury, fashion, culture |
| 3D | Product launches |

## Composition
- One dominant element at extreme scale beats several balanced ones.
  Even balance is where posters die.
- Type can be the image: headlines as texture, cropped off-canvas, scaled
  to architectural size.
- Negative space is composition, not absence — shape it deliberately.
- Photo posters: pick the type placement strategy first (scrim gradient,
  flat color band, knockout box), then choose a photo that leaves room
  for it. Never retrofit.
- A poster is one focal concept. One glance, one message; the second idea
  needs a second poster.
- Event posters: what / when / where must survive a squint test — blur
  your eyes and those three facts still read.

## Workflow discipline
- Generated imagery stays text-free; all copy is a design layer so it
  remains editable.
- Verify finals at exact target pixel dimensions — not a scaled preview.
- Save as `{style}-{width}x{height}.png` inside a dated campaign folder.

## Critique checklist
- [ ] Canvas dimensions match the platform spec exactly
- [ ] Critical content sits within the central 70–80% safe area
- [ ] Text and CTA clear the edges by 50–100px on web-scale canvases
- [ ] Exactly one CTA, ≥44px tall, action verb, in the terminal area
- [ ] Ad text covers under 20% of the canvas
- [ ] No copy line over 7 words; ≤3 lines on ads
- [ ] Headline ≥32px, body ≥16px, contrast ≥4.5:1 (web-scale)
- [ ] No more than 2 typefaces
- [ ] Print exports carry 3–5mm bleed at 300 DPI (150 for large format)
- [ ] Large dark areas use rich black, not flat K100
- [ ] 2–3 art directions presented side-by-side with stated rationale
- [ ] One dominant element — the layout is not evenly balanced
- [ ] Type placement strategy (scrim / band / knockout) decided before
      photo choice
- [ ] Generated imagery contains no baked-in text
- [ ] What / when / where survive the squint test on event posters
- [ ] Final verified at exact target pixel size
- [ ] File named `{style}-{width}x{height}.png` in a dated campaign folder
