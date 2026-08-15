import { PerlinNoise, perlinNoisePresets } from "@paper-design/shaders-react";
import { shaderGenerator } from "../shaderGenerator";

export const perlinNoise = shaderGenerator({
  id: "perlin-noise",
  name: "Perlin Noise",
  componentName: "PerlinNoise",
  description:
    "Classic fractal Perlin noise clouds with adjustable octaves. From @paper-design/shaders (Apache-2.0).",
  component: PerlinNoise,
  presets: perlinNoisePresets as unknown as { name: string; params: Record<string, unknown> }[],
  tags: ["noise", "perlin", "clouds", "shader", "webgl", "animation"],
  props: ["speed", "proportion", "softness", "octaveCount"],
  controls: [
    { id: "speed", label: "Speed", type: "range", min: 0, max: 3, step: 0.1, def: 0.5, decimals: 1, unit: "×", isAnimationControl: true },
    { id: "proportion", label: "Proportion", type: "range", min: 0, max: 1, step: 0.05, def: 0.35, decimals: 2, random: [0.1, 0.8] },
    { id: "softness", label: "Softness", type: "range", min: 0, max: 1, step: 0.05, def: 0.1, decimals: 2, random: [0, 0.7] },
    { id: "octaveCount", label: "Octaves", type: "range", min: 1, max: 6, step: 1, def: 1, decimals: 0, random: [1, 5] },
  ],
});
