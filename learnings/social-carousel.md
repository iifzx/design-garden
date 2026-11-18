---
id: social-carousel
kind: learning
status: local
updated: 2026-11-19
---

# Learnings — social-carousel

Field notes recorded by design-garden while working on `social-carousel` tasks. Most specific knowledge lives here; the domain reference in `knowledge/domains/` holds the general rules.

- Append entries under `## Entries` — newest first, one entry per situation.
- ≤6 lines per entry. Only generalizable content (no client secrets, no private data).
- User taste statements go in verbatim quotes.
- `Confidence`: `one-off` (single occurrence) → `repeated` (seen 2–3×) → `user-confirmed` (user reacted positively/negatively and confirmed why).
- When 3+ entries repeat the same Move, promote it into `knowledge/domains/social-carousel.md` via PR (see CONTRIBUTING.md).

## Entries

### 2026-11-19 | The CTA plate and the page number share the bottom zone
- Situation: page 7's chartreuse CTA plate sat at the same bottom slot as the folio — chalk page number printed on top of the accent plate, unreadable and colliding
- Move: lift the CTA plate to `bottom ≥200px` on the closing page so the page number stays on canvas color; the 20% footer zone belongs to metadata, the plate lives above it
- Pitfall: the footer-zone rule (§2) is easy to honor on inner pages and forget on the CTA page, which is exactly where the plate is biggest
- Confidence: one-off

### 2026-11-19 | CJK copy wants corner quotes, not ASCII ones
- Situation: two pages carried `"专业"` / `"沉"` with ASCII double quotes inside Chinese sentences — at 40px they read as machine output
- Move: use 「」 for quoted words in Chinese carousel copy; scan the whole series, not just the page being edited (both instances were on different pages)
- Pitfall: ASCII quotes survive lint (no floor covers them) — this is a craft tell, catch it on a read-through
- Confidence: repeated

### 2026-11-19 | Cover deal at feed size: numeral plate beat the diagonal band
- Situation: two real covers for one night-running series — A: hook + giant numeral + title stack; B: rotated accent band carrying the title stack
- Move: chose A; at ~200px feed width the band's rotation stole hierarchy from the stack, and B's diagonal left the lower half dead; A's numeral gave the thumb one focal device
- Pitfall: a bold structural device that works at full size can demote the title stack at feed scale — judge covers at ~200px, not 1080px (§1)
- Confidence: one-off
