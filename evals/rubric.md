# Rubric — six dimensions, scored 1–5

Score each dimension independently, then average. Judge what is **observable in the deliverable**, not what the process claimed. 1 = clearly broken, 3 = competent but generic, 5 = a working designer would ship it.

| Dimension | What to look at | 5 looks like |
|---|---|---|
| **1 · Brief adherence** | Does it satisfy stated constraints (format, brand, audience)? Pinned choices respected? | Every constraint honored without visible strain |
| **2 · Concept fit** | Do layout, motif, and imagery come from the subject's world? Swap test: would it survive on a competitor's page? | Only this subject could carry this design |
| **3 · Hierarchy & craft** | Squint test; one star per screen; spacing rhythm; type scale steps; alignment; measure | Hierarchy obvious at a glance, rhythm even, nothing accidental |
| **4 · Anti-slop** | Count hits on `knowledge/core/anti-slop.md` tells (eyebrows, identical card rows, slop copy, purple gradients, default cast…) | Zero default-family hits; every bold choice traceable to the brief |
| **5 · Accessibility & floors** | Contrast ≥4.5:1, targets ≥44px, focus visible, reduced-motion honored, no invented facts | All floors silently satisfied |
| **6 · Polish & delivery** | Rendered correctly at target sizes; nothing overlaps/falls off; rationale coherent; caveat honesty | Ship-ready; the explanation names real decisions |

## Scoring rules

- Score dimensions independently — a beautiful but inaccessible design is not a 4.5 average, it's a fail on dimension 5.
- For blind A/B: candidate **wins** only if its average is strictly higher AND no dimension drops more than 0.5 vs the baseline.
- Record per-dimension scores, not just the average — the losing dimension tells contributors what to fix.
- When judging your own output, score adversarially: assume it's wrong until each floor is verified.
