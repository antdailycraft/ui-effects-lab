import { usePlayground } from "../../state/PlaygroundContext";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useEditTarget } from "../../hooks/useEditTarget";
import { RangeControl } from "./RangeControl";
import { SeedControl } from "./SeedControl";
import { ColorControl } from "./ColorControl";
import { ToggleControl } from "./ToggleControl";
import { LicenseBadge } from "./LicenseBadge";
import { StackPanel } from "../combine/StackPanel";
import { PresetsPanel } from "../presets/PresetsPanel";
import { CodeViewer } from "../code/CodeViewer";
import { useLocale } from "../../i18n/LocaleContext";

export function ControlsPanel() {
  const { t } = useLocale();
  const { state, dispatch } = usePlayground();
  const reduced = useReducedMotion();
  const { effect, editing } = useEditTarget();
  const animateActive = state.animate && !reduced;

  return (
    <aside className="col col-right">
      <div className="right-scroll">
        {editing && (
          <div className="editing-banner">
            <span>
              {t("editingLayer", "Editing layer {number}:", { number: (state.editingLayer ?? 0) + 1 })} <strong>{effect.name}</strong>
            </span>
            <button onClick={() => dispatch({ type: "SET_EDITING_LAYER", index: null })}>
              {t("done", "Done")}
            </button>
          </div>
        )}
        <div className="effect-headline">
          <div className="t">{effect.name}</div>
          <div className="d">{effect.description}</div>
          <div className="tags">
            {effect.tech.map((t) => (
              <span className="chip mono" key={t}>
                {t}
              </span>
            ))}
            <LicenseBadge license={effect.license} />
          </div>
        </div>

        <div className="panel-head">
          <h2>{t("controls", "Controls")}</h2>
        </div>

        <div className="controls">
          {effect.controls.map((c) =>
            c.type === "seed" ? (
              <SeedControl control={c} key={c.id} />
            ) : c.type === "color" ? (
              <ColorControl control={c} key={c.id} />
            ) : (
              <RangeControl control={c} key={c.id} />
            )
          )}
          {effect.animatable && (
            <ToggleControl
              label={t("animate", "Animate")}
              checked={animateActive}
              disabled={reduced}
              note={
                reduced
                  ? t("reducedMotion", "Reduced-motion is on — animation is paused to respect your system setting.")
                  : undefined
              }
              onToggle={() => dispatch({ type: "SET_ANIMATE", value: !state.animate })}
            />
          )}
        </div>

        <StackPanel />

        <PresetsPanel />

        <CodeViewer />
      </div>
    </aside>
  );
}
