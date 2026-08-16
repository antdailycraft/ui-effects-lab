import { dotGridPresets } from "../presets.generated";
import { shaderGenerator } from "../shaderGenerator";

export const dotGrid = shaderGenerator({
  id: "dot-grid",
  name: "Dot Grid",
  componentName: "DotGrid",
  description:
    "A crisp configurable grid of dots rendered on the GPU. From @paper-design/shaders (Apache-2.0).",
  presets: dotGridPresets,
  tags: ["dots", "grid", "shader", "webgl"],
  animatable: false,
  props: ["size", "gapX", "gapY", "strokeWidth"],
  controls: [
    { id: "size", label: "Dot Size", type: "range", min: 1, max: 10, step: 1, def: 2, decimals: 0, unit: "px", random: [2, 8] },
    { id: "gapX", label: "Gap X", type: "range", min: 8, max: 64, step: 2, def: 32, decimals: 0, unit: "px", random: [12, 56] },
    { id: "gapY", label: "Gap Y", type: "range", min: 8, max: 64, step: 2, def: 32, decimals: 0, unit: "px", random: [12, 56] },
    { id: "strokeWidth", label: "Stroke Width", type: "range", min: 0, max: 4, step: 0.5, def: 0, decimals: 1, unit: "px", random: [0, 3] },
  ],
});
