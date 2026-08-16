import { warpPresets } from "../presets.generated";
import { shaderGenerator } from "../shaderGenerator";

export const warp = shaderGenerator({
  id: "warp-shader",
  name: "Warp",
  componentName: "Warp",
  description:
    "A GPU shader that warps layered shapes into flowing marbled ribbons. From @paper-design/shaders (Apache-2.0).",
  presets: warpPresets,
  tags: ["warp", "shader", "webgl", "animation"],
  props: ["speed", "distortion", "swirl", "softness"],
  controls: [
    { id: "speed", label: "Speed", type: "range", min: 0, max: 3, step: 0.1, def: 1, decimals: 1, unit: "×", isAnimationControl: true },
    { id: "distortion", label: "Distortion", type: "range", min: 0, max: 1, step: 0.05, def: 0.25, decimals: 2, random: [0.1, 0.8] },
    { id: "swirl", label: "Swirl", type: "range", min: 0, max: 1, step: 0.05, def: 0.8, decimals: 2, random: [0.3, 1] },
    { id: "softness", label: "Softness", type: "range", min: 0, max: 1, step: 0.05, def: 1, decimals: 2, random: [0.3, 1] },
  ],
});
