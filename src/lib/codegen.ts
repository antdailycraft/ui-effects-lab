import type { EffectDefinition, Params } from "../types/effects";

export function generateSvg(effect: EffectDefinition, params: Params, animate: boolean): string {
  const inner = effect
    .buildFilterInner(params, animate)
    .split("\n")
    .map((l) => "    " + l)
    .join("\n");
  return `<svg width="0" height="0" aria-hidden="true">
  <filter id="${effect.id}">
${inner}
  </filter>
</svg>`;
}

export function generateCss(effect: EffectDefinition): string {
  return `.effect {
  filter: url(#${effect.id});
}`;
}
