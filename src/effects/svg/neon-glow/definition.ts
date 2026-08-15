import type { EffectDefinition } from "../../../types/effects";
import { dec } from "../../../lib/format";
import { hslToHex } from "../../../lib/color";

export const neonGlow: EffectDefinition = {
  id: "neon-glow",
  name: "Neon Glow",
  sub: "feMorphology + feGaussianBlur",
  category: "svg-filter",
  categoryLabel: "SVG Filters",
  tags: ["neon", "glow", "light", "native"],
  tech: ["feMorphology", "feFlood", "feGaussianBlur", "feMerge"],
  description:
    "Spreads the shape's alpha, floods it with a colored light, blurs it, and stacks it under the source for a neon glow. Browser-native.",
  previewTypes: ["card", "text", "image"],
  controls: [
    { id: "hue", label: "Glow Hue", type: "range", min: 0, max: 360, step: 1, def: 300, decimals: 0, unit: "°", random: [0, 360] },
    { id: "size", label: "Glow Spread", type: "range", min: 0, max: 8, step: 0.5, def: 2, decimals: 1, unit: "px", random: [1, 5] },
    { id: "blur", label: "Glow Softness", type: "range", min: 1, max: 16, step: 0.5, def: 6, decimals: 1, unit: "px", random: [4, 12] },
  ],
  buildFilterInner: (p) => {
    const color = hslToHex(p.hue as number, 0.9, 0.6);
    return `<feMorphology in="SourceAlpha" operator="dilate" radius="${dec(p.size as number, 1)}" result="spread"/>
<feFlood flood-color="${color}" result="color"/>
<feComposite in="color" in2="spread" operator="in" result="glowShape"/>
<feGaussianBlur in="glowShape" stdDeviation="${dec(p.blur as number, 1)}" result="glow"/>
<feMerge>
  <feMergeNode in="glow"/>
  <feMergeNode in="glow"/>
  <feMergeNode in="SourceGraphic"/>
</feMerge>`;
  },
};
