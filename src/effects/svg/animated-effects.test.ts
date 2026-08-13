import { expect, test } from "vitest";
import { water } from "./water-distortion/definition";
import { heatHaze } from "./heat-haze/definition";
import { defaultParams } from "../../registry/effects";

test("water uses directional (X≠Y) frequency and adds <animate> only when animating", () => {
  const p = defaultParams(water);
  expect(water.buildFilterInner(p, false)).not.toContain("<animate");
  const animated = water.buildFilterInner(p, true);
  expect(animated).toContain('<animate attributeName="baseFrequency"');
  expect(animated).toContain('baseFrequency="0.012 0.040"');
});

test("heat-haze is low-frequency turbulence with optional animation", () => {
  const p = defaultParams(heatHaze);
  expect(heatHaze.buildFilterInner(p, true)).toContain("<animate");
  expect(heatHaze.buildFilterInner(p, false)).toContain('type="turbulence"');
});
