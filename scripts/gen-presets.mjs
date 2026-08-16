// Regenerates src/effects/experimental/presets.generated.ts from the
// @paper-design/shaders-react preset exports, so the effect registry can carry
// generator metadata (built-in presets, default props) WITHOUT statically
// importing the WebGL library — that lets the components load lazily.
//
// Run:  node scripts/gen-presets.mjs
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";

const require = createRequire(import.meta.url);
const shaders = require("@paper-design/shaders-react");

const names = Object.keys(shaders)
  .filter((k) => /Presets$/.test(k))
  .sort();

let out =
  "// AUTO-GENERATED from @paper-design/shaders-react preset exports. Do not edit by hand.\n" +
  "// Regenerate with: node scripts/gen-presets.mjs\n\n" +
  "export type ShaderPreset = { name: string; params: Record<string, unknown> };\n\n";

for (const n of names) {
  out += `export const ${n}: ShaderPreset[] = ${JSON.stringify(shaders[n], null, 2)};\n\n`;
}

writeFileSync("src/effects/experimental/presets.generated.ts", out);
console.log(`wrote ${names.length} preset arrays`);
