import { lensDistortionPresets } from "../presets.generated";
import { shaderGenerator } from "../shaderGenerator";

export const lensDistortion = shaderGenerator({
  id: "lens-distortion",
  name: "Lens Distortion",
  componentName: "LensDistortion",
  description:
    "Bends a source image through a prismatic lens with chromatic spread on the GPU. From @paper-design/shaders (Apache-2.0).",
  presets: lensDistortionPresets,
  tags: ["lens", "distortion", "image", "chromatic", "shader", "webgl", "animation"],
  usesImage: true,
  props: ["speed", "spread", "bias", "perspective", "count"],
  controls: [
    { id: "speed", label: "Speed", type: "range", min: 0, max: 3, step: 0.1, def: 0.5, decimals: 1, unit: "×", isAnimationControl: true },
    { id: "spread", label: "Spread", type: "range", min: 0, max: 2, step: 0.05, def: 0.6, decimals: 2, random: [0.2, 1.4] },
    { id: "bias", label: "Bias", type: "range", min: 0, max: 2, step: 0.05, def: 1, decimals: 2, random: [0.3, 1.7] },
    { id: "perspective", label: "Perspective", type: "range", min: 0, max: 1, step: 0.05, def: 0.1, decimals: 2, random: [0, 0.6] },
    { id: "count", label: "Ridges", type: "range", min: 4, max: 80, step: 1, def: 35, decimals: 0, random: [10, 60] },
  ],
});
