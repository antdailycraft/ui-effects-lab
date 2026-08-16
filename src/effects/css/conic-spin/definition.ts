import type { EffectDefinition } from "../../../types/effects";
import { dec } from "../../../lib/format";

export const conicSpin: EffectDefinition = {
  id: "conic-spin",
  name: "Conic Spin",
  sub: "@property + conic-gradient",
  category: "css",
  categoryLabel: "CSS Effects",
  tags: ["gradient", "conic", "animation", "houdini"],
  tech: ["@property", "conic-gradient", "mix-blend-mode"],
  description:
    "A conic gradient whose angle is a registered @property, so it can rotate smoothly — impossible with plain custom properties.",
  kind: "css",
  cssClass: "fx-conic",
  animatable: true,
  previewTypes: ["card", "text", "image", "button", "newspaper"],
  controls: [
    { id: "strength", label: "Overlay Strength", type: "range", min: 0.1, max: 1, step: 0.05, def: 0.6, decimals: 2, random: [0.3, 0.9] },
    { id: "speed", label: "Spin Speed", type: "range", min: 1, max: 10, step: 0.5, def: 5, decimals: 1, unit: "×", isAnimationControl: true },
  ],
  buildStyle: (p) => ({
    "--fx-strength": String(p.strength),
    "--fx-dur": `${dec(20 / (p.speed as number), 1)}s`,
  }),
  buildCss: (p) => `@property --fx-spin {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}
.effect { position: relative; }
.effect::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: conic-gradient(
    from var(--fx-spin, 0deg),
    #ff2e97, #ffd93b, #3bffd1, #4b6bff, #b14bff, #ff2e97
  );
  opacity: ${dec(p.strength as number, 2)};
  mix-blend-mode: overlay;
  animation: fx-conic-spin ${dec(20 / (p.speed as number), 1)}s linear infinite;
}
@keyframes fx-conic-spin {
  to { --fx-spin: 360deg; }
}`,
};
