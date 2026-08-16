import { expect, test } from "vitest";
import { reducer, initialState } from "./PlaygroundContext";
import { defaultParams, getEffect } from "../registry/effects";
import { MAX_LAYERS } from "../lib/combine";

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

test("ADD_LAYER snapshots the active SVG effect; REMOVE/MOVE/CLEAR edit the stack", () => {
  // active effect defaults to an SVG-filter effect (rough-edge)
  const one = reducer(initialState, { type: "ADD_LAYER" });
  expect(one.layers).toHaveLength(1);
  expect(one.layers[0].effectId).toBe(initialState.effectId);

  // add a second (switch to water first)
  const onWater = reducer(one, { type: "SELECT_EFFECT", id: "water" });
  const two = reducer(onWater, { type: "ADD_LAYER" });
  expect(two.layers.map((l) => l.effectId)).toEqual([initialState.effectId, "water"]);

  // reorder
  const moved = reducer(two, { type: "MOVE_LAYER", index: 0, dir: 1 });
  expect(moved.layers.map((l) => l.effectId)).toEqual(["water", initialState.effectId]);

  // remove + clear
  expect(reducer(moved, { type: "REMOVE_LAYER", index: 0 }).layers).toHaveLength(1);
  expect(reducer(moved, { type: "CLEAR_LAYERS" }).layers).toEqual([]);
});

test("ADD_LAYER is a no-op for non-stackable (generator/CSS) effects", () => {
  const gen = reducer(initialState, { type: "SELECT_EFFECT", id: "swirl" });
  expect(reducer(gen, { type: "ADD_LAYER" }).layers).toEqual([]);
});

test("editing a layer routes SET_PARAM/RESET to that layer, not the draft", () => {
  const withLayer = reducer(initialState, { type: "ADD_LAYER" });
  const editing = reducer(withLayer, { type: "SET_EDITING_LAYER", index: 0 });
  expect(editing.editingLayer).toBe(0);
  const draftBefore = editing.params;
  const edited = reducer(editing, { type: "SET_PARAM", id: "scale", value: 33 });
  expect(edited.layers[0].params.scale).toBe(33); // layer updated
  expect(edited.params).toEqual(draftBefore); // draft untouched
});

test("SET_EDITING_LAYER ignores an out-of-range index; SELECT_EFFECT exits editing", () => {
  const withLayer = reducer(initialState, { type: "ADD_LAYER" });
  expect(reducer(withLayer, { type: "SET_EDITING_LAYER", index: 5 }).editingLayer).toBeNull();
  const editing = reducer(withLayer, { type: "SET_EDITING_LAYER", index: 0 });
  expect(reducer(editing, { type: "SELECT_EFFECT", id: "water" }).editingLayer).toBeNull();
});

test("ADD_LAYER stops at the layer cap", () => {
  let s = initialState;
  for (let i = 0; i < 10; i++) s = reducer(s, { type: "ADD_LAYER" });
  expect(s.layers.length).toBe(MAX_LAYERS);
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
