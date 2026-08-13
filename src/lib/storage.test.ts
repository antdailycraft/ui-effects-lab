import { beforeEach, expect, test } from "vitest";
import { loadTheme, saveTheme, loadLastEffectId, saveLastEffectId } from "./storage";

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
