import { paperTexturePresets } from "../presets.generated";
import { shaderGenerator } from "../shaderGenerator";

export const paperTexture = shaderGenerator({
  id: "paper-texture",
  name: "Paper Texture",
  componentName: "PaperTexture",
  description:
    "Procedural paper fibre, roughness and crumples on the GPU. From @paper-design/shaders (Apache-2.0).",
  presets: paperTexturePresets,
  tags: ["paper", "texture", "fibre", "shader", "webgl", "animation"],
  props: ["speed", "contrast", "roughness", "crumples"],
  controls: [
    { id: "speed", label: "Speed", type: "range", min: 0, max: 3, step: 0.1, def: 0.3, decimals: 1, unit: "×", isAnimationControl: true },
    { id: "contrast", label: "Contrast", type: "range", min: 0, max: 1, step: 0.05, def: 0.3, decimals: 2, random: [0.1, 0.8] },
    { id: "roughness", label: "Roughness", type: "range", min: 0, max: 1, step: 0.05, def: 0.4, decimals: 2, random: [0.1, 0.9] },
    { id: "crumples", label: "Crumples", type: "range", min: 0, max: 1, step: 0.05, def: 0.3, decimals: 2, random: [0, 0.8] },
  ],
});
