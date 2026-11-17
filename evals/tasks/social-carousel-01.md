# Eval task: style-gallery-announcement-carousel

- domain: social-carousel
- split: holdout
- source: user-style brief (invented, never used in knowledge work) — grounded in the real docs/social-kit launch plan, which schedules a 小红书 image-text post at 3:4 / 1080×1440 and supplies repo-verifiable facts (9 domains · 18 style recipes · 4 growth loops · 0 dependencies · MIT); the six-page carousel framing itself is invented
- deliverable: six-image 小红书 announcement carousel, each page exactly 1080×1440 (3:4), delivered as one single-file HTML holding all six pages plus PNGs named 01.png–06.png

## Brief

I'm posting the first image-text note about design-garden on 小红书. It's a
six-image carousel announcing our style gallery: we took one plant-care
product page and built it in 18 different styles, and the note shows a taste
of them.

The product name is design-garden — lowercase with the hyphen, never
shortened. Numbers you may use, and only these: 9 design domains, 18 style
recipes, 4 growth loops, 0 runtime dependencies, MIT license.

First image is the cover. In the feed it shows up small, so what the project
is has to still be readable there: the name and the "one page, 18 styles"
idea.

The middle four pages show the featured styles, spelled exactly like this:
Swiss International, Art Deco, Bauhaus, Japandi, Memphis, Neo-Brutalism,
Glassmorphism, Luxury Serif, Playful Toy, Retro-Futurism. Chinese is the
main language on these pages; a short English mirror line is fine.

The last image tells people how to get it, with these two lines exactly:

/plugin marketplace add iifzx/design-garden
/plugin install design-garden@design-garden

One warning from experience: the app covers roughly the bottom tenth of each
image with the caption and the like/save buttons, so don't put anything
there the note depends on. Use only facts from this brief — no star counts,
download numbers, or user quotes, we don't have them. I'll export the six
images named 01.png to 06.png so the order is unambiguous.

## Deliberate traps

- A number on any page that the brief didn't supply (star counts, download
  counts, "20+ styles")
- The product name mangled (DesignGarden, Design Garden, "DG")
- Style names misspelled or swapped for made-up ones
- The install lines retyped with errors (missing @, wrong repo path)
- Fewer or more than six pages, or pages not exactly 1080×1440
- Content the note depends on sitting in the bottom strip the app covers
- Leftover lorem-ipsum or dummy text on any page

## What strong output looks like

- Exactly six pages, each exactly 1080×1440; one single-file HTML containing
  all six, plus PNGs named 01.png–06.png
- The cover names the product (design-garden) and the subject (one product
  page built in 18 styles), and stays legible when previewed small
- The five supplied facts (9 design domains · 18 style recipes · 4 growth
  loops · 0 runtime dependencies · MIT license) appear exactly as given —
  and no number appears anywhere that the brief didn't supply
- All ten style names spelled exactly as in the brief
- The two install lines appear character-exact on the final page
- Chinese is the main text on the middle pages; no lorem-ipsum or dummy
  text anywhere
- No star counts, download numbers, or user quotes anywhere
- Nothing the note depends on sits in the bottom strip the app covers

Holdout discipline: criteria are deliverable facts only; curriculum judgment happens in the blind run.
