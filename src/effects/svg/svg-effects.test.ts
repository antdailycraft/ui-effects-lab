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
