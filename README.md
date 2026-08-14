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

Rough Edge, Paper Grain, Noise Texture, Water Distortion, Liquid, Heat Haze,
and Cloud / Fog — all built on the `feTurbulence` family documented in
`docs/effects/feTurbulence.md`. See `docs/PRD.md` for the full product spec and
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
