import { useState } from "react";
import { usePlayground } from "../../state/PlaygroundContext";
import { getEffect } from "../../registry/effects";
import type { EffectDefinition } from "../../types/effects";
import { availableTabs, generateCode, type CodeLang } from "../../lib/codegen";
import { activeChain, isStackable, generateCombinedSvg, generateCombinedCss } from "../../lib/combine";
import { highlightSvg, highlightCss } from "../../lib/highlight";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { CopyButton } from "./CopyButton";
import { CodeModal } from "./CodeModal";

export function CodeViewer() {
  const { state, dispatch } = usePlayground();
  const reduced = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const effect = getEffect(state.effectId)!;
  const animate = state.animate && !reduced && !!effect.animatable;

  // A combination stack generates chained SVG + CSS instead of the single effect
  // — but only while the active effect is SVG-stackable (otherwise it's dormant).
  const combining = state.layers.length > 0 && isStackable(effect);
  const chain = activeChain(state.layers, state.effectId, state.params);
  const animateFor = (e: EffectDefinition) => state.animate && !reduced && !!e.animatable;

  const tabs: CodeLang[] = combining ? ["svg", "css"] : availableTabs(effect);
  const tab = tabs.includes(state.codeTab) ? state.codeTab : tabs[0];
  const code = combining
    ? tab === "css"
      ? generateCombinedCss(chain)
      : generateCombinedSvg(chain, animateFor)
    : generateCode(effect, state.params, animate, tab);
  // CSS has its own tokenizer; SVG and React (JSX) are markup-ish.
  const html = tab === "css" ? highlightCss(code) : highlightSvg(code);

  return (
    <div className="code-block">
      <div className="code-tabs">
        {tabs.map((t) => (
          <button
            key={t}
            className={"code-tab" + (tab === t ? " on" : "")}
            onClick={() => dispatch({ type: "SET_CODE_TAB", tab: t })}
          >
            {t.toUpperCase()}
          </button>
        ))}
        <div className="code-tab-actions">
          <button className="code-copy" aria-label="Expand code" onClick={() => setExpanded(true)}>
            <svg className="i i-sm" viewBox="0 0 24 24">
              <path d="M8 3H5a2 2 0 0 0-2 2v3" />
              <path d="M16 3h3a2 2 0 0 1 2 2v3" />
              <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
              <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
            Expand
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
