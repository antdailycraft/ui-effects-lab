import { Swirl, swirlPresets } from "@paper-design/shaders-react";
import { shaderGenerator } from "../shaderGenerator";

export const swirl = shaderGenerator({
  id: "swirl",
  name: "Swirl",
  componentName: "Swirl",
  description:
    "Concentric color bands twisted into a hypnotic swirl on the GPU. From @paper-design/shaders (Apache-2.0).",
  component: Swirl,
  presets: swirlPresets as unknown as { name: string; params: Record<string, unknown> }[],
  tags: ["swirl", "spiral", "shader", "webgl", "animation"],
  props: ["speed", "bandCount", "twist", "softness"],
  controls: [
    { id: "speed", label: "Speed", type: "range", min: 0, max: 3, step: 0.1, def: 0.5, decimals: 1, unit: "×", isAnimationControl: true },
    { id: "bandCount", label: "Band Count", type: "range", min: 1, max: 12, step: 1, def: 4, decimals: 0, random: [2, 9] },
    { id: "twist", label: "Twist", type: "range", min: 0, max: 1, step: 0.05, def: 0.1, decimals: 2, random: [0, 0.8] },
    { id: "softness", label: "Softness", type: "range", min: 0, max: 1, step: 0.05, def: 0, decimals: 2, random: [0, 0.7] },
  ],
});
