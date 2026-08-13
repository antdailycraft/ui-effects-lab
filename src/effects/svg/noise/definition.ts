import type { EffectDefinition } from "../../../types/effects";
import { dec } from "../../../lib/format";

export const noise: EffectDefinition = {
  id: "noise",
  name: "Noise Texture",
  sub: "raw feTurbulence",
  category: "svg-filter",
  categoryLabel: "SVG Filters",
  tags: ["noise", "texture", "static", "grain"],
  tech: ["feTurbulence", "feColorMatrix", "feComposite"],
  description:
    "Renders feTurbulence's raw procedural noise, clipped to the element — the core building block behind every other filter here.",
  previewTypes: ["card", "text", "image"],
  controls: [
    { id: "baseFrequency", label: "Base Frequency", type: "range", min: 0.05, max: 1.5, step: 0.01, def: 0.6, decimals: 2, random: [0.3, 1.0] },
    { id: "numOctaves", label: "Num Octaves", type: "range", min: 1, max: 5, step: 1, def: 3, decimals: 0, random: [1, 4] },
    { id: "seed", label: "Seed", type: "seed", min: 0, max: 100, step: 1, def: 7, decimals: 0, random: [0, 100] },
  ],
  buildFilterInner: (p) =>
    `<feTurbulence type="fractalNoise" baseFrequency="${dec(p.baseFrequency as number, 2)}"
  numOctaves="${p.numOctaves}" seed="${p.seed}" result="noise"/>
<feColorMatrix in="noise" type="matrix" result="mono"
  values="0.33 0.33 0.34 0 0
          0.33 0.33 0.34 0 0
          0.33 0.33 0.34 0 0
          0 0 0 0 1"/>
<feComposite in="mono" in2="SourceGraphic" operator="in"/>`,
};
