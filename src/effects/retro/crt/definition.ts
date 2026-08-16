import type { EffectDefinition } from "../../../types/effects";
import { dec } from "../../../lib/format";

export const crt: EffectDefinition = {
  id: "crt",
  name: "CRT / Analog",
  sub: "scanlines + flicker",
  category: "retro",
  categoryLabel: "Retro",
  tags: ["crt", "vhs", "scanlines", "retro", "animation"],
  tech: ["repeating-linear-gradient", "mix-blend-mode", "filter"],
  description:
    "Scanline overlay, vignette, and boosted contrast for an old CRT / analog display look, with an optional flicker.",
  kind: "css",
  cssClass: "fx-crt",
  animatable: true,
  previewTypes: ["card", "text", "image", "button", "newspaper"],
  controls: [
    { id: "scan", label: "Scanline Strength", type: "range", min: 0, max: 0.6, step: 0.05, def: 0.35, decimals: 2, random: [0.2, 0.5] },
    { id: "gap", label: "Scanline Gap", type: "range", min: 2, max: 6, step: 1, def: 3, decimals: 0, unit: "px", random: [2, 5] },
    { id: "speed", label: "Flicker Speed", type: "range", min: 1, max: 10, step: 0.5, def: 5, decimals: 1, unit: "×", isAnimationControl: true },
  ],
  buildStyle: (p) => ({
    "--fx-scan": String(p.scan),
    "--fx-gap": `${p.gap}px`,
    "--fx-dur": `${dec(1.2 / (p.speed as number), 2)}s`,
  }),
  buildCss: (p) => `.effect {
  position: relative;
  filter: contrast(1.12) saturate(1.15) brightness(1.04);
}
.effect::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, ${dec(p.scan as number, 2)}) 0 1px,
    transparent 1px ${p.gap}px
  );
  box-shadow: inset 0 0 55px rgba(0, 0, 0, 0.45);
}`,
};
