import { Heatmap, heatmapPresets } from "@paper-design/shaders-react";
import { shaderGenerator } from "../shaderGenerator";

export const heatmap = shaderGenerator({
  id: "heatmap",
  name: "Heatmap",
  componentName: "Heatmap",
  description:
    "Turns a source image into flowing thermal-camera contours on the GPU. From @paper-design/shaders (Apache-2.0).",
  component: Heatmap,
  base: heatmapPresets[0].params as Record<string, unknown>,
  tags: ["heatmap", "thermal", "image", "shader", "webgl", "animation"],
  usesImage: true,
  props: ["speed", "contour", "noise", "innerGlow"],
  controls: [
    { id: "speed", label: "Speed", type: "range", min: 0, max: 3, step: 0.1, def: 1, decimals: 1, unit: "×", isAnimationControl: true },
    { id: "contour", label: "Contour", type: "range", min: 0, max: 1, step: 0.05, def: 0.5, decimals: 2, random: [0.2, 0.9] },
    { id: "noise", label: "Noise", type: "range", min: 0, max: 1, step: 0.05, def: 0.2, decimals: 2, random: [0, 0.6] },
    { id: "innerGlow", label: "Inner Glow", type: "range", min: 0, max: 1, step: 0.05, def: 0.5, decimals: 2, random: [0.1, 0.9] },
  ],
});
