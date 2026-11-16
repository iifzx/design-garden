---
id: ui-web
kind: learning
status: local
updated: 2026-11-16
---

# Learnings — ui-web

Field notes recorded while working on web UI tasks. Newest first. See `learnings/_TEMPLATE.md` for the schema.

## Entries

### 2026-11-17 | emphasized span broke across lines on mobile headline
- Situation: `<em>` accent ("same day") wrapped mid-phrase on 375px — the underline ran across the break and read as two separate accents
- Move: `white-space: nowrap` on the accent span makes the phrase wrap as a unit; `text-wrap: balance` on the h1 alone was NOT enough — balance evens line lengths but never keeps an inline span intact
- Pitfall: multi-word headline accents need nowrap themselves; balance is a line-length tool, not a keep-together tool
- Confidence: repeated

### 2026-11-16 | static landing page with an "open today" header claim
- Situation: no JS allowed (QR-code visitors), so the page cannot know the current weekday — a static "Open today 9–18" would lie every Monday
- Move: replaced with the real weekly ranges ("Tue–Fri 9–18 · Sat 10–16") in the sign header; hours still findable in ~3 seconds
- Pitfall: any "today/now" phrasing on a JS-free page is a live falsehood waiting for the wrong day
- Confidence: user-confirmed

### 2026-11-16 | metallic accent colors as small text
- Situation: brass accent (#A98A3D-class) used for 13px role labels on warm paper — looked fine, measured 3.0:1
- Move: metallic/gold-family colors demoted to borders, tags, and rules only; small-text roles switched to the green ink family
- Pitfall: warm golds pass the eye test and fail 4.5:1 — always measure small text, don't trust the palette's harmony
- Confidence: repeated

### 2026-11-16 | (example entry — pattern reference)
- Situation: dense admin dashboard felt chaotic after adding a new module per team request
- Move: enforced one gap per seam level instead of shrinking paddings — set intra-card 12px, between cards 24px, between sections 64px; chaos was spacing inconsistency, not density
- Pitfall: "it feels crowded" usually means uneven spacing, not insufficient space — check the rhythm before redesigning
- Confidence: repeated
