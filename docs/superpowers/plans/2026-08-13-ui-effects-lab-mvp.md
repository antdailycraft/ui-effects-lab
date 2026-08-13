# UI Effects Lab MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the UI Effects Lab MVP as a Vite + React + TypeScript app — a data-driven playground where users explore SVG filter effects, tune parameters live, compare before/after, and copy generated code.

**Architecture:** Effects are pure `EffectDefinition` data objects (controls, defaults, a filter-markup builder) aggregated in a registry; the catalog, controls panel, preview, and code viewer all render generically from that data (PRD §15). App state lives in a single React Context + reducer (PRD §26, no external state lib). The approved throwaway mockup at `mockup/index.html` is the visual + behavioral spec: its `<style>` block and DOM structure are ported verbatim, and its four effect recipes are re-expressed as typed definitions.

**Tech Stack:** Vite, React 18, TypeScript, Vitest + @testing-library/react + jsdom, CSS (design tokens ported from the mockup). No runtime dependencies beyond React.

## Global Constraints

- **Node ≥ 18, package manager npm.** Scaffold with `npm create vite@latest`.
- **No external state/UI/styling libraries.** React + plain CSS only (PRD §26: React state + Context first).
- **Directory layout follows PRD §28** (`effects/svg/<name>/`, `registry/`, `components/<domain>/`, `lib/`, `state/`, `types/`, `styles/`).
- **UI copy is English** (matches the mockup labels: `EFFECTS`, `CONTROLS`, `Before / After`, etc.).
- **Visual source of truth is `mockup/index.html`.** Class names, tokens, and DOM structure are ported unchanged; do not redesign.
- **Accessibility:** every control keyboard-reachable and labelled; animation respects `prefers-reduced-motion` (PRD §24).
- **Randomize never emits `NaN` or a broken filter** (PRD §32): integer controls stay integer, all values stay within the control's declared random range.
- **Effect ids and filter ids are kebab-case** and identical to the mockup (`rough-edge`, `paper-grain`, `water`, `heat-haze`).
- **Preserve `docs/`, `mockup/`, and `CLAUDE.md`** when scaffolding into the repo root.

---

## File Structure

```
package.json, vite.config.ts, tsconfig.json, index.html   # scaffold (root)
src/
  main.tsx                       # React entry
  App.tsx                        # composes shell + provider
  styles/index.css               # design tokens + all component CSS (ported from mockup)
  types/effects.ts               # EffectDefinition, ControlDefinition, Params, PreviewType
  lib/
    format.ts                    # dec(), formatValue()
    randomize.ts                 # randomizeParams(), randomSeed()
    codegen.ts                   # generateSvg(), generateCss()
    highlight.ts                 # highlightSvg() single-pass tokenizer
    storage.ts                   # theme + last-effect persistence
  hooks/
    useReducedMotion.ts          # prefers-reduced-motion boolean
  registry/effects.ts            # EFFECTS[], getEffect(), defaultParams(), groupByCategory()
  effects/svg/
    rough-edge/definition.ts
    paper-grain/definition.ts
    water-distortion/definition.ts
    heat-haze/definition.ts
  state/PlaygroundContext.tsx    # reducer, Provider, usePlayground()
  components/
    layout/{AppShell,TopBar,BottomBar}.tsx
    catalog/{Catalog,EffectItem,SearchBox}.tsx
    preview/{FilterHost,PreviewCanvas,CardPreview,TextPreview,ImagePreview}.tsx
    controls/{ControlsPanel,RangeControl,SeedControl,ToggleControl}.tsx
    code/{CodeViewer,CopyButton}.tsx
test setup: src/test/setup.ts
```

Each `definition.ts` owns one effect. `lib/*` modules are pure and unit-tested. Components are thin and render from context.

---

### Task 1: Scaffold project + design tokens + smoke test

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `index.html`, `src/main.tsx`, `src/App.tsx`
- Create: `src/styles/index.css` (ported from `mockup/index.html` `<style>`)
- Create: `src/test/setup.ts`
- Test: `src/App.test.tsx`

**Interfaces:**
- Produces: `App` (default export React component) rendering an element with role banner containing text `UI Effects Lab`.

- [ ] **Step 1: Scaffold Vite React-TS into the repo root**

Run (the repo root already contains `docs/`, `mockup/`, `CLAUDE.md`; answer "Ignore files and continue" if prompted):
```bash
npm create vite@latest . -- --template react-ts
npm install
npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
```

- [ ] **Step 2: Configure Vitest**

Replace `vite.config.ts` with:
```ts
/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
});
```

Create `src/test/setup.ts`:
```ts
import "@testing-library/jest-dom";
```

Add to `package.json` `"scripts"`: `"test": "vitest run"`, `"test:watch": "vitest"`.

- [ ] **Step 3: Port the mockup styles**

Copy the entire contents of the `<style>…</style>` block from `mockup/index.html` into `src/styles/index.css` verbatim (design tokens, layout, all component classes). Add the Google Fonts `<link>` tags from the mockup `<head>` into the root `index.html` `<head>`. This is the approved visual spec — do not alter values.

- [ ] **Step 4: Write the failing smoke test**

`src/App.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the product name in the top bar", () => {
  render(<App />);
  expect(screen.getByText(/UI Effects/i)).toBeInTheDocument();
});
```

- [ ] **Step 5: Run test to verify it fails**

Run: `npm test -- src/App.test.tsx`
Expected: FAIL (App still the Vite starter, no "UI Effects" text).

- [ ] **Step 6: Minimal App + entry**

`src/main.tsx`:
```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode><App /></React.StrictMode>
);
```

`src/App.tsx`:
```tsx
export default function App() {
  return (
    <header className="topbar" role="banner">
      <span className="brand-name">UI Effects <span>Lab</span></span>
    </header>
  );
}
```

Delete `src/App.css` and the starter assets if present.

- [ ] **Step 7: Run test to verify it passes**

Run: `npm test -- src/App.test.tsx`
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: scaffold Vite React-TS app with Vitest and ported design tokens"
```

---

### Task 2: Effect types + registry

**Files:**
- Create: `src/types/effects.ts`, `src/registry/effects.ts`
- Test: `src/registry/effects.test.ts`

**Interfaces:**
- Produces (`types/effects.ts`):
```ts
export type EffectCategory = "svg-filter" | "css" | "retro" | "experimental";
export type PreviewType = "card" | "text" | "image";
export type ControlType = "range" | "seed" | "toggle";
export type ParamValue = number | boolean;
export type Params = Record<string, ParamValue>;

export interface ControlDefinition {
  id: string;
  label: string;
  type: ControlType;
  min?: number;
  max?: number;
  step?: number;
  def: ParamValue;
  decimals?: number;
  unit?: string;
  random?: [number, number];
  isAnimationControl?: boolean;
}

export interface EffectDefinition {
  id: string;
  name: string;
  sub: string;
  category: EffectCategory;
  categoryLabel: string;
  tags: string[];
  tech: string[];
  description: string;
  animatable?: boolean;
  previewTypes: PreviewType[];
  controls: ControlDefinition[];
  buildFilterInner: (params: Params, animate: boolean) => string;
}
```
- Produces (`registry/effects.ts`): `EFFECTS: EffectDefinition[]`, `getEffect(id: string): EffectDefinition | undefined`, `defaultParams(effect: EffectDefinition): Params`, `groupByCategory(effects: EffectDefinition[]): { label: string; effects: EffectDefinition[] }[]`.

- [ ] **Step 1: Write the failing test**

`src/registry/effects.test.ts`:
```ts
import { describe, expect, test } from "vitest";
import type { EffectDefinition } from "../types/effects";
import { defaultParams, groupByCategory, getEffect, EFFECTS } from "./effects";

