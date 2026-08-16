import { staticRadialGradientPresets } from "../presets.generated";
import { shaderGenerator } from "../shaderGenerator";

export const staticRadialGradient = shaderGenerator({
  id: "static-radial-gradient",
  name: "Static Radial Gradient",
  componentName: "StaticRadialGradient",
  description:
    "A soft radial gradient with adjustable focal point and falloff on the GPU. From @paper-design/shaders (Apache-2.0).",
  presets: staticRadialGradientPresets,
  tags: ["gradient", "radial", "shader", "webgl", "animation"],
  props: ["speed", "radius", "focalDistance", "falloff"],
  controls: [
    { id: "speed", label: "Speed", type: "range", min: 0, max: 3, step: 0.1, def: 0.3, decimals: 1, unit: "×", isAnimationControl: true },
    { id: "radius", label: "Radius", type: "range", min: 0.2, max: 1.5, step: 0.05, def: 0.8, decimals: 2, random: [0.4, 1.3] },
    { id: "focalDistance", label: "Focal Distance", type: "range", min: 0, max: 1, step: 0.01, def: 0.99, decimals: 2, random: [0.2, 1] },
    { id: "falloff", label: "Falloff", type: "range", min: 0, max: 1, step: 0.01, def: 0.24, decimals: 2, random: [0.05, 0.8] },
  ],
});
