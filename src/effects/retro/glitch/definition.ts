import type { EffectDefinition } from "../../../types/effects";
import { dec } from "../../../lib/format";

export const glitch: EffectDefinition = {
  id: "glitch",
  name: "Glitch",
  sub: "RGB channel split",
  category: "retro",
  categoryLabel: "Retro",
  tags: ["glitch", "rgb", "animation", "retro"],
  tech: ["feColorMatrix", "feOffset", "feBlend"],
  description:
    "Splits the red and cyan channels and offsets them apart for a chromatic-aberration glitch, with optional jitter.",
  animatable: true,
  previewTypes: ["card", "text", "image", "button", "newspaper"],
  controls: [
    { id: "amount", label: "Split Amount", type: "range", min: 0, max: 15, step: 0.5, def: 5, decimals: 1, unit: "px", random: [2, 10] },
    { id: "speed", label: "Animation Speed", type: "range", min: 1, max: 10, step: 0.5, def: 5, decimals: 1, unit: "×", isAnimationControl: true },
  ],
  buildFilterInner: (p, animate) => {
    const a = p.amount as number;
    const dur = dec(0.6 / (p.speed as number), 2);
    const jitter = (base: number) =>
      animate
        ? `\n    <animate attributeName="dx" dur="${dur}s" repeatCount="indefinite"
      values="${dec(base, 1)};${dec(base * 0.3, 1)};${dec(base * 1.5, 1)};${dec(base, 1)}"/>`
        : "";
    return `<feColorMatrix in="SourceGraphic" type="matrix" result="r"
  values="1 0 0 0 0
          0 0 0 0 0
          0 0 0 0 0
          0 0 0 1 0"/>
<feColorMatrix in="SourceGraphic" type="matrix" result="gb"
  values="0 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 1 0"/>
<feOffset in="r" dx="${dec(a, 1)}" dy="0" result="rOff">${jitter(a)}
</feOffset>
<feOffset in="gb" dx="${dec(-a, 1)}" dy="0" result="gbOff">${jitter(-a)}
</feOffset>
<feBlend in="rOff" in2="gbOff" mode="screen"/>`;
  },
};
