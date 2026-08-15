import type { ControlDefinition } from "../../types/effects";
import { usePlayground } from "../../state/PlaygroundContext";

export function ColorControl({ control }: { control: ControlDefinition }) {
  const { state, dispatch } = usePlayground();
  const value = String(state.params[control.id] ?? "#000000");
  return (
    <div className="control">
      <div className="ctrl-top">
        <span className="ctrl-name">{control.label}</span>
        <span className="ctrl-val mono">{value}</span>
      </div>
      <div className="ctrl-row">
        <input
          type="color"
          className="color-input"
          value={value}
          aria-label={control.label}
          onChange={(e) => dispatch({ type: "SET_PARAM", id: control.id, value: e.target.value })}
        />
        <span className="color-bar" style={{ background: value }} />
      </div>
    </div>
  );
}
