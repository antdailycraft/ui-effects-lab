import type { EffectDefinition, Params } from "../types/effects";

export type CodeLang = "svg" | "css";

export function generateSvg(effect: EffectDefinition, params: Params, animate: boolean): string {
  const inner = (effect.buildFilterInner ? effect.buildFilterInner(params, animate) : "")
    .split("\n")
    .map((l) => "    " + l)
    .join("\n");
  return `<svg width="0" height="0" aria-hidden="true">
  <filter id="${effect.id}">
${inner}
  </filter>
</svg>`;
}

export function generateCss(effect: EffectDefinition, params: Params, animate: boolean): string {
  if (effect.kind === "css" && effect.buildCss) return effect.buildCss(params, animate);
  return `.effect {
  filter: url(#${effect.id});
}`;
}

/** Which code tabs make sense for this effect. */
export function availableTabs(effect: EffectDefinition): CodeLang[] {
  return effect.kind === "css" ? ["css"] : ["svg", "css"];
}

/** Clamp a requested tab to one the effect actually offers. */
export function resolveTab(effect: EffectDefinition, tab: CodeLang): CodeLang {
  const tabs = availableTabs(effect);
  return tabs.includes(tab) ? tab : tabs[0];
}

export function generateCode(
  effect: EffectDefinition,
  params: Params,
  animate: boolean,
  tab: CodeLang
): string {
  return tab === "svg" ? generateSvg(effect, params, animate) : generateCss(effect, params, animate);
}
