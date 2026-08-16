import type { EffectDefinition } from "../../../types/effects";

export const sticker: EffectDefinition = {
  id: "sticker",
  name: "Sticker",
  sub: "feMorphology outline",
  category: "svg-filter",
  categoryLabel: "SVG Filters",
  tags: ["sticker", "outline", "morphology"],
  tech: ["feMorphology", "feFlood", "feComposite", "feMerge"],
  description:
    "Dilates the shape's alpha with feMorphology to lay a solid outline behind it — the die-cut sticker look.",
  previewTypes: ["card", "text", "image", "button", "newspaper"],
  controls: [
    { id: "radius", label: "Outline Width", type: "range", min: 0, max: 12, step: 0.5, def: 4, decimals: 1, unit: "px", random: [2, 9] },
  ],
  buildFilterInner: (p) =>
    `<feMorphology in="SourceAlpha" operator="dilate" radius="${p.radius}" result="spread"/>
<feFlood flood-color="#ffffff" result="color"/>
<feComposite in="color" in2="spread" operator="in" result="outline"/>
<feMerge>
  <feMergeNode in="outline"/>
  <feMergeNode in="SourceGraphic"/>
</feMerge>`,
};
