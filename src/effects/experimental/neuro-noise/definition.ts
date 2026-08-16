import { neuroNoisePresets } from "../presets.generated";
import { shaderGenerator } from "../shaderGenerator";

export const neuroNoise = shaderGenerator({
  id: "neuro-noise",
  name: "Neuro Noise",
  componentName: "NeuroNoise",
  description:
    "Organic neural-network-like noise filaments rendered on the GPU. From @paper-design/shaders (Apache-2.0).",
  presets: neuroNoisePresets,
  tags: ["noise", "neural", "shader", "webgl", "animation"],
  props: ["speed", "brightness", "contrast", "scale"],
  controls: [
    { id: "speed", label: "Speed", type: "range", min: 0, max: 3, step: 0.1, def: 1, decimals: 1, unit: "×", isAnimationControl: true },
    { id: "brightness", label: "Brightness", type: "range", min: 0, max: 0.5, step: 0.01, def: 0.05, decimals: 2, random: [0, 0.3] },
    { id: "contrast", label: "Contrast", type: "range", min: 0, max: 1, step: 0.05, def: 0.3, decimals: 2, random: [0.1, 0.8] },
    { id: "scale", label: "Scale", type: "range", min: 0.5, max: 2, step: 0.05, def: 1, decimals: 2, random: [0.7, 1.6] },
  ],
});
