---
id: critique
kind: core
applies: [any]
status: core
source: "distilled: huashu-design critique-guide, hallmark review, frontend-design two-pass"
updated: 2026-11-17
---

# Critique — how to review someone else's design

The GATE checks your own work; this file governs reviewing *theirs* — a "review this poster / is my landing page any good" task. The failure modes of AI critique are vagueness ("could be more polished"), dump-everything (20 unranked notes), and tone-deafness (lecturing the person who made it).

## Read intent before judging

- Reconstruct the brief first: who is it for, what is the one job, what was pinned (brand, platform, budget)? If intent is unknown, **ask one question before critiquing** — reviewing against the wrong goal produces confident nonsense.
- Judge against their goal, not against your taste. A deliberately brutalist page doesn't fail for being loud; it fails for being illegible.

## The three passes (in order)

1. **5-second pass**: look away, look back. What registers? Is it the right thing? Note what you actually saw, not what you expected.
2. **Squint pass**: blur or zoom out. Does hierarchy survive? One star per screen? Reading order correct?
3. **Device pass**: the target contexts — 1440 and 375 for web, exact canvas for graphics, projected size for decks. Broken-at-375 is damage; imperfect-at-1920 is polish.

Only then run the slop inventory (anti-slop.md) and the domain checklist — findings with a rule behind them, not vibes.

## Damage ranking — the core discipline

- Rank findings by **damage**: what most costs comprehension, trust, or the one job. Accessibility failures outrank taste; a lying stat outranks everything.
- Deliver **top 3 per round**, explicitly ranked. Everything else goes in a short "worth a second pass" list. A 20-item dump means the reviewer didn't prioritize.
- Each finding has four parts: **what** (point at the exact element) → **why** (cite the rule/floor it breaks) → **fix** (concrete: rewrite the headline, move the CTA, this palette swap) → **severity** (blocker / should-fix / polish). Show the rewritten headline; never say "make it stronger".
- "Make it pop" translations — vague feedback from others gets converted to testable statements: "pop" usually means the primary element lacks contrast or scale; "clean" usually means spacing rhythm is uneven; "professional" usually means 2 typefaces and a real token palette.

## What works first — with evidence

- Open with what genuinely works and **why it works** (which rule it obeys) — specifics, not flattery. "The symptom ledger replaces a feature grid — that structure is why it feels trustworthy" teaches; "great job!" does not.
- If everything fails, say what the *intent* got right before listing failures.

## Tone

- Critique the design, never the person. "This reads as a template" — not "you didn't try".
- One voice: colleague in a studio, not gatekeeper. Condescension is a hard fail even when the analysis is right.
- When the design is irredeemable, say so plainly and offer the rebuild direction — vague mercy wastes the user's time.

## If asked to fix, not just review

- Switch back to the standard workflow: DEAL for direction, GATE rounds fixing only the 3 most damaging issues per round, ≥2 rounds, before/after shown side by side.
- Keep their wins: name what must survive the redesign so the fix doesn't erase identity.

## Capture

- The user's reactions are data: record verbatim taste statements ("too corporate, we're not a bank") into `learnings/<domain>.md` with the situation — next design for this user starts from their history, not zero.

## Critique checklist

- [ ] Intent/audience confirmed (asked if unclear) before judging
- [ ] 5-second, squint, and device passes all run — findings cite what was actually seen
- [ ] Slop inventory and domain checklist run; every finding names the rule it breaks
- [ ] Findings ranked by damage; exactly 3 delivered per round, rest deferred
- [ ] Every finding: what → why (rule) → concrete fix → severity
- [ ] Vague feedback from the user translated into testable statements
- [ ] What works stated first, with the reason it works
- [ ] Tone: design not person; no condescension; plain speech when something is irredeemable
- [ ] Fix-mode requests switch to DEAL + GATE rounds with before/after
- [ ] User taste statements captured verbatim into learnings
