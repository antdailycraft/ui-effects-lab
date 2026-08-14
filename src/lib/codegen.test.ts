import { expect, test } from "vitest";
import { generateSvg, generateCss, availableTabs, resolveTab } from "./codegen";
import { roughEdge } from "../effects/svg/rough-edge/definition";
import { frostedGlass } from "../effects/css/frosted-glass/definition";
import { defaultParams } from "../registry/effects";

test("generateSvg wraps the filter inner in an svg/filter shell with the effect id", () => {
  const svg = generateSvg(roughEdge, defaultParams(roughEdge), false);
  expect(svg).toContain('<filter id="rough-edge">');
  expect(svg).toContain("<feTurbulence");
  expect(svg.trim().startsWith("<svg")).toBe(true);
  expect(svg.trim().endsWith("</svg>")).toBe(true);
});

test("generateCss references the filter by id for SVG effects", () => {
  expect(generateCss(roughEdge, defaultParams(roughEdge), false)).toContain(
    "filter: url(#rough-edge);"
  );
});

test("generateCss emits the effect's own rule for CSS effects", () => {
  const css = generateCss(frostedGlass, defaultParams(frostedGlass), false);
  expect(css).toContain("backdrop-filter: blur(");
  expect(css).not.toContain("url(#frosted-glass)");
});

test("CSS effects offer only a CSS tab; SVG effects offer both", () => {
  expect(availableTabs(frostedGlass)).toEqual(["css"]);
  expect(availableTabs(roughEdge)).toEqual(["svg", "css"]);
  expect(resolveTab(frostedGlass, "svg")).toBe("css");
});
