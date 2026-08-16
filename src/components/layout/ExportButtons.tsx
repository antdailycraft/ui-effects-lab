import { usePlayground } from "../../state/PlaygroundContext";
import { getEffect } from "../../registry/effects";
import type { EffectDefinition } from "../../types/effects";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { appliedChain, isStackable } from "../../lib/combine";
import { buildDemo, buildCombinedDemo, openInCodePen, openInStackBlitz } from "../../lib/export";

export function ExportButtons() {
  const { state } = usePlayground();
  const reduced = useReducedMotion();
  const effect = getEffect(state.effectId)!;
  const animate = state.animate && !reduced && !!effect.animatable;
  const demo = () => {
    // A combination stack exports the whole chained filter, not just one effect.
    if (state.layers.length > 0 && (state.editingLayer !== null || isStackable(effect))) {
      const chain = appliedChain(state.layers, state.effectId, state.params, state.editingLayer);
      const animateFor = (e: EffectDefinition) => state.animate && !reduced && !!e.animatable;
      return buildCombinedDemo(chain, animateFor);
    }
    return buildDemo(effect, state.params, animate, state.imageUrl);
  };

  return (
    <>
      <button
        className="bar-btn"
        onClick={() => openInCodePen(demo())}
        title="Open a prefilled CodePen in a new tab"
      >
        <svg className="i i-sm" viewBox="0 0 24 24">
          <path d="M12 2l10 6.5v7L12 22 2 15.5v-7L12 2z" />
          <path d="M12 2v6.5M12 15.5V22M2 8.5l10 7 10-7M22 15.5l-10-7-10 7" />
        </svg>
        CodePen
      </button>
      <button
        className="bar-btn"
        onClick={() => openInStackBlitz(demo())}
        title="Open a runnable StackBlitz project in a new tab"
      >
        <svg className="i i-sm" viewBox="0 0 24 24">
          <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
        </svg>
        StackBlitz
      </button>
    </>
  );
}
