import type { EffectDefinition, Params } from "../types/effects";
import { roughEdge } from "../effects/svg/rough-edge/definition";
import { paperGrain } from "../effects/svg/paper-grain/definition";
import { noise } from "../effects/svg/noise/definition";
import { water } from "../effects/svg/water-distortion/definition";
import { liquid } from "../effects/svg/liquid/definition";
import { heatHaze } from "../effects/svg/heat-haze/definition";
import { cloud } from "../effects/svg/cloud/definition";
import { sticker } from "../effects/svg/sticker/definition";
import { gooey } from "../effects/svg/gooey/definition";
import { dropShadow } from "../effects/svg/drop-shadow/definition";
import { posterize } from "../effects/svg/posterize/definition";
import { emboss } from "../effects/svg/emboss/definition";
import { sharpen } from "../effects/svg/sharpen/definition";
import { bevel } from "../effects/svg/bevel/definition";
import { colorGrade } from "../effects/svg/color-grade/definition";
import { duotone } from "../effects/svg/duotone/definition";
import { invert } from "../effects/svg/invert/definition";
import { edgeDetect } from "../effects/svg/edge-detect/definition";
import { motionBlur } from "../effects/svg/motion-blur/definition";
import { neonGlow } from "../effects/svg/neon-glow/definition";
import { frostedGlass } from "../effects/css/frosted-glass/definition";
import { holographic } from "../effects/css/holographic/definition";
import { conicSpin } from "../effects/css/conic-spin/definition";
import { gradientBorder } from "../effects/css/gradient-border/definition";
import { glitch } from "../effects/retro/glitch/definition";
import { crt } from "../effects/retro/crt/definition";
import { meshGradient } from "../effects/experimental/mesh-gradient/definition";
import { warp } from "../effects/experimental/warp/definition";
import { voronoi } from "../effects/experimental/voronoi/definition";

export const EFFECTS: EffectDefinition[] = [
  roughEdge,
  paperGrain,
  noise,
  water,
  liquid,
  heatHaze,
  cloud,
  sticker,
  gooey,
  dropShadow,
  posterize,
  emboss,
  sharpen,
  bevel,
  colorGrade,
  duotone,
  invert,
  edgeDetect,
  motionBlur,
  neonGlow,
  frostedGlass,
  holographic,
  conicSpin,
  gradientBorder,
  glitch,
  crt,
  meshGradient,
  warp,
  voronoi,
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
