import type { EffectDefinition } from "../../../types/effects";
import { dec } from "../../../lib/format";

export const cloud: EffectDefinition = {
  id: "cloud",
  name: "Cloud / Fog",
  sub: "fractalNoise + blur",
  category: "svg-filter",
  categoryLabel: "SVG Filters",
  tags: ["cloud", "fog", "atmosphere", "animation"],
  tech: ["feTurbulence", "feGaussianBlur", "feColorMatrix"],
  description:
    "Soft, blurred fractal noise layered over the element as drifting fog or cloud.",
  animatable: true,
  previewTypes: ["card", "text", "image", "button", "newspaper"],
  controls: [
    { id: "baseFrequency", label: "Base Frequency", type: "range", min: 0.004, max: 0.03, step: 0.001, def: 0.012, decimals: 3, random: [0.006, 0.02] },
    { id: "numOctaves", label: "Num Octaves", type: "range", min: 1, max: 5, step: 1, def: 4, decimals: 0, random: [3, 5] },
    { id: "seed", label: "Seed", type: "seed", min: 0, max: 100, step: 1, def: 5, decimals: 0, random: [0, 100] },
    { id: "blur", label: "Softness", type: "range", min: 0, max: 10, step: 0.5, def: 3, decimals: 1, random: [1, 6] },
    { id: "density", label: "Density", type: "range", min: 0, max: 1, step: 0.05, def: 0.6, decimals: 2, random: [0.3, 0.8] },
    { id: "speed", label: "Animation Speed", type: "range", min: 1, max: 10, step: 0.5, def: 3, decimals: 1, unit: "×", isAnimationControl: true },
  ],
  buildFilterInner: (p, animate) => {
    const bf = dec(p.baseFrequency as number, 3);
    const bf2 = dec((p.baseFrequency as number) * 1.4, 3);
    const dur = dec(24 / (p.speed as number), 1);
    const d = p.density as number;
    const animEl = animate
      ? `\n  <animate attributeName="baseFrequency" dur="${dur}s"
    values="${bf};${bf2};${bf}" repeatCount="indefinite"/>`
      : "";
    return `<feTurbulence type="fractalNoise" baseFrequency="${bf}"
  numOctaves="${p.numOctaves}" seed="${p.seed}" result="noise">${animEl}
</feTurbulence>
<feGaussianBlur in="noise" stdDeviation="${dec(p.blur as number, 1)}" result="soft"/>
<feColorMatrix in="soft" type="matrix" result="fog"
  values="0 0 0 0 1
          0 0 0 0 1
          0 0 0 0 1
          ${dec(d * 0.33, 3)} ${dec(d * 0.33, 3)} ${dec(d * 0.34, 3)} 0 0"/>
<feComposite in="fog" in2="SourceGraphic" operator="in" result="fogClip"/>
<feMerge>
  <feMergeNode in="SourceGraphic"/>
  <feMergeNode in="fogClip"/>
</feMerge>`;
  },
};
