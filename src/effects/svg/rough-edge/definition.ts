import type { EffectDefinition } from "../../../types/effects";
import { dec } from "../../../lib/format";

export const roughEdge: EffectDefinition = {
  id: "rough-edge",
  name: "Rough Edge",
  sub: "feTurbulence + feDisplacementMap",
  category: "svg-filter",
  categoryLabel: "SVG Filters",
  tags: ["noise", "displacement", "sticker"],
  tech: ["feTurbulence", "feDisplacementMap"],
  description:
    "Uses a fractal-noise map to displace an element's edges, giving a hand-drawn, torn-paper look.",
  previewTypes: ["card", "text", "image", "button", "newspaper", "custom"],
  controls: [
    { id: "baseFrequency", label: "Base Frequency", type: "range", min: 0.005, max: 0.1, step: 0.001, def: 0.04, decimals: 3, random: [0.01, 0.07] },
    { id: "numOctaves", label: "Num Octaves", type: "range", min: 1, max: 5, step: 1, def: 3, decimals: 0, random: [1, 4] },
    { id: "seed", label: "Seed", type: "seed", min: 0, max: 100, step: 1, def: 4, decimals: 0, random: [0, 100] },
    { id: "scale", label: "Displacement Scale", type: "range", min: 0, max: 40, step: 1, def: 9, decimals: 0, random: [4, 22] },
  ],
  buildFilterInner: (p) =>
    `<feTurbulence type="fractalNoise" baseFrequency="${dec(p.baseFrequency as number, 3)}"
  numOctaves="${p.numOctaves}" seed="${p.seed}" result="noise"/>
<feDisplacementMap in="SourceGraphic" in2="noise" scale="${p.scale}"
  xChannelSelector="R" yChannelSelector="G"/>`,
};
