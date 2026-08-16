import type { EffectDefinition } from "../../../types/effects";
import { dec } from "../../../lib/format";

export const invert: EffectDefinition = {
  id: "invert",
  name: "Invert",
  sub: "feComponentTransfer",
  category: "svg-filter",
  categoryLabel: "SVG Filters",
  tags: ["invert", "negative", "native"],
  tech: ["feComponentTransfer"],
  description:
    "Inverts each color channel with a two-point transfer table, mixable from identity to full negative. Browser-native.",
  previewTypes: ["card", "text", "image", "button", "newspaper", "custom"],
  controls: [
    { id: "amount", label: "Amount", type: "range", min: 0, max: 1, step: 0.05, def: 1, decimals: 2, random: [0.4, 1] },
  ],
  buildFilterInner: (p) => {
    const a = p.amount as number;
    const t = `${dec(a, 2)} ${dec(1 - a, 2)}`;
    return `<feComponentTransfer>
  <feFuncR type="table" tableValues="${t}"/>
  <feFuncG type="table" tableValues="${t}"/>
  <feFuncB type="table" tableValues="${t}"/>
</feComponentTransfer>`;
  },
};
