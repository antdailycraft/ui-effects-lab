import { colorPanelsPresets } from "../presets.generated";
import { shaderGenerator } from "../shaderGenerator";

export const colorPanels = shaderGenerator({
  id: "color-panels",
  name: "Color Panels",
  componentName: "ColorPanels",
  description:
    "Translucent colored panels drifting and layering in 3-D. From @paper-design/shaders (Apache-2.0).",
  presets: colorPanelsPresets,
  tags: ["panels", "layers", "shader", "webgl", "animation"],
  props: ["speed", "length", "blur", "scale"],
  controls: [
    { id: "speed", label: "Speed", type: "range", min: 0, max: 3, step: 0.1, def: 0.5, decimals: 1, unit: "×", isAnimationControl: true },
    { id: "length", label: "Length", type: "range", min: 0.5, max: 2, step: 0.05, def: 1.1, decimals: 2, random: [0.7, 1.8] },
    { id: "blur", label: "Blur", type: "range", min: 0, max: 1, step: 0.05, def: 0, decimals: 2, random: [0, 0.6] },
    { id: "scale", label: "Scale", type: "range", min: 0.4, max: 1.5, step: 0.05, def: 0.8, decimals: 2, random: [0.5, 1.3] },
  ],
});
