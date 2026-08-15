import type { EffectDefinition } from "../../../types/effects";
import { dec } from "../../../lib/format";
import { hexToRgb } from "../../../lib/color";

export const duotone: EffectDefinition = {
  id: "duotone",
  name: "Duotone",
  sub: "feColorMatrix + feComponentTransfer",
  category: "svg-filter",
  categoryLabel: "SVG Filters",
  tags: ["duotone", "color", "print", "native"],
  tech: ["feColorMatrix", "feComponentTransfer"],
  description:
    "Desaturates the source, then maps shadows and highlights onto two colors for a duotone print look. Browser-native.",
  previewTypes: ["card", "text", "image"],
  controls: [
    { id: "shadowColor", label: "Shadow Color", type: "color", def: "#241d9a" },
    { id: "highlightColor", label: "Highlight Color", type: "color", def: "#ffd36e" },
  ],
  buildFilterInner: (p) => {
    const s = hexToRgb(p.shadowColor as string);
    const h = hexToRgb(p.highlightColor as string);
    const f = (n: number) => dec(n, 3);
    return `<feColorMatrix type="matrix" result="gray"
  values="0.33 0.33 0.34 0 0
          0.33 0.33 0.34 0 0
          0.33 0.33 0.34 0 0
          0 0 0 1 0"/>
<feComponentTransfer in="gray">
  <feFuncR type="table" tableValues="${f(s[0])} ${f(h[0])}"/>
  <feFuncG type="table" tableValues="${f(s[1])} ${f(h[1])}"/>
  <feFuncB type="table" tableValues="${f(s[2])} ${f(h[2])}"/>
</feComponentTransfer>`;
  },
};
