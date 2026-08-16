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

**50 effects** across four categories:

- **SVG Filters** (14) — the `feTurbulence` family (Rough Edge, Paper Grain,
  Noise Texture, Water Distortion, Liquid, Heat Haze, Cloud / Fog; see
  `docs/effects/feTurbulence.md`) plus Sticker, Gooey, Drop Shadow, Posterize,
  Emboss, Sharpen, Bevel, Color Grade, Duotone, Invert, Edge Detect, Motion
  Blur, and Neon Glow (`feConvolveMatrix`, `feColorMatrix`, `feComponentTransfer`,
  `feMorphology`, …).
- **CSS Effects** (4) — Frosted Glass (`backdrop-filter`), Holographic Card
  (gradient + `mix-blend-mode`), Conic Spin (`@property` + `conic-gradient`),
  Gradient Border (`mask-composite`).
- **Retro** (2) — Glitch (RGB channel split), CRT / Analog (scanlines + vignette).
- **Generators** (30) — GPU shaders from `@paper-design/shaders-react`
  (Apache-2.0): Mesh Gradient, Warp, Voronoi, Metaballs, Swirl, God Rays, Liquid
  Metal, Dithering, and more — each with its library presets as built-in chips.

Effects declare a `kind` of `"svg"` (applied via `filter: url(#id)`), `"css"` (a
class + CSS custom properties), or `"generator"` (a self-contained component that
*is* the preview); the code viewer shows SVG / CSS / React tabs accordingly.
Library/tech research behind these lives in
`docs/research/2026-08-14-css-effects-libraries.md`. See `docs/PRD.md` for the
full product spec and `docs/superpowers/plans/` for the implementation plan.

## Project layout

```
src/
  types/        effect type model
  effects/      svg/ css/ retro/ experimental/ — one folder per effect (definition.ts)
  registry/     effect registry + helpers
  lib/          format, randomize, codegen, highlight, storage (pure, unit-tested)
  state/        PlaygroundContext (reducer + provider)
  components/   layout · catalog · preview · controls · code
  styles/       design tokens + component CSS
```

## Roadmap

Status is tracked in [`docs/ROADMAP.md`](./docs/ROADMAP.md). In short: the P0
must-haves and most of P1 are done (presets, compare drag-slider, fullscreen,
React export all shipped in v0.1.0). Remaining: the Newspaper/Button preview
targets and Phase 5 — **URL sharing** (next up) and CodePen/StackBlitz export.

## Changelog & releases

Notable changes are tracked in [`CHANGELOG.md`](./CHANGELOG.md), following
[Keep a Changelog](https://keepachangelog.com/) and [SemVer](https://semver.org/).

**Workflow**

1. As you land changes, add bullets under the `## [Unreleased]` section,
   grouped by category (Added / Changed / Fixed / …).
2. To cut a release, move the `[Unreleased]` bullets under a new
   `## [x.y.z] - YYYY-MM-DD` heading, then bump the package version so the two
   stay in sync:
   ```bash
   npm version patch --no-git-tag-version   # or minor / major
   ```
3. Commit (`chore(release): vX.Y.Z`) and tag it:
   ```bash
   git tag -a vX.Y.Z -m "vX.Y.Z"
   ```
   The tag message can reuse that version's changelog entry as the release note.

Pre-1.0.0 (`0.y.z`): breaking changes bump the **minor**, everything else the
**patch**.

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
