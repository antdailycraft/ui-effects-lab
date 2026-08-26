import { useState } from "react";
import { usePlayground } from "../../state/PlaygroundContext";
import { getEffect } from "../../registry/effects";
import { usePresets } from "../../hooks/usePresets";
import { presetsForEffect } from "../../lib/presets";
import { useLocale } from "../../i18n/LocaleContext";

export function PresetsPanel() {
  const { locale, t } = useLocale();
  const { state, dispatch } = usePlayground();
  const { presets, add, remove } = usePresets();
  const [name, setName] = useState("");
  const effect = getEffect(state.effectId)!;
  const list = presetsForEffect(presets, state.effectId);
  const builtIn = effect.builtInPresets ?? [];

  const save = () => {
    const trimmed = name.trim();
    add(trimmed || `${effect.name} ${list.length + 1}`, state.effectId, state.params);
    setName("");
  };

  return (
    <>
      <div className="panel-head">
        <h2>{t("presets", "Presets")}</h2>
      </div>
      <div className="presets">
        {builtIn.length > 0 && (
          <div className="preset-builtin">
            <div className="preset-builtin-label">{t("builtIn", "Built-in")}</div>
            <div className="preset-chips">
              {builtIn.map((p) => (
                <button
                  key={p.name}
                  className="preset-chip"
                  onClick={() =>
                    dispatch({ type: "LOAD_PRESET", effectId: state.effectId, params: p.params })
                  }
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="preset-save">
          <input
            type="text"
            placeholder={t("presetName", "Preset name…")}
            value={name}
            aria-label={t("presetNameLabel", "Preset name")}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") save();
            }}
          />
          <button className="preset-save-btn" onClick={save}>
            {t("save", "Save")}
          </button>
        </div>

        {list.length === 0 ? (
          <div className="preset-empty">{t("noPresets", "No presets for this effect yet — tune it, then Save.")}</div>
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
                  aria-label={locale === "ko" ? `${p.name} 프리셋 삭제` : `Delete preset ${p.name}`}
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
