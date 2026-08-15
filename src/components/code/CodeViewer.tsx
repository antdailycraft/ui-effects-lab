import { useState } from "react";
import { usePlayground } from "../../state/PlaygroundContext";
import { getEffect } from "../../registry/effects";
import { availableTabs, generateCode, resolveTab } from "../../lib/codegen";
import { highlightSvg, escapeHtml } from "../../lib/highlight";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { CopyButton } from "./CopyButton";
import { CodeModal } from "./CodeModal";

export function CodeViewer() {
  const { state, dispatch } = usePlayground();
  const reduced = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const effect = getEffect(state.effectId)!;
  const animate = state.animate && !reduced && !!effect.animatable;

  const tabs = availableTabs(effect);
  const tab = resolveTab(effect, state.codeTab);
  const code = generateCode(effect, state.params, animate, tab);
  // SVG and React (JSX) are markup-ish → syntax highlight; CSS is shown escaped.
  const html = tab === "css" ? escapeHtml(code) : highlightSvg(code);

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
