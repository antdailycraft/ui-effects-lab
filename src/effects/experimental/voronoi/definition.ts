import { voronoiPresets } from "../presets.generated";
import { shaderGenerator } from "../shaderGenerator";

export const voronoi = shaderGenerator({
  id: "voronoi",
  name: "Voronoi",
  componentName: "Voronoi",
  description:
    "Animated Voronoi cells with adjustable gaps and glow, rendered on the GPU. From @paper-design/shaders (Apache-2.0).",
  presets: voronoiPresets,
  tags: ["voronoi", "cells", "shader", "webgl", "animation"],
  props: ["speed", "distortion", "gap", "glow", "scale"],
  controls: [
    { id: "speed", label: "Speed", type: "range", min: 0, max: 3, step: 0.1, def: 0.5, decimals: 1, unit: "×", isAnimationControl: true },
    { id: "distortion", label: "Distortion", type: "range", min: 0, max: 1, step: 0.05, def: 0.4, decimals: 2, random: [0.1, 0.8] },
    { id: "gap", label: "Cell Gap", type: "range", min: 0, max: 0.2, step: 0.005, def: 0.04, decimals: 3, random: [0.01, 0.12] },
    { id: "glow", label: "Glow", type: "range", min: 0, max: 1, step: 0.05, def: 0, decimals: 2, random: [0, 0.6] },
    { id: "scale", label: "Scale", type: "range", min: 0.3, max: 1.5, step: 0.05, def: 0.5, decimals: 2, random: [0.4, 1] },
  ],
});
