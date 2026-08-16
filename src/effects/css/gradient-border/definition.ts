import type { EffectDefinition } from "../../../types/effects";

export const gradientBorder: EffectDefinition = {
  id: "gradient-border",
  name: "Gradient Border",
  sub: "mask-composite ring",
  category: "css",
  categoryLabel: "CSS Effects",
  tags: ["gradient", "border", "mask", "native"],
  tech: ["linear-gradient", "mask-composite"],
  description:
    "A gradient stroke drawn only on the element's border using mask-composite (the padding-box XOR trick). Browser-native.",
  kind: "css",
  cssClass: "fx-gradborder",
  previewTypes: ["card", "text", "image", "button", "newspaper", "custom"],
  controls: [
    { id: "width", label: "Border Width", type: "range", min: 1, max: 12, step: 0.5, def: 4, decimals: 1, unit: "px", random: [2, 8] },
    { id: "angle", label: "Angle", type: "range", min: 0, max: 360, step: 5, def: 120, decimals: 0, unit: "°", random: [0, 360] },
  ],
  buildStyle: (p) => ({
    "--fx-width": `${p.width}px`,
    "--fx-angle": `${p.angle}deg`,
  }),
  buildCss: (p) => `.effect { position: relative; }
.effect::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  padding: ${p.width}px;
  background: linear-gradient(${p.angle}deg, #ff2e97, #4b6bff, #3bffd1, #ffd93b, #ff2e97);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: exclude;
}`,
};
