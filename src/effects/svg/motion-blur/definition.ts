import type { EffectDefinition } from "../../../types/effects";
import { dec } from "../../../lib/format";

export const motionBlur: EffectDefinition = {
  id: "motion-blur",
  name: "Motion Blur",
  sub: "directional feGaussianBlur",
  category: "svg-filter",
  categoryLabel: "SVG Filters",
  tags: ["blur", "motion", "speed", "native"],
  tech: ["feGaussianBlur"],
  description:
    "A directional Gaussian blur (independent X/Y deviation) for a motion-streak look. Browser-native.",
  previewTypes: ["card", "text", "image", "button", "newspaper", "custom"],
  controls: [
    { id: "x", label: "Blur X", type: "range", min: 0, max: 24, step: 0.5, def: 8, decimals: 1, unit: "px", random: [4, 18] },
    { id: "y", label: "Blur Y", type: "range", min: 0, max: 24, step: 0.5, def: 0, decimals: 1, unit: "px", random: [0, 6] },
  ],
  buildFilterInner: (p) =>
    `<feGaussianBlur stdDeviation="${dec(p.x as number, 1)} ${dec(p.y as number, 1)}" edgeMode="duplicate"/>`,
};
