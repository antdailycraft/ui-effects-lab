import { Voronoi } from "@paper-design/shaders-react";
import type { EffectDefinition } from "../../../types/effects";

const COLORS = ["#ff8247", "#ffe53d", "#ff4d8d", "#6a5cff"];

export const voronoi: EffectDefinition = {
  id: "voronoi",
  name: "Voronoi",
  sub: "@paper-design/shaders",
  category: "experimental",
  categoryLabel: "Generators",
  tags: ["voronoi", "cells", "shader", "webgl", "animation"],
  tech: ["WebGL", "@paper-design/shaders"],
  description:
    "Animated Voronoi cells with adjustable gaps and glow, rendered on the GPU. From @paper-design/shaders (Apache-2.0).",
  license: "Apache-2.0",
  kind: "generator",
  animatable: true,
  previewTypes: ["card"],
  controls: [
    { id: "speed", label: "Speed", type: "range", min: 0, max: 3, step: 0.1, def: 0.5, decimals: 1, unit: "×", isAnimationControl: true },
    { id: "distortion", label: "Distortion", type: "range", min: 0, max: 1, step: 0.05, def: 0.4, decimals: 2, random: [0.1, 0.8] },
    { id: "gap", label: "Cell Gap", type: "range", min: 0, max: 0.2, step: 0.005, def: 0.04, decimals: 3, random: [0.01, 0.12] },
    { id: "glow", label: "Glow", type: "range", min: 0, max: 1, step: 0.05, def: 0, decimals: 2, random: [0, 0.6] },
    { id: "scale", label: "Scale", type: "range", min: 0.3, max: 1.5, step: 0.05, def: 0.5, decimals: 2, random: [0.4, 1] },
  ],
  component: Voronoi as unknown as EffectDefinition["component"],
  buildProps: (p, animate) => ({
    style: { width: "100%", height: "100%" },
    colors: COLORS,
    speed: animate ? (p.speed as number) : 0,
    distortion: p.distortion,
    gap: p.gap,
    glow: p.glow,
    scale: p.scale,
  }),
  buildReact: (p, animate) =>
    `import { Voronoi } from "@paper-design/shaders-react";

<Voronoi
  style={{ width: "100%", height: "100%" }}
  colors={["#ff8247", "#ffe53d", "#ff4d8d", "#6a5cff"]}
  speed={${animate ? (p.speed as number) : 0}}
  distortion={${p.distortion}}
  gap={${p.gap}}
  glow={${p.glow}}
  scale={${p.scale}}
/>`,
};
