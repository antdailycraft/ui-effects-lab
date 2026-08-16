import { expect, test } from "vitest";
import {
  isStackable,
  previewChain,
  activeChain,
  appliedChain,
  chainFilterCss,
  generateCombinedSvg,
  generateCombinedCss,
} from "./combine";
import { getEffect } from "../registry/effects";

test("isStackable is true for SVG-filter effects, false for CSS and generators", () => {
  expect(isStackable(getEffect("rough-edge")!)).toBe(true);
  expect(isStackable(getEffect("glitch")!)).toBe(true); // retro, but SVG-filter based
  expect(isStackable(getEffect("frosted-glass")!)).toBe(false); // css
  expect(isStackable(getEffect("swirl")!)).toBe(false); // generator
});

test("previewChain appends the active effect as a live top layer", () => {
  const chain = previewChain([{ effectId: "water", params: { scale: 20 } }], "rough-edge", {
    scale: 9,
  });
  expect(chain.map((l) => l.effectId)).toEqual(["water", "rough-edge"]);
});

test("previewChain de-dupes when the active effect equals the last committed layer", () => {
  const layers = [{ effectId: "rough-edge", params: { scale: 9 } }];
  // identical to the last layer → not appended (avoids a double-applied filter)
  expect(previewChain(layers, "rough-edge", { scale: 9 })).toHaveLength(1);
  // changed params → shown live on top
  expect(previewChain(layers, "rough-edge", { scale: 12 })).toHaveLength(2);
});

test("a non-stackable active effect is not added to the chain", () => {
  const layers = [{ effectId: "water", params: { scale: 20 } }];
  expect(previewChain(layers, "frosted-glass", {})).toHaveLength(1);
});

test("activeChain is empty when the active effect can't be stacked (stack stays dormant)", () => {
  const layers = [{ effectId: "water", params: { scale: 20 } }];
  // CSS and generator active effects → chain empty, so they render on their own
  expect(activeChain(layers, "frosted-glass", {})).toEqual([]);
  expect(activeChain(layers, "swirl", {})).toEqual([]);
  // SVG active → the committed layers apply (plus the active on top)
  expect(activeChain(layers, "rough-edge", { scale: 9 }).map((l) => l.effectId)).toEqual([
    "water",
    "rough-edge",
  ]);
});

test("appliedChain ignores the draft top while a layer is being edited", () => {
  const layers = [{ effectId: "water", params: { scale: 20 } }];
  expect(appliedChain(layers, "rough-edge", { scale: 9 }, null).map((l) => l.effectId)).toEqual([
    "water",
    "rough-edge",
  ]);
  expect(appliedChain(layers, "rough-edge", { scale: 9 }, 0).map((l) => l.effectId)).toEqual([
    "water",
  ]);
});

test("chainFilterCss references each live filter in order", () => {
  expect(chainFilterCss(3)).toBe("url(#fx-live-0) url(#fx-live-1) url(#fx-live-2)");
});

test("combined code emits one filter per layer and a chained CSS filter", () => {
  const chain = [
    { effectId: "rough-edge", params: getEffect("rough-edge")!.controls.reduce((a, c) => ((a[c.id] = c.def), a), {} as Record<string, number | string | boolean>) },
    { effectId: "water", params: getEffect("water")!.controls.reduce((a, c) => ((a[c.id] = c.def), a), {} as Record<string, number | string | boolean>) },
  ];
  const svg = generateCombinedSvg(chain, () => false);
  expect(svg).toContain('<filter id="rough-edge-1">');
  expect(svg).toContain('<filter id="water-2">');
  expect(generateCombinedCss(chain)).toBe(".effect {\n  filter: url(#rough-edge-1) url(#water-2);\n}");
});

test("an empty chain generates valid (no-op) code, not a broken filter", () => {
  expect(generateCombinedCss([])).toBe(".effect {\n  filter: none;\n}");
  expect(generateCombinedSvg([], () => false)).toBe(`<svg width="0" height="0" aria-hidden="true">\n\n</svg>`);
});
