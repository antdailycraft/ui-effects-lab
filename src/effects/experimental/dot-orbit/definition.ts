import { DotOrbit, dotOrbitPresets } from "@paper-design/shaders-react";
import { shaderGenerator } from "../shaderGenerator";

export const dotOrbit = shaderGenerator({
  id: "dot-orbit",
  name: "Dot Orbit",
  componentName: "DotOrbit",
  description:
    "A grid of colored dots orbiting their cells on the GPU. From @paper-design/shaders (Apache-2.0).",
  component: DotOrbit,
  base: dotOrbitPresets[0].params as Record<string, unknown>,
  tags: ["dots", "orbit", "shader", "webgl", "animation"],
  props: ["speed", "size", "spreading", "scale"],
  controls: [
    { id: "speed", label: "Speed", type: "range", min: 0, max: 3, step: 0.1, def: 1.5, decimals: 1, unit: "×", isAnimationControl: true },
    { id: "size", label: "Dot Size", type: "range", min: 0.2, max: 2, step: 0.05, def: 1, decimals: 2, random: [0.4, 1.6] },
    { id: "spreading", label: "Spread", type: "range", min: 0, max: 2, step: 0.05, def: 1, decimals: 2, random: [0.3, 1.8] },
    { id: "scale", label: "Scale", type: "range", min: 0.5, max: 2, step: 0.05, def: 1, decimals: 2, random: [0.7, 1.6] },
  ],
});
