import type { EffectDefinition } from "../../../types/effects";
import { dec } from "../../../lib/format";

export const gooey: EffectDefinition = {
  id: "gooey",
  name: "Gooey",
  sub: "blur + alpha contrast",
  category: "svg-filter",
  categoryLabel: "SVG Filters",
  tags: ["gooey", "blob", "metaball", "goo"],
  tech: ["feGaussianBlur", "feColorMatrix", "feComposite"],
  description:
    "Blurs the source, then crushes the alpha channel with feColorMatrix so nearby shapes melt together like metaballs.",
  previewTypes: ["card", "text", "image", "button", "newspaper", "custom"],
  controls: [
    { id: "blur", label: "Blur", type: "range", min: 0, max: 20, step: 0.5, def: 8, decimals: 1, unit: "px", random: [4, 14] },
    { id: "contrast", label: "Gooeyness", type: "range", min: 8, max: 30, step: 1, def: 18, decimals: 0, random: [12, 26] },
  ],
  buildFilterInner: (p) => {
    const c = p.contrast as number;
    const offset = dec(c * 0.45, 1);
    return `<feGaussianBlur in="SourceGraphic" stdDeviation="${dec(p.blur as number, 1)}" result="blur"/>
<feColorMatrix in="blur" type="matrix" result="goo"
  values="1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 ${c} -${offset}"/>
<feComposite in="SourceGraphic" in2="goo" operator="atop"/>`;
  },
};
