import type { EffectDefinition } from "../../../types/effects";
import { dec } from "../../../lib/format";

export const emboss: EffectDefinition = {
  id: "emboss",
  name: "Emboss",
  sub: "feConvolveMatrix",
  category: "svg-filter",
  categoryLabel: "SVG Filters",
  tags: ["emboss", "relief", "convolve", "native"],
  tech: ["feConvolveMatrix"],
  description:
    "A directional convolution kernel that turns edges into a raised metal-relief / emboss look. Browser-native, no dependency.",
  previewTypes: ["card", "text", "image", "button", "newspaper", "custom"],
  controls: [
    { id: "amount", label: "Relief Depth", type: "range", min: 0.5, max: 3, step: 0.1, def: 1.5, decimals: 1, random: [1, 2.5] },
  ],
  buildFilterInner: (p) => {
    const a = p.amount as number;
    const f = (n: number) => dec(n, 2);
    return `<feConvolveMatrix order="3" preserveAlpha="true"
  kernelMatrix="${f(-2 * a)} ${f(-1 * a)} 0
                ${f(-1 * a)} 1 ${f(1 * a)}
                0 ${f(1 * a)} ${f(2 * a)}"/>`;
  },
};
