import type { EffectDefinition } from "../../../types/effects";
import { dec } from "../../../lib/format";

export const bevel: EffectDefinition = {
  id: "bevel",
  name: "Bevel",
  sub: "feSpecularLighting",
  category: "svg-filter",
  categoryLabel: "SVG Filters",
  tags: ["bevel", "3d", "lighting", "gloss", "native"],
  tech: ["feGaussianBlur", "feSpecularLighting", "feComposite"],
  description:
    "Treats the shape's alpha as a height map and lights it with a specular point light for a glossy 3-D bevel. Browser-native, no dependency.",
  previewTypes: ["card", "text", "image", "button", "newspaper"],
  controls: [
    { id: "blur", label: "Edge Softness", type: "range", min: 1, max: 8, step: 0.5, def: 3, decimals: 1, unit: "px", random: [2, 6] },
    { id: "depth", label: "Bevel Depth", type: "range", min: 1, max: 12, step: 0.5, def: 5, decimals: 1, random: [3, 9] },
  ],
  buildFilterInner: (p) =>
    `<feGaussianBlur in="SourceAlpha" stdDeviation="${dec(p.blur as number, 1)}" result="blur"/>
<feSpecularLighting in="blur" surfaceScale="${dec(p.depth as number, 1)}"
  specularConstant="1" specularExponent="20" lighting-color="#ffffff" result="spec">
  <fePointLight x="-40" y="-40" z="120"/>
</feSpecularLighting>
<feComposite in="spec" in2="SourceAlpha" operator="in" result="specClip"/>
<feComposite in="SourceGraphic" in2="specClip" operator="arithmetic"
  k1="0" k2="1" k3="1" k4="0"/>`,
};
