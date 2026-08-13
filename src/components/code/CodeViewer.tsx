import { usePlayground } from "../../state/PlaygroundContext";
import { getEffect } from "../../registry/effects";
import { generateSvg, generateCss } from "../../lib/codegen";
import { highlightSvg, escapeHtml } from "../../lib/highlight";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { CopyButton } from "./CopyButton";

export function CodeViewer() {
  const { state, dispatch } = usePlayground();
  const reduced = useReducedMotion();
  const effect = getEffect(state.effectId)!;
  const animate = state.animate && !reduced && !!effect.animatable;

  const svg = generateSvg(effect, state.params, animate);
  const css = generateCss(effect);
  const code = state.codeTab === "svg" ? svg : css;
  const html = state.codeTab === "svg" ? highlightSvg(svg) : escapeHtml(css);

  return (
    <div className="code-block">
      <div className="code-tabs">
        <button
          className={"code-tab" + (state.codeTab === "svg" ? " on" : "")}
          onClick={() => dispatch({ type: "SET_CODE_TAB", tab: "svg" })}
        >
          SVG
        </button>
        <button
          className={"code-tab" + (state.codeTab === "css" ? " on" : "")}
          onClick={() => dispatch({ type: "SET_CODE_TAB", tab: "css" })}
        >
          CSS
        </button>
        <CopyButton code={code} />
      </div>
      <pre className="code-pre mono" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
