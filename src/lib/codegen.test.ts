import { expect, test } from "vitest";
import { generateSvg, generateCss } from "./codegen";
import { roughEdge } from "../effects/svg/rough-edge/definition";
import { defaultParams } from "../registry/effects";

test("generateSvg wraps the filter inner in an svg/filter shell with the effect id", () => {
  const svg = generateSvg(roughEdge, defaultParams(roughEdge), false);
  expect(svg).toContain('<filter id="rough-edge">');
  expect(svg).toContain("<feTurbulence");
  expect(svg.trim().startsWith("<svg")).toBe(true);
  expect(svg.trim().endsWith("</svg>")).toBe(true);
});

test("generateCss references the filter by id", () => {
  expect(generateCss(roughEdge)).toContain("filter: url(#rough-edge);");
});
