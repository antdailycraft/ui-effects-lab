import { expect, test } from "vitest";
import { reducer, initialState } from "./PlaygroundContext";
import { defaultParams, getEffect } from "../registry/effects";

test("SELECT_EFFECT switches effect and loads its defaults", () => {
  const s = reducer(initialState, { type: "SELECT_EFFECT", id: "water" });
  expect(s.effectId).toBe("water");
  expect(s.params).toEqual(defaultParams(getEffect("water")!));
});

test("SET_PARAM updates one parameter", () => {
  const s = reducer(initialState, { type: "SET_PARAM", id: "scale", value: 22 });
  expect(s.params.scale).toBe(22);
});

test("RESET restores defaults after edits", () => {
  const edited = reducer(initialState, { type: "SET_PARAM", id: "scale", value: 40 });
  const reset = reducer(edited, { type: "RESET" });
  expect(reset.params).toEqual(defaultParams(getEffect(initialState.effectId)!));
});

test("SET_COMPARE_MODE selects a compare mode", () => {
  expect(reducer(initialState, { type: "SET_COMPARE_MODE", mode: "slider" }).compareMode).toBe(
    "slider"
  );
});

test("TOGGLE_FULLSCREEN flips the flag; SET_FULLSCREEN sets it", () => {
  expect(reducer(initialState, { type: "TOGGLE_FULLSCREEN" }).fullscreen).toBe(true);
  const on = reducer(initialState, { type: "SET_FULLSCREEN", value: true });
  expect(reducer(on, { type: "SET_FULLSCREEN", value: false }).fullscreen).toBe(false);
});

test("SET_IMAGE updates the source image for image generators", () => {
  expect(reducer(initialState, { type: "SET_IMAGE", url: "https://x/y.png" }).imageUrl).toBe(
    "https://x/y.png"
  );
});

test("LOAD_PRESET switches effect and applies the preset's params together", () => {
  const s = reducer(initialState, {
    type: "LOAD_PRESET",
    effectId: "water",
    params: { freqX: 0.02, freqY: 0.05, numOctaves: 3, seed: 9, scale: 30, speed: 6 },
  });
  expect(s.effectId).toBe("water");
  expect(s.params.scale).toBe(30);
});

test("LOAD_PRESET fills missing params from the effect's defaults (partial presets are safe)", () => {
  const swirl = getEffect("swirl")!;
  const s = reducer(initialState, {
    type: "LOAD_PRESET",
    effectId: "swirl",
    params: { twist: 0.5 },
  });
  expect(s.params.twist).toBe(0.5);
  // untouched controls fall back to their defaults, never undefined
  expect(s.params.bandCount).toBe(defaultParams(swirl).bandCount);
  for (const c of swirl.controls) expect(s.params[c.id]).not.toBeUndefined();
});
