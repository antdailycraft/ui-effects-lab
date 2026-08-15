import { MeshGradient } from "@paper-design/shaders-react";
import type { EffectDefinition } from "../../../types/effects";

const COLORS = ["#e0eaff", "#241d9a", "#f75092", "#9f50d3"];

export const meshGradient: EffectDefinition = {
  id: "mesh-gradient",
  name: "Mesh Gradient",
  sub: "@paper-design/shaders",
  category: "experimental",
  categoryLabel: "Generators",
  tags: ["gradient", "shader", "webgl", "animation"],
  tech: ["WebGL", "@paper-design/shaders"],
  description:
    "An animated flowing mesh gradient rendered on the GPU. From @paper-design/shaders (Apache-2.0).",
  license: "Apache-2.0",
  kind: "generator",
  animatable: true,
  previewTypes: ["card"],
  controls: [
    { id: "speed", label: "Speed", type: "range", min: 0, max: 3, step: 0.1, def: 1, decimals: 1, unit: "×", isAnimationControl: true },
    { id: "distortion", label: "Distortion", type: "range", min: 0, max: 1, step: 0.05, def: 0.8, decimals: 2, random: [0.3, 1] },
    { id: "swirl", label: "Swirl", type: "range", min: 0, max: 1, step: 0.05, def: 0.1, decimals: 2, random: [0, 0.6] },
    { id: "scale", label: "Scale", type: "range", min: 0.5, max: 2, step: 0.05, def: 1, decimals: 2, random: [0.7, 1.6] },
  ],
  component: MeshGradient as unknown as EffectDefinition["component"],
  buildProps: (p, animate) => ({
    style: { width: "100%", height: "100%" },
    colors: COLORS,
    speed: animate ? (p.speed as number) : 0,
    distortion: p.distortion,
    swirl: p.swirl,
    scale: p.scale,
  }),
  buildReact: (p, animate) =>
    `import { MeshGradient } from "@paper-design/shaders-react";

<MeshGradient
  style={{ width: "100%", height: "100%" }}
  colors={["#e0eaff", "#241d9a", "#f75092", "#9f50d3"]}
  speed={${animate ? (p.speed as number) : 0}}
  distortion={${p.distortion}}
  swirl={${p.swirl}}
  scale={${p.scale}}
/>`,
};
