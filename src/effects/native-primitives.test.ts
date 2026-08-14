import { expect, test } from "vitest";
import { sticker } from "./svg/sticker/definition";
import { gooey } from "./svg/gooey/definition";
import { dropShadow } from "./svg/drop-shadow/definition";
import { posterize } from "./svg/posterize/definition";
import { conicSpin } from "./css/conic-spin/definition";
import { defaultParams } from "../registry/effects";

test("sticker dilates SourceAlpha and merges an outline behind the source", () => {
  const inner = sticker.buildFilterInner!(defaultParams(sticker), false);
  expect(inner).toContain('<feMorphology in="SourceAlpha" operator="dilate"');
  expect(inner).toContain("<feMerge>");
  expect(inner).not.toContain("NaN");
});

test("gooey crushes the alpha channel via feColorMatrix", () => {
  const inner = gooey.buildFilterInner!(defaultParams(gooey), false);
  expect(inner).toContain("<feColorMatrix");
  expect(inner).toContain('operator="atop"');
  // default gooeyness 18 → alpha row "... 18 -8.1"
  expect(inner).toMatch(/0 0 0 18 -\d/);
});

test("drop-shadow is a single feDropShadow primitive with resolved params", () => {
  const inner = dropShadow.buildFilterInner!(defaultParams(dropShadow), false);
  expect(inner).toContain("<feDropShadow");
  expect(inner).toContain('dx="6"');
  expect(inner).toContain('flood-opacity="0.50"');
});

test("posterize builds an even discrete transfer table from the level count", () => {
  const inner = posterize.buildFilterInner!({ levels: 4 }, false);
  expect(inner).toContain('type="discrete"');
  expect(inner).toContain('tableValues="0.000 0.333 0.667 1.000"');
  // two levels collapse to pure black/white
  expect(posterize.buildFilterInner!({ levels: 2 }, false)).toContain('tableValues="0.000 1.000"');
});

test("conic-spin is a CSS effect whose animated angle is a registered @property", () => {
  expect(conicSpin.kind).toBe("css");
  const css = conicSpin.buildCss!(defaultParams(conicSpin), true);
  expect(css).toContain("@property --fx-spin");
  expect(css).toContain("conic-gradient(");
  expect(css).toContain("--fx-spin: 360deg");
});
