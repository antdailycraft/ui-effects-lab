import { Dithering, ditheringPresets } from "@paper-design/shaders-react";
import { shaderGenerator } from "../shaderGenerator";

export const dithering = shaderGenerator({
  id: "dithering",
  name: "Dithering",
  componentName: "Dithering",
  description:
    "An animated ordered-dither shader for a retro 1-bit / print look. From @paper-design/shaders (Apache-2.0).",
  component: Dithering,
  base: ditheringPresets[0].params as Record<string, unknown>,
  tags: ["dither", "retro", "shader", "webgl", "animation"],
  props: ["speed", "size", "scale"],
  controls: [
    { id: "speed", label: "Speed", type: "range", min: 0, max: 3, step: 0.1, def: 1, decimals: 1, unit: "×", isAnimationControl: true },
    { id: "size", label: "Dot Size", type: "range", min: 1, max: 8, step: 1, def: 2, decimals: 0, unit: "px", random: [1, 6] },
    { id: "scale", label: "Scale", type: "range", min: 0.3, max: 1.5, step: 0.05, def: 0.6, decimals: 2, random: [0.4, 1.2] },
  ],
});
