---
id: anti-slop
kind: core
applies: [any]
status: core
source: "distilled: frontend-design, hallmark, design-taste-frontend, huashu-design (independently convergent lists)"
updated: 2026-11-16
---

# Anti-slop — the canonical tells and their fixes

Three independent design skills converged on the same list of AI tells. This file is the merged authority. Rule of intent: appearance *families* are fine — falling into the default family without a reason is not. The list exists so that every default is a conscious choice.

## Visual tells → fixes

| # | Tell | Fix |
|---|---|---|
| 1 | Warm cream `#F4F1EA` + high-contrast serif + terracotta `#D97757` | Derive palette from the subject (see color.md). If cream+serif is truly right, it must be justified by the subject |
| 2 | Near-black canvas + one acid-green/vermilion accent | Pick hue from the subject's world; accents get a paired ink |
| 3 | Violet/lavender anywhere; purple-blue gradients | Force to a justified hue; violet must come from the subject (grapes: yes; "premium": no) |
| 4 | ALL-CAPS tracked eyebrow labels above every heading | 12 ways to open a section instead: nothing, self-announcing heading, heavier-weight lead-in, drop cap (1/page), rule that does work, numeral at graphic scale, caption, marginalia, paper change, folio |
| 5 | Middle-dot meta strings ("Strategy · Design · Build") | Write a sentence or delete |
| 6 | "→" appended to links; status dots next to headings | Let typography carry the affordance |
| 7 | Rows of identical cards (same radius, same shadow, icon-tile-above-heading) | Deviate twice: drop one base card, promote/reorder one; differentiate by treatment |
| 8 | Card-in-card nesting; one radius + one gap everywhere | Surface ladder (whitespace → hairline → well → card); vary gaps 120/144/176 |
| 9 | Aurora/glow blobs; empty gradient "pictures" | Decorative gradients are earned by material logic, not used as wallpaper |
| 10 | Emoji as structural icons; SVG-drawn humans | Real icon sets at consistent stroke; real photography |
| 11 | Inter/Roboto/Poppins/Montserrat/Space Grotesk as display | Choose from the pairing logic in typography.md |
| 12 | Framework default palettes (Tailwind indigo-500) as brand | Derive from subject |
| 13 | Drawn browser/device chrome in mockups | Screenshot the real product or rebuild it in a data slot |
| 14 | Counting-device marks (24 identical ticks) | Marks must encode real counts or differences |
| 15 | Uniform icon-tile + heading + paragraph feature grids | Vary section forms; adjacent sections never share form |
| 16 | One duration for every transition | Duration table in motion.md |
| 17 | Scroll-reveal on everything; parallax on text; scroll-jacking | One orchestrated load moment; user-triggered motion that shows change |
| 18 | Fake black `#0B0B0B`/`#111` pretending to be brand ink | Real token ladder, tinted |
| 19 | "80 words of actual content" pages with 400 words of decoration | ~80 words per screen; cut decoration copy |

## Copy tells → fixes

- **Ban list**: seamless, robust, elevate, unlock, empower, delve, journey, "Whether you're X or Y…", "It's not just X, it's Y", "Say goodbye to…", "Reimagine…", "supercharge", "game-changer".
- **Cadence tells**: "Not a feature. A platform." (two-fragment contrast headline); "X. Y." fragments; colon titles; the virtue word (a page calling itself honest/fast/simple in the abstract); invented specificity ("99.7% of teams report…"); the polished testimonial with full name-title-photo.
- **Structural tells**: the strip of figures (4 identical stat blocks); logo walls that prove nothing; "Trusted by 10,000+ teams" without a source.
- **Fixes**:
  - h1 names the category + buyer/place in 2–8 words: "Bakery on Mill Street, Leith" — not "Crafted with passion".
  - Every heading contains a noun; buttons are verb + object ("Save changes").
  - Three tests per line: can the reader picture it? could it be proven false? could only this business say it?
  - Subhead ≤12 words; headline ≤7 words; ~450 visible words per marketing page.
  - Errors state the fix, never apologize vaguely; empty states invite.
- **Over-correction guard**: banning one tell breeds another (banning em-dashes breeds comma splices; banning "not X but Y" breeds "rather than"). The fix is stating the positive fact plainly, not swapping in the banned-adjacent construction.

## The default-cast tells (characters & invented facts)

- The default cast: Priya / Daniel / Amara Okafor as testimonial authors; Kestrel / Halcyon / Lumen / Nova as invented company names. If names appear, they come from the user or the real world.
- Never invent metrics, testimonials, reviews, logo walls, or awards. If evidence is needed and absent, ask the user or mark it as a placeholder visibly (`[PLACEHOLDER: …]`).
- Stock photos passed off as the client's team/office/product are a hard fail.

## Process tells (these make output feel generated even when the pixels look fine)

- The template structure: hero → 3 features → CTA → footer, identical on every project.
- The same direction as last project: check the user's history in `learnings/` — a returning user must not receive the same look twice.
- Over-forcing one big-idea metaphor per section; max one forceful move per page.
- The mirror test: "would a neighboring prompt produce this exact combination?" If yes, re-deal.

## When the brief names a slop look

If the user explicitly asks for cream+serif+terracotta, glassmorphism, or purple gradients — deliver it well. The ban list is about *defaults*, not *requests*. Note the choice and move on.
