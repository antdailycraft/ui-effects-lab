import { expect, test } from "vitest";
import { sanitizeHtml } from "./sanitizeHtml";

test("keeps ordinary markup and inline styles intact", () => {
  const html = `<div style="color:red"><h3>Hi</h3><p>text</p></div>`;
  expect(sanitizeHtml(html)).toBe(html);
});

test("strips <script> elements", () => {
  expect(sanitizeHtml(`<p>ok</p><script>alert(1)</script>`)).toBe(`<p>ok</p>`);
  expect(sanitizeHtml(`<script src="x.js"></script><b>b</b>`)).toBe(`<b>b</b>`);
});

test("removes inline event handlers but keeps the element", () => {
  expect(sanitizeHtml(`<img src="x" onerror="alert(1)">`)).toBe(`<img src="x">`);
  expect(sanitizeHtml(`<div onclick='steal()'>hi</div>`)).toBe(`<div>hi</div>`);
});

test("neutralizes javascript: URLs", () => {
  expect(sanitizeHtml(`<a href="javascript:alert(1)">x</a>`)).toBe(`<a href="#">x</a>`);
});

test("drops iframe/object/embed", () => {
  expect(sanitizeHtml(`<iframe src="evil"></iframe><span>s</span>`)).toBe(`<span>s</span>`);
});
