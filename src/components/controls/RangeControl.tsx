import type { ControlDefinition } from "../../types/effects";
import { usePlayground } from "../../state/PlaygroundContext";
import { formatValue } from "../../lib/format";

export function RangeControl({ control }: { control: ControlDefinition }) {
  const { state, dispatch } = usePlayground();
  const value = state.params[control.id] as number;
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
      </div>
    </div>
  );
}
