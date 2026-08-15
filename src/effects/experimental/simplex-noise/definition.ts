import { SimplexNoise, simplexNoisePresets } from "@paper-design/shaders-react";
import { shaderGenerator } from "../shaderGenerator";

export const simplexNoise = shaderGenerator({
  id: "simplex-noise",
  name: "Simplex Noise",
  componentName: "SimplexNoise",
  description:
    "Banded simplex noise with stepped colors on the GPU. From @paper-design/shaders (Apache-2.0).",
  component: SimplexNoise,
  base: simplexNoisePresets[0].params as Record<string, unknown>,
  tags: ["noise", "simplex", "shader", "webgl", "animation"],
  props: ["speed", "stepsPerColor", "softness", "scale"],
  controls: [
    { id: "speed", label: "Speed", type: "range", min: 0, max: 3, step: 0.1, def: 0.5, decimals: 1, unit: "×", isAnimationControl: true },
    { id: "stepsPerColor", label: "Steps / Color", type: "range", min: 1, max: 8, step: 1, def: 2, decimals: 0, random: [1, 6] },
    { id: "softness", label: "Softness", type: "range", min: 0, max: 1, step: 0.05, def: 0, decimals: 2, random: [0, 0.7] },
    { id: "scale", label: "Scale", type: "range", min: 0.3, max: 1.5, step: 0.05, def: 0.6, decimals: 2, random: [0.4, 1.2] },
  ],
});
