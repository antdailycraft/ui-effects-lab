import type { EffectDefinition } from "../../../types/effects";
import { dec } from "../../../lib/format";

export const frostedGlass: EffectDefinition = {
  id: "frosted-glass",
  name: "Frosted Glass",
  sub: "backdrop-filter blur",
  category: "css",
  categoryLabel: "CSS Effects",
  tags: ["glass", "glassmorphism", "blur", "overlay"],
  tech: ["backdrop-filter", "background", "border"],
  description:
    "Glassmorphism — a translucent tinted panel that blurs whatever sits behind it.",
  kind: "css",
  cssClass: "fx-frosted",
  previewTypes: ["card", "text", "image"],
  controls: [
    { id: "blur", label: "Blur", type: "range", min: 0, max: 24, step: 1, def: 8, decimals: 0, unit: "px", random: [4, 18] },
    { id: "tint", label: "Tint", type: "range", min: 0.05, max: 0.8, step: 0.05, def: 0.4, decimals: 2, random: [0.15, 0.6] },
  ],
  buildStyle: (p) => ({
    "--fx-blur": `${p.blur}px`,
    "--fx-alpha": String(p.tint),
  }),
  buildCss: (p) => `.effect {
  backdrop-filter: blur(${p.blur}px) saturate(1.4);
  -webkit-backdrop-filter: blur(${p.blur}px) saturate(1.4);
  background: rgba(255, 255, 255, ${dec(p.tint as number, 2)});
  border: 1px solid rgba(255, 255, 255, 0.5);
}`,
};
