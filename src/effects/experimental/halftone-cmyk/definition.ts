import { HalftoneCmyk, halftoneCmykPresets } from "@paper-design/shaders-react";
import { shaderGenerator } from "../shaderGenerator";

export const halftoneCmyk = shaderGenerator({
  id: "halftone-cmyk",
  name: "Halftone CMYK",
  componentName: "HalftoneCmyk",
  description:
    "A CMYK four-plate halftone print simulation on the GPU. From @paper-design/shaders (Apache-2.0).",
  component: HalftoneCmyk,
  base: halftoneCmykPresets[0].params as Record<string, unknown>,
  tags: ["halftone", "cmyk", "print", "shader", "webgl", "animation"],
  usesImage: true,
  props: ["speed", "size", "contrast", "softness"],
  controls: [
    { id: "speed", label: "Speed", type: "range", min: 0, max: 3, step: 0.1, def: 0.5, decimals: 1, unit: "×", isAnimationControl: true },
    { id: "size", label: "Dot Size", type: "range", min: 0.05, max: 1, step: 0.01, def: 0.2, decimals: 2, random: [0.1, 0.6] },
    { id: "contrast", label: "Contrast", type: "range", min: 0, max: 2, step: 0.05, def: 1, decimals: 2, random: [0.4, 1.6] },
    { id: "softness", label: "Softness", type: "range", min: 0, max: 1, step: 0.05, def: 1, decimals: 2, random: [0.2, 1] },
  ],
});
