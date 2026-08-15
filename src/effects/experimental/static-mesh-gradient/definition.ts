import { StaticMeshGradient, staticMeshGradientPresets } from "@paper-design/shaders-react";
import { shaderGenerator } from "../shaderGenerator";

export const staticMeshGradient = shaderGenerator({
  id: "static-mesh-gradient",
  name: "Static Mesh Gradient",
  componentName: "StaticMeshGradient",
  description:
    "A smooth multi-point mesh gradient with wave shaping on the GPU. From @paper-design/shaders (Apache-2.0).",
  component: StaticMeshGradient,
  presets: staticMeshGradientPresets as unknown as { name: string; params: Record<string, unknown> }[],
  tags: ["gradient", "mesh", "shader", "webgl", "animation"],
  props: ["speed", "positions", "waveX", "waveY"],
  controls: [
    { id: "speed", label: "Speed", type: "range", min: 0, max: 3, step: 0.1, def: 0.3, decimals: 1, unit: "×", isAnimationControl: true },
    { id: "positions", label: "Points", type: "range", min: 1, max: 6, step: 1, def: 2, decimals: 0, random: [2, 5] },
    { id: "waveX", label: "Wave X", type: "range", min: 0, max: 3, step: 0.1, def: 1, decimals: 1, random: [0.3, 2.5] },
    { id: "waveY", label: "Wave Y", type: "range", min: 0, max: 3, step: 0.1, def: 1, decimals: 1, random: [0.3, 2.5] },
  ],
});
