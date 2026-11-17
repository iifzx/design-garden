# 新手站设计记录 / Design record

This file is the BRIEF → DEAL → EXECUTE → GATE paper trail for the beginner site.
It follows `SKILL.md` and the `ui-web` route. Knowledge loaded for this task:
`learnings/ui-web.md`, `knowledge/domains/ui-web.md`, `knowledge/core/anti-slop.md`,
`knowledge/core/principles.md`, `knowledge/core/layout.md`, `knowledge/core/color.md`,
`knowledge/core/typography.md`, `knowledge/core/critique.md` (7 knowledge files + learnings).

## BRIEF

- **Who**: Chinese-speaking beginners who have never used GitHub or an AI agent. They can
  copy-paste and type a sentence; they freeze at a repo page full of tabs. Secondary: curious
  users who want to submit a poster or vote without writing code.
- **Job**: within 30 seconds, answer "where do I click to install, what are these GitHub
  buttons, and how do I show a work or vote?" The page is a field guide, not a product pitch.
- **Context**: standalone `/start/` site on GitHub Pages, mobile-first (375) and desktop (1440).
  Same repository as the knowledge base, but its own navigation and visual system. The
  knowledge-base site is not redesigned.
- **Temperature**: calm, plain-spoken, quietly confident. A gardener explaining a tool, not a
  conference booth.
- **Success, observable**: every path has one verb-object action; every command is copy-ready;
  every screen can be understood without hover; a visitor can reach the issue form or a
  download in one click.
- **Unknowns**: real community submissions and vote counts do not exist yet. They are shown as
  honest empty states, never invented. Project examples are real outputs with model credit.

## DEAL — three directions

### A. Garden field guide (chosen)

An editorial field guide / herbarium: cool chalk paper, forest ink, dried-sage wells, a
mustard foil accent. Chapter numbers on a left rail; seed-packet download block; button
specimens; herbarium-sheet gallery. Display: Bricolage Grotesque; body: Source Serif 4;
CJK falls through to PingFang / Songti. Asymmetric 12-column ledger, not a card deck.

Why it fits: the subject is a garden that grows knowledge, and a beginner needs a guide with
chapters, specimens and margin notes. The structure carries the content (buttons, folders,
works, steps) instead of decorating it. It also avoids the warm-cream + serif + terracotta
default: paper is cool, the accent is mustard, and the display face is a grotesque.

### B. Toolbench (rejected)

Dark workbench, mono labels, dense module grid, one acid accent. It would read as a developer
dashboard and raise the beginner's anxiety; it also lands on the near-black + acid-accent tell.

### C. Community noticeboard (rejected)

Corkboard, pinned cards, handwritten labels, bright primaries. Friendly, but a row of pinned
cards flattens hierarchy, and the playfulness competes with the serious install instructions.
It would also make contrast and 375px reflow harder for no informational gain.

## EXECUTE — system

### Palette (derived from the garden's world)

| Token | Value | Where it comes from |
|---|---|---|
| `--paper` | `#F1F0E4` | Cool chalk paper of a field notebook, not warm cream |
| `--paper-2` | `#E7E6D6` | A pressed-leaf well; used for full-bleed chapter bands |
| `--paper-3` | `#DCDAC7` | The index-card edge / hard offset |
| `--ink` | `#1B2620` | Forest ink, tinted green, never pure black |
| `--muted` | `#5E6A5F` | Lichen grey for secondary text |
| `--forest` | `#24402F` | The hedge; primary buttons and headers |
| `--forest-2` | `#315640` | Hover / secondary green |
| `--sage` | `#8EA289` | Dried leaf; dividers and quiet labels |
| `--brass` | `#B98A2E` | Seed-packet foil; large accents and rules only |
| `--brass-ink` | `#6E5015` | Small brass-family text (passes 4.5:1 on paper) |
| `--rule` | `#CBC8B4` | Hairline |
| `--success` | `#2F6B4F` | Vote/positive |
| `--error` | `#8E3B32` | Warnings only, paired with a label |

`--brass` is never used for small text: the existing learning entry shows metallic accents
pass the eye test and fail 4.5:1. Small accent text uses `--brass-ink`.

### Type

- Display: **Bricolage Grotesque** 400/700/800. CJK fallback: PingFang SC, Microsoft YaHei,
  Noto Sans SC.
- Body: **Source Serif 4** 400/600. CJK fallback: Songti SC, Noto Serif SC.
- Code/labels: system monospace, functional only.
- Base 17px CJK body, line-height 1.7; display tracking −0.03em; measure ≤34em for CJK.
- Scale: 16 / 21 / 25 / 34 / 52 / 84 (clamp at display sizes). 3 weights max.

### Layout grammar

- 12 columns, 24px gutter, one `1240px` wrap; `overflow-x: clip`.
- Chapter shell: `170px` rail + content, rail sticky at 96px on desktop; single column at 900px.
- Section gaps vary: 96 / 120 / 144; no repeated seam.
- Surface ladder: paper → hairline → tinted well; no card gets border + shadow.
- One dominant element per screen: hero headline → seed packet → chapter title → gallery image.
- Adjacent sections never share a form: hero split / ticket strip / disclosure ledger / table /
  herbarium grid / vertical trail / scoreboard / tool bench.

### Signature moves

1. **Seed packet** in the hero: a real packet with a foil seal, stats, and a hard offset. It is
   the install promise made physical, not a decorative card.
