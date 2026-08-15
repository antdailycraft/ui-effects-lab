import { expect, test } from "vitest";
import { colorGrade } from "./svg/color-grade/definition";
import { duotone } from "./svg/duotone/definition";
import { invert } from "./svg/invert/definition";
import { edgeDetect } from "./svg/edge-detect/definition";
import { motionBlur } from "./svg/motion-blur/definition";
import { neonGlow } from "./svg/neon-glow/definition";
import { gradientBorder } from "./css/gradient-border/definition";
import { defaultParams } from "../registry/effects";

test("color-grade chains hueRotate and saturate", () => {
  const inner = colorGrade.buildFilterInner!(defaultParams(colorGrade), false);
  expect(inner).toContain('type="hueRotate"');
  expect(inner).toContain('type="saturate"');
});

test("duotone desaturates then maps shadows/highlights to two hues", () => {
  const inner = duotone.buildFilterInner!(defaultParams(duotone), false);
  expect(inner).toContain("<feComponentTransfer");
  expect(inner).toContain('type="table"');
  expect(inner).not.toContain("NaN");
});

test("invert's transfer table goes full negative at amount 1", () => {
  expect(invert.buildFilterInner!({ amount: 1 }, false)).toContain('tableValues="1.00 0.00"');
  expect(invert.buildFilterInner!({ amount: 0 }, false)).toContain('tableValues="0.00 1.00"');
});

test("edge-detect uses a Laplacian kernel scaled by strength", () => {
  expect(edgeDetect.buildFilterInner!({ amount: 1 }, false)).toContain("4.00");
  expect(edgeDetect.buildFilterInner!(defaultParams(edgeDetect), false)).toContain("<feConvolveMatrix");
});

test("motion-blur is a directional gaussian blur", () => {
  const inner = motionBlur.buildFilterInner!(defaultParams(motionBlur), false);
  expect(inner).toContain('stdDeviation="8.0 0.0"');
});

test("neon-glow floods a colored, blurred spread under the source", () => {
  const inner = neonGlow.buildFilterInner!(defaultParams(neonGlow), false);
  expect(inner).toContain("<feMorphology");
  expect(inner).toContain("<feMerge>");
  expect(inner).toMatch(/flood-color="#[0-9a-f]{6}"/);
});

test("gradient-border is a CSS effect using mask-composite", () => {
  expect(gradientBorder.kind).toBe("css");
  expect(gradientBorder.buildCss!(defaultParams(gradientBorder), false)).toContain("mask-composite: exclude");
});
