import type { EffectDefinition } from "../../../types/effects";
import { dec } from "../../../lib/format";

export const holographic: EffectDefinition = {
  id: "holographic",
  name: "Holographic Card",
  sub: "gradient + blend",
  category: "css",
  categoryLabel: "CSS Effects",
  tags: ["holographic", "iridescent", "gradient", "animation"],
  tech: ["linear-gradient", "mix-blend-mode", "animation"],
  description:
    "An iridescent gradient sheen blended over the element, drifting like a foil trading card.",
  kind: "css",
  cssClass: "fx-holo",
  animatable: true,
  previewTypes: ["card", "text", "image"],
  controls: [
    { id: "strength", label: "Sheen Strength", type: "range", min: 0.1, max: 1, step: 0.05, def: 0.55, decimals: 2, random: [0.3, 0.85] },
    { id: "angle", label: "Angle", type: "range", min: 0, max: 360, step: 5, def: 115, decimals: 0, unit: "°", random: [0, 360] },
    { id: "speed", label: "Animation Speed", type: "range", min: 1, max: 10, step: 0.5, def: 5, decimals: 1, unit: "×", isAnimationControl: true },
  ],
  buildStyle: (p) => ({
    "--fx-strength": String(p.strength),
    "--fx-angle": `${p.angle}deg`,
    "--fx-dur": `${dec(30 / (p.speed as number), 1)}s`,
  }),
  buildCss: (p) => `.effect { position: relative; }
.effect::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: linear-gradient(${p.angle}deg, #ff2e97, #ffd93b, #3bffd1, #4b6bff, #b14bff, #ff2e97);
  background-size: 300% 300%;
  mix-blend-mode: color-dodge;
  opacity: ${dec(p.strength as number, 2)};
  animation: holo-shift ${dec(30 / (p.speed as number), 1)}s linear infinite;
}
@keyframes holo-shift {
  from { background-position: 0% 50%; }
  to { background-position: 300% 50%; }
}`,
};