2. **Button specimens**: GitHub controls drawn as labeled specimens with their real names,
   each opening a field note (where it is, what it does, whether a beginner needs it).
3. **Chapter rail + folio numbers**: the guide reads as a numbered manual, not a landing page.
4. **Herbarium gallery**: images sit on captioned sheets with type / tags / credit / vote count;
   spans vary by work, so the grid is a composition, not a deck.
5. **Tear-off download strip**: one ticket split into Skill / DSH / agent paths, with dashed
   seams and copy-ready commands.

### Motion

- One load moment: hero copy and packet rise 8px + fade, 280ms, staggered 40ms.
- Hover: background/underline only, 140ms. Press: `scale(0.97)`. Details open natively.
- `prefers-reduced-motion`: no transform, no animation, no smooth scroll.

## ASCII wireframe (1440)

```
┌ header: 设计花园·新手站 | 装上 按钮 地图 作品 投稿 投票 | EN GitHub ┐
│                                                                  │
│  H1 先看懂，                    ┌ seed packet ┐                   │
│  再种下你的                    │ DESIGN       │                   │
│  第一朵花。                    │ GARDEN       │                   │
│  intro + 下载 / 先逛            │ 9 domains    │                   │
│                                └──────────────┘                   │
│  ┌ 01 我想用 ┐ ┌ 02 我想逛 ┐ ┌ 03 我想帮 ┐                        │
├ 01 ─ 装上 ────────────────────────────────────────────────────────┤
│ rail │  ticket: [skill zip] | [git clone] | [dsh plugin]          │
│      │  3 prompt rows                                             │
├ 02 ─ 按钮导览 ────────────────────────────────────────────────────┤
│ rail │ filters  [ 01 Star specimen + 必点 ]  [ 02 Fork ... ]      │
│      │ summary: 只记 Star / Issues / Code                         │
├ 03 ─ 仓库地图 ────────────────────────────────────────────────────┤
│ rail │ ledger: path | what | you can do                           │
├ 04 ─ 作品馆 ──────────────────────────────────────────────────────┤
│ rail │ filters; 7/5 + 4/8 image spans; empty community frame      │
├ 05 ─ 投稿 ────────────────────────────────────────────────────────┤
│ rail │ 1 → 2 → 3 → 4 trail; checklist well; quick table           │
├ 06 ─ 投票 ────────────────────────────────────────────────────────┤
│ rail │ theme banner; leaderboard rows; blind pair split           │
├ 07 ─ 小工具 ──────────────────────────────────────────────────────┤
│ rail │ roulette | checklist | glossary | prompt recipe            │
└ footer: deep forest, site map, docs, GitHub, license ─────────────┘
```

## GATE plan

1. Build at 1440 and 375; screenshot both; check hero + one action visible at 1280×800.
2. Contrast: body ≥4.5:1, large/UI ≥3:1; focus ring 2px + 2px offset on every control.
3. Touch: every button, nav link, chip, checkbox, copy control ≥44px.
4. Content without JS: all sections render server-side; filters/games are enhancements.
5. `prefers-reduced-motion`: kill the hero rise and transitions.
6. Section gaps vary; no repeated card radius; no border + shadow.
7. Fix only the 3 most damaging issues in round one, then rebuild and re-check.

## GATE results (2026-11-17)

- **1440 / 375**: both rendered from the built site. `innerWidth === scrollWidth === bodyWidth`
  at 1440 (1440) and 375 (375); no horizontal overflow. Screenshots: `.gate-start-1440.png`,
  `.gate-start-375.png`, `.gate-start-en-1440.png` plus the section captures.
- **Contrast**: body ink/paper 13.63:1; muted/paper 4.95:1; muted/paper-2 4.51:1;
  forest/paper 9.91:1; brass-ink/paper 6.50:1; error/paper 6.49:1; paper/forest 9.91:1.
  Brass itself is only used for rules and fills, never small text.
- **Touch**: primary buttons, chips, copy buttons, table links and nav links are ≥44px. The final
  375 scan reports no control below 44px in either dimension. Inline prose links are exempt from
  the 44px target rule and keep their natural line height.
- **No JS**: both pages are server-rendered; all seven chapters, buttons, map, gallery, submission
  steps and vote list are visible without JS. Filters, copy, blind pair, roulette and prompt
  recipe are progressive enhancements.
- **Motion**: the only load motion is 280ms; hover/press transitions are 100–200ms;
  `prefers-reduced-motion: reduce` removes animation, transitions and smooth scroll.
- **Focus**: a global `:focus-visible` ring (2px forest, 2px offset) applies to links, buttons,
  summaries, inputs and selects; no `outline: none` in the stylesheet.
- **Interactions tested**: “想贡献” filter leaves 4 specimens; style roulette returns
  “Neo-Brutalism” and a link to its recipe; prompt recipe echoes the typed brief; blind pair
  buttons read “左边更好 / 右边更好” and swap the pair.
- **Known limitation**: there is no real community submission or vote yet. The empty states are
  honest; the intake/vote workflows are wired but not exercised against a live issue in this
  checkout.

## Never list for this site

- Warm cream `#F4F1EA` + Playfair/Fraunces display + terracotta.
- Near-black canvas with one acid accent; violet anywhere.
- ALL-CAPS tracked eyebrow above every heading; rows of identical cards.
- Fake browser chrome; emoji as structural icons; invented community works or vote counts.
- "Get started" / "Learn more" buttons; two-fragment contrast headlines.
