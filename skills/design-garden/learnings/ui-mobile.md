---
id: ui-mobile
kind: learning
status: local
updated: 2026-11-20
---

# Learnings — ui-mobile

Field notes recorded by design-garden while working on ui-mobile tasks. Most specific knowledge lives here; the domain reference in `knowledge/domains/ui-mobile.md` holds the general rules.

- Append entries under `## Entries` — newest first, one entry per situation.
- ≤6 lines per entry. Only generalizable content (no client secrets, no private data).
- User taste statements go in verbatim quotes.
- `Confidence`: `one-off` (single occurrence) → `repeated` (seen 2–3×) → `user-confirmed` (user reacted positively/negatively and confirmed why).
- When 3+ entries repeat the same Move, promote it into `knowledge/domains/ui-mobile.md` via PR (see CONTRIBUTING.md).

## Entries

### 2026-11-20 | Tap-through prototype whose every state had to be screenshotable
- Situation: onboarding prototype needed per-state renders, but shoot.mjs cannot click or pass query params, and a stacked static page would not be a real prototype
- Move: hash router inside the prototype (#s1…#s5, #s4f pre-opens the failure card) plus a capture.html stacking six iframes pinned by hash — one full-page shot slices into per-state images with --screens
- Pitfall: fixed height on action buttons clips two-line labels — min-height + padding on every button that can wrap; and a welcome screen's empty flex region reads as a bug, give it content or a motif
- Confidence: repeated
