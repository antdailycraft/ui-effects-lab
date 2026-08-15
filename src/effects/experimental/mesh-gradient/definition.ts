import { MeshGradient, meshGradientPresets } from "@paper-design/shaders-react";
import { shaderGenerator } from "../shaderGenerator";

export const meshGradient = shaderGenerator({
  id: "mesh-gradient",
  name: "Mesh Gradient",
  componentName: "MeshGradient",
  description:
    "An animated flowing mesh gradient rendered on the GPU. From @paper-design/shaders (Apache-2.0).",
  component: MeshGradient,
  presets: meshGradientPresets as unknown as { name: string; params: Record<string, unknown> }[],
  tags: ["gradient", "shader", "webgl", "animation"],
  props: ["speed", "distortion", "swirl", "scale"],
  controls: [
    { id: "speed", label: "Speed", type: "range", min: 0, max: 3, step: 0.1, def: 1, decimals: 1, unit: "×", isAnimationControl: true },
    { id: "distortion", label: "Distortion", type: "range", min: 0, max: 1, step: 0.05, def: 0.8, decimals: 2, random: [0.3, 1] },
    { id: "swirl", label: "Swirl", type: "range", min: 0, max: 1, step: 0.05, def: 0.1, decimals: 2, random: [0, 0.6] },
    { id: "scale", label: "Scale", type: "range", min: 0.5, max: 2, step: 0.05, def: 1, decimals: 2, random: [0.7, 1.6] },
  ],
});
