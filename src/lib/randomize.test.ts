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
