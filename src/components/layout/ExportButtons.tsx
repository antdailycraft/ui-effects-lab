import { usePlayground } from "../../state/PlaygroundContext";
import { getEffect } from "../../registry/effects";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { buildDemo, openInCodePen, openInStackBlitz } from "../../lib/export";

export function ExportButtons() {
  const { state } = usePlayground();
  const reduced = useReducedMotion();
  const effect = getEffect(state.effectId)!;
  const animate = state.animate && !reduced && !!effect.animatable;
  const demo = () => buildDemo(effect, state.params, animate);

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
