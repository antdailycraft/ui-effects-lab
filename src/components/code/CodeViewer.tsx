import { usePlayground } from "../../state/PlaygroundContext";
import { getEffect } from "../../registry/effects";
import { availableTabs, generateCode, resolveTab } from "../../lib/codegen";
import { highlightSvg, escapeHtml } from "../../lib/highlight";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { CopyButton } from "./CopyButton";

export function CodeViewer() {
  const { state, dispatch } = usePlayground();
  const reduced = useReducedMotion();
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
        <CopyButton code={code} />
      </div>
      <pre className="code-pre mono" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
