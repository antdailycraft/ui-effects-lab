# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Categories: **Added** (new features), **Changed**, **Deprecated**, **Removed**,
**Fixed**, **Security**.

## [Unreleased]

_Nothing yet._

## [0.5.0] - 2026-08-17

### Added

- **Effect combination (SVG filter stacking)** — a new "Combine" panel stacks
  SVG-filter effects into a chain (`filter: url(#a) url(#b) …`) applied in order.
  Add the active effect as a layer, reorder or remove layers, or clear the stack.
  The preview renders the committed layers plus the active effect as a live top
  (de-duped so a just-added layer isn't applied twice); the code viewer emits the
  combined SVG (one `<filter>` per layer) + the chained CSS, and Copy code and
  URL sharing include the stack. SVG-filter effects only — CSS and WebGL
  generators can't be chained.

### Known limitations

- Sandbox export (CodePen/StackBlitz) still exports the single active effect, not
  a combination stack — a follow-up.

## [0.4.0] - 2026-08-17

### Added

- **Custom HTML preview** — a new "Custom" preview target renders your own markup
  with the effect applied live. An inline editor (persisted to LocalStorage, with
  a Reset to the sample) sits under the preview bar; the markup is sanitized
  (drops `<script>`/`<iframe>`/`<object>`/`<embed>`, inline event handlers, and
  `javascript:` URLs) before rendering. Available on every SVG/CSS/Retro effect.

## [0.3.0] - 2026-08-16

Phase 5 (Sharing) — share links, sandbox export, and favorites.

### Added

- **Favorites** — star any effect from the catalog; favorites persist in
  LocalStorage and surface in a "★ Favorites" group pinned to the top of the
  catalog. The star shows on row hover and stays lit for favorited effects.
- **Export to CodePen / StackBlitz** — bottom-bar buttons open the current effect
  as a runnable sandbox. Native SVG/CSS/Retro effects export as a static HTML+CSS
  pen (the effect applied to a sample card); WebGL generators export as a React
  demo — a Babel + esm.sh pen on CodePen, and a full Vite + React project (with
  the `@paper-design/shaders-react` dependency) on StackBlitz.
- **URL sharing** — a Share button (bottom bar) encodes the current effect,
  parameters, and preview type into a `#s=…` hash (base64url JSON), copies the
  full link to the clipboard, and reflects it in the address bar. Opening a
  shared link restores that exact view — the hash takes precedence over the
  last-used effect in LocalStorage.

## [0.2.0] - 2026-08-16

Completes the P1 preview set.

### Added

- **Newspaper & Button preview targets** — two new preview targets complete the
  P1 set: a vintage broadsheet front page (masthead, dateline, three justified
  columns with a drop cap) and a product CTA pair (primary + ghost button). Every
  filter / CSS / retro effect now supports all five targets (card, text, image,
  button, newspaper).

### Changed

- **Data-driven preview toggle** — the Preview target buttons now render from the
  selected effect's `previewTypes` instead of a fixed list, and the active target
  falls back to the effect's first supported one when the persisted selection
  isn't available.

## [0.1.0] - 2026-08-16

A large feature release: a new WebGL **Generators** category (16 → 50 effects),
built-in and user presets, a compare drag slider, fullscreen, and deployment
wiring.

### Changed

- **Compare state shape (breaking, internal)** — `PlaygroundState.compare:
  boolean` became `compareMode: "off" | "side-by-side" | "slider"` and gained
  `fullscreen: boolean`; `TOGGLE_COMPARE` was replaced by `SET_COMPARE_MODE` /
  `TOGGLE_FULLSCREEN` / `SET_FULLSCREEN`. `ParamValue` widened to include
  `string` for color controls. Added `@types/node` so `vite.config.ts` can read
  `process.env` under `tsc`.

### Fixed

- **CSS syntax highlighting** — the CSS code tab (and the full-code modal) was
  shown as plain text; it now has a dedicated tokenizer coloring selectors,
  properties, functions, numbers, hex colors, strings, and comments.
- **Before/After compare on the Text preview** — the large single-word headline
  overflowed its box and the two copies overlapped side-by-side. Text compare
  now stacks vertically (Card/Image still compare side-by-side).

### Added

- **Compare drag slider** — a new "Slider" compare mode overlays the original
  and the effect with a draggable divider (pointer drag or focus + ← / →), on
  top of the existing "Split" side-by-side view. The compare toggle is now a
  three-way Off / Split / Slider control.
- **Fullscreen preview** — a fullscreen button expands the preview stage to fill
  the viewport for an immersive look at any effect or generator; Escape or the
  button exits. Preview-type and compare controls stay reachable while immersed.
- **Deployment** — a `vercel.json` makes the repo one-click importable on Vercel
  (the recommended path; works while private), plus a manual GitHub Actions
  workflow (`.github/workflows/deploy.yml`) that publishes to GitHub Pages once
  the repo is public or on a plan that includes private Pages. Vite's `base` is
  now deploy-aware (`/ui-effects-lab/` for Pages, `/` everywhere else). See
  `docs/DEPLOY.md`.
- **Built-in presets** — every WebGL generator now ships its library's curated
  presets (e.g. Swirl → Default / 007 / Opening / Candy) as one-click chips in a
  new "Built-in" section of the Presets panel. Loading one merges over the
  effect's defaults, so partial presets never leave a control undefined, and the
  code viewer updates in sync. The three hand-written generators (Mesh Gradient,
  Warp, Voronoi) were folded into the shared shader factory to gain them too.
- **Color controls** — a new `color` control type (swatch + hex). Duotone and
  Neon Glow now pick real colors instead of hues, and Grain Gradient exposes its
  full palette so shader generators can be recolored. `ParamValue` now includes
  strings; Randomize picks pleasant random colors.
- **Image-based generators** — generators can now take a source `image`. A
  Source picker (three built-in canvas-generated samples + a URL field) appears
  for image shaders. This revives Heatmap, Image Dithering, and Lens Distortion
  (which need an image) and gives the overlay shaders — Fluted Glass, Halftone
  CMYK, Halftone Dots — real content to work on. Generators now total 30.
- **Full-code modal** — an Expand button on the code viewer opens a large
  popup showing the whole generated code (no clipping), with its own Copy
  button; closes on the ✕, the backdrop, or Escape.
- **Presets** — save the current effect's parameters to LocalStorage under a
  name, then reload or delete them. Presets are scoped to their effect and
  surfaced in a Presets section of the Controls panel. Loading a preset restores
  its effect and parameters together (`LOAD_PRESET`).
- **Emboss, Sharpen, Bevel effects** — three browser-native SVG-filter effects
  (`feConvolveMatrix`, `feSpecularLighting` + `fePointLight`) drawn from the
  license-free web-platform tech in the research report. No new dependencies.
- **Color Grade, Duotone, Invert, Edge Detect, Motion Blur, Neon Glow, Gradient
  Border** — seven more browser-native effects (`feColorMatrix`,
  `feComponentTransfer`, `feConvolveMatrix`, directional `feGaussianBlur`,
  `feMorphology` glow, and CSS `mask-composite`), plus an `hslToRgb`/`hslToHex`
  color helper. No new dependencies.
- **Generators category** — a new effect `kind: "generator"` whose effect *is*
  the preview (a self-contained component), plus a `react` code tab. Generators
  are GPU shaders from `@paper-design/shaders-react` (Apache-2.0, the first
  runtime dependency); their per-effect license badge reads Apache-2.0 rather
  than MIT. Ships 27: Mesh Gradient, Warp, Voronoi, Grain Gradient,
  Metaballs, Swirl, Dot Orbit, God Rays, Liquid Metal, Dithering, Water,
  Neuro Noise, Smoke Ring, Spiral, Perlin Noise, Pulsing Border, Color Panels,
  Dot Grid, Fluted Glass, Gem Smoke, Halftone CMYK, Halftone Dots,
  Paper Texture, Simplex Noise, Static Mesh Gradient, Static Radial Gradient,
  and Waves — every standalone shader in the library. Added via a small
  `shaderGenerator` factory that spreads each shader's own preset defaults. (The
  three image-input shaders — ImageDithering, LensDistortion, Heatmap — arrived
  with the image-source picker below, bringing the total to 30.)

