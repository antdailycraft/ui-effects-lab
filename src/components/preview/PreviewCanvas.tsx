import { useEffect, type CSSProperties } from "react";
import type { EffectDefinition, Params, PreviewType } from "../../types/effects";
import { usePlayground } from "../../state/PlaygroundContext";
import type { CompareMode } from "../../state/PlaygroundContext";
import { getEffect } from "../../registry/effects";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { FilterHost, LIVE_FILTER_ID } from "./FilterHost";
import { CardPreview } from "./CardPreview";
import { TextPreview } from "./TextPreview";
import { ImagePreview } from "./ImagePreview";
import { ButtonPreview } from "./ButtonPreview";
import { NewspaperPreview } from "./NewspaperPreview";
import { CustomPreview } from "./CustomPreview";
import { CustomHtmlBar } from "./CustomHtmlBar";
import { ImagePicker } from "./ImagePicker";
import { CompareSlider } from "./CompareSlider";

type TargetProps = { className?: string; style?: CSSProperties };

const TARGETS: Record<PreviewType, (props: TargetProps) => JSX.Element> = {
  card: CardPreview,
  text: TextPreview,
  image: ImagePreview,
  button: ButtonPreview,
  newspaper: NewspaperPreview,
  custom: CustomPreview,
};

const PV_OPTIONS: { id: PreviewType; label: string }[] = [
  { id: "card", label: "Card" },
  { id: "text", label: "Text" },
  { id: "image", label: "Image" },
  { id: "button", label: "Button" },
  { id: "newspaper", label: "Newspaper" },
  { id: "custom", label: "Custom" },
];

const COMPARE_OPTIONS: { id: CompareMode; label: string }[] = [
  { id: "off", label: "Off" },
  { id: "side-by-side", label: "Split" },
  { id: "slider", label: "Slider" },
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

/** A button that enters/exits the immersive fullscreen preview. */
function FullscreenButton() {
  const { state, dispatch } = usePlayground();
  const on = state.fullscreen;
  return (
    <button
      className={"fs-btn" + (on ? " on" : "")}
      onClick={() => dispatch({ type: "TOGGLE_FULLSCREEN" })}
      aria-label={on ? "Exit fullscreen" : "Enter fullscreen"}
      title={on ? "Exit fullscreen (Esc)" : "Fullscreen"}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        {on ? (
          <path d="M9 4v5H4M20 9h-5V4M15 20v-5h5M4 15h5v5" />
        ) : (
          <path d="M4 9V4h5M20 9V4h-5M15 20h5v-5M9 20H4v-5" />
        )}
      </svg>
    </button>
  );
}

export function PreviewCanvas() {
  const { state, dispatch } = usePlayground();
  const reduced = useReducedMotion();
  const effect = getEffect(state.effectId)!;
  const animate = state.animate && !reduced && !!effect.animatable;
  const fullscreen = state.fullscreen;

  // Escape leaves fullscreen.
  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dispatch({ type: "SET_FULLSCREEN", value: false });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fullscreen, dispatch]);

  const mainClass = "col col-center" + (fullscreen ? " pv-fullscreen" : "");

  // Generator kind: the effect IS the preview (a self-contained component),
  // so preview targets and before/after compare don't apply.
  if (effect.kind === "generator" && effect.component) {
    const Generator = effect.component;
    const props = effect.buildProps ? effect.buildProps(state.params, animate) : {};
    if (effect.usesImage) props.image = state.imageUrl;
    return (
      <main className={mainClass}>
        <div className="stage-bar">
          <span className="seg-label">Generator</span>
          {effect.usesImage && <ImagePicker />}
          <div className="stage-bar-spacer" />
          <FullscreenButton />
        </div>
        <div className="stage">
          <div className="pv-generator">
            <Generator {...props} />
          </div>
          <div className="stage-hint">
            {!effect.animatable
              ? "WebGL generator — tune the parameters"
              : animate
                ? "Animating — WebGL shader"
                : "Static — enable Animate in Controls"}
          </div>
        </div>
      </main>
    );
  }

  // Only offer the preview targets this effect declares it supports, and fall
  // back to its first if the persisted selection isn't one of them.
  const pvOptions = PV_OPTIONS.filter((o) => effect.previewTypes.includes(o.id));
  const previewType = effect.previewTypes.includes(state.previewType)
    ? state.previewType
    : effect.previewTypes[0];
  const Target = TARGETS[previewType];
  const applied = appliedProps(effect, state.params, animate);
  const mode = state.compareMode;

  return (
    <main className={mainClass}>
      <FilterHost />
      <div className="stage-bar">
        <span className="seg-label">Preview</span>
        <div className="seg">
          {pvOptions.map((o) => (
            <button
              key={o.id}
              className={previewType === o.id ? "on" : ""}
              onClick={() => dispatch({ type: "SET_PREVIEW", preview: o.id })}
            >
              {o.label}
            </button>
          ))}
        </div>
        <div className="stage-bar-spacer" />
        <span className="seg-label">Compare</span>
        <div className="seg">
          {COMPARE_OPTIONS.map((o) => (
            <button
              key={o.id}
              className={mode === o.id ? "on" : ""}
              onClick={() => dispatch({ type: "SET_COMPARE_MODE", mode: o.id })}
            >
              {o.label}
            </button>
          ))}
        </div>
        <FullscreenButton />
      </div>
      {previewType === "custom" && <CustomHtmlBar />}
      <div className="stage">
        {mode === "slider" ? (
          <CompareSlider
            before={<Target />}
            after={<Target className={applied.className} style={applied.style} />}
          />
        ) : (
          <div
            className={
              "stage-grid" + (mode === "side-by-side" && previewType === "text" ? " stack" : "")
            }
          >
            {mode === "side-by-side" ? (
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
        )}
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
