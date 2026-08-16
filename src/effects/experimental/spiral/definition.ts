import { spiralPresets } from "../presets.generated";
import { shaderGenerator } from "../shaderGenerator";

export const spiral = shaderGenerator({
  id: "spiral",
  name: "Spiral",
  componentName: "Spiral",
  description:
    "A hypnotic rotating spiral of tapered strokes rendered on the GPU. From @paper-design/shaders (Apache-2.0).",
  presets: spiralPresets,
  tags: ["spiral", "hypnotic", "shader", "webgl", "animation"],
  props: ["speed", "density", "distortion", "strokeWidth"],
  controls: [
    { id: "speed", label: "Speed", type: "range", min: 0, max: 3, step: 0.1, def: 1, decimals: 1, unit: "×", isAnimationControl: true },
    { id: "density", label: "Density", type: "range", min: 0.2, max: 3, step: 0.1, def: 1, decimals: 1, random: [0.5, 2.5] },
    { id: "distortion", label: "Distortion", type: "range", min: 0, max: 1, step: 0.05, def: 0, decimals: 2, random: [0, 0.7] },
    { id: "strokeWidth", label: "Stroke Width", type: "range", min: 0.05, max: 1, step: 0.05, def: 0.5, decimals: 2, random: [0.2, 0.8] },
  ],
});
