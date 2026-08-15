import { GrainGradient, grainGradientPresets } from "@paper-design/shaders-react";
import { shaderGenerator } from "../shaderGenerator";

export const grainGradient = shaderGenerator({
  id: "grain-gradient",
  name: "Grain Gradient",
  componentName: "GrainGradient",
  description:
    "A grainy animated gradient rendered on the GPU. From @paper-design/shaders (Apache-2.0).",
  component: GrainGradient,
  presets: grainGradientPresets as unknown as { name: string; params: Record<string, unknown> }[],
  tags: ["gradient", "grain", "shader", "webgl", "animation"],
  props: ["speed", "intensity", "softness", "scale"],
  controls: [
    { id: "speed", label: "Speed", type: "range", min: 0, max: 3, step: 0.1, def: 1, decimals: 1, unit: "×", isAnimationControl: true },
    { id: "intensity", label: "Grain Intensity", type: "range", min: 0, max: 1, step: 0.05, def: 0.5, decimals: 2, random: [0.2, 0.9] },
    { id: "softness", label: "Softness", type: "range", min: 0, max: 1, step: 0.05, def: 0.5, decimals: 2, random: [0.2, 0.9] },
    { id: "scale", label: "Scale", type: "range", min: 0.5, max: 2, step: 0.05, def: 1, decimals: 2, random: [0.7, 1.6] },
  ],
  colorProps: [
    { id: "color1", label: "Color 1", def: "#7300ff" },
    { id: "color2", label: "Color 2", def: "#eba8ff" },
    { id: "color3", label: "Color 3", def: "#00bfff" },
    { id: "color4", label: "Color 4", def: "#2a00ff" },
  ],
});
