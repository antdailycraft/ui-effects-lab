import { imageDitheringPresets } from "../presets.generated";
import { shaderGenerator } from "../shaderGenerator";

export const imageDithering = shaderGenerator({
  id: "image-dithering",
  name: "Image Dithering",
  componentName: "ImageDithering",
  description:
    "Ordered-dithers a source image into a retro low-color screen on the GPU. From @paper-design/shaders (Apache-2.0).",
  presets: imageDitheringPresets,
  tags: ["dither", "image", "retro", "shader", "webgl", "animation"],
  usesImage: true,
  props: ["speed", "size", "colorSteps"],
  controls: [
    { id: "speed", label: "Speed", type: "range", min: 0, max: 3, step: 0.1, def: 0.5, decimals: 1, unit: "×", isAnimationControl: true },
    { id: "size", label: "Dot Size", type: "range", min: 1, max: 8, step: 1, def: 2, decimals: 0, unit: "px", random: [1, 6] },
    { id: "colorSteps", label: "Color Steps", type: "range", min: 1, max: 8, step: 1, def: 2, decimals: 0, random: [1, 6] },
  ],
});
