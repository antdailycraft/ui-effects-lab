import { beforeEach, expect, test } from "vitest";
import { loadFavorites, toggleFavorite } from "./favorites";

beforeEach(() => localStorage.clear());

test("toggle adds, then a second toggle removes; persists across loads", () => {
  expect(loadFavorites()).toEqual([]);
  expect(toggleFavorite("water")).toEqual(["water"]);
  expect(loadFavorites()).toEqual(["water"]);
  expect(toggleFavorite("swirl")).toEqual(["water", "swirl"]);
  expect(toggleFavorite("water")).toEqual(["swirl"]);
  expect(loadFavorites()).toEqual(["swirl"]);
});

test("loadFavorites tolerates malformed storage", () => {
  localStorage.setItem("uifx.favorites", "{not json");
  expect(loadFavorites()).toEqual([]);
});
