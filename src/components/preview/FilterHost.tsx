import { usePlayground } from "../../state/PlaygroundContext";
import { getEffect } from "../../registry/effects";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { appliedChain, layerFilterId } from "../../lib/combine";

/** Kept for back-compat: the id of the first (or only) live filter. */
export const LIVE_FILTER_ID = layerFilterId(0);

export function FilterHost() {
  const { state } = usePlayground();
  const reduced = useReducedMotion();
  const chain = appliedChain(state.layers, state.effectId, state.params, state.editingLayer);
  if (chain.length === 0) return null;
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        {chain.map((layer, i) => {
          const eff = getEffect(layer.effectId)!;
          const animate = state.animate && !reduced && !!eff.animatable;
          return (
            <filter
              key={i}
              id={layerFilterId(i)}
              x="-25%"
              y="-25%"
              width="150%"
              height="150%"
              dangerouslySetInnerHTML={{ __html: eff.buildFilterInner!(layer.params, animate) }}
            />
          );
        })}
      </defs>
    </svg>
  );
}
