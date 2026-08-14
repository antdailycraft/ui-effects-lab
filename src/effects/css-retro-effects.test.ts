import { expect, test } from "vitest";
import { frostedGlass } from "./css/frosted-glass/definition";
import { holographic } from "./css/holographic/definition";
import { crt } from "./retro/crt/definition";
import { glitch } from "./retro/glitch/definition";
import { defaultParams } from "../registry/effects";

test("frosted glass is a CSS effect exposing blur/tint as custom properties", () => {
  expect(frostedGlass.kind).toBe("css");
  expect(frostedGlass.cssClass).toBe("fx-frosted");
  const vars = frostedGlass.buildStyle!(defaultParams(frostedGlass), false);
  expect(vars["--fx-blur"]).toBe("8px");
  expect(frostedGlass.buildCss!(defaultParams(frostedGlass), false)).toContain("backdrop-filter");
});

test("holographic and crt are animatable CSS effects with a sheen/scanline class", () => {
  expect(holographic.kind).toBe("css");
  expect(holographic.animatable).toBe(true);
  expect(crt.kind).toBe("css");
  expect(crt.cssClass).toBe("fx-crt");
});

test("glitch is an SVG effect that splits channels and adds jitter when animating", () => {
  expect(glitch.kind).toBeUndefined(); // svg is the default kind
  const still = glitch.buildFilterInner!(defaultParams(glitch), false);
  expect(still).toContain("<feBlend");
  expect(still).toContain('mode="screen"');
  expect(still).not.toContain("<animate");
  expect(glitch.buildFilterInner!(defaultParams(glitch), true)).toContain(
    '<animate attributeName="dx"'
  );
});
