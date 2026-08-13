import { expect, test } from "vitest";
import { highlightSvg } from "./highlight";

test("wraps tag names, attributes and strings", () => {
  const out = highlightSvg('<feTurbulence type="fractalNoise"/>');
  expect(out).toContain('<span class="tk-tag">feTurbulence</span>');
  expect(out).toContain('<span class="tk-attr">type</span>');
  expect(out).toContain('<span class="tk-str">"fractalNoise"</span>');
});

test("does not re-highlight the class attributes it inserted (regression)", () => {
  const out = highlightSvg('<a b="c"/>');
  // the literal string tk-attr must appear only inside class="..."
  expect(out).not.toContain('tk-attr">class');
  expect(out).not.toMatch(/<span class="tk-str">"tk-/);
});

test("escapes HTML in the source", () => {
  expect(highlightSvg("<x/>")).not.toContain("<x/>");
});
