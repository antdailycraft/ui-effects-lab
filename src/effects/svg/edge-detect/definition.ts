import type { EffectDefinition } from "../../../types/effects";
import { dec } from "../../../lib/format";

export const edgeDetect: EffectDefinition = {
  id: "edge-detect",
  name: "Edge Detect",
  sub: "feConvolveMatrix (Laplacian)",
  category: "svg-filter",
  categoryLabel: "SVG Filters",
  tags: ["edge", "outline", "convolve", "native"],
  tech: ["feConvolveMatrix"],
  description:
    "A Laplacian convolution kernel that keeps only the edges, dropping flat areas to black. Browser-native.",
  previewTypes: ["card", "text", "image", "button", "newspaper"],
  controls: [
    { id: "amount", label: "Edge Strength", type: "range", min: 0.5, max: 3, step: 0.1, def: 1, decimals: 1, random: [0.8, 2] },
  ],
  buildFilterInner: (p) => {
    const a = p.amount as number;
    const f = (n: number) => dec(n, 2);
    return `<feConvolveMatrix order="3" preserveAlpha="true"
  kernelMatrix="0 ${f(-a)} 0
                ${f(-a)} ${f(4 * a)} ${f(-a)}
                0 ${f(-a)} 0"/>`;
  },
};
