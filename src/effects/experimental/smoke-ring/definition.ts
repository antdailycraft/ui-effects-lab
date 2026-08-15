import { SmokeRing, smokeRingPresets } from "@paper-design/shaders-react";
import { shaderGenerator } from "../shaderGenerator";

export const smokeRing = shaderGenerator({
  id: "smoke-ring",
  name: "Smoke Ring",
  componentName: "SmokeRing",
  description:
    "A soft ring of turbulent smoke curling around a center. From @paper-design/shaders (Apache-2.0).",
  component: SmokeRing,
  presets: smokeRingPresets as unknown as { name: string; params: Record<string, unknown> }[],
  tags: ["smoke", "ring", "shader", "webgl", "animation"],
  props: ["speed", "radius", "thickness", "noiseScale"],
  controls: [
    { id: "speed", label: "Speed", type: "range", min: 0, max: 3, step: 0.1, def: 0.5, decimals: 1, unit: "×", isAnimationControl: true },
    { id: "radius", label: "Radius", type: "range", min: 0.05, max: 0.5, step: 0.01, def: 0.25, decimals: 2, random: [0.1, 0.4] },
    { id: "thickness", label: "Thickness", type: "range", min: 0.1, max: 1, step: 0.05, def: 0.65, decimals: 2, random: [0.3, 0.9] },
    { id: "noiseScale", label: "Turbulence", type: "range", min: 1, max: 8, step: 0.5, def: 3, decimals: 1, random: [1.5, 6] },
  ],
});
