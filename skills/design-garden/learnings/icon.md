---
id: icon
kind: learning
status: local
updated: 2026-11-16
---

# Learnings — icon

Field notes recorded while working on icon-set tasks. Newest first. See `learnings/_TEMPLATE.md` for the schema.

## Entries

### 2026-11-16 | settings icon: gear vs sliders in a low-density set
- Situation: classic gear glyph needs 2 circles + 8 tick marks (density 2) — beside a set of density-1/1.5 glyphs it became the loudest icon in the nav
- Move: switched to the sliders metaphor (3 lines + 3 knobs, density 1.5) — still a conventional settings metaphor, density now matches the set
- Pitfall: metaphor convention doesn't excuse density drift; the loudest-icon problem hides inside familiar shapes
- Confidence: repeated

### 2026-11-16 | export ladder as part of the drawing, not an export step
- Situation: 16px renders of full-detail glyphs turned to mush (leaves, door, clapper all collided)
- Move: designed each glyph's 16px variant while drawing the 24px master — decided which interior details die (door, leaves, notch, clapper) and wrote them into the sheet as explicit per-size variants
- Pitfall: "export and shrink" is not simplification; a 16px glyph carries ~⅓ of the 24px detail and must be re-drawn, not scaled
- Confidence: repeated
