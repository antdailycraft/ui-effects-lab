import { usePlayground } from "../../state/PlaygroundContext";
import { getEffect } from "../../registry/effects";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export const LIVE_FILTER_ID = "fx-live";

export function FilterHost() {
  const { state } = usePlayground();
  const reduced = useReducedMotion();
  const effect = getEffect(state.effectId)!;
  const animate = state.animate && !reduced && !!effect.animatable;
  const inner = effect.buildFilterInner(state.params, animate);
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <filter
          id={LIVE_FILTER_ID}
          x="-25%"
          y="-25%"
          width="150%"
          height="150%"
          dangerouslySetInnerHTML={{ __html: inner }}
        />
      </defs>
    </svg>
  );
}
