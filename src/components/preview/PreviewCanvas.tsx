import type { CSSProperties } from "react";
import type { EffectDefinition, Params, PreviewType } from "../../types/effects";
import { usePlayground } from "../../state/PlaygroundContext";
import { getEffect } from "../../registry/effects";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { FilterHost, LIVE_FILTER_ID } from "./FilterHost";
import { CardPreview } from "./CardPreview";
import { TextPreview } from "./TextPreview";
import { ImagePreview } from "./ImagePreview";

type TargetProps = { className?: string; style?: CSSProperties };

const TARGETS: Record<PreviewType, (props: TargetProps) => JSX.Element> = {
  card: CardPreview,
  text: TextPreview,
  image: ImagePreview,
};

const PV_OPTIONS: { id: PreviewType; label: string }[] = [
  { id: "card", label: "Card" },
  { id: "text", label: "Text" },
  { id: "image", label: "Image" },
];

/** How the current effect is applied to a preview target. */
function appliedProps(effect: EffectDefinition, params: Params, animate: boolean): TargetProps {
  if (effect.kind === "css" && effect.buildStyle) {
    return {
      className: `${effect.cssClass ?? ""}${animate ? " fx-anim" : ""}`.trim(),
      style: effect.buildStyle(params, animate) as unknown as CSSProperties,
    };
  }
  return { style: { filter: `url(#${LIVE_FILTER_ID})` } };
}

export function PreviewCanvas() {
  const { state, dispatch } = usePlayground();
  const reduced = useReducedMotion();
  const effect = getEffect(state.effectId)!;
  const animate = state.animate && !reduced && !!effect.animatable;

  // Generator kind: the effect IS the preview (a self-contained component),
  // so preview targets and before/after compare don't apply.
  if (effect.kind === "generator" && effect.component) {
    const Generator = effect.component;
    const props = effect.buildProps ? effect.buildProps(state.params, animate) : {};
    return (
      <main className="col col-center">
        <div className="stage-bar">
          <span className="seg-label">Generator</span>
          <div className="stage-bar-spacer" />
        </div>
        <div className="stage">
          <div className="pv-generator">
            <Generator {...props} />
          </div>
          <div className="stage-hint">
            {animate ? "Animating — WebGL shader" : "Static — enable Animate in Controls"}
          </div>
        </div>
      </main>
    );
  }

  const Target = TARGETS[state.previewType];
  const applied = appliedProps(effect, state.params, animate);

  return (
    <main className="col col-center">
      <FilterHost />
      <div className="stage-bar">
        <span className="seg-label">Preview</span>
        <div className="seg">
          {PV_OPTIONS.map((o) => (
            <button
              key={o.id}
              className={state.previewType === o.id ? "on" : ""}
              onClick={() => dispatch({ type: "SET_PREVIEW", preview: o.id })}
            >
              {o.label}
            </button>
          ))}
        </div>
        <div className="stage-bar-spacer" />
        <button
          className={"compare-toggle" + (state.compare ? " on" : "")}
          onClick={() => dispatch({ type: "TOGGLE_COMPARE" })}
        >
          <span className="sw" /> Before / After
        </button>
      </div>
      <div className="stage">
        <div className="stage-grid">
          {state.compare ? (
            <>
              <div className="compare-cell">
                <span className="compare-cap">Before</span>
                <Target />
              </div>
              <div className="compare-cell">
                <span className="compare-cap after">After</span>
                <Target className={applied.className} style={applied.style} />
              </div>
            </>
          ) : (
            <Target className={applied.className} style={applied.style} />
          )}
        </div>
        <div className="stage-hint">
          {effect.animatable
            ? animate
              ? "Animating — toggle in Controls"
              : "Static — enable Animate in Controls"
            : "Drag the sliders to tune the effect in real time"}
        </div>
      </div>
    </main>
  );
}
