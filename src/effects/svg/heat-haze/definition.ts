import type { EffectDefinition } from "../../../types/effects";
import { dec } from "../../../lib/format";

export const heatHaze: EffectDefinition = {
  id: "heat-haze",
  name: "Heat Haze",
  sub: "animated low-freq turbulence",
  category: "svg-filter",
  categoryLabel: "SVG Filters",
  tags: ["heat", "animation", "shimmer"],
  tech: ["feTurbulence", "feDisplacementMap"],
  description:
    "Low-frequency animated turbulence gently warps the surface like hot air rising off a road.",
  animatable: true,
  previewTypes: ["card", "text", "image"],
  controls: [
    { id: "baseFrequency", label: "Base Frequency", type: "range", min: 0.004, max: 0.03, step: 0.001, def: 0.011, decimals: 3, random: [0.006, 0.02] },
    { id: "numOctaves", label: "Num Octaves", type: "range", min: 1, max: 3, step: 1, def: 2, decimals: 0, random: [1, 3] },
    { id: "seed", label: "Seed", type: "seed", min: 0, max: 100, step: 1, def: 17, decimals: 0, random: [0, 100] },
    { id: "scale", label: "Displacement Scale", type: "range", min: 0, max: 30, step: 1, def: 10, decimals: 0, random: [5, 18] },
    { id: "speed", label: "Animation Speed", type: "range", min: 1, max: 10, step: 0.5, def: 3, decimals: 1, unit: "×", isAnimationControl: true },
  ],
  buildFilterInner: (p, animate) => {
    const bf = dec(p.baseFrequency as number, 3);
    const bf2 = dec((p.baseFrequency as number) * 1.5, 3);
    const dur = dec(16 / (p.speed as number), 1);
    const animEl = animate
      ? `\n  <animate attributeName="baseFrequency" dur="${dur}s"
    values="${bf};${bf2};${bf}" repeatCount="indefinite"/>`
      : "";
    return `<feTurbulence type="turbulence" baseFrequency="${bf}"
  numOctaves="${p.numOctaves}" seed="${p.seed}" result="noise">${animEl}
</feTurbulence>
<feDisplacementMap in="SourceGraphic" in2="noise" scale="${p.scale}"
  xChannelSelector="R" yChannelSelector="G"/>`;
  },
};
