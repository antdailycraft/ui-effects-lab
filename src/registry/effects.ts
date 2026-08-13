import type { EffectDefinition, Params } from "../types/effects";
import { roughEdge } from "../effects/svg/rough-edge/definition";
import { paperGrain } from "../effects/svg/paper-grain/definition";
import { noise } from "../effects/svg/noise/definition";
import { water } from "../effects/svg/water-distortion/definition";
import { liquid } from "../effects/svg/liquid/definition";
import { heatHaze } from "../effects/svg/heat-haze/definition";
import { cloud } from "../effects/svg/cloud/definition";

export const EFFECTS: EffectDefinition[] = [
  roughEdge,
  paperGrain,
  noise,
  water,
  liquid,
  heatHaze,
  cloud,
];

export function getEffect(id: string): EffectDefinition | undefined {
  return EFFECTS.find((e) => e.id === id);
}

export function defaultParams(effect: EffectDefinition): Params {
  const p: Params = {};
  for (const c of effect.controls) p[c.id] = c.def;
  return p;
}

export function groupByCategory(
  effects: EffectDefinition[]
): { label: string; effects: EffectDefinition[] }[] {
  const order: string[] = [];
  const map = new Map<string, EffectDefinition[]>();
  for (const e of effects) {
    if (!map.has(e.categoryLabel)) {
      map.set(e.categoryLabel, []);
      order.push(e.categoryLabel);
    }
    map.get(e.categoryLabel)!.push(e);
  }
  return order.map((label) => ({ label, effects: map.get(label)! }));
}
