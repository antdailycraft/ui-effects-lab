import { HalftoneDots, halftoneDotsPresets } from "@paper-design/shaders-react";
import { shaderGenerator } from "../shaderGenerator";

export const halftoneDots = shaderGenerator({
  id: "halftone-dots",
  name: "Halftone Dots",
  componentName: "HalftoneDots",
  description:
    "A single-plate halftone dot screen over a gradient on the GPU. From @paper-design/shaders (Apache-2.0).",
  component: HalftoneDots,
  presets: halftoneDotsPresets as unknown as { name: string; params: Record<string, unknown> }[],
  tags: ["halftone", "dots", "print", "shader", "webgl", "animation"],
  usesImage: true,
  props: ["speed", "size", "radius", "contrast"],
  controls: [
    { id: "speed", label: "Speed", type: "range", min: 0, max: 3, step: 0.1, def: 0.5, decimals: 1, unit: "×", isAnimationControl: true },
    { id: "size", label: "Cell Size", type: "range", min: 0.1, max: 1.5, step: 0.05, def: 0.5, decimals: 2, random: [0.2, 1.1] },
    { id: "radius", label: "Dot Radius", type: "range", min: 0.5, max: 3, step: 0.05, def: 1.25, decimals: 2, random: [0.8, 2.5] },
    { id: "contrast", label: "Contrast", type: "range", min: 0, max: 1, step: 0.05, def: 0.4, decimals: 2, random: [0.1, 0.9] },
  ],
});
