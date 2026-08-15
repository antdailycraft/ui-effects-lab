import { GemSmoke, gemSmokePresets } from "@paper-design/shaders-react";
import { shaderGenerator } from "../shaderGenerator";

export const gemSmoke = shaderGenerator({
  id: "gem-smoke",
  name: "Gem Smoke",
  componentName: "GemSmoke",
  description:
    "Glowing gem-like smoke with inner and outer light on the GPU. From @paper-design/shaders (Apache-2.0).",
  component: GemSmoke,
  base: gemSmokePresets[0].params as Record<string, unknown>,
  tags: ["smoke", "gem", "glow", "shader", "webgl", "animation"],
  props: ["speed", "outerGlow", "innerGlow", "innerDistortion"],
  controls: [
    { id: "speed", label: "Speed", type: "range", min: 0, max: 3, step: 0.1, def: 1, decimals: 1, unit: "×", isAnimationControl: true },
    { id: "outerGlow", label: "Outer Glow", type: "range", min: 0, max: 1, step: 0.05, def: 0.55, decimals: 2, random: [0.2, 0.9] },
    { id: "innerGlow", label: "Inner Glow", type: "range", min: 0, max: 2, step: 0.05, def: 1, decimals: 2, random: [0.4, 1.6] },
    { id: "innerDistortion", label: "Distortion", type: "range", min: 0, max: 1, step: 0.05, def: 0.8, decimals: 2, random: [0.3, 1] },
  ],
});
