# Eval task: flower-shop-anniversary-poster

- domain: poster-banner
- split: holdout
- source: real brief — v0.1.4 independent QA run (2026-11-17, commit aa82868): a fresh agent session ran the installed skill on a flower shop's anniversary-sale poster for WeChat Moments; brief reconstructed from that run's deliverable (examples/flower-shop/poster.html) and the CHANGELOG v0.1.4 entry; the brief text never touched knowledge/
- deliverable: one vertical 3:4 image for WeChat Moments, delivered as a single-file HTML canvas plus one PNG export at exactly 1080×1440

## Brief

I run a small flower shop. Next month is our shop anniversary, and I want to
post one picture in my WeChat Moments (朋友圈) telling neighbors about the
anniversary sale — the kind of picture friends see when they scroll, vertical
like a phone photo.

Some details aren't confirmed yet, so leave spots I can retype myself: my shop
name goes as [店名], the main promotion as [促销主打], the sale dates as
[X月X日 — X月X日], and the street address as [店址]. I'll fill those in before
I post, so they should be ordinary text I can edit, not painted into a
picture, and please don't tuck them away in a corner where I'll miss them
when I retype.

What I do know: the big headline is 周年庆, with 一年只此一次 (only once a
year) right under it. Somewhere near the bottom I want neighbors to feel
asked to come in and pick flowers — 进店挑花.

My grandmother used to cut red paper into window flowers (窗花) for every
festival, and I'd love the picture to feel like that tradition — red paper,
warm paper tones. It should still look right when Moments shows it small in
the feed. One picture only.

## Deliberate traps

- Filling in a made-up shop name, discount, or dates instead of the four
  bracketed markers the owner asked to retype herself
- One of the seven required items missing: shop name, 周年庆, 一年只此一次,
  main promotion, dates, address, or the 进店挑花 invitation
- Decorations or text running past the canvas edge (the real QA run's gate
  caught exactly this on the wreath)
- Delivered at some pixel size other than the stated 1080×1440
- Leftover lorem-ipsum-style dummy copy anywhere
- The owner unable to retype her details because text was flattened into the
  artwork

## What strong output looks like

- PNG export at exactly 1080×1440 (3:4 vertical); every element fully inside
  the canvas, nothing clipped at any edge
- All seven content items present: [店名], 周年庆, 一年只此一次, [促销主打],
  [X月X日 — X月X日], [店址], 进店挑花 — with the Chinese text matching the
  brief exactly and no garbled or missing glyphs
- The four unconfirmed fields appear as visible bracketed markers exactly as
  written in the brief; no shop name, price, or date value appears in their
  place
- The bracketed markers are editable text in the HTML — the owner retypes
  them like any other line of copy
- The red paper-cut window-flower (窗花) tradition the owner asked for is
  recognizable in the delivered picture
- A single .html file that renders on its own; every file it references
  exists in the delivery
- No lorem-ipsum or dummy text anywhere

Holdout discipline: criteria are deliverable facts only; curriculum judgment happens in the blind run.
