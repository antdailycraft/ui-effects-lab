# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Categories: **Added** (new features), **Changed**, **Deprecated**, **Removed**,
**Fixed**, **Security**.

## [Unreleased]

### Fixed

- **CSS syntax highlighting** — the CSS code tab (and the full-code modal) was
  shown as plain text; it now has a dedicated tokenizer coloring selectors,
  properties, functions, numbers, hex colors, strings, and comments.
- **Before/After compare on the Text preview** — the large single-word headline
  overflowed its box and the two copies overlapped side-by-side. Text compare
  now stacks vertically (Card/Image still compare side-by-side).

### Added

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
  and Waves — every standalone shader in the library. The three image-input
  shaders (ImageDithering, LensDistortion, Heatmap) are omitted because they
  render blank without a source image. Added via a small `shaderGenerator`
  factory that spreads each shader's own preset defaults.

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

[Unreleased]: https://github.com/antdailycraft/ui-effects-lab/compare/v0.0.1...HEAD
[0.0.1]: https://github.com/antdailycraft/ui-effects-lab/releases/tag/v0.0.1
