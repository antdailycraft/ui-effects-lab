import { usePlayground } from "../../state/PlaygroundContext";
import { getEffect } from "../../registry/effects";
import { isStackable } from "../../lib/combine";

export function StackPanel() {
  const { state, dispatch } = usePlayground();
  const active = getEffect(state.effectId)!;
  const canAdd = isStackable(active);
  const layers = state.layers;

  return (
    <>
      <div className="panel-head">
        <h2>Combine</h2>
        {layers.length > 0 && (
          <button className="stack-clear" onClick={() => dispatch({ type: "CLEAR_LAYERS" })}>
            Clear
          </button>
        )}
      </div>
      <div className="stack">
        <button
          className="stack-add"
          disabled={!canAdd}
          title={canAdd ? "Add the current effect as a layer" : "Only SVG-filter effects can be combined"}
          onClick={() => dispatch({ type: "ADD_LAYER" })}
        >
          + Add “{active.name}” to stack
        </button>

        {layers.length === 0 ? (
          <div className="stack-empty">
            Chain SVG-filter effects: add the current one, pick another, add again — they apply in
            order.
          </div>
        ) : (
          <ol className="stack-list">
            {layers.map((layer, i) => {
              const eff = getEffect(layer.effectId);
              return (
                <li className="stack-item" key={i}>
                  <span className="stack-idx">{i + 1}</span>
                  <span className="stack-name">{eff?.name ?? layer.effectId}</span>
                  <span className="stack-actions">
                    <button
                      aria-label={`Move ${eff?.name ?? "layer"} up`}
                      disabled={i === 0}
                      onClick={() => dispatch({ type: "MOVE_LAYER", index: i, dir: -1 })}
                    >
                      ↑
                    </button>
                    <button
                      aria-label={`Move ${eff?.name ?? "layer"} down`}
                      disabled={i === layers.length - 1}
                      onClick={() => dispatch({ type: "MOVE_LAYER", index: i, dir: 1 })}
                    >
                      ↓
                    </button>
                    <button
                      className="stack-del"
                      aria-label={`Remove ${eff?.name ?? "layer"}`}
                      onClick={() => dispatch({ type: "REMOVE_LAYER", index: i })}
                    >
                      ✕
                    </button>
                  </span>
                </li>
              );
            })}
          </ol>
        )}

        {layers.length >= 3 && (
          <div className="stack-note">
            Long filter chains are GPU-heavy — keep it short for smooth animation.
          </div>
        )}
      </div>
    </>
  );
}
