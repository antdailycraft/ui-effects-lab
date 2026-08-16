import type { EffectDefinition } from "../../../types/effects";
import { dec } from "../../../lib/format";

export const sharpen: EffectDefinition = {
  id: "sharpen",
  name: "Sharpen",
  sub: "feConvolveMatrix",
  category: "svg-filter",
  categoryLabel: "SVG Filters",
  tags: ["sharpen", "unsharp", "convolve", "native"],
  tech: ["feConvolveMatrix"],
  description:
    "An unsharp convolution kernel that boosts local contrast at edges. Browser-native, no dependency.",
  previewTypes: ["card", "text", "image", "button", "newspaper"],
  controls: [
    { id: "amount", label: "Amount", type: "range", min: 0, max: 2, step: 0.1, def: 1, decimals: 1, random: [0.4, 1.6] },
  ],
  buildFilterInner: (p) => {
    const a = p.amount as number;
    const f = (n: number) => dec(n, 2);
    return `<feConvolveMatrix order="3" preserveAlpha="true"
  kernelMatrix="0 ${f(-a)} 0
                ${f(-a)} ${f(1 + 4 * a)} ${f(-a)}
                0 ${f(-a)} 0"/>`;
  },
};
