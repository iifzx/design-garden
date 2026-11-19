# 飛天 · 散花梦 — Dunhuang feitian web game

A single-file 2D canvas game — no dependencies, no assets, no network. Guide a flying apsara through a night sky over the Mingsha dunes: gather lotus lamps and gold bells, dodge ink-wisps and sand blades, spend the meter on 「散花」 — a slow-motion petal vortex that clears the screen. User commission, 2026-11-20 (Chinese brief: 敦煌飞天主题二维网页游戏，特效至上，必须好看，不能是儿童卡通).

**Play:** serve this directory over any static HTTP server and open [index.html](index.html). Drag (or arrow/WASD) to steer; Space — or the 散 button on touch — triggers the ultimate when the meter is full; P pauses, M mutes. Best score persists locally.

**QA harness:** `?shot=play|sanhua|end&debug=1` pins game states (autopilot collects, auto-ultimate, forced end panel) so `shoot.mjs` can capture each one — the same mechanism as [peso-onboarding/capture.html](../peso-onboarding/capture.html). `?debug=1` also mounts an on-page error overlay and an fps probe.

**Art direction — 「鎏金夜窟」.** The brief pinned the style, so DEAL was skipped under the brief-wins rule: mineral-pigment palette derived from the murals (ink-indigo night, 土红 cinnabar, 石青 azurite, 石绿 malachite, 鎏金 gold), KaiTi type stack, vertical 飛天 title with a vermilion seal. Every glow is earned by material logic — halo, silk, lamp flame — never wallpaper.

**Effects inventory:** 5 verlet silk ribbons (wind-drifted, tapered gradient fills, hand-anchored) · mandorla + rotating pearl-ring halo · layered parallax (stars, moon, faint 藻井 mandala, dunes with 九层楼 silhouettes, cloud curls, gold dust) · pooled petals/sparks/rings/glyphs/splats · slow-mo ultimate with shockwave rings and a seal-stamp slam · combo seals 妙/绝/神 · ink-splat hits with shake and red vignette · film grain · procedural WebAudio: pentatonic plucks rising with combo, gong, bell, thud, ambient drone.

**GATE grades:** contrast — PASS after lint caught the seal text at 4.4:1 (raised to ≈5:1; 4 justified yellows on translucent buttons over a canvas-verified dark backdrop) · touch targets ≥44px and focus rings — PASS · motion transform/opacity only, UI <300ms, `prefers-reduced-motion` damps shake/flash/particles — PASS · verified at 1440 and 375 — PASS · performance — uncapped fps probe ≈150 on the QA machine's integrated GPU; headless captures read 30fps (SwiftShader artifact, disproved by the foreground probe) · content visible without JS — WAIVED (the deliverable is a game; `<noscript>` states it plainly).
