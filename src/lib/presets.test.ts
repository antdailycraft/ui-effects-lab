import { beforeEach, expect, test } from "vitest";
import { loadPresets, savePreset, deletePreset, presetsForEffect } from "./presets";

beforeEach(() => localStorage.clear());

test("presets start empty and round-trip through storage", () => {
  expect(loadPresets()).toEqual([]);
  savePreset({ name: "A", effectId: "rough-edge", params: { scale: 12 } }, 100, "id-1");
  const list = loadPresets();
  expect(list).toHaveLength(1);
  expect(list[0]).toMatchObject({ id: "id-1", name: "A", effectId: "rough-edge", params: { scale: 12 } });
});

test("savePreset appends without mutating the caller's params", () => {
  const params = { scale: 3 };
  savePreset({ name: "A", effectId: "water", params }, 1, "id-1");
  params.scale = 99; // mutating the original must not affect the stored copy
  expect(loadPresets()[0].params.scale).toBe(3);
});

test("deletePreset removes by id", () => {
  savePreset({ name: "A", effectId: "water", params: {} }, 1, "id-1");
  savePreset({ name: "B", effectId: "water", params: {} }, 2, "id-2");
  const after = deletePreset("id-1");
  expect(after.map((p) => p.id)).toEqual(["id-2"]);
  expect(loadPresets().map((p) => p.id)).toEqual(["id-2"]);
});

test("presetsForEffect filters by effect id", () => {
  savePreset({ name: "A", effectId: "water", params: {} }, 1, "id-1");
  savePreset({ name: "B", effectId: "glitch", params: {} }, 2, "id-2");
  expect(presetsForEffect(loadPresets(), "water").map((p) => p.name)).toEqual(["A"]);
});
