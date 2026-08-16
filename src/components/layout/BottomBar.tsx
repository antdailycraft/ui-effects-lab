import { useState } from "react";
import { usePlayground } from "../../state/PlaygroundContext";
import { getEffect } from "../../registry/effects";
import { generateCode, resolveTab } from "../../lib/codegen";
import { shareUrl } from "../../lib/share";
import {
  activeChain,
  isStackable,
  generateCombinedSvg,
  generateCombinedCss,
} from "../../lib/combine";
import type { EffectDefinition } from "../../types/effects";
import { ExportButtons } from "./ExportButtons";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function BottomBar() {
  const { state, dispatch } = usePlayground();
  const reduced = useReducedMotion();
  const effect = getEffect(state.effectId)!;
  const animate = state.animate && !reduced && !!effect.animatable;
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const copy = async () => {
    let code: string;
    if (state.layers.length > 0 && isStackable(effect)) {
      const chain = activeChain(state.layers, state.effectId, state.params);
      const animateFor = (e: EffectDefinition) => state.animate && !reduced && !!e.animatable;
      code =
        state.codeTab === "css"
          ? generateCombinedCss(chain)
          : generateCombinedSvg(chain, animateFor);
    } else {
      code = generateCode(effect, state.params, animate, resolveTab(effect, state.codeTab));
    }
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      /* clipboard blocked */
    }
  };

  const share = async () => {
    const url = shareUrl({
      e: state.effectId,
      p: state.params,
      pv: state.previewType,
      ...(state.layers.length
        ? { l: state.layers.map((x) => ({ e: x.effectId, p: x.params })) }
        : {}),
    });
    // Reflect the current view in the address bar so a copied link round-trips.
    try {
      history.replaceState(null, "", url);
    } catch {
      /* ignore */
    }
    try {
      await navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 1400);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <footer className="bottombar">
      <button className="bar-btn primary" onClick={() => dispatch({ type: "RANDOMIZE" })}>
        <svg className="i i-sm" viewBox="0 0 24 24">
          <path d="M18 3h3v3" />
          <path d="M21 3 3 21" />
          <path d="M3 3l6 6" />
          <path d="M15 15l6 6" />
          <path d="M18 21h3v-3" />
        </svg>
        Randomize
      </button>
      <button className="bar-btn" onClick={() => dispatch({ type: "RESET" })}>
        <svg className="i i-sm" viewBox="0 0 24 24">
          <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
          <path d="M3 3v5h5" />
        </svg>
        Reset
      </button>
      <div className="bar-spacer" />
      <span className="bar-status">
        {effect.controls.length} parameters · {effect.tech.length} primitives
      </span>
      <ExportButtons />
      <button className="bar-btn" onClick={share}>
        <svg className="i i-sm" viewBox="0 0 24 24">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="M8.6 10.6l6.8-4M8.6 13.4l6.8 4" />
        </svg>
        {shared ? "Link copied" : "Share"}
      </button>
      <button className="bar-btn" onClick={copy}>
        <svg className="i i-sm" viewBox="0 0 24 24">
          <rect x="9" y="9" width="12" height="12" rx="2" />
          <path d="M5 15V5a2 2 0 0 1 2-2h10" />
        </svg>
        {copied ? "Copied" : "Copy code"}
      </button>
    </footer>
  );
}
