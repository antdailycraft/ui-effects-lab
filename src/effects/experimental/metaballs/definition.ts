import { Metaballs, metaballsPresets } from "@paper-design/shaders-react";
import { shaderGenerator } from "../shaderGenerator";

export const metaballs = shaderGenerator({
  id: "metaballs",
  name: "Metaballs",
  componentName: "Metaballs",
  description:
    "Merging organic blobs (metaballs) rendered on the GPU. From @paper-design/shaders (Apache-2.0).",
  component: Metaballs,
  presets: metaballsPresets as unknown as { name: string; params: Record<string, unknown> }[],
  tags: ["metaballs", "blob", "shader", "webgl", "animation"],
  props: ["speed", "count", "size", "scale"],
  controls: [
    { id: "speed", label: "Speed", type: "range", min: 0, max: 3, step: 0.1, def: 1, decimals: 1, unit: "×", isAnimationControl: true },
    { id: "count", label: "Ball Count", type: "range", min: 1, max: 20, step: 1, def: 10, decimals: 0, random: [4, 16] },
    { id: "size", label: "Ball Size", type: "range", min: 0.2, max: 1.5, step: 0.01, def: 0.83, decimals: 2, random: [0.4, 1.2] },
    { id: "scale", label: "Scale", type: "range", min: 0.5, max: 2, step: 0.05, def: 1, decimals: 2, random: [0.7, 1.6] },
  ],
});