const fixture: EffectDefinition = {
  id: "demo", name: "Demo", sub: "s", category: "svg-filter",
  categoryLabel: "SVG Filters", tags: [], tech: [], description: "",
  previewTypes: ["card"],
  controls: [
    { id: "a", label: "A", type: "range", min: 0, max: 10, step: 1, def: 3, decimals: 0 },
    { id: "on", label: "On", type: "toggle", def: true },
  ],
  buildFilterInner: () => "",
};

test("defaultParams reads each control's def", () => {
  expect(defaultParams(fixture)).toEqual({ a: 3, on: true });
});

test("groupByCategory groups and preserves label", () => {
  const groups = groupByCategory([fixture]);
  expect(groups).toEqual([{ label: "SVG Filters", effects: [fixture] }]);
});

test("registry ships the four MVP effects in order", () => {
  expect(EFFECTS.map((e) => e.id)).toEqual([
    "rough-edge", "paper-grain", "water", "heat-haze",
  ]);
  expect(getEffect("water")?.name).toBe("Water Distortion");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/registry/effects.test.ts`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement types and registry**

Create `src/types/effects.ts` with the interfaces from the Interfaces block above.

Create `src/registry/effects.ts`:
```ts
import type { EffectDefinition, Params } from "../types/effects";
import { roughEdge } from "../effects/svg/rough-edge/definition";
import { paperGrain } from "../effects/svg/paper-grain/definition";
import { water } from "../effects/svg/water-distortion/definition";
import { heatHaze } from "../effects/svg/heat-haze/definition";

export const EFFECTS: EffectDefinition[] = [roughEdge, paperGrain, water, heatHaze];

export function getEffect(id: string): EffectDefinition | undefined {
  return EFFECTS.find((e) => e.id === id);
}

export function defaultParams(effect: EffectDefinition): Params {
  const p: Params = {};
  for (const c of effect.controls) p[c.id] = c.def;
  return p;
}

export function groupByCategory(
  effects: EffectDefinition[]
): { label: string; effects: EffectDefinition[] }[] {
  const order: string[] = [];
  const map = new Map<string, EffectDefinition[]>();
  for (const e of effects) {
    if (!map.has(e.categoryLabel)) { map.set(e.categoryLabel, []); order.push(e.categoryLabel); }
    map.get(e.categoryLabel)!.push(e);
  }
  return order.map((label) => ({ label, effects: map.get(label)! }));
}
```

The four `definition` imports resolve in Tasks 4–5; the registry test's third case will fail until then. To make Task 2 green in isolation, temporarily stub the four definition files with `export const roughEdge = {...} as EffectDefinition` minimal objects, OR implement Tasks 4–5 before running the third test. **Recommended:** comment out the third test (`registry ships…`) in this task and re-enable it at the end of Task 5.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/registry/effects.test.ts`
Expected: PASS (first two tests; third deferred to Task 5).

- [ ] **Step 5: Commit**

```bash
git add src/types src/registry
git commit -m "feat: add effect type model and data-driven registry helpers"
```

---

### Task 3: Value formatting + randomize

**Files:**
- Create: `src/lib/format.ts`, `src/lib/randomize.ts`
- Test: `src/lib/randomize.test.ts`

**Interfaces:**
- Produces (`format.ts`): `dec(v: number, d: number): string` (fixed decimals), `formatValue(control, value): string` (value + unit).
- Produces (`randomize.ts`): `randomSeed(control: ControlDefinition, rng?: () => number): number`, `randomizeParams(effect: EffectDefinition, rng?: () => number): Params`. `rng` defaults to `Math.random`; injectable for tests.

- [ ] **Step 1: Write the failing test**

`src/lib/randomize.test.ts`:
```ts
import { expect, test } from "vitest";
import type { EffectDefinition } from "../types/effects";
import { randomizeParams } from "./randomize";
import { dec } from "./format";

const eff: EffectDefinition = {
  id: "d", name: "", sub: "", category: "svg-filter", categoryLabel: "SVG Filters",
  tags: [], tech: [], description: "", previewTypes: ["card"],
  controls: [
    { id: "freq", label: "", type: "range", min: 0, max: 1, step: 0.001, def: 0.5, decimals: 3, random: [0.1, 0.2] },
    { id: "oct", label: "", type: "range", min: 1, max: 5, step: 1, def: 3, decimals: 0, random: [2, 4] },
    { id: "on", label: "", type: "toggle", def: true },
  ],
  buildFilterInner: () => "",
};

test("dec formats to fixed decimals", () => {
  expect(dec(0.12345, 3)).toBe("0.123");
});

test("randomizeParams stays within random range and respects integers", () => {
  const rng = () => 0.5; // midpoint
  const p = randomizeParams(eff, rng);
  expect(p.freq).toBeCloseTo(0.15, 5);
  expect(p.oct).toBe(3);
  expect(Number.isNaN(p.freq as number)).toBe(false);
  expect(p.on).toBe(true); // toggles are not randomized
});

test("randomizeParams never exceeds bounds across the rng domain", () => {
  for (const r of [0, 0.999999]) {
    const p = randomizeParams(eff, () => r);
    expect(p.freq as number).toBeGreaterThanOrEqual(0.1);
    expect(p.freq as number).toBeLessThanOrEqual(0.2);
    expect([2, 3, 4]).toContain(p.oct);
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/lib/randomize.test.ts`
Expected: FAIL (modules not found).

- [ ] **Step 3: Implement**

`src/lib/format.ts`:
```ts
import type { ControlDefinition, ParamValue } from "../types/effects";

export const dec = (v: number, d: number): string => Number(v).toFixed(d);

export function formatValue(control: ControlDefinition, value: ParamValue): string {
  if (typeof value === "boolean") return value ? "on" : "off";
  return dec(value, control.decimals ?? 0) + (control.unit ?? "");
}
```

`src/lib/randomize.ts`:
```ts
import type { ControlDefinition, EffectDefinition, Params } from "../types/effects";

export function randomSeed(control: ControlDefinition, rng: () => number = Math.random): number {
  const lo = control.min ?? 0;
  const hi = control.max ?? 100;
  return Math.round(lo + rng() * (hi - lo));
}

export function randomizeParams(effect: EffectDefinition, rng: () => number = Math.random): Params {
  const p: Params = {};
  for (const c of effect.controls) {
    if (c.type === "toggle") { p[c.id] = c.def; continue; }
    const [lo, hi] = c.random ?? [c.min ?? 0, c.max ?? 1];
    const raw = lo + rng() * (hi - lo);
    p[c.id] = (c.decimals ?? 0) === 0 ? Math.round(raw) : Number(raw.toFixed(c.decimals));
  }
  return p;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/lib/randomize.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/format.ts src/lib/randomize.ts src/lib/randomize.test.ts
git commit -m "feat: add value formatting and safe randomize helpers"
```

---

### Task 4: Effect definitions — Rough Edge + Paper Grain

**Files:**
- Create: `src/effects/svg/rough-edge/definition.ts`, `src/effects/svg/paper-grain/definition.ts`
- Test: `src/effects/svg/svg-effects.test.ts`

**Interfaces:**
- Produces: `roughEdge: EffectDefinition`, `paperGrain: EffectDefinition`. `buildFilterInner(params, animate)` returns the inner `<filter>` markup string (used by both the live DOM and code generation).

- [ ] **Step 1: Write the failing test**

`src/effects/svg/svg-effects.test.ts`:
```ts
import { expect, test } from "vitest";
import { roughEdge } from "./rough-edge/definition";
import { paperGrain } from "./paper-grain/definition";
import { defaultParams } from "../../registry/effects";

test("rough-edge builds a turbulence + displacement chain from params", () => {
  const inner = roughEdge.buildFilterInner(defaultParams(roughEdge), false);
  expect(inner).toContain('type="fractalNoise"');
  expect(inner).toContain('baseFrequency="0.040"');
  expect(inner).toContain("<feDisplacementMap");
  expect(inner).toContain('scale="9"');
});

test("paper-grain builds turbulence + colorMatrix + blend", () => {
  const inner = paperGrain.buildFilterInner(defaultParams(paperGrain), false);
  expect(inner).toContain("<feColorMatrix");
  expect(inner).toContain("<feBlend");
  expect(inner).not.toContain("NaN");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/effects/svg/svg-effects.test.ts`
Expected: FAIL (modules not found).

- [ ] **Step 3: Implement (port recipes from mockup `EFFECTS[0]` and `[1]`)**

`src/effects/svg/rough-edge/definition.ts`:
```ts
import type { EffectDefinition } from "../../../types/effects";
import { dec } from "../../../lib/format";

export const roughEdge: EffectDefinition = {
  id: "rough-edge", name: "Rough Edge", sub: "feTurbulence + feDisplacementMap",
  category: "svg-filter", categoryLabel: "SVG Filters",
  tags: ["noise", "displacement", "sticker"], tech: ["feTurbulence", "feDisplacementMap"],
  description: "Uses a fractal-noise map to displace an element's edges, giving a hand-drawn, torn-paper look.",
  previewTypes: ["card", "text", "image"],
  controls: [
    { id: "baseFrequency", label: "Base Frequency", type: "range", min: 0.005, max: 0.1, step: 0.001, def: 0.04, decimals: 3, random: [0.01, 0.07] },
    { id: "numOctaves", label: "Num Octaves", type: "range", min: 1, max: 5, step: 1, def: 3, decimals: 0, random: [1, 4] },
    { id: "seed", label: "Seed", type: "seed", min: 0, max: 100, step: 1, def: 4, decimals: 0, random: [0, 100] },
    { id: "scale", label: "Displacement Scale", type: "range", min: 0, max: 40, step: 1, def: 9, decimals: 0, random: [4, 22] },
  ],
  buildFilterInner: (p) =>
`<feTurbulence type="fractalNoise" baseFrequency="${dec(p.baseFrequency as number, 3)}"
  numOctaves="${p.numOctaves}" seed="${p.seed}" result="noise"/>
<feDisplacementMap in="SourceGraphic" in2="noise" scale="${p.scale}"
  xChannelSelector="R" yChannelSelector="G"/>`,
};
```

`src/effects/svg/paper-grain/definition.ts`:
```ts
import type { EffectDefinition } from "../../../types/effects";
import { dec } from "../../../lib/format";

export const paperGrain: EffectDefinition = {
  id: "paper-grain", name: "Paper Grain", sub: "feTurbulence + feBlend",
  category: "svg-filter", categoryLabel: "SVG Filters",
  tags: ["noise", "texture", "vintage"], tech: ["feTurbulence", "feColorMatrix", "feBlend"],
  description: "High-frequency fractal noise multiplied over the source for a fine paper / film-grain texture.",
  previewTypes: ["card", "text", "image"],
  controls: [
    { id: "baseFrequency", label: "Base Frequency", type: "range", min: 0.2, max: 1, step: 0.01, def: 0.65, decimals: 2, random: [0.4, 0.9] },
    { id: "numOctaves", label: "Num Octaves", type: "range", min: 1, max: 4, step: 1, def: 3, decimals: 0, random: [2, 4] },
    { id: "seed", label: "Seed", type: "seed", min: 0, max: 100, step: 1, def: 8, decimals: 0, random: [0, 100] },
    { id: "intensity", label: "Grain Intensity", type: "range", min: 0, max: 1, step: 0.05, def: 0.55, decimals: 2, random: [0.3, 0.8] },
  ],
  buildFilterInner: (p) => {
    const i = p.intensity as number;
    return `<feTurbulence type="fractalNoise" baseFrequency="${dec(p.baseFrequency as number, 2)}"
  numOctaves="${p.numOctaves}" seed="${p.seed}" stitchTiles="stitch" result="noise"/>
<feColorMatrix in="noise" type="matrix" result="grain"
  values="0 0 0 0 0
          0 0 0 0 0
          0 0 0 0 0
          ${dec(i * 0.33, 3)} ${dec(i * 0.33, 3)} ${dec(i * 0.34, 3)} 0 0"/>
<feComposite in="grain" in2="SourceGraphic" operator="in" result="clip"/>
<feBlend in="SourceGraphic" in2="clip" mode="multiply"/>`;
  },
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/effects/svg/svg-effects.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/effects/svg/rough-edge src/effects/svg/paper-grain src/effects/svg/svg-effects.test.ts
git commit -m "feat: add rough-edge and paper-grain effect definitions"
```

---

### Task 5: Effect definitions — Water + Heat Haze (animated)

**Files:**
- Create: `src/effects/svg/water-distortion/definition.ts`, `src/effects/svg/heat-haze/definition.ts`
- Test: `src/effects/svg/animated-effects.test.ts`
- Modify: `src/registry/effects.test.ts` (re-enable the deferred third test from Task 2)

**Interfaces:**
- Produces: `water: EffectDefinition`, `heatHaze: EffectDefinition`, both with `animatable: true`. `buildFilterInner(params, animate)` inserts a `<animate>` element inside `<feTurbulence>` only when `animate === true`.

- [ ] **Step 1: Write the failing test**

`src/effects/svg/animated-effects.test.ts`:
```ts
import { expect, test } from "vitest";
import { water } from "./water-distortion/definition";
import { heatHaze } from "./heat-haze/definition";
import { defaultParams } from "../../registry/effects";

test("water uses directional (X≠Y) frequency and adds <animate> only when animating", () => {
  const p = defaultParams(water);
  expect(water.buildFilterInner(p, false)).not.toContain("<animate");
  const animated = water.buildFilterInner(p, true);
  expect(animated).toContain("<animate attributeName=\"baseFrequency\"");
  expect(animated).toContain('baseFrequency="0.012 0.040"');
});

test("heat-haze is low-frequency turbulence with optional animation", () => {
  const p = defaultParams(heatHaze);
  expect(heatHaze.buildFilterInner(p, true)).toContain("<animate");
  expect(heatHaze.buildFilterInner(p, false)).toContain('type="turbulence"');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/effects/svg/animated-effects.test.ts`
Expected: FAIL (modules not found).

- [ ] **Step 3: Implement (port from mockup `EFFECTS[2]` and `[3]`)**

`src/effects/svg/water-distortion/definition.ts`:
```ts
import type { EffectDefinition } from "../../../types/effects";
import { dec } from "../../../lib/format";

export const water: EffectDefinition = {
  id: "water", name: "Water Distortion", sub: "directional turbulence",
  category: "svg-filter", categoryLabel: "SVG Filters",
  tags: ["water", "animation", "displacement"], tech: ["feTurbulence", "feDisplacementMap"],
  description: "Directional turbulence (X ≠ Y frequency) drives a displacement map to ripple the surface like water.",
  animatable: true, previewTypes: ["card", "text", "image"],
  controls: [
    { id: "freqX", label: "Frequency X", type: "range", min: 0.004, max: 0.06, step: 0.001, def: 0.012, decimals: 3, random: [0.006, 0.03] },
    { id: "freqY", label: "Frequency Y", type: "range", min: 0.004, max: 0.06, step: 0.001, def: 0.04, decimals: 3, random: [0.02, 0.055] },
    { id: "numOctaves", label: "Num Octaves", type: "range", min: 1, max: 4, step: 1, def: 2, decimals: 0, random: [1, 3] },
    { id: "seed", label: "Seed", type: "seed", min: 0, max: 100, step: 1, def: 3, decimals: 0, random: [0, 100] },
    { id: "scale", label: "Displacement Scale", type: "range", min: 0, max: 50, step: 1, def: 20, decimals: 0, random: [10, 36] },
    { id: "speed", label: "Animation Speed", type: "range", min: 1, max: 10, step: 0.5, def: 4, decimals: 1, unit: "×", isAnimationControl: true },
  ],
  buildFilterInner: (p, animate) => {
    const bf = `${dec(p.freqX as number, 3)} ${dec(p.freqY as number, 3)}`;
    const bf2 = `${dec(p.freqX as number, 3)} ${dec((p.freqY as number) * 1.7, 3)}`;
    const dur = dec(13 / (p.speed as number), 1);
    const animEl = animate
      ? `\n  <animate attributeName="baseFrequency" dur="${dur}s"
    values="${bf};${bf2};${bf}" repeatCount="indefinite"/>` : "";
    return `<feTurbulence type="turbulence" baseFrequency="${bf}"
  numOctaves="${p.numOctaves}" seed="${p.seed}" result="noise">${animEl}
</feTurbulence>
<feDisplacementMap in="SourceGraphic" in2="noise" scale="${p.scale}"
  xChannelSelector="R" yChannelSelector="G"/>`;
  },
};
```

`src/effects/svg/heat-haze/definition.ts`:
```ts
import type { EffectDefinition } from "../../../types/effects";
import { dec } from "../../../lib/format";

export const heatHaze: EffectDefinition = {
  id: "heat-haze", name: "Heat Haze", sub: "animated low-freq turbulence",
  category: "svg-filter", categoryLabel: "SVG Filters",
  tags: ["heat", "animation", "shimmer"], tech: ["feTurbulence", "feDisplacementMap"],
  description: "Low-frequency animated turbulence gently warps the surface like hot air rising off a road.",
  animatable: true, previewTypes: ["card", "text", "image"],
  controls: [
    { id: "baseFrequency", label: "Base Frequency", type: "range", min: 0.004, max: 0.03, step: 0.001, def: 0.011, decimals: 3, random: [0.006, 0.02] },
    { id: "numOctaves", label: "Num Octaves", type: "range", min: 1, max: 3, step: 1, def: 2, decimals: 0, random: [1, 3] },
    { id: "seed", label: "Seed", type: "seed", min: 0, max: 100, step: 1, def: 17, decimals: 0, random: [0, 100] },
    { id: "scale", label: "Displacement Scale", type: "range", min: 0, max: 30, step: 1, def: 10, decimals: 0, random: [5, 18] },
    { id: "speed", label: "Animation Speed", type: "range", min: 1, max: 10, step: 0.5, def: 3, decimals: 1, unit: "×", isAnimationControl: true },
  ],
  buildFilterInner: (p, animate) => {
    const bf = dec(p.baseFrequency as number, 3);
    const bf2 = dec((p.baseFrequency as number) * 1.5, 3);
    const dur = dec(16 / (p.speed as number), 1);
    const animEl = animate
      ? `\n  <animate attributeName="baseFrequency" dur="${dur}s"
    values="${bf};${bf2};${bf}" repeatCount="indefinite"/>` : "";
    return `<feTurbulence type="turbulence" baseFrequency="${bf}"
  numOctaves="${p.numOctaves}" seed="${p.seed}" result="noise">${animEl}
</feTurbulence>
<feDisplacementMap in="SourceGraphic" in2="noise" scale="${p.scale}"
  xChannelSelector="R" yChannelSelector="G"/>`;
  },
};
```

- [ ] **Step 4: Re-enable the deferred registry test**

Uncomment (or add back) the `registry ships the four MVP effects in order` test in `src/registry/effects.test.ts`.

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test -- src/effects/svg/animated-effects.test.ts src/registry/effects.test.ts`
Expected: PASS (all, including the previously deferred registry case).

- [ ] **Step 6: Commit**

```bash
git add src/effects/svg/water-distortion src/effects/svg/heat-haze src/effects/svg/animated-effects.test.ts src/registry/effects.test.ts
git commit -m "feat: add animated water and heat-haze effects; complete registry"
```

---

### Task 6: Code generation

**Files:**
- Create: `src/lib/codegen.ts`
- Test: `src/lib/codegen.test.ts`

**Interfaces:**
- Produces: `generateSvg(effect: EffectDefinition, params: Params, animate: boolean): string`, `generateCss(effect: EffectDefinition): string`.

- [ ] **Step 1: Write the failing test**

`src/lib/codegen.test.ts`:
```ts
import { expect, test } from "vitest";
import { generateSvg, generateCss } from "./codegen";
import { roughEdge } from "../effects/svg/rough-edge/definition";
import { defaultParams } from "../registry/effects";

test("generateSvg wraps the filter inner in an svg/filter shell with the effect id", () => {
  const svg = generateSvg(roughEdge, defaultParams(roughEdge), false);
  expect(svg).toContain('<filter id="rough-edge">');
  expect(svg).toContain("<feTurbulence");
  expect(svg.trim().startsWith("<svg")).toBe(true);
  expect(svg.trim().endsWith("</svg>")).toBe(true);
});

test("generateCss references the filter by id", () => {
  expect(generateCss(roughEdge)).toContain("filter: url(#rough-edge);");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/lib/codegen.test.ts`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement**

`src/lib/codegen.ts`:
```ts
import type { EffectDefinition, Params } from "../types/effects";

export function generateSvg(effect: EffectDefinition, params: Params, animate: boolean): string {
  const inner = effect
    .buildFilterInner(params, animate)
    .split("\n")
    .map((l) => "    " + l)
    .join("\n");
  return `<svg width="0" height="0" aria-hidden="true">
  <filter id="${effect.id}">
${inner}
  </filter>
</svg>`;
}

export function generateCss(effect: EffectDefinition): string {
  return `.effect {
  filter: url(#${effect.id});
}`;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/lib/codegen.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/codegen.ts src/lib/codegen.test.ts
git commit -m "feat: add SVG and CSS code generation"
```

---

### Task 7: Syntax highlighter (single-pass tokenizer)

**Files:**
- Create: `src/lib/highlight.ts`
- Test: `src/lib/highlight.test.ts`

**Interfaces:**
- Produces: `highlightSvg(code: string): string` — returns HTML with `tk-tag` / `tk-attr` / `tk-str` / `tk-punct` spans. Must scan the source once so inserted markup is never re-matched (the mockup's original multi-pass version had a self-matching bug).

- [ ] **Step 1: Write the failing test**

`src/lib/highlight.test.ts`:
```ts
import { expect, test } from "vitest";
import { highlightSvg } from "./highlight";

test("wraps tag names, attributes and strings", () => {
  const out = highlightSvg('<feTurbulence type="fractalNoise"/>');
  expect(out).toContain('<span class="tk-tag">feTurbulence</span>');
  expect(out).toContain('<span class="tk-attr">type</span>');
  expect(out).toContain('<span class="tk-str">"fractalNoise"</span>');
});

test("does not re-highlight the class attributes it inserted (regression)", () => {
  const out = highlightSvg('<a b="c"/>');
  // the literal string tk-attr must appear only inside class="..."
  expect(out).not.toContain('tk-attr">class');
  expect(out).not.toMatch(/<span class="tk-str">"tk-/);
});

test("escapes HTML in the source", () => {
  expect(highlightSvg("<x/>")).not.toContain("<x/>");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/lib/highlight.test.ts`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement (port the fixed tokenizer from the mockup)**

`src/lib/highlight.ts`:
```ts
function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Single-pass tokenizer: scans the escaped source left-to-right so inserted
// markup is never re-matched (avoids highlighter self-matching).
export function highlightSvg(code: string): string {
  const src = esc(code);
  const re = /(&lt;\/?)([a-zA-Z][\w-]*)|([a-zA-Z][\w-]*)=|("[^"]*")|(\/?&gt;)/g;
  return src.replace(re, (_m, open, tag, attr, str, close) => {
    if (tag) return `<span class="tk-punct">${open}</span><span class="tk-tag">${tag}</span>`;
    if (attr) return `<span class="tk-attr">${attr}</span><span class="tk-punct">=</span>`;
    if (str) return `<span class="tk-str">${str}</span>`;
    return `<span class="tk-punct">${close}</span>`;
  });
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/lib/highlight.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/highlight.ts src/lib/highlight.test.ts
git commit -m "feat: add single-pass SVG syntax highlighter"
```

---

### Task 8: Persistence + reduced-motion hook

**Files:**
- Create: `src/lib/storage.ts`, `src/hooks/useReducedMotion.ts`
- Test: `src/lib/storage.test.ts`

**Interfaces:**
- Produces (`storage.ts`): `loadTheme(): "dark" | "light"` (default `"dark"`), `saveTheme(t): void`, `loadLastEffectId(): string | null`, `saveLastEffectId(id): void`. All guard against a missing/throwing `localStorage`.
- Produces (`useReducedMotion.ts`): `useReducedMotion(): boolean`.

- [ ] **Step 1: Write the failing test**

`src/lib/storage.test.ts`:
```ts
import { beforeEach, expect, test } from "vitest";
import { loadTheme, saveTheme, loadLastEffectId, saveLastEffectId } from "./storage";

beforeEach(() => localStorage.clear());

test("theme defaults to dark and round-trips", () => {
  expect(loadTheme()).toBe("dark");
  saveTheme("light");
  expect(loadTheme()).toBe("light");
});

test("last effect id round-trips and defaults to null", () => {
  expect(loadLastEffectId()).toBeNull();
  saveLastEffectId("water");
  expect(loadLastEffectId()).toBe("water");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/lib/storage.test.ts`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement**

`src/lib/storage.ts`:
```ts
type Theme = "dark" | "light";
const THEME_KEY = "uifx.theme";
const EFFECT_KEY = "uifx.effect";

function safeGet(key: string): string | null {
  try { return localStorage.getItem(key); } catch { return null; }
}
function safeSet(key: string, value: string): void {
  try { localStorage.setItem(key, value); } catch { /* ignore */ }
}

export function loadTheme(): Theme {
  return safeGet(THEME_KEY) === "light" ? "light" : "dark";
}
export function saveTheme(t: Theme): void { safeSet(THEME_KEY, t); }
export function loadLastEffectId(): string | null { return safeGet(EFFECT_KEY); }
export function saveLastEffectId(id: string): void { safeSet(EFFECT_KEY, id); }
```

`src/hooks/useReducedMotion.ts`:
```ts
import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    if (typeof matchMedia === "undefined") return;
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/lib/storage.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/storage.ts src/lib/storage.test.ts src/hooks/useReducedMotion.ts
git commit -m "feat: add localStorage persistence and reduced-motion hook"
```

---

### Task 9: Playground state (Context + reducer)

**Files:**
- Create: `src/state/PlaygroundContext.tsx`
- Test: `src/state/reducer.test.ts`

**Interfaces:**
- Produces:
```ts
export interface PlaygroundState {
  effectId: string;
  previewType: PreviewType;
  compare: boolean;
  animate: boolean;
  codeTab: "svg" | "css";
  theme: "dark" | "light";
  search: string;
  params: Params;
}
export type Action =
  | { type: "SELECT_EFFECT"; id: string }
  | { type: "SET_PARAM"; id: string; value: ParamValue }
  | { type: "SET_PREVIEW"; preview: PreviewType }
  | { type: "TOGGLE_COMPARE" }
  | { type: "SET_ANIMATE"; value: boolean }
  | { type: "RESET" }
  | { type: "RANDOMIZE" }
  | { type: "SET_SEARCH"; value: string }
  | { type: "SET_CODE_TAB"; tab: "svg" | "css" }
  | { type: "SET_THEME"; theme: "dark" | "light" };
export function reducer(state: PlaygroundState, action: Action): PlaygroundState;
export function PlaygroundProvider({ children }: { children: React.ReactNode }): JSX.Element;
export function usePlayground(): { state: PlaygroundState; dispatch: React.Dispatch<Action> };
```
- `SELECT_EFFECT` resets `params` to the new effect's defaults. `RESET` restores current effect defaults. `RANDOMIZE` uses `randomizeParams`.

- [ ] **Step 1: Write the failing test**

`src/state/reducer.test.ts`:
```ts
import { expect, test } from "vitest";
import { reducer, initialState } from "./PlaygroundContext";
import { defaultParams, getEffect } from "../registry/effects";

test("SELECT_EFFECT switches effect and loads its defaults", () => {
  const s = reducer(initialState, { type: "SELECT_EFFECT", id: "water" });
  expect(s.effectId).toBe("water");
  expect(s.params).toEqual(defaultParams(getEffect("water")!));
});

test("SET_PARAM updates one parameter", () => {
  const s = reducer(initialState, { type: "SET_PARAM", id: "scale", value: 22 });
  expect(s.params.scale).toBe(22);
});

test("RESET restores defaults after edits", () => {
  const edited = reducer(initialState, { type: "SET_PARAM", id: "scale", value: 40 });
  const reset = reducer(edited, { type: "RESET" });
  expect(reset.params).toEqual(defaultParams(getEffect(initialState.effectId)!));
});

test("TOGGLE_COMPARE flips the flag", () => {
  expect(reducer(initialState, { type: "TOGGLE_COMPARE" }).compare).toBe(true);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/state/reducer.test.ts`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement**

`src/state/PlaygroundContext.tsx`:
```tsx
import React, { createContext, useContext, useReducer } from "react";
import type { Params, ParamValue, PreviewType } from "../types/effects";
import { defaultParams, getEffect, EFFECTS } from "../registry/effects";
import { randomizeParams } from "../lib/randomize";
import { loadTheme, loadLastEffectId } from "../lib/storage";

export interface PlaygroundState {
  effectId: string;
  previewType: PreviewType;
  compare: boolean;
  animate: boolean;
  codeTab: "svg" | "css";
  theme: "dark" | "light";
  search: string;
  params: Params;
}

export type Action =
  | { type: "SELECT_EFFECT"; id: string }
  | { type: "SET_PARAM"; id: string; value: ParamValue }
  | { type: "SET_PREVIEW"; preview: PreviewType }
  | { type: "TOGGLE_COMPARE" }
  | { type: "SET_ANIMATE"; value: boolean }
  | { type: "RESET" }
  | { type: "RANDOMIZE" }
  | { type: "SET_SEARCH"; value: string }
  | { type: "SET_CODE_TAB"; tab: "svg" | "css" }
  | { type: "SET_THEME"; theme: "dark" | "light" };

const firstId = loadLastEffectId() && getEffect(loadLastEffectId()!) ? loadLastEffectId()! : EFFECTS[0].id;

export const initialState: PlaygroundState = {
  effectId: firstId,
  previewType: "card",
  compare: false,
  animate: true,
  codeTab: "svg",
  theme: loadTheme(),
  search: "",
  params: defaultParams(getEffect(firstId)!),
};

export function reducer(state: PlaygroundState, action: Action): PlaygroundState {
  switch (action.type) {
    case "SELECT_EFFECT": {
      const effect = getEffect(action.id);
      if (!effect) return state;
      return { ...state, effectId: action.id, params: defaultParams(effect) };
    }
    case "SET_PARAM":
      return { ...state, params: { ...state.params, [action.id]: action.value } };
    case "SET_PREVIEW":
      return { ...state, previewType: action.preview };
    case "TOGGLE_COMPARE":
      return { ...state, compare: !state.compare };
    case "SET_ANIMATE":
      return { ...state, animate: action.value };
    case "RESET":
      return { ...state, params: defaultParams(getEffect(state.effectId)!) };
    case "RANDOMIZE":
      return { ...state, params: randomizeParams(getEffect(state.effectId)!) };
    case "SET_SEARCH":
      return { ...state, search: action.value };
    case "SET_CODE_TAB":
      return { ...state, codeTab: action.tab };
    case "SET_THEME":
      return { ...state, theme: action.theme };
    default:
      return state;
  }
}

const Ctx = createContext<{ state: PlaygroundState; dispatch: React.Dispatch<Action> } | null>(null);

export function PlaygroundProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Ctx.Provider value={{ state, dispatch }}>{children}</Ctx.Provider>;
}

export function usePlayground() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePlayground must be used within PlaygroundProvider");
  return ctx;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/state/reducer.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/state/PlaygroundContext.tsx src/state/reducer.test.ts
git commit -m "feat: add playground state context and reducer"
```

---

### Task 10: Layout shell — TopBar + BottomBar + AppShell

**Files:**
- Create: `src/components/layout/TopBar.tsx`, `src/components/layout/BottomBar.tsx`, `src/components/layout/AppShell.tsx`
- Modify: `src/App.tsx`
- Test: `src/components/layout/TopBar.test.tsx`

**Interfaces:**
- Consumes: `usePlayground()`, `saveTheme()`, `randomize`/`reset` via dispatch, `generateSvg`/`generateCss` for copy.
- Produces: `AppShell` renders the top bar, a `main` slot (children), and the bottom bar; applies `data-theme` to `document.documentElement` from `state.theme` in an effect and persists via `saveTheme`. `TopBar` has a theme-toggle button (`aria-label="Toggle theme"`). `BottomBar` has Randomize / Reset / Copy code buttons.

- [ ] **Step 1: Write the failing test**

`src/components/layout/TopBar.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PlaygroundProvider } from "../../state/PlaygroundContext";
import { TopBar } from "./TopBar";

function setup() {
  return render(<PlaygroundProvider><TopBar /></PlaygroundProvider>);
}

test("theme toggle flips the document theme attribute", async () => {
  setup();
  const before = document.documentElement.getAttribute("data-theme");
  await userEvent.click(screen.getByLabelText(/toggle theme/i));
  expect(document.documentElement.getAttribute("data-theme")).not.toBe(before);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/layout/TopBar.test.tsx`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement (port markup/classes from mockup `<header class="topbar">`, `<footer class="bottombar">`, and `.app` shell)**

Create `src/components/layout/TopBar.tsx`. Port the topbar markup from the mockup. Read `state.theme`, and on the toggle button `onClick` dispatch `SET_THEME` with the opposite theme and call `saveTheme`. Render the sun/moon inline SVG icons from the mockup's `setTheme` function. Include the brand mark, brand name, and `Mockup`→ change tag text to `MVP` (or drop the tag).

Create `src/components/layout/BottomBar.tsx`. Port the bottombar markup. Wire:
- Randomize button → `dispatch({ type: "RANDOMIZE" })`
- Reset button → `dispatch({ type: "RESET" })`
- Copy code button → `navigator.clipboard.writeText(state.codeTab === "svg" ? generateSvg(effect, params, animateActive) : generateCss(effect))` where `effect = getEffect(state.effectId)!`. `animateActive` = `state.animate && !reduced && !!effect.animatable` (use `useReducedMotion`).
- Status text: `${effect.controls.length} parameters · ${effect.tech.length} primitives`.

Create `src/components/layout/AppShell.tsx`:
```tsx
import { useEffect } from "react";
import { usePlayground } from "../../state/PlaygroundContext";
import { saveTheme } from "../../lib/storage";
import { TopBar } from "./TopBar";
import { BottomBar } from "./BottomBar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { state } = usePlayground();
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", state.theme);
    saveTheme(state.theme);
  }, [state.theme]);
  return (
    <div className="app">
      <TopBar />
      <div className="main">{children}</div>
      <BottomBar />
    </div>
  );
}
```

Update `src/App.tsx`:
```tsx
import { PlaygroundProvider } from "./state/PlaygroundContext";
import { AppShell } from "./components/layout/AppShell";

export default function App() {
  return (
    <PlaygroundProvider>
      <AppShell>{/* columns added in later tasks */}</AppShell>
    </PlaygroundProvider>
  );
}
```

Update `src/App.test.tsx` if needed so the banner text query still matches (the brand name lives in `TopBar`).

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- src/components/layout/TopBar.test.tsx src/App.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout src/App.tsx src/App.test.tsx
git commit -m "feat: add app shell, top bar theme toggle, and bottom action bar"
```

---

### Task 11: Catalog — search + list + selection

**Files:**
- Create: `src/components/catalog/SearchBox.tsx`, `src/components/catalog/EffectItem.tsx`, `src/components/catalog/Catalog.tsx`
- Modify: `src/App.tsx` (mount `<Catalog />` in the left column)
- Test: `src/components/catalog/Catalog.test.tsx`

**Interfaces:**
- Consumes: `usePlayground()`, `EFFECTS`, `groupByCategory`, `getEffect`, `saveLastEffectId`.
- Produces: `Catalog` renders a search box (`role="searchbox"` or `<input>` with `placeholder`), grouped effect buttons, and "Coming soon" disabled placeholders for `CSS Effects` and `Retro`. Selecting an item dispatches `SELECT_EFFECT` and persists via `saveLastEffectId`. Search filters by name/tags/tech (case-insensitive).

- [ ] **Step 1: Write the failing test**

`src/components/catalog/Catalog.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PlaygroundProvider, usePlayground } from "../../state/PlaygroundContext";
import { Catalog } from "./Catalog";

function EffectProbe() {
  const { state } = usePlayground();
  return <span data-testid="eid">{state.effectId}</span>;
}

test("selecting an effect updates state", async () => {
  render(<PlaygroundProvider><Catalog /><EffectProbe /></PlaygroundProvider>);
  await userEvent.click(screen.getByRole("button", { name: /Water Distortion/i }));
  expect(screen.getByTestId("eid")).toHaveTextContent("water");
});

test("search filters the list", async () => {
  render(<PlaygroundProvider><Catalog /></PlaygroundProvider>);
  await userEvent.type(screen.getByPlaceholderText(/search/i), "water");
  expect(screen.getByRole("button", { name: /Water Distortion/i })).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /Rough Edge/i })).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/catalog/Catalog.test.tsx`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement (port markup/classes from mockup `renderCatalog`)**

Create `SearchBox.tsx` (controlled input reading `state.search`, dispatching `SET_SEARCH`; port the `.search` markup + magnifier SVG).

Create `EffectItem.tsx` (a `.effect-item` button; `active` class when `effect.id === state.effectId`; dot + name + sub; `onClick` dispatches `SELECT_EFFECT` and calls `saveLastEffectId`).

Create `Catalog.tsx`:
- Filter `EFFECTS` by `state.search` over `name + tags + tech`.
- `groupByCategory(filtered)` → render `.cat-group` with `.cat-label` and `EffectItem`s.
- Append disabled placeholder groups from `{ "CSS Effects": ["Frosted Glass","Holographic Card"], "Retro": ["Glitch","CRT / Analog"] }` (filtered by search), each as a disabled `.effect-item` with "Coming soon".
- Empty state: `.catalog-empty` when nothing matches.
- Wrap in `<aside className="col col-left">` with the `.search-wrap` + `.catalog` structure from the mockup.

Mount in `App.tsx` inside `AppShell` as the first child column.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/catalog/Catalog.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/catalog src/App.tsx
git commit -m "feat: add effect catalog with search and selection"
```

---

### Task 12: Preview — filter host, targets, before/after

**Files:**
- Create: `src/components/preview/FilterHost.tsx`, `src/components/preview/CardPreview.tsx`, `src/components/preview/TextPreview.tsx`, `src/components/preview/ImagePreview.tsx`, `src/components/preview/PreviewCanvas.tsx`
- Modify: `src/App.tsx` (mount `<PreviewCanvas />` in the center column)
- Test: `src/components/preview/PreviewCanvas.test.tsx`

**Interfaces:**
- Consumes: `usePlayground()`, `getEffect`, `useReducedMotion`.
- Produces: `FilterHost` renders a hidden `<svg><defs><filter id="fx-live" ...>` whose inner markup is `effect.buildFilterInner(params, animateActive)` injected via `dangerouslySetInnerHTML`. `PreviewCanvas` renders the stage bar (preview-type segmented control + Before/After toggle) and the stage; in compare mode it renders a Before cell (no filter) and an After cell (filter). Each target component takes `filterId?: string` and applies `style={{ filter: filterId ? \`url(#${filterId})\` : undefined }}`.
- The single filter id constant: `export const LIVE_FILTER_ID = "fx-live";` (define in `FilterHost.tsx`).

- [ ] **Step 1: Write the failing test**

`src/components/preview/PreviewCanvas.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PlaygroundProvider } from "../../state/PlaygroundContext";
import { PreviewCanvas } from "./PreviewCanvas";

test("compare mode renders a Before and an After cell", async () => {
  render(<PlaygroundProvider><PreviewCanvas /></PlaygroundProvider>);
  await userEvent.click(screen.getByRole("button", { name: /before \/ after/i }));
  expect(screen.getByText(/^before$/i)).toBeInTheDocument();
  expect(screen.getByText(/^after$/i)).toBeInTheDocument();
});

test("switching preview type to Text shows the text target", async () => {
  render(<PlaygroundProvider><PreviewCanvas /></PlaygroundProvider>);
  await userEvent.click(screen.getByRole("button", { name: /^text$/i }));
  expect(screen.getByText(/turbulence/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/preview/PreviewCanvas.test.tsx`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement (port markup/classes from mockup `previewMarkup`, `renderStage`, `applyFilter`)**

`FilterHost.tsx`:
```tsx
import { usePlayground } from "../../state/PlaygroundContext";
import { getEffect } from "../../registry/effects";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export const LIVE_FILTER_ID = "fx-live";

export function FilterHost() {
  const { state } = usePlayground();
  const reduced = useReducedMotion();
  const effect = getEffect(state.effectId)!;
  const animate = state.animate && !reduced && !!effect.animatable;
  const inner = effect.buildFilterInner(state.params, animate);
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <filter
          id={LIVE_FILTER_ID}
          x="-25%" y="-25%" width="150%" height="150%"
          dangerouslySetInnerHTML={{ __html: inner }}
        />
      </defs>
    </svg>
  );
}
```

`CardPreview.tsx`, `TextPreview.tsx`, `ImagePreview.tsx`: port each target's markup from the mockup `previewMarkup` (card = Harbor Roastery ad; text = "Turbulence"; image = "Nightfall" poster). Each accepts `{ filterId }: { filterId?: string }` and applies the filter style.

`PreviewCanvas.tsx`: port `.stage-bar` (segmented `Card/Text/Image` from `state.previewType` → `SET_PREVIEW`; `.compare-toggle` → `TOGGLE_COMPARE`) and `.stage`. Render `<FilterHost />` once. Choose the target component from `state.previewType`. In compare mode render two `.compare-cell`s (caption "Before"/"After"), Before with no `filterId`, After with `LIVE_FILTER_ID`; otherwise a single target with `LIVE_FILTER_ID`. Wrap in `<main className="col col-center">`.

Mount `<PreviewCanvas />` in `App.tsx` as the center column.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/preview/PreviewCanvas.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/preview src/App.tsx
git commit -m "feat: add live preview canvas with targets and before/after compare"
```

---

### Task 13: Controls panel

**Files:**
- Create: `src/components/controls/RangeControl.tsx`, `src/components/controls/SeedControl.tsx`, `src/components/controls/ToggleControl.tsx`, `src/components/controls/ControlsPanel.tsx`
- Modify: `src/App.tsx` (mount `<ControlsPanel />` in the right column, above the code viewer)
- Test: `src/components/controls/ControlsPanel.test.tsx`

**Interfaces:**
- Consumes: `usePlayground()`, `getEffect`, `formatValue`, `randomSeed`, `useReducedMotion`.
- Produces: `ControlsPanel` renders the effect headline (name, description, tech chips), then one control per `effect.controls[i]` by `type` (`range`→`RangeControl`, `seed`→`SeedControl`, `toggle`→`ToggleControl`), then an Animate toggle when `effect.animatable`. Range/seed dispatch `SET_PARAM`; seed's dice button sets a random seed; the Animate switch dispatches `SET_ANIMATE` and is disabled (with a note) when `useReducedMotion()` is true.

- [ ] **Step 1: Write the failing test**

`src/components/controls/ControlsPanel.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import { PlaygroundProvider, usePlayground } from "../../state/PlaygroundContext";
import { ControlsPanel } from "./ControlsPanel";

function ParamProbe({ id }: { id: string }) {
  const { state } = usePlayground();
  return <span data-testid="p">{String(state.params[id])}</span>;
}

test("dragging a range updates the matching parameter", () => {
  render(<PlaygroundProvider><ControlsPanel /><ParamProbe id="scale" /></PlaygroundProvider>);
  const slider = screen.getByLabelText(/displacement scale/i) as HTMLInputElement;
  fireEvent.input(slider, { target: { value: "25" } });
  expect(screen.getByTestId("p")).toHaveTextContent("25");
});

test("renders the current effect name", () => {
  render(<PlaygroundProvider><ControlsPanel /></PlaygroundProvider>);
  expect(screen.getByText(/rough edge/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/controls/ControlsPanel.test.tsx`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement (port markup/classes from mockup `renderControls`)**

`RangeControl.tsx`: `.control` with `.ctrl-top` (label + `.ctrl-val` showing `formatValue(control, value)`), and an `<input type="range">` with `min/max/step/value` and `aria-label={control.label}`; `onInput`/`onChange` dispatch `SET_PARAM` with `parseFloat(value)`.

`SeedControl.tsx`: like `RangeControl` plus a `.dice-btn` (port dice SVG) that dispatches `SET_PARAM` with `randomSeed(control)`.

`ToggleControl.tsx`: `.mini-sw` switch button with `role="switch"` and `aria-checked`; used for the Animate control.

`ControlsPanel.tsx`: `<aside className="col col-right">` → `.right-scroll` → effect headline (`.effect-headline` with name/description/`.chip` tech tags), `.panel-head` "Controls", then `.controls` mapping each control to its component. When `effect.animatable`, append an Animate `ToggleControl` bound to `state.animate` (dispatch `SET_ANIMATE`); when `useReducedMotion()`, disable it and show the `.reduced-note`. Leave a slot below for the code viewer (Task 14). Read `effect = getEffect(state.effectId)!`.

Mount `<ControlsPanel />` as the right column in `App.tsx`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/controls/ControlsPanel.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/controls src/App.tsx
git commit -m "feat: add data-driven controls panel"
```

---

### Task 14: Code viewer + copy, final integration

**Files:**
- Create: `src/components/code/CopyButton.tsx`, `src/components/code/CodeViewer.tsx`
- Modify: `src/components/controls/ControlsPanel.tsx` (render `<CodeViewer />` in its code slot), `README.md`
- Test: `src/components/code/CodeViewer.test.tsx`

**Interfaces:**
- Consumes: `usePlayground()`, `getEffect`, `generateSvg`, `generateCss`, `highlightSvg`, `useReducedMotion`.
- Produces: `CodeViewer` renders SVG/CSS tabs (from `state.codeTab` → `SET_CODE_TAB`), a `<pre className="code-pre">` whose HTML is `highlightSvg(code)` for SVG and the CSS string (escaped) for CSS, and a `CopyButton`. `CopyButton` writes the current code to `navigator.clipboard` and shows a transient "Copied" state.

- [ ] **Step 1: Write the failing test**

`src/components/code/CodeViewer.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PlaygroundProvider } from "../../state/PlaygroundContext";
import { CodeViewer } from "./CodeViewer";

test("copy writes the SVG code to the clipboard", async () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.assign(navigator, { clipboard: { writeText } });
  render(<PlaygroundProvider><CodeViewer /></PlaygroundProvider>);
  await userEvent.click(screen.getByRole("button", { name: /copy/i }));
  expect(writeText).toHaveBeenCalledWith(expect.stringContaining("<filter id=\"rough-edge\">"));
});

test("switching to the CSS tab shows the css rule", async () => {
  render(<PlaygroundProvider><CodeViewer /></PlaygroundProvider>);
  await userEvent.click(screen.getByRole("button", { name: /^css$/i }));
  expect(screen.getByText(/url\(#rough-edge\)/)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/code/CodeViewer.test.tsx`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement (port markup/classes from mockup `.code-block`, `renderCode`, `copyCode`)**

`CopyButton.tsx`: `.code-copy` button; on click `await navigator.clipboard.writeText(code)`, add `done` class for ~1.2s. Props: `{ code: string }`.

`CodeViewer.tsx`:
- `effect = getEffect(state.effectId)!`; `animate = state.animate && !reduced && !!effect.animatable`.
- `svg = generateSvg(effect, state.params, animate)`, `css = generateCss(effect)`.
- `code = state.codeTab === "svg" ? svg : css`.
- Tabs (`SVG`/`CSS`) dispatch `SET_CODE_TAB`; `CopyButton` gets `code`.
- `<pre className="code-pre mono" dangerouslySetInnerHTML={{ __html: state.codeTab === "svg" ? highlightSvg(svg) : escapeHtml(css) }} />` — add a tiny local `escapeHtml` for the CSS branch (or reuse a shared helper).

Render `<CodeViewer />` inside `ControlsPanel` where Task 13 left the code slot.

Update `README.md` with a short project intro and the commands: `npm install`, `npm run dev`, `npm test`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/code/CodeViewer.test.tsx`
Expected: PASS.

- [ ] **Step 5: Full suite + build + manual smoke**

Run: `npm test` (all green), then `npm run build` (type-checks and builds), then `npm run dev` and verify in a browser: select each effect, drag sliders (preview + code update live), toggle Before/After, switch preview targets, Randomize/Reset, copy code, toggle theme.

- [ ] **Step 6: Commit**

```bash
git add src/components/code src/components/controls/ControlsPanel.tsx README.md
git commit -m "feat: add code viewer with copy and complete MVP integration"
```

---

## Self-Review

**Spec coverage (PRD P0 + approved mockup):**
- Effect Catalog + selection + categories → Task 11 ✓
- Live Preview + Card/Text/Image → Task 12 ✓
- Parameter controls + Reset → Tasks 13, 9 ✓
- Randomize (valid, no NaN) → Tasks 3, 9 ✓
- SVG + CSS code viewer + Copy → Tasks 6, 7, 14 ✓
- Before/After side-by-side → Task 12 ✓
- Light/Dark theme + persistence → Tasks 8, 10 ✓
- Animation + reduced-motion → Tasks 5, 8, 12, 13 ✓
- Data-driven registry (PRD §15) → Task 2 ✓
- Directory layout (PRD §28) → File Structure ✓
- **Deferred (P1/P2, not in this plan):** Local Preset save/load UI, comparison drag-slider, fullscreen, React JSX code tab, search over description, favorites, URL share. Call these out to the user as the next plan.

**Placeholder scan:** No "TBD"/"handle edge cases"; presentational CSS/markup steps point to the concrete approved file `mockup/index.html` (an existing artifact), and all logic steps carry full code.

**Type consistency:** `Params`, `ParamValue`, `EffectDefinition`, `ControlDefinition`, `buildFilterInner(params, animate)`, `defaultParams`, `getEffect`, `randomizeParams`, `generateSvg/generateCss`, `highlightSvg`, `LIVE_FILTER_ID`, and the `Action` union are used with identical names/signatures across Tasks 2–14.
