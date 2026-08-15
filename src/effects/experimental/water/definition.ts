import { Water, waterPresets } from "@paper-design/shaders-react";
import { shaderGenerator } from "../shaderGenerator";

export const water = shaderGenerator({
  id: "water-shader",
  name: "Water",
  componentName: "Water",
  description:
    "Animated water caustics with rippling highlights and edges. From @paper-design/shaders (Apache-2.0).",
  component: Water,
  presets: waterPresets as unknown as { name: string; params: Record<string, unknown> }[],
  tags: ["water", "caustics", "shader", "webgl", "animation"],
  props: ["speed", "highlights", "edges", "waves"],
  controls: [
    { id: "speed", label: "Speed", type: "range", min: 0, max: 3, step: 0.1, def: 1, decimals: 1, unit: "×", isAnimationControl: true },
    { id: "highlights", label: "Highlights", type: "range", min: 0, max: 1, step: 0.05, def: 0.07, decimals: 2, random: [0, 0.6] },
    { id: "edges", label: "Edges", type: "range", min: 0, max: 1, step: 0.05, def: 0.8, decimals: 2, random: [0.3, 1] },
    { id: "waves", label: "Waves", type: "range", min: 0, max: 1, step: 0.05, def: 0.3, decimals: 2, random: [0.1, 0.8] },
  ],
});
