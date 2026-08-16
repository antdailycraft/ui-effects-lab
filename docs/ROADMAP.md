# Roadmap

Living status of UI Effects Lab against the PRD priorities (`docs/PRD.md` §28)
and development phases (§31). Update this file as items ship; record the *what*
in [`CHANGELOG.md`](../CHANGELOG.md) and the *plan* here.

Legend: ✅ done · 🟡 in progress · ⬜ not started

_Last updated: 2026-08-16 (v0.2.0 — P1 complete)_

## P0 — Must have · ✅ complete

- ✅ Effect Catalog (search, category grouping, selection)
- ✅ Preview targets — Card / Text / Image
- ✅ Parameter controls · Reset · Randomize (safe per-control ranges)
- ✅ Code viewer — SVG / CSS / React tabs, syntax highlight, Copy, full-code modal
- ✅ Before/After side-by-side (Split) compare
- ✅ Local presets (save / load / delete, scoped per effect)
- ✅ Light / Dark theme (LocalStorage)

## P1 — Should have

- ✅ Comparison drag slider
- ✅ Fullscreen preview
- ✅ Animation controls (enabled / speed / paused; respects reduced-motion)
- ✅ Search
- ✅ React JSX export (code viewer React tab)
- ✅ Newspaper preview target
- ✅ Button preview target

P1 is complete. The preview toggle is now data-driven — each effect only offers
the targets its `previewTypes` declares (all filter/CSS/retro effects support all
five: card, text, image, button, newspaper).

## P2 — Later · the remaining backlog

Phase 5 (Sharing) is the main outstanding chunk.

- ✅ **URL share** — `{ effectId, params, previewType }` serialized to a `#s=…`
  hash; Share button copies the link; opening it restores the view.
- ✅ **Export to CodePen / StackBlitz** — native effects → static HTML+CSS pen;
  generators → React (esm.sh on CodePen, Vite project on StackBlitz).
- ⬜ Favorites _(next up — small P2 win)_
- ⬜ Custom HTML preview target
- ⬜ Effect combination (stacking multiple filters)
- ⬜ Community presets

## Beyond the PRD — already shipped

Delivered on top of the original spec (see CHANGELOG `[0.1.0]`):

- ✅ **Generators category** — 30 WebGL shaders (`@paper-design/shaders`,
  Apache-2.0); catalog now totals **50** effects (14 SVG · 4 CSS · 2 Retro · 30
  Generators).
- ✅ Built-in presets (each generator's library presets as one-click chips)
- ✅ Color controls · image-source picker for image-based shaders
- ✅ Per-effect SPDX license badges
- ✅ Resources menu · CHANGELOG + release process · deployment config
  (Vercel + manual GitHub Pages, see `docs/DEPLOY.md`)

## Development phases (PRD §31)

| Phase | Scope | Status |
| ----- | ----- | ------ |
| 1 — Playground Core | layout, registry, preview, controls, code viewer | ✅ |
| 2 — SVG Effects | turbulence family + more | ✅ |
| 3 — Experiment UX | randomize, compare, preset, fullscreen | ✅ |
| 4 — CSS / Retro | glass, glitch, CRT, hologram | ✅ |
| 5 — Sharing | URL serialization, share, export | ⬜ |
