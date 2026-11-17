# Eval task: mobile-dog-grooming-landing

- domain: ui-web
- split: holdout
- source: user-style brief (invented, never used in knowledge work) — no real small-business landing brief is unclaimed in the repo; bike-shop-landing is taken by ui-web-01 and the v0.1.4 QA briefs by the flower-shop poster
- deliverable: single-file HTML one-page site for a mobile dog grooming van; verify layout at 1440 and 375 widths

## Brief

I run Trina's Mobile Dog Grooming — it's a van, I come to people's driveways.
My name is Trina Hale. Right now customers only find me through my Facebook
page, and I keep losing them to the groomer across town because I don't have
my own link to put in my bio. I need one web page.

The most important thing: my phone number, easy to see the moment the page
opens. My number is (555) 014-8292 — people call or text me to book; I don't
want an online booking form.

Prices: $55 for small dogs (under 25 lbs), $70 for medium (25–50 lbs), $90
for large (over 50 lbs). Every groom includes a wash, a haircut, and nail
trimming — say that, because people keep asking.

Where I go: Mondays Maplewood and Birchwood, Tuesdays Cedar Falls,
Wednesdays Oakdale, Thursdays Maplewood again, Fridays Riverbend, Saturdays
Cedar Falls. I'm still working out Brookfield and Ashford — don't promise
days for those two, just make it clear people can ask. I take calls Tuesday
through Saturday, 8am–5pm.

The van is white with a turquoise paw print on the doors — that's all the
branding I have. I don't have photos yet, so don't leave empty picture
frames waiting. And no made-up customer quotes — when I have real ones I'll
send them to you. Most people will open this on their phone, often with a
dog pulling on the leash.

## Deliberate traps

- A price, town, weekday, or phone number that doesn't match the brief
- Brookfield or Ashford given promised days after the owner said not to
- A customer quote or star rating on the page when the owner supplied none
- The phone number only reachable by scrolling past the first screen at
  phone width
- An online booking form standing in for the call-or-text booking the owner
  asked for
- Leftover lorem-ipsum or dummy text, or the page clipped sideways at 375
  width
- The business or owner name misspelled or altered ("Tirna", dropped
  possessive, an invented second brand line)

## What strong output looks like

- A single .html file that renders on its own; every file it references
  exists in the delivery
- No horizontal clipping at 1440 and 375 widths
- "Trina's Mobile Dog Grooming" and "Trina Hale" spelled exactly as in the
  brief
- All three prices with their dog-size ranges and the included services
  (wash, haircut, nail trimming), numbers exactly as given
- All six routed town-and-day pairs correct; Brookfield and Ashford present
  with no weekday promised and a clear way to ask
- Call hours (Tuesday–Saturday, 8am–5pm) stated
- The phone number (555) 014-8292 matches the brief exactly and is visible
  on the first screen at 1440×900 and at 375×780 without scrolling; booking
  reachable by call or text with no form required
- The five content jobs the brief lists are all on the page: what a groom
  includes, prices, the town/day route, how to book, and call hours
- No customer quotes, no statistics, no lorem-ipsum or dummy text anywhere

Holdout discipline: criteria are deliverable facts only; curriculum judgment happens in the blind run.
