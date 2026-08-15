import { PulsingBorder, pulsingBorderPresets } from "@paper-design/shaders-react";
import { shaderGenerator } from "../shaderGenerator";

export const pulsingBorder = shaderGenerator({
  id: "pulsing-border",
  name: "Pulsing Border",
  componentName: "PulsingBorder",
  description:
    "A glowing, pulsing border of colored light around the frame. From @paper-design/shaders (Apache-2.0).",
  component: PulsingBorder,
  presets: pulsingBorderPresets as unknown as { name: string; params: Record<string, unknown> }[],
  tags: ["border", "glow", "pulse", "shader", "webgl", "animation"],
  props: ["speed", "thickness", "intensity", "bloom"],
  controls: [
    { id: "speed", label: "Speed", type: "range", min: 0, max: 3, step: 0.1, def: 1, decimals: 1, unit: "×", isAnimationControl: true },
    { id: "thickness", label: "Thickness", type: "range", min: 0, max: 0.3, step: 0.01, def: 0.1, decimals: 2, random: [0.03, 0.2] },
    { id: "intensity", label: "Intensity", type: "range", min: 0, max: 1, step: 0.05, def: 0.2, decimals: 2, random: [0.1, 0.8] },
    { id: "bloom", label: "Bloom", type: "range", min: 0, max: 1, step: 0.05, def: 0.25, decimals: 2, random: [0.1, 0.8] },
  ],
});
