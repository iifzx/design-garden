---
id: playful-toy
kind: style
applies: [ui-mobile, illustration-art, slides]
status: proven
source: "distilled: design-garden v0.1 synthesis"
updated: 2026-11-16
---
# Playful Toy

**Identity:** Chunky rounded shapes with thick ink outlines, bright multicolor bounded by one neutral, and motion that bounces like rubber.
**Temperature:** bold
**Best for:** kids' apps, education, casual games, friendly consumer tools, energetic classroom decks.
**Avoid when:** content is sensitive, professional, or dense — bounce undermines trust and legibility.

## Palette
- Cream ground `#FFF6E9` — the one neutral; ≥50%
- Ink outline `#2E2418` — 3–4px borders everywhere
- Coral `#FF5D5D`, sunshine `#FFC531`, sky `#41A7F5`, leaf `#3EC98C`
- Brights split the remaining ~40% evenly; two brights never compete on one element
- Outlines unify the palette — every shape and illustration carries them

## Type
- Display: **Fredoka** (open license) 600–700; body: **Nunito** (open license) 600–800
- Scale 1.333: 16 / 21 / 28 / 38 / 50
- Display tracking +2%; rounded terminals mandatory
- Sentence case; caps reserved for tiny badges
- Body never below 15px — young readers and squints both suffer

## Layout grammar
- Radius ≥16px on containers; buttons ≥24px or full pill
- Sticker and badge motifs with white keylines, rotated ±3–5°
- Blob backgrounds behind illustration-led heroes
- Thick outlines (3–4px ink) on shapes AND drawn elements — one line language
- The neutral dominates ≥50%; brights decorate the rest
- Spacing generous: 24px minimum between interactive targets
- Touch targets ≥48px even when the visual reads smaller — chunky style is not an excuse

## Signature moves
- Spring bounce (overshoot 0.2–0.4) on the primary CTA and hero only
- Confetti burst on success states
- Wobble hover: icons rotate ±2° for 300ms
- Badge stickers slightly overlapping card edges
- Squash-on-press at 0.94 scale

## Motion & interaction
- Springs cubic-bezier(0.34, 1.56, 0.64, 1), 250–450ms
- Press squash + 4px drop; release springs back
- Ambient shapes drift slowly, 8–12s loops
- Bounce budget: 1–2 hero elements; everything else eases normally

## Do / Don't
- Do: bound the rainbow with one neutral ground at 50%+
- Do: keep outlines uniform in weight and color
- Do: animate the CTA like it is made of rubber
- Don't: bounce every element; chaotic motion reads broken
- Don't: thin the outlines below 2px — flat design creeps in
- Don't: use sharp corners or serif type
- Don't: apply the style to error or legal content; it reads as mockery
- AI failure mode: unbounded rainbow with no dominant neutral plus everything springing at once — pick one ground color, then spend springs on the hero button only

## Prompt handles
- playful toy style
- chunky rounded shapes
- thick outlines
- sticker badge motifs
- bouncy spring animation
- bright multicolor kid-friendly
- squash and stretch
- illustration-led layout
