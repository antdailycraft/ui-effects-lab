import { FlutedGlass, flutedGlassPresets } from "@paper-design/shaders-react";
import { shaderGenerator } from "../shaderGenerator";

export const flutedGlass = shaderGenerator({
  id: "fluted-glass",
  name: "Fluted Glass",
  componentName: "FlutedGlass",
  description:
    "Vertical fluted / ribbed glass refracting the color beneath it. From @paper-design/shaders (Apache-2.0).",
  component: FlutedGlass,
  base: flutedGlassPresets[0].params as Record<string, unknown>,
  tags: ["glass", "fluted", "refraction", "shader", "webgl", "animation"],
  usesImage: true,
  props: ["speed", "distortion", "size", "highlights"],
  controls: [
    { id: "speed", label: "Speed", type: "range", min: 0, max: 3, step: 0.1, def: 0.5, decimals: 1, unit: "×", isAnimationControl: true },
    { id: "distortion", label: "Distortion", type: "range", min: 0, max: 1, step: 0.05, def: 0.5, decimals: 2, random: [0.2, 0.9] },
    { id: "size", label: "Rib Size", type: "range", min: 0.1, max: 1, step: 0.05, def: 0.5, decimals: 2, random: [0.2, 0.9] },
    { id: "highlights", label: "Highlights", type: "range", min: 0, max: 1, step: 0.05, def: 0.1, decimals: 2, random: [0, 0.6] },
  ],
});
