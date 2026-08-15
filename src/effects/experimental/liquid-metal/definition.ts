import { LiquidMetal, liquidMetalPresets } from "@paper-design/shaders-react";
import { shaderGenerator } from "../shaderGenerator";

export const liquidMetal = shaderGenerator({
  id: "liquid-metal",
  name: "Liquid Metal",
  componentName: "LiquidMetal",
  description:
    "A rippling chrome / mercury surface with chromatic edges on the GPU. From @paper-design/shaders (Apache-2.0).",
  component: LiquidMetal,
  presets: liquidMetalPresets as unknown as { name: string; params: Record<string, unknown> }[],
  tags: ["metal", "chrome", "shader", "webgl", "animation"],
  props: ["speed", "distortion", "repetition", "softness"],
  controls: [
    { id: "speed", label: "Speed", type: "range", min: 0, max: 3, step: 0.1, def: 1, decimals: 1, unit: "×", isAnimationControl: true },
    { id: "distortion", label: "Distortion", type: "range", min: 0, max: 0.5, step: 0.01, def: 0.07, decimals: 2, random: [0.02, 0.3] },
    { id: "repetition", label: "Repetition", type: "range", min: 1, max: 8, step: 1, def: 2, decimals: 0, random: [1, 6] },
    { id: "softness", label: "Softness", type: "range", min: 0, max: 1, step: 0.05, def: 0.1, decimals: 2, random: [0, 0.7] },
  ],
});