## [0.0.1] - 2026-08-15

Initial working build of the UI Effects Lab playground.

### Added

- **Playground core** — three-column console (catalog · live stage · controls +
  code), light/dark theme with LocalStorage persistence, and
  `prefers-reduced-motion` support.
- **Data-driven effect registry** — effects are `EffectDefinition` objects
  (controls, defaults, renderer, code generators) aggregated in
  `registry/effects.ts`; catalog, controls, preview, and code viewer all render
  generically. Supports `kind: "svg"` (applied via `filter: url(#id)`) and
  `kind: "css"` (class + CSS custom properties).
- **16 effects** across three categories:
  - _SVG Filters_ — Rough Edge, Paper Grain, Noise Texture, Water Distortion,
    Liquid, Heat Haze, Cloud / Fog, Sticker (`feMorphology`), Gooey
    (`feColorMatrix`), Drop Shadow (`feDropShadow`), Posterize
    (`feComponentTransfer`).
  - _CSS Effects_ — Frosted Glass (`backdrop-filter`), Holographic Card
    (gradient + `mix-blend-mode`), Conic Spin (`@property` + `conic-gradient`).
  - _Retro_ — Glitch (RGB channel split), CRT / Analog (scanlines + vignette).
- **Catalog** — search over name/tags/tech, category grouping, selection.
- **Live preview** — Card / Text / Image targets, Before/After side-by-side
  compare.
- **Controls** — data-driven range / seed (+ dice) / animate toggle.
- **Code viewer** — SVG and CSS tabs (CSS-only for CSS effects) with a
  single-pass syntax highlighter and copy-to-clipboard.
- **Randomize / Reset** — randomize stays within safe per-control ranges.
- **Resources menu** — top-bar dropdown with 7 curated external design tools
  (MagicPattern, Variant, SEESAW, Refero, Recent, Awwwards, Land-book).
- **Per-effect license badge** — SPDX badge in the effect header (defaults to
  MIT); repo carries an MIT `LICENSE`.
- **Dev/preview server** — external access (`host: true`), fixed port 5180
  (`strictPort`), and `allowedHosts: ["atlas"]`.
- **Tooling & docs** — Vite + React + TypeScript scaffold, Vitest test suite
  (50 tests); `docs/PRD.md`, `docs/effects/feTurbulence.md`, the UI mockup, the
  implementation plan, and the library/web-tech research report
  (`docs/research/2026-08-14-css-effects-libraries.md`).

[Unreleased]: https://github.com/antdailycraft/ui-effects-lab/compare/v0.5.0...HEAD
[0.5.0]: https://github.com/antdailycraft/ui-effects-lab/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/antdailycraft/ui-effects-lab/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/antdailycraft/ui-effects-lab/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/antdailycraft/ui-effects-lab/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/antdailycraft/ui-effects-lab/compare/v0.0.1...v0.1.0
[0.0.1]: https://github.com/antdailycraft/ui-effects-lab/releases/tag/v0.0.1
