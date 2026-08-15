import type { EffectDefinition } from "../../../types/effects";
import { dec } from "../../../lib/format";
import { hslToRgb } from "../../../lib/color";

export const duotone: EffectDefinition = {
  id: "duotone",
  name: "Duotone",
  sub: "feColorMatrix + feComponentTransfer",
  category: "svg-filter",
  categoryLabel: "SVG Filters",
  tags: ["duotone", "color", "print", "native"],
  tech: ["feColorMatrix", "feComponentTransfer"],
  description:
    "Desaturates the source, then maps shadows and highlights onto two hues for a duotone print look. Browser-native.",
  previewTypes: ["card", "text", "image"],
  controls: [
    { id: "shadowHue", label: "Shadow Hue", type: "range", min: 0, max: 360, step: 1, def: 240, decimals: 0, unit: "°", random: [0, 360] },
    { id: "highlightHue", label: "Highlight Hue", type: "range", min: 0, max: 360, step: 1, def: 40, decimals: 0, unit: "°", random: [0, 360] },
  ],
  buildFilterInner: (p) => {
    const s = hslToRgb(p.shadowHue as number, 0.65, 0.25);
    const h = hslToRgb(p.highlightHue as number, 0.7, 0.82);
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
