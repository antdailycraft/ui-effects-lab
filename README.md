# UI Effects Lab

An interactive playground for SVG filter effects. Explore an effect, tune its
parameters live, compare before/after on real UI, and copy the generated
SVG/CSS — **Explore → Tweak → Compare → Copy**.

Built with Vite + React + TypeScript. Effects are data-driven `EffectDefinition`
objects aggregated in a registry (`src/registry/effects.ts`); the catalog,
controls, preview, and code viewer all render generically from that data.

## Commands

```bash
npm install     # install dependencies
npm run dev     # start the dev server
npm test        # run the test suite (Vitest)
npm run build   # type-check and build for production
```

> On Windows, run npm through a shell where `node` is on the PATH (e.g. the
> standard PowerShell/CMD prompt) so native postinstall scripts (esbuild) run.

## Effects

- **SVG Filters** — Rough Edge, Paper Grain, Noise Texture, Water Distortion,
  Liquid, Heat Haze, Cloud / Fog (the `feTurbulence` family, see
  `docs/effects/feTurbulence.md`), plus Sticker (`feMorphology`), Gooey
  (`feColorMatrix` metaballs), Drop Shadow (`feDropShadow`), and Posterize
  (`feComponentTransfer`).
- **CSS Effects** — Frosted Glass (`backdrop-filter`), Holographic Card
  (iridescent gradient + `mix-blend-mode`), Conic Spin (`@property` +
  `conic-gradient`).
- **Retro** — Glitch (RGB channel split via SVG filter), CRT / Analog
  (scanlines + vignette).

Library/tech research behind these additions lives in
`docs/research/2026-08-14-css-effects-libraries.md`.

Effects declare a `kind` of `"svg"` (applied via `filter: url(#id)`) or `"css"`
(a class + CSS custom properties); the code viewer shows the SVG+CSS or CSS-only
tabs accordingly. See `docs/PRD.md` for the full product spec and
`docs/superpowers/plans/` for the implementation plan.

## Project layout

```
src/
  types/        effect type model
  effects/svg/  one folder per effect (definition.ts)
  registry/     effect registry + helpers
  lib/          format, randomize, codegen, highlight, storage (pure, unit-tested)
  state/        PlaygroundContext (reducer + provider)
  components/   layout · catalog · preview · controls · code
  styles/       design tokens + component CSS
```

Roadmap (not yet built): local presets, comparison drag-slider, fullscreen,
React JSX export, URL sharing.

## Related tools & inspiration

Surfaced in the app's top-bar **Resources** menu (`src/data/resources.ts`).

**Tools**
- [MagicPattern — CSS Backgrounds](https://www.magicpattern.design/tools/css-backgrounds) — CSS background pattern generator.
- [Variant](https://variant.com/) — AI design generation; Style Dropper lifts a look onto other variants.

**Inspiration**
- [SEESAW](https://www.seesaw.website/) — curated website & font directory, updated daily.
- [Refero](https://refero.design/) — real product web/iOS UI library; search by pattern, Figma plugin + [MCP](https://refero.design/mcp).
- [Recent](https://recent.design/websites) — daily gallery of recently shipped web & app design.
- [Awwwards — Nominees](https://www.awwwards.com/websites/nominees/) — award nominees, high interaction & motion craft.
- [Land-book — Landing Pages](https://land-book.com/design/landing-page) — landing-page gallery with fine-grained filters.
