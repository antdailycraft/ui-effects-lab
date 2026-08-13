import type { PreviewType } from "../../types/effects";
import { usePlayground } from "../../state/PlaygroundContext";
import { getEffect } from "../../registry/effects";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { FilterHost, LIVE_FILTER_ID } from "./FilterHost";
import { CardPreview } from "./CardPreview";
import { TextPreview } from "./TextPreview";
import { ImagePreview } from "./ImagePreview";

const TARGETS: Record<PreviewType, (props: { filterId?: string }) => JSX.Element> = {
  card: CardPreview,
  text: TextPreview,
  image: ImagePreview,
};

const PV_OPTIONS: { id: PreviewType; label: string }[] = [
  { id: "card", label: "Card" },
  { id: "text", label: "Text" },
  { id: "image", label: "Image" },
];

export function PreviewCanvas() {
  const { state, dispatch } = usePlayground();
  const reduced = useReducedMotion();
  const effect = getEffect(state.effectId)!;
  const animate = state.animate && !reduced && !!effect.animatable;
  const Target = TARGETS[state.previewType];

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
                <Target filterId={LIVE_FILTER_ID} />
              </div>
            </>
          ) : (
            <Target filterId={LIVE_FILTER_ID} />
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
