# Beginner site source

This directory is the source of the standalone `/start/` site. It is rendered by
`scripts/build_start_site.mjs` into `site/start/` during local builds and GitHub Pages CI.

- `content.zh.mjs` / `content.en.mjs` — page copy and link targets. Edit one language at a time;
  keep the two objects structurally aligned.
- `layout.mjs` — the server-side renderer. It emits both pages with no client-side framework.
- `assets/start.css`, `start.js`, `favicon.svg` — the visual system and the small interactions
  (filters, copy, blind pair, style roulette, prompt recipe). The page is readable without JS.
- `DESIGN.md` — the brief, the three considered directions, the chosen system, and the gate record.

Data comes from the repository, not from a CMS:

- `community/featured.json` — curated project exhibits.
- `community/submissions/*.json` + `community/assets/` — merged community works.
- `community/votes.json` — counts synced from issue reactions.
- `community/themes.json` — the current monthly prompt.
- `knowledge/`, `dsh/`, `examples/` — counts, links and download sources.

Build:

```sh
node scripts/build_site.mjs
node scripts/build_start_site.mjs
```

The second command writes `site/start/index.html`, `site/start/en/index.html`, `data.json`,
copies the featured images, and builds the two download ZIPs. `site/` is git-ignored; CI rebuilds
it from tracked sources on every push to `main`.

Do not hand-edit `site/start/`. Edit the source here, rebuild, and check both 1440 and 375.
