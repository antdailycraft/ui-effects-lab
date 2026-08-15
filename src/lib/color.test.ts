import { expect, test } from "vitest";
import { hslToRgb, hslToHex, hexToRgb } from "./color";

test("hslToRgb maps primaries correctly", () => {
  expect(hslToRgb(0, 1, 0.5)).toEqual([1, 0, 0]);
  expect(hslToHex(0, 1, 0.5)).toBe("#ff0000");
  expect(hslToHex(120, 1, 0.5)).toBe("#00ff00");
  expect(hslToHex(240, 1, 0.5)).toBe("#0000ff");
});

test("hslToHex handles greys and wraps hue", () => {
  expect(hslToHex(0, 0, 1)).toBe("#ffffff");
  expect(hslToHex(0, 0, 0)).toBe("#000000");
  expect(hslToHex(360, 1, 0.5)).toBe(hslToHex(0, 1, 0.5));
});

test("hexToRgb parses #rgb and #rrggbb, and is safe on bad input", () => {
  expect(hexToRgb("#ff0000")).toEqual([1, 0, 0]);
  expect(hexToRgb("#fff")).toEqual([1, 1, 1]);
  expect(hexToRgb("00ff00")).toEqual([0, 1, 0]);
  expect(hexToRgb("nope")).toEqual([0, 0, 0]);
});
