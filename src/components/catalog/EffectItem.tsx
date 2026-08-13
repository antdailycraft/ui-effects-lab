import type { EffectDefinition } from "../../types/effects";
import { usePlayground } from "../../state/PlaygroundContext";
import { saveLastEffectId } from "../../lib/storage";

export function EffectItem({ effect }: { effect: EffectDefinition }) {
  const { state, dispatch } = usePlayground();
  const active = effect.id === state.effectId;
  return (
    <button
      className={"effect-item" + (active ? " active" : "")}
      onClick={() => {
        dispatch({ type: "SELECT_EFFECT", id: effect.id });
        saveLastEffectId(effect.id);
      }}
    >
      <span className="effect-dot" />
      <span className="effect-meta">
        <div className="effect-name">{effect.name}</div>
        <div className="effect-sub">{effect.sub}</div>
      </span>
    </button>
  );
}
