import { Waves, wavesPresets } from "@paper-design/shaders-react";
import { shaderGenerator } from "../shaderGenerator";

export const waves = shaderGenerator({
  id: "waves",
  name: "Waves",
  componentName: "Waves",
  description:
    "A crisp repeating wave / zig-zag line pattern on the GPU. From @paper-design/shaders (Apache-2.0).",
  component: Waves,
  presets: wavesPresets as unknown as { name: string; params: Record<string, unknown> }[],
  tags: ["waves", "lines", "pattern", "shader", "webgl"],
  animatable: false,
  props: ["shape", "frequency", "amplitude", "spacing"],
  controls: [
    { id: "shape", label: "Shape", type: "range", min: 0, max: 4, step: 1, def: 0, decimals: 0, random: [0, 4] },
    { id: "frequency", label: "Frequency", type: "range", min: 0, max: 2, step: 0.05, def: 0.5, decimals: 2, random: [0.2, 1.5] },
    { id: "amplitude", label: "Amplitude", type: "range", min: 0, max: 1, step: 0.05, def: 0.5, decimals: 2, random: [0.2, 0.9] },
    { id: "spacing", label: "Spacing", type: "range", min: 0.2, max: 3, step: 0.1, def: 1.2, decimals: 1, random: [0.5, 2.5] },
  ],
});
