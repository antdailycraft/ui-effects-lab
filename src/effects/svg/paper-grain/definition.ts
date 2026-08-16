import type { EffectDefinition } from "../../../types/effects";
import { dec } from "../../../lib/format";

export const paperGrain: EffectDefinition = {
  id: "paper-grain",
  name: "Paper Grain",
  sub: "feTurbulence + feBlend",
  category: "svg-filter",
  categoryLabel: "SVG Filters",
  tags: ["noise", "texture", "vintage"],
  tech: ["feTurbulence", "feColorMatrix", "feBlend"],
  description:
    "High-frequency fractal noise multiplied over the source for a fine paper / film-grain texture.",
  previewTypes: ["card", "text", "image", "button", "newspaper", "custom"],
  controls: [
    { id: "baseFrequency", label: "Base Frequency", type: "range", min: 0.2, max: 1, step: 0.01, def: 0.65, decimals: 2, random: [0.4, 0.9] },
    { id: "numOctaves", label: "Num Octaves", type: "range", min: 1, max: 4, step: 1, def: 3, decimals: 0, random: [2, 4] },
    { id: "seed", label: "Seed", type: "seed", min: 0, max: 100, step: 1, def: 8, decimals: 0, random: [0, 100] },
    { id: "intensity", label: "Grain Intensity", type: "range", min: 0, max: 1, step: 0.05, def: 0.55, decimals: 2, random: [0.3, 0.8] },
  ],
  buildFilterInner: (p) => {
    const i = p.intensity as number;
    return `<feTurbulence type="fractalNoise" baseFrequency="${dec(p.baseFrequency as number, 2)}"
  numOctaves="${p.numOctaves}" seed="${p.seed}" stitchTiles="stitch" result="noise"/>
<feColorMatrix in="noise" type="matrix" result="grain"
  values="0 0 0 0 0
          0 0 0 0 0
          0 0 0 0 0
          ${dec(i * 0.33, 3)} ${dec(i * 0.33, 3)} ${dec(i * 0.34, 3)} 0 0"/>
<feComposite in="grain" in2="SourceGraphic" operator="in" result="clip"/>
<feBlend in="SourceGraphic" in2="clip" mode="multiply"/>`;
  },
};
