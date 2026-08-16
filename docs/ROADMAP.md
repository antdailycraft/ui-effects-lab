# Roadmap

Living status of UI Effects Lab against the PRD priorities (`docs/PRD.md` §28)
and development phases (§31). Update this file as items ship; record the *what*
in [`CHANGELOG.md`](../CHANGELOG.md) and the *plan* here.

Legend: ✅ done · 🟡 in progress · ⬜ not started

_Last updated: 2026-08-17 (v0.8.0 — landing page, effect gallery, Three.js showcase, resource thumbnails)_

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
- ✅ **Favorites** — star effects; a pinned "★ Favorites" group in the catalog.
- ✅ **Custom HTML preview** — a "Custom" target renders sanitized user markup
  with the effect applied live (persisted to LocalStorage).
- ✅ **Effect combination** — a "Combine" panel stacks SVG-filter effects into a
  `filter: url(#a) url(#b) …` chain (add/reorder/remove/clear); preview, combined
  code, Copy, and URL share all follow the stack. SVG-filter effects only.
- ⬜ Community presets — needs a hosted backend, which breaks the LocalStorage-
  only MVP; a server-less alternative would be a curated read-only gallery
  shipped as static JSON. Held for a product decision.

Former follow-ups, all done: sandbox export covers a combination stack,
generators lazy-load, and combination layers are now editable in place (click a
layer in the Combine panel). The only remaining P2 item is Community Presets
(needs a hosted backend).

## Reference tools (shipped) — a top-bar "Reference" menu

Design reference utilities beyond the effects playground, each keeping the
Explore → Copy loop, opened from the top-bar **Reference** menu in a shared
focus-trapped modal:

- ✅ **UI/UX terminology** — searchable, category-filtered glossary (~52 terms:
  Layout, Components, Interaction, Motion, UX Laws, Accessibility, Typography),
  many with live mini-previews. Includes Pagination / Pagination dots (v0.8.0).
- ✅ **CSS cursor showcase** — every `cursor` keyword with a live hover preview
  and copy-to-clipboard.
- ✅ **Emoji picker** — all 3,944 Unicode emoji (search + group filter, click to
  copy), generated from `docs/reference/EMOJI.html` and lazy-loaded + virtualized.
- ✅ **Showcase** (v0.8.0) — a bundled standalone Three.js "Dissolve" demo
  (`public/showcase/dissolve.html`) linked from the Reference menu (opens in a
  new tab): a note dissolving into ~46k GPU particles with Burn/Glitch/Ink-bleed
  variants, live parameters, playback scrub, and a GLSL source viewer.

## Beyond the PRD — already shipped

Delivered on top of the original spec (see CHANGELOG `[0.1.0]`):

- ✅ **Generators category** — 30 WebGL shaders (`@paper-design/shaders`,
  Apache-2.0); catalog now totals **56** effects (20 SVG · 4 CSS · 2 Retro · 30
  Generators).
- ✅ **In-app landing page** (v0.8.0) — hero with a live WebGL mesh-gradient
  background (static-gradient fallback), the Explore → Tweak → Compare → Copy
  loop, and a clickable SVG-filter effect marquee that deep-links into an effect.
  Shown before the workspace; skipped for `#s=` share links. The top-bar brand
  logo returns to it.
- ✅ **Effect gallery** (v0.8.0) — a top-bar Gallery opens a paginated grid (dot
  pagination, no scroll) of all 20 SVG filters plus all 30 live generators, 10
  tiles/page (bounds live WebGL contexts). Click a tile to open that effect.
- ✅ **Resource hover thumbnails** (v0.8.0) — Resources-menu previews that follow
  the pointer (site `og:image`, else a bundled screenshot), loaded on hover.
- ✅ Built-in presets (each generator's library presets as one-click chips)
- ✅ Color controls · image-source picker for image-based shaders
- ✅ Per-effect SPDX license badges
- ✅ Resources menu (26 curated sites) · CHANGELOG + release process · deployment
  config (Vercel + manual GitHub Pages, see `docs/DEPLOY.md`)

## Development phases (PRD §31)

| Phase | Scope | Status |
| ----- | ----- | ------ |
| 1 — Playground Core | layout, registry, preview, controls, code viewer | ✅ |
| 2 — SVG Effects | turbulence family + more | ✅ |
| 3 — Experiment UX | randomize, compare, preset, fullscreen | ✅ |
| 4 — CSS / Retro | glass, glitch, CRT, hologram | ✅ |
| 5 — Sharing | URL serialization, share, export | ✅ |
