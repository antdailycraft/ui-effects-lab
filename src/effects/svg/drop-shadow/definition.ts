import type { EffectDefinition } from "../../../types/effects";
import { dec } from "../../../lib/format";

export const dropShadow: EffectDefinition = {
  id: "drop-shadow",
  name: "Drop Shadow",
  sub: "feDropShadow (shape-accurate)",
  category: "svg-filter",
  categoryLabel: "SVG Filters",
  tags: ["shadow", "depth", "dropshadow"],
  tech: ["feDropShadow"],
  description:
    "A single-primitive shadow that follows the element's actual alpha shape (not its bounding box, unlike CSS box-shadow).",
  previewTypes: ["card", "text", "image"],
  controls: [
    { id: "dx", label: "Offset X", type: "range", min: -20, max: 20, step: 1, def: 6, decimals: 0, unit: "px", random: [-12, 12] },
    { id: "dy", label: "Offset Y", type: "range", min: -20, max: 20, step: 1, def: 8, decimals: 0, unit: "px", random: [-12, 12] },
    { id: "blur", label: "Blur", type: "range", min: 0, max: 20, step: 0.5, def: 6, decimals: 1, unit: "px", random: [2, 14] },
    { id: "opacity", label: "Opacity", type: "range", min: 0, max: 1, step: 0.05, def: 0.5, decimals: 2, random: [0.25, 0.75] },
  ],
  buildFilterInner: (p) =>
    `<feDropShadow dx="${p.dx}" dy="${p.dy}" stdDeviation="${dec(p.blur as number, 1)}"
  flood-color="#000000" flood-opacity="${dec(p.opacity as number, 2)}"/>`,
};
