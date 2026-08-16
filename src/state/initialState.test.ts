import { beforeEach, expect, test } from "vitest";
import { buildInitialState } from "./PlaygroundContext";
import { encodeShare } from "../lib/share";
import { defaultParams, getEffect } from "../registry/effects";

beforeEach(() => localStorage.clear());

test("no hash → first effect with its defaults and an empty stack", () => {
  const s = buildInitialState("");
  expect(s.params).toEqual(defaultParams(getEffect(s.effectId)!));
  expect(s.layers).toEqual([]);
});

test("a share hash wins over the last-used effect and merges + clamps params", () => {
  localStorage.setItem("uifx.effect", "rough-edge");
  const s = buildInitialState(encodeShare({ e: "water", p: { scale: 9999 } }));
  expect(s.effectId).toBe("water");
  const water = getEffect("water")!;
  const scaleCtrl = water.controls.find((c) => c.id === "scale")!;
  expect(s.params.scale).toBe(scaleCtrl.max); // clamped to range
  for (const c of water.controls) expect(s.params[c.id]).not.toBeUndefined(); // defaults filled
});

test("an unknown shared effect id falls back to the saved effect", () => {
  localStorage.setItem("uifx.effect", "water");
  const s = buildInitialState(encodeShare({ e: "nope", p: {} }));
  expect(s.effectId).toBe("water");
});

test("shared layers drop non-stackable ids and fill each from defaults", () => {
  const s = buildInitialState(
    encodeShare({
      e: "rough-edge",
      p: {},
      l: [{ e: "water", p: {} }, { e: "swirl", p: {} }, { e: "frosted-glass", p: {} }],
    })
  );
  // swirl (generator) and frosted-glass (css) are not stackable → dropped
  expect(s.layers.map((l) => l.effectId)).toEqual(["water"]);
  const water = getEffect("water")!;
  for (const c of water.controls) expect(s.layers[0].params[c.id]).not.toBeUndefined();
});
