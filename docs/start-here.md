# 🌻 Start Here — use it and help out, with zero coding

> This guide is for you if you've never touched an AI coding tool. No programming knowledge needed — if you can copy-paste and type, you can do all of it.

中文版：[start-here.zh-CN.md](start-here.zh-CN.md) · Ready for more? See [CONTRIBUTING.md](../CONTRIBUTING.md)

---

## 1. What is design-garden? (plain-language version)

Imagine knowing a **seasoned designer who knows a bit of everything**: posters, icons, logos, shop layouts, slide decks, even "does this color clash with that one?"

design-garden packs that designer's work handbook into your AI assistant. It has three layers:

1. **The handbook itself** (there when installed) — craft rules and pitfall lists for all kinds of design
2. **It gets smarter with use** (automatically) — after every design it helps with, it notes "what worked this time" in its handbook, and does better next time
3. **Everyone feeds it** (that's us) — people worldwide donate good experience back, so it gets better for everyone

**You don't need to know how it works, any more than you need to understand an engine to drive.**

## 2. Install it (two minutes)

You need an AI assistant that supports skill packs (e.g. ZCode or Claude Code). If you don't have one yet, install that first — or skip to section 4, you can help without installing anything.

**Step 1**: Open a terminal (Windows: `Win + R`, type `powershell`, Enter; Mac: open "Terminal").

**Step 2**: Paste this one line and press Enter:

```bash
git clone https://github.com/iifzx/design-garden.git ~/.agents/skills/design-garden
```

A "Cloning into..." message means success. That's it — it's now part of your AI assistant.

**Step 3** (every time you use it): open your AI assistant and just talk like a human:

> "Make a poster for a neighborhood stray-cat fundraiser"

> "A promo image for my fruit shop — lychees are in season"

> "This graphic looks off — what's wrong with it?" (attach the image)

> "Make an invitation page for my daughter's birthday party"

If it doesn't seem to "put on the designer hat" the first time, just say: "Use design-garden to …".

## 3. After you use it

- **It takes its own notes** — you do nothing. The more you use it, the better it gets at the designs you actually make.
- **Don't like something? Just say so**: "redo the palette", "too busy, make it calmer" — it understands, and it remembers your preference.
- **Curious how it thinks?** Ask "what style did you use and why?" — it will explain (a decent way to learn design, too).

## 4. Help out in five minutes (no code required)

Technology should serve everyone — **this project runs on ordinary users**. From top down, each step gets a bit deeper:

| Effort | What you can do | Time |
|---|---|---|
| ⭐ | Star the repository — helps more people find it | 10 sec |
| 🗳️ | Vote in [Discussions](https://github.com/iifzx/design-garden/discussions) **Polls**: which of two images looks better? One click | 30 sec |
| 🌻 | File a [**First bloom report**](https://github.com/iifzx/design-garden/issues/new?template=beginner_bloom.yml): answer 3 questions — what did you ask it to make? how did it turn out? what surprised or bugged you? | 2 min |
| 📋 | Post a **real design need from your life** as an issue ("I need a lost-cat flyer") — good real briefs become test tasks that make the skill better at real life | 3 min |
| 🌱 | Comfortable now? Head back to [CONTRIBUTING.md](../CONTRIBUTING.md) for the full contribution paths: share learnings, write style recipes, run reviews | one cup of tea |

Your First bloom reports genuinely matter: every one gets distilled into the knowledge base — **the "something feels off" instinct of a non-designer is exactly what machines lack.**

## 5. Mini glossary (only 4 terms)

- **AI assistant / agent**: an AI program running on your computer that does work for you
- **skill pack**: a "professional handbook" installed into an AI assistant — design-garden is a design handbook
- **blind vote**: you're not told who made which image, so taste alone decides — that's what makes it fair
- **PR / contribution**: donating one small piece of content into this shared handbook

## Common small problems

- **"Path does not exist" error?** Run `mkdir -p ~/.agents/skills` first, then retry.
- **No git?** Install [Git](https://git-scm.com/downloads) for your OS.
- **The output isn't my style?** Describe the feeling in one plain sentence ("clean and simple, like an IKEA manual") — the more human the description, the better the result.
- **Want to remove it?** Delete the folder — nothing is left behind.
