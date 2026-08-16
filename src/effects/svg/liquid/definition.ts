import type { EffectDefinition } from "../../../types/effects";
import { dec } from "../../../lib/format";

export const liquid: EffectDefinition = {
  id: "liquid",
  name: "Liquid",
  sub: "strong displacement",
  category: "svg-filter",
  categoryLabel: "SVG Filters",
  tags: ["liquid", "gooey", "animation", "displacement"],
  tech: ["feTurbulence", "feDisplacementMap"],
  description:
    "Strong, non-directional turbulence drives a large displacement map for a gooey, molten-liquid warp.",
  animatable: true,
  previewTypes: ["card", "text", "image", "button", "newspaper", "custom"],
  controls: [
    { id: "baseFrequency", label: "Base Frequency", type: "range", min: 0.008, max: 0.04, step: 0.001, def: 0.015, decimals: 3, random: [0.01, 0.03] },
    { id: "numOctaves", label: "Num Octaves", type: "range", min: 1, max: 5, step: 1, def: 4, decimals: 0, random: [2, 5] },
    { id: "seed", label: "Seed", type: "seed", min: 0, max: 100, step: 1, def: 6, decimals: 0, random: [0, 100] },
    { id: "scale", label: "Displacement Scale", type: "range", min: 0, max: 100, step: 1, def: 50, decimals: 0, random: [25, 80] },
    { id: "speed", label: "Animation Speed", type: "range", min: 1, max: 10, step: 0.5, def: 3, decimals: 1, unit: "×", isAnimationControl: true },
  ],
  buildFilterInner: (p, animate) => {
    const bf = dec(p.baseFrequency as number, 3);
    const bf2 = dec((p.baseFrequency as number) * 1.6, 3);
    const dur = dec(11 / (p.speed as number), 1);
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
