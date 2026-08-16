import { beforeEach, expect, test } from "vitest";
import {
  loadTheme,
  saveTheme,
  loadLastEffectId,
  saveLastEffectId,
  loadCustomHtml,
  saveCustomHtml,
  DEFAULT_CUSTOM_HTML,
} from "./storage";

beforeEach(() => localStorage.clear());

test("theme defaults to dark and round-trips", () => {
  expect(loadTheme()).toBe("dark");
  saveTheme("light");
  expect(loadTheme()).toBe("light");
});

test("last effect id round-trips and defaults to null", () => {
  expect(loadLastEffectId()).toBeNull();
  saveLastEffectId("water");
  expect(loadLastEffectId()).toBe("water");
});

test("custom HTML defaults, round-trips, and recovers from a corrupted value", () => {
  expect(loadCustomHtml()).toBe(DEFAULT_CUSTOM_HTML);
  saveCustomHtml("<p>mine</p>");
  expect(loadCustomHtml()).toBe("<p>mine</p>");
  // a stray "undefined"/"null" string falls back to the default, not the literal
  localStorage.setItem("uifx.customHtml", "undefined");
  expect(loadCustomHtml()).toBe(DEFAULT_CUSTOM_HTML);
});
