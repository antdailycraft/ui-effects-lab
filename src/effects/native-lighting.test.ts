import { expect, test } from "vitest";
import { emboss } from "./svg/emboss/definition";
import { sharpen } from "./svg/sharpen/definition";
import { bevel } from "./svg/bevel/definition";
import { defaultParams } from "../registry/effects";

test("emboss uses feConvolveMatrix and scales the kernel with depth", () => {
  const inner = emboss.buildFilterInner!(defaultParams(emboss), false);
  expect(inner).toContain("<feConvolveMatrix");
  expect(inner).toContain('preserveAlpha="true"');
  // default depth 1.5 → -2 * 1.5 = -3.00
  expect(inner).toContain("-3.00");
  expect(inner).not.toContain("NaN");
});

test("sharpen's center weight grows with amount (1 + 4a)", () => {
  expect(sharpen.buildFilterInner!({ amount: 1 }, false)).toContain("5.00");
  expect(sharpen.buildFilterInner!({ amount: 0 }, false)).toContain("1.00");
});

test("bevel lights the alpha height map with a specular point light", () => {
  const inner = bevel.buildFilterInner!(defaultParams(bevel), false);
  expect(inner).toContain("<feSpecularLighting");
  expect(inner).toContain("<fePointLight");
  expect(inner).toContain('operator="arithmetic"');
  expect(inner).not.toContain("NaN");
});
