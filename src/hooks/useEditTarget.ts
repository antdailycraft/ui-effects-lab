import type { EffectDefinition, Params } from "../types/effects";
import { usePlayground } from "../state/PlaygroundContext";
import { getEffect } from "../registry/effects";

/**
 * The effect + params the Controls panel is currently editing: a committed
 * combination layer when `editingLayer` is set, otherwise the active draft.
 */
export function useEditTarget(): { effect: EffectDefinition; params: Params; editing: boolean } {
  const { state } = usePlayground();
  const idx = state.editingLayer;
  if (idx !== null && state.layers[idx]) {
    const layer = state.layers[idx];
    const effect = getEffect(layer.effectId);
    if (effect) return { effect, params: layer.params, editing: true };
  }
  return { effect: getEffect(state.effectId)!, params: state.params, editing: false };
}
