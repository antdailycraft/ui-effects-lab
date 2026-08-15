import { expect, test } from "vitest";
import { highlightSvg, highlightCss } from "./highlight";

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

test("highlightCss colors selectors, properties, functions and numbers", () => {
  const out = highlightCss(".effect {\n  filter: contrast(1.12);\n}");
  expect(out).toContain('<span class="tk-tag">.effect</span>'); // selector
  expect(out).toContain('<span class="tk-attr">filter</span>'); // property
  expect(out).toContain('<span class="tk-tag">contrast</span>'); // function
  expect(out).toContain('<span class="tk-num">1.12</span>'); // number
});

test("highlightCss handles pseudo-elements, hex colors and strings", () => {
  const out = highlightCss('.x::after { content: ""; background: #ff2e97; }');
  expect(out).toContain('<span class="tk-tag">::after</span>');
  expect(out).toContain('<span class="tk-str">""</span>');
  expect(out).toContain('<span class="tk-num">#ff2e97</span>');
});
