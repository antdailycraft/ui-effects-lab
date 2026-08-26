import { useMemo, useState } from "react";
import { usePlayground } from "../../state/PlaygroundContext";
import { getEffect } from "../../registry/effects";
import type { EffectDefinition } from "../../types/effects";
import { availableTabs, generateCode, type CodeLang } from "../../lib/codegen";
import { appliedChain, isStackable, generateCombinedSvg, generateCombinedCss } from "../../lib/combine";
import { highlightSvg, highlightCss } from "../../lib/highlight";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { CopyButton } from "./CopyButton";
import { CodeModal } from "./CodeModal";
import { useLocale } from "../../i18n/LocaleContext";

export function CodeViewer() {
  const { t } = useLocale();
  const { state, dispatch } = usePlayground();
  const reduced = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const effect = getEffect(state.effectId)!;
  const animate = state.animate && !reduced && !!effect.animatable;

  // A combination stack generates chained SVG + CSS instead of the single effect
  // — while the active effect is SVG-stackable, or while editing a layer.
  const combining =
    state.layers.length > 0 && (state.editingLayer !== null || isStackable(effect));
  const chain = appliedChain(state.layers, state.effectId, state.params, state.editingLayer);
  const animateFor = (e: EffectDefinition) => state.animate && !reduced && !!e.animatable;

  const tabs: CodeLang[] = combining ? ["svg", "css"] : availableTabs(effect);
  const tab = tabs.includes(state.codeTab) ? state.codeTab : tabs[0];
  // Regenerating + re-highlighting on every render is wasteful; recompute only
  // when the inputs actually change.
  const { code, html } = useMemo(() => {
    const src = combining
      ? tab === "css"
        ? generateCombinedCss(chain)
        : generateCombinedSvg(chain, animateFor)
      : generateCode(effect, state.params, animate, tab);
    // CSS has its own tokenizer; SVG and React (JSX) are markup-ish.
    return { code: src, html: tab === "css" ? highlightCss(src) : highlightSvg(src) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [combining, tab, effect, state.params, state.layers, state.editingLayer, animate]);

  return (
    <div className="code-block">
      <div className="code-tabs">
        {tabs.map((t) => (
          <button
            key={t}
            className={"code-tab" + (tab === t ? " on" : "")}
            aria-pressed={tab === t}
            onClick={() => dispatch({ type: "SET_CODE_TAB", tab: t })}
          >
            {t.toUpperCase()}
          </button>
        ))}
        <div className="code-tab-actions">
          <button className="code-copy" aria-label={t("expandCode", "Expand code")} onClick={() => setExpanded(true)}>
            <svg className="i i-sm" viewBox="0 0 24 24">
              <path d="M8 3H5a2 2 0 0 0-2 2v3" />
              <path d="M16 3h3a2 2 0 0 1 2 2v3" />
              <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
              <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
            {t("expand", "Expand")}
          </button>
          <CopyButton code={code} />
        </div>
      </div>
      <pre className="code-pre mono" dangerouslySetInnerHTML={{ __html: html }} />
      {expanded && (
        <CodeModal lang={tab} code={code} html={html} onClose={() => setExpanded(false)} />
      )}
    </div>
  );
}
