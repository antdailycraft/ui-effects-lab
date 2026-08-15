import type { ControlDefinition, EffectDefinition, Params } from "../types/effects";
import { hslToHex } from "./color";

export function randomSeed(control: ControlDefinition, rng: () => number = Math.random): number {
  const lo = control.min ?? 0;
  const hi = control.max ?? 100;
  return Math.round(lo + rng() * (hi - lo));
}

export function randomizeParams(effect: EffectDefinition, rng: () => number = Math.random): Params {
  const p: Params = {};
  for (const c of effect.controls) {
    if (c.type === "toggle") {
      p[c.id] = c.def;
      continue;
    }
    if (c.type === "color") {
      p[c.id] = hslToHex(Math.floor(rng() * 360), 0.72, 0.55);
      continue;
    }
    const [lo, hi] = c.random ?? [c.min ?? 0, c.max ?? 1];
    const raw = lo + rng() * (hi - lo);
    p[c.id] = (c.decimals ?? 0) === 0 ? Math.round(raw) : Number(raw.toFixed(c.decimals));
  }
  return p;
}
