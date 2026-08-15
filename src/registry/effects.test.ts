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
