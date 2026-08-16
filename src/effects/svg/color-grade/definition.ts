import type { EffectDefinition } from "../../../types/effects";
import { dec } from "../../../lib/format";

export const colorGrade: EffectDefinition = {
  id: "color-grade",
  name: "Color Grade",
  sub: "feColorMatrix hue + saturate",
  category: "svg-filter",
  categoryLabel: "SVG Filters",
  tags: ["color", "hue", "saturation", "grade", "native"],
  tech: ["feColorMatrix"],
  description:
    "Rotates hue and scales saturation with two feColorMatrix passes for quick color grading. Browser-native.",
  previewTypes: ["card", "text", "image", "button", "newspaper", "custom"],
  controls: [
    { id: "hue", label: "Hue Rotate", type: "range", min: 0, max: 360, step: 1, def: 0, decimals: 0, unit: "°", random: [0, 360] },
    { id: "saturation", label: "Saturation", type: "range", min: 0, max: 2, step: 0.05, def: 1, decimals: 2, random: [0, 2] },
  ],
  buildFilterInner: (p) =>
    `<feColorMatrix type="hueRotate" values="${p.hue}"/>
<feColorMatrix type="saturate" values="${dec(p.saturation as number, 2)}"/>`,
};
