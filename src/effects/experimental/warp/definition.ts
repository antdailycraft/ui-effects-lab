import { Warp } from "@paper-design/shaders-react";
import type { EffectDefinition } from "../../../types/effects";

const COLORS = ["#121212", "#9470ff", "#121212", "#8838ff"];

export const warp: EffectDefinition = {
  id: "warp-shader",
  name: "Warp",
  sub: "@paper-design/shaders",
  category: "experimental",
  categoryLabel: "Generators",
  tags: ["warp", "shader", "webgl", "animation"],
  tech: ["WebGL", "@paper-design/shaders"],
  description:
    "A GPU shader that warps layered shapes into flowing marbled ribbons. From @paper-design/shaders (Apache-2.0).",
  license: "Apache-2.0",
  kind: "generator",
  animatable: true,
  previewTypes: ["card"],
  controls: [
    { id: "speed", label: "Speed", type: "range", min: 0, max: 3, step: 0.1, def: 1, decimals: 1, unit: "×", isAnimationControl: true },
    { id: "distortion", label: "Distortion", type: "range", min: 0, max: 1, step: 0.05, def: 0.25, decimals: 2, random: [0.1, 0.8] },
    { id: "swirl", label: "Swirl", type: "range", min: 0, max: 1, step: 0.05, def: 0.8, decimals: 2, random: [0.3, 1] },
    { id: "softness", label: "Softness", type: "range", min: 0, max: 1, step: 0.05, def: 1, decimals: 2, random: [0.3, 1] },
  ],
  component: Warp as unknown as EffectDefinition["component"],
  buildProps: (p, animate) => ({
    style: { width: "100%", height: "100%" },
    colors: COLORS,
    speed: animate ? (p.speed as number) : 0,
    distortion: p.distortion,
    swirl: p.swirl,
    softness: p.softness,
  }),
  buildReact: (p, animate) =>
    `import { Warp } from "@paper-design/shaders-react";

<Warp
  style={{ width: "100%", height: "100%" }}
  colors={["#121212", "#9470ff", "#121212", "#8838ff"]}
  speed={${animate ? (p.speed as number) : 0}}
  distortion={${p.distortion}}
  swirl={${p.swirl}}
  softness={${p.softness}}
/>`,
};
