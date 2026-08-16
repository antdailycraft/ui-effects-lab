import type { EffectDefinition, Params } from "../types/effects";
import { getEffect } from "../registry/effects";

/** One committed effect in a combination stack (SVG-filter effects only). */
export interface EffectLayer {
  effectId: string;
  params: Params;
}

/** Hard cap on committed combination layers (GPU cost grows with each one). */
export const MAX_LAYERS = 4;

/** SVG-filter effects (the only kind that chains via `filter: url(#a) url(#b)`). */
export function isStackable(effect: EffectDefinition): boolean {
  return !!effect.buildFilterInner && effect.kind !== "generator";
}

function shallowEqualParams(a: Params, b: Params): boolean {
  const ak = Object.keys(a);
  if (ak.length !== Object.keys(b).length) return false;
  return ak.every((k) => a[k] === b[k]);
}

/**
 * The ordered SVG-filter chain to render live: the committed layers, plus the
 * active effect as a live top layer so tuning is visible — unless it duplicates
 * the last committed layer (which happens right after "Add", avoiding a
 * double-applied filter).
 */
export function previewChain(
  layers: EffectLayer[],
  activeId: string,
  activeParams: Params
): EffectLayer[] {
  const active = getEffect(activeId);
  const chain = [...layers];
  if (active && isStackable(active)) {
    const last = layers[layers.length - 1];
    const dup = last && last.effectId === active.id && shallowEqualParams(last.params, activeParams);
    if (!dup) chain.push({ effectId: active.id, params: activeParams });
  }
  return chain;
}

/**
 * The chain actually applied to the preview/code. Empty when the active effect
 * isn't SVG-stackable (a CSS or generator effect) — the committed layers stay
 * dormant and the active effect renders on its own, rather than being silently
 * replaced by the stack.
 */
export function activeChain(
  layers: EffectLayer[],
  activeId: string,
  activeParams: Params
): EffectLayer[] {
  const active = getEffect(activeId);
  if (!active || !isStackable(active)) return [];
  return previewChain(layers, activeId, activeParams);
}

/** DOM id for the i-th live filter in the chain. */
export const layerFilterId = (i: number): string => `fx-live-${i}`;

/** The CSS `filter` value referencing every filter in the chain, in order. */
export function chainFilterCss(length: number): string {
  return Array.from({ length }, (_, i) => `url(#${layerFilterId(i)})`).join(" ");
}

/** A readable, unique filter id for exported combination code. */
export function combinedFilterId(effectId: string, i: number): string {
  return `${effectId}-${i + 1}`;
}

/** The exported SVG: one <filter> block per layer in the chain. */
export function generateCombinedSvg(
  chain: EffectLayer[],
  animateFor: (effect: EffectDefinition) => boolean
): string {
  const blocks = chain
    .map((layer, i) => {
      const eff = getEffect(layer.effectId)!;
      const inner = eff
        .buildFilterInner!(layer.params, animateFor(eff))
        .split("\n")
        .map((l) => "    " + l)
        .join("\n");
      return `  <filter id="${combinedFilterId(layer.effectId, i)}">\n${inner}\n  </filter>`;
    })
    .join("\n");
  return `<svg width="0" height="0" aria-hidden="true">\n${blocks}\n</svg>`;
}

/** The exported CSS: the chained `filter` referencing each layer's filter id. */
export function generateCombinedCss(chain: EffectLayer[]): string {
  if (chain.length === 0) return `.effect {\n  filter: none;\n}`;
  const refs = chain.map((l, i) => `url(#${combinedFilterId(l.effectId, i)})`).join(" ");
  return `.effect {\n  filter: ${refs};\n}`;
}
