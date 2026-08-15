import { useState } from "react";
import { usePlayground } from "../../state/PlaygroundContext";
import { getEffect } from "../../registry/effects";
import { usePresets } from "../../hooks/usePresets";
import { presetsForEffect } from "../../lib/presets";

export function PresetsPanel() {
  const { state, dispatch } = usePlayground();
  const { presets, add, remove } = usePresets();
  const [name, setName] = useState("");
  const effect = getEffect(state.effectId)!;
  const list = presetsForEffect(presets, state.effectId);

  const save = () => {
    const trimmed = name.trim();
    add(trimmed || `${effect.name} ${list.length + 1}`, state.effectId, state.params);
    setName("");
  };

  return (
    <>
      <div className="panel-head">
        <h2>Presets</h2>
      </div>
      <div className="presets">
        <div className="preset-save">
          <input
            type="text"
            placeholder="Preset name…"
            value={name}
            aria-label="Preset name"
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") save();
            }}
          />
          <button className="preset-save-btn" onClick={save}>
            Save
          </button>
        </div>

        {list.length === 0 ? (
          <div className="preset-empty">No presets for this effect yet — tune it, then Save.</div>
        ) : (
          <div className="preset-list">
            {list.map((p) => (
              <div className="preset-item" key={p.id}>
                <button
                  className="preset-load"
                  onClick={() =>
                    dispatch({ type: "LOAD_PRESET", effectId: p.effectId, params: p.params })
                  }
                >
                  {p.name}
                </button>
                <button
                  className="preset-del"
                  aria-label={`Delete preset ${p.name}`}
                  onClick={() => remove(p.id)}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
