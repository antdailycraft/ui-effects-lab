import type { EffectDefinition } from "../../../types/effects";
import { dec } from "../../../lib/format";

/** Build a `discrete` transfer table with `levels` evenly-spaced steps: 2 → "0 1", 4 → "0 0.333 0.667 1". */
function levelTable(levels: number): string {
  return Array.from({ length: levels }, (_, i) => dec(i / (levels - 1), 3)).join(" ");
}

export const posterize: EffectDefinition = {
  id: "posterize",
  name: "Posterize",
  sub: "feComponentTransfer",
  category: "svg-filter",
  categoryLabel: "SVG Filters",
  tags: ["posterize", "banding", "quantize"],
  tech: ["feComponentTransfer"],
  description:
    "Quantizes each color channel into a few discrete steps with feComponentTransfer for a poster / color-banding look.",
  previewTypes: ["card", "text", "image", "button", "newspaper"],
  controls: [
    { id: "levels", label: "Levels", type: "range", min: 2, max: 8, step: 1, def: 4, decimals: 0, random: [2, 6] },
  ],
  buildFilterInner: (p) => {
    const table = levelTable(p.levels as number);
    return `<feComponentTransfer>
  <feFuncR type="discrete" tableValues="${table}"/>
  <feFuncG type="discrete" tableValues="${table}"/>
  <feFuncB type="discrete" tableValues="${table}"/>
</feComponentTransfer>`;
  },
};
