import type { EffectDefinition } from "../../../types/effects";
import { dec } from "../../../lib/format";

export const water: EffectDefinition = {
  id: "water",
  name: "Water Distortion",
  sub: "directional turbulence",
  category: "svg-filter",
  categoryLabel: "SVG Filters",
  tags: ["water", "animation", "displacement"],
  tech: ["feTurbulence", "feDisplacementMap"],
  description:
    "Directional turbulence (X ≠ Y frequency) drives a displacement map to ripple the surface like water.",
  animatable: true,
  previewTypes: ["card", "text", "image", "button", "newspaper", "custom"],
  controls: [
    { id: "freqX", label: "Frequency X", type: "range", min: 0.004, max: 0.06, step: 0.001, def: 0.012, decimals: 3, random: [0.006, 0.03] },
    { id: "freqY", label: "Frequency Y", type: "range", min: 0.004, max: 0.06, step: 0.001, def: 0.04, decimals: 3, random: [0.02, 0.055] },
    { id: "numOctaves", label: "Num Octaves", type: "range", min: 1, max: 4, step: 1, def: 2, decimals: 0, random: [1, 3] },
    { id: "seed", label: "Seed", type: "seed", min: 0, max: 100, step: 1, def: 3, decimals: 0, random: [0, 100] },
    { id: "scale", label: "Displacement Scale", type: "range", min: 0, max: 50, step: 1, def: 20, decimals: 0, random: [10, 36] },
    { id: "speed", label: "Animation Speed", type: "range", min: 1, max: 10, step: 0.5, def: 4, decimals: 1, unit: "×", isAnimationControl: true },
  ],
  buildFilterInner: (p, animate) => {
    const bf = `${dec(p.freqX as number, 3)} ${dec(p.freqY as number, 3)}`;
    const bf2 = `${dec(p.freqX as number, 3)} ${dec((p.freqY as number) * 1.7, 3)}`;
    const dur = dec(13 / (p.speed as number), 1);
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
