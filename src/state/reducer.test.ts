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
