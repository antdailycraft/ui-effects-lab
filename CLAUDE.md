# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

This is a **greenfield project**: as of writing there is no application code, no `package.json`, and no git history — only planning docs. Before implementing, read `docs/PRD.md` (the full product spec, in Korean) and `docs/effects/feTurbulence.md` (technical reference for the core SVG filter primitive). The scaffolding decisions below come from the PRD; treat them as the intended design, not existing code.

## Product in one line

UI Effects Lab is an interactive playground for SVG/CSS visual effects. The entire product is organized around a single loop: **Explore → Tweak → Compare → Copy** — find an effect, adjust its parameters live, compare before/after on a real UI component, then copy generated SVG/CSS/React code. Keep this loop central when making product decisions.

## Planned tech stack

- **Vite + React + TypeScript** (web only)
- State: plain React state + Context initially; introduce Zustand only if global state grows (per PRD §26). Do not add Zustand preemptively.
- Persistence: **LocalStorage only** — presets, recent effects, theme, last preview type. No server/DB in the MVP.

## Core architecture

Two ideas drive the whole codebase; understand both before adding an effect.

### 1. Data-driven effect registry (PRD §15, §28)

Effects are **not** hardcoded into UI. Each effect is an `EffectDefinition` describing its controls, defaults, supported preview types, a renderer, and per-language code generators (`svg` / `css` / `react`). A central `registry/effects.ts` aggregates them. The catalog, controls panel, and code viewer all render generically off this data — so adding an effect means adding a definition, not editing UI components.

Per-effect folder layout:

```
effects/<category>/<effect-name>/
├── definition.ts        # EffectDefinition: controls, defaults, metadata
├── <Effect>Filter.tsx   # the SVG <filter> / renderer component
├── generateSvg.ts       # code generator (SVG)
├── generateCss.ts       # code generator (CSS)
└── presets.ts           # built-in presets
```

Categories: `svg-filter`, `css`, `retro`, `experimental`.

### 2. Effect / Preview separation (PRD §17)

Previews are decoupled from effects. A `PreviewCanvas` hosts interchangeable targets (`card`, `text`, `image`, `button`, `newspaper`, `custom`), and each `EffectDefinition` declares which preview types it supports. Any effect must work across every preview type it lists — never assume a specific DOM shape.

### Central state shape (PRD §26)

```ts
interface PlaygroundState {
  selectedEffectId: string;
  previewType: PreviewType;
  parameters: Record<string, unknown>;
  compareMode: "off" | "side-by-side" | "slider";
  animationEnabled: boolean;
  fullscreen: boolean;
}
```

### Suggested top-level layout

```
src/
├── app/          # App.tsx, routes
├── components/   # catalog, controls, code-viewer, compare, layout, preview
├── effects/      # svg/ css/ retro/ experimental/ (see per-effect layout above)
├── registry/     # effects.ts — aggregates all definitions
├── stores/ hooks/ types/ utils/ styles/
```

## Effect implementation conventions

- **The SVG filter pattern to master first** is `feTurbulence` → `feDisplacementMap` (noise map drives coordinate displacement). Rough Edge, Water, Heat Haze, and Liquid all build on it. See `docs/effects/feTurbulence.md`.
- **Randomize** must only produce valid parameter combinations — never NaN or a broken SVG. Define a separate random *range* per control (narrower than the control's full min/max) so extreme values don't break the UI. Controls opt in with `randomizable: true`.
- **Code viewer must stay in sync with parameters** — generated code always reflects current parameter state. This is a core acceptance criterion, not a nice-to-have.
- **Animation**: prefer browser-native CSS/SVG animation over React re-renders or `requestAnimationFrame`. Always respect `prefers-reduced-motion`. Expose `{ enabled, speed, paused }`.

## Performance constraints (PRD §23)

SVG filters are expensive. Default `numOctaves` to 1–3. Stop rendering off-screen/inactive previews. Avoid `requestAnimationFrame` loops for animation. Use `will-change` sparingly. Be especially careful with the combination: large render area + high `numOctaves` + animation + large displacement.

## Build order (PRD §30–31)

Stabilize the `feTurbulence + feDisplacementMap` architecture on the first four effects before expanding:

1. Rough Edge → 2. Paper Grain → 3. Water Distortion → 4. Heat Haze → then Frosted Glass, Old Newspaper, Glitch, CRT.

Phase order: Playground core (layout, registry, preview, controls, code viewer) → SVG effects → experiment UX (randomize, compare, preset, fullscreen) → CSS/retro effects → sharing/export.

## Commands

No build tooling is scaffolded yet. Once initialized with Vite, the standard scripts will apply (`npm run dev` / `build` / `preview` and whatever test runner is chosen). Update this section with the actual scripts and single-test invocation after `package.json` exists.
