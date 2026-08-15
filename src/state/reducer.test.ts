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

test("TOGGLE_COMPARE flips the flag", () => {
  expect(reducer(initialState, { type: "TOGGLE_COMPARE" }).compare).toBe(true);
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
