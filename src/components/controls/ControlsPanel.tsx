import { usePlayground } from "../../state/PlaygroundContext";
import { getEffect } from "../../registry/effects";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { RangeControl } from "./RangeControl";
import { SeedControl } from "./SeedControl";
import { ColorControl } from "./ColorControl";
import { ToggleControl } from "./ToggleControl";
import { LicenseBadge } from "./LicenseBadge";
import { PresetsPanel } from "../presets/PresetsPanel";
import { CodeViewer } from "../code/CodeViewer";

export function ControlsPanel() {
  const { state, dispatch } = usePlayground();
  const reduced = useReducedMotion();
  const effect = getEffect(state.effectId)!;
  const animateActive = state.animate && !reduced;

  return (
    <aside className="col col-right">
      <div className="right-scroll">
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
          <h2>Controls</h2>
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
              label="Animate"
              checked={animateActive}
              disabled={reduced}
              note={
                reduced
                  ? "Reduced-motion is on — animation is paused to respect your system setting."
                  : undefined
              }
              onToggle={() => dispatch({ type: "SET_ANIMATE", value: !state.animate })}
            />
          )}
        </div>

        <PresetsPanel />

        <CodeViewer />
      </div>
    </aside>
  );
}
