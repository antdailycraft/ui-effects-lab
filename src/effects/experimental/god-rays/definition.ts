import { godRaysPresets } from "../presets.generated";
import { shaderGenerator } from "../shaderGenerator";

export const godRays = shaderGenerator({
  id: "god-rays",
  name: "God Rays",
  componentName: "GodRays",
  description:
    "Volumetric light rays beaming from a center point on the GPU. From @paper-design/shaders (Apache-2.0).",
  presets: godRaysPresets,
  tags: ["light", "rays", "shader", "webgl", "animation"],
  props: ["speed", "density", "intensity", "bloom"],
  controls: [
    { id: "speed", label: "Speed", type: "range", min: 0, max: 3, step: 0.1, def: 0.75, decimals: 1, unit: "×", isAnimationControl: true },
    { id: "density", label: "Ray Density", type: "range", min: 0, max: 1, step: 0.05, def: 0.3, decimals: 2, random: [0.1, 0.8] },
    { id: "intensity", label: "Intensity", type: "range", min: 0, max: 2, step: 0.05, def: 0.8, decimals: 2, random: [0.4, 1.6] },
    { id: "bloom", label: "Bloom", type: "range", min: 0, max: 1, step: 0.05, def: 0.4, decimals: 2, random: [0.1, 0.9] },
  ],
});
