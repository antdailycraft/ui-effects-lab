import { expect, test } from "vitest";
import { noise } from "./noise/definition";
import { cloud } from "./cloud/definition";
import { liquid } from "./liquid/definition";
import { defaultParams } from "../../registry/effects";

test("noise renders raw turbulence clipped to the source shape", () => {
  const inner = noise.buildFilterInner!(defaultParams(noise), false);
  expect(inner).toContain('type="fractalNoise"');
  expect(inner).toContain('<feComposite in="mono" in2="SourceGraphic" operator="in"');
  expect(inner).not.toContain("NaN");
});

test("cloud blurs noise and merges it over the source, animating only when asked", () => {
  const p = defaultParams(cloud);
  const still = cloud.buildFilterInner!(p, false);
  expect(still).toContain("<feGaussianBlur");
  expect(still).toContain("<feMerge>");
  expect(still).not.toContain("<animate");
  expect(cloud.buildFilterInner!(p, true)).toContain('<animate attributeName="baseFrequency"');
});

test("liquid is strong non-directional turbulence with a large default scale", () => {
  const inner = liquid.buildFilterInner!(defaultParams(liquid), false);
  expect(inner).toContain('type="turbulence"');
  expect(inner).toContain('scale="50"');
  expect(inner).not.toContain("NaN");
});
