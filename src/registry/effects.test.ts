import { expect, test } from "vitest";
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

test("registry ships every effect in order across categories", () => {
  expect(EFFECTS.map((e) => e.id)).toEqual([
    "rough-edge", "paper-grain", "noise", "water", "liquid", "heat-haze", "cloud",
    "sticker", "gooey", "drop-shadow", "posterize", "emboss", "sharpen", "bevel",
    "color-grade", "duotone", "invert", "edge-detect", "motion-blur", "neon-glow",
    "frosted-glass", "holographic", "conic-spin", "gradient-border",
    "glitch", "crt",
    "mesh-gradient", "warp-shader", "voronoi",
    "grain-gradient", "metaballs", "swirl", "dot-orbit", "god-rays", "liquid-metal",
    "dithering", "water-shader", "neuro-noise", "smoke-ring", "spiral",
    "perlin-noise", "pulsing-border", "color-panels",
    "dot-grid", "fluted-glass", "gem-smoke", "halftone-cmyk", "halftone-dots",
    "paper-texture", "simplex-noise", "static-mesh-gradient",
    "static-radial-gradient", "waves",
    "heatmap", "image-dithering", "lens-distortion",
  ]);
  expect(getEffect("water")?.name).toBe("Water Distortion");
  expect(getEffect("cloud")?.name).toBe("Cloud / Fog");
});

test("groups span SVG Filters, CSS Effects, Retro, and Generators", () => {
  expect(groupByCategory(EFFECTS).map((g) => g.label)).toEqual([
    "SVG Filters", "CSS Effects", "Retro", "Generators",
  ]);
});

test("generator effects are library-derived and declare their license + React code", () => {
  const mesh = getEffect("mesh-gradient")!;
  expect(mesh.kind).toBe("generator");
  expect(mesh.license).toBe("Apache-2.0");
  expect(mesh.component).toBeDefined(); // a React component (function or forwardRef/memo object)
  expect(mesh.buildReact!(defaultParams(mesh), true)).toContain("<MeshGradient");
});

test("every generator ships built-in presets keyed to its own controls", () => {
  const generators = EFFECTS.filter((e) => e.kind === "generator");
  expect(generators.length).toBeGreaterThan(20);
  for (const g of generators) {
    expect(g.builtInPresets && g.builtInPresets.length).toBeGreaterThan(0);
    const ids = new Set(g.controls.map((c) => c.id));
    for (const preset of g.builtInPresets!) {
      expect(preset.name).toBeTruthy();
      // preset only touches real controls, and numeric values stay in range
      for (const [key, value] of Object.entries(preset.params)) {
        expect(ids.has(key)).toBe(true);
        const ctrl = g.controls.find((c) => c.id === key)!;
        if (typeof value === "number") {
          if (ctrl.min !== undefined) expect(value).toBeGreaterThanOrEqual(ctrl.min);
          if (ctrl.max !== undefined) expect(value).toBeLessThanOrEqual(ctrl.max);
        }
      }
    }
  }
});

test("built-in preset names come straight from the library preset list", () => {
  const swirl = getEffect("swirl")!;
  expect(swirl.builtInPresets!.map((p) => p.name)).toContain("Default");
});

test("generator buildProps returns component props (sizing, speed, colors)", () => {
  const swirl = getEffect("swirl")!;
  const props = swirl.buildProps!(defaultParams(swirl), true);
  expect(props.style).toEqual({ width: "100%", height: "100%" });
  expect(typeof props.speed).toBe("number");
  // not animating → speed forced to 0
  expect(swirl.buildProps!(defaultParams(swirl), false).speed).toBe(0);
});

test("image-based generators declare usesImage and show an image prop", () => {
  const imgDither = getEffect("image-dithering")!;
  expect(imgDither.usesImage).toBe(true);
  expect(imgDither.buildReact!(defaultParams(imgDither), false)).toContain('image="/your-image.jpg"');
  expect(getEffect("heatmap")?.usesImage).toBe(true);
  expect(getEffect("lens-distortion")?.usesImage).toBe(true);
  expect(getEffect("fluted-glass")?.usesImage).toBe(true);
  // standalone generators are not image-based
  expect(getEffect("mesh-gradient")?.usesImage).toBeFalsy();
});
