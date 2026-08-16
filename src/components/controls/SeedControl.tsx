import type { ControlDefinition } from "../../types/effects";
import { usePlayground } from "../../state/PlaygroundContext";
import { useEditTarget } from "../../hooks/useEditTarget";
import { formatValue } from "../../lib/format";
import { randomSeed } from "../../lib/randomize";

export function SeedControl({ control }: { control: ControlDefinition }) {
  const { dispatch } = usePlayground();
  const { params } = useEditTarget();
  const value = params[control.id] as number;
  return (
    <div className="control">
      <div className="ctrl-top">
        <span className="ctrl-name">{control.label}</span>
        <span className="ctrl-val mono">{formatValue(control, value)}</span>
      </div>
      <div className="ctrl-row">
        <input
          type="range"
          min={control.min}
          max={control.max}
          step={control.step}
          value={value}
          aria-label={control.label}
          onChange={(e) =>
            dispatch({ type: "SET_PARAM", id: control.id, value: parseFloat(e.target.value) })
          }
        />
        <button
          className="dice-btn"
          aria-label="Random seed"
          onClick={() => dispatch({ type: "SET_PARAM", id: control.id, value: randomSeed(control) })}
        >
          <svg className="i i-sm" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="4" />
            <circle cx="8.5" cy="8.5" r="1.2" fill="currentColor" stroke="none" />
            <circle cx="15.5" cy="15.5" r="1.2" fill="currentColor" stroke="none" />
            <circle cx="15.5" cy="8.5" r="1.2" fill="currentColor" stroke="none" />
            <circle cx="8.5" cy="15.5" r="1.2" fill="currentColor" stroke="none" />
          </svg>
        </button>
      </div>
    </div>
  );
}
