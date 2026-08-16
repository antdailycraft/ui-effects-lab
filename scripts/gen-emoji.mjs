// Extracts the emoji dataset embedded in docs/reference/EMOJI.html into
// src/data/emoji.generated.ts (char, name, group index). Kept out of the initial
// bundle — the emoji picker imports it lazily.
//
// Run:  node scripts/gen-emoji.mjs
import { readFileSync, writeFileSync } from "node:fs";

const html = readFileSync("docs/reference/EMOJI.html", "utf8");

/** Slice a top-level array literal assigned to `name=[ … ]` (brackets balanced). */
function extractArray(src, name) {
  const at = src.indexOf(name + "=[");
  if (at < 0) throw new Error(`could not find ${name}=[`);
  const from = src.indexOf("[", at);
  let depth = 0;
  for (let i = from; i < src.length; i++) {
    if (src[i] === "[") depth++;
    else if (src[i] === "]" && --depth === 0) return src.slice(from, i + 1);
  }
  throw new Error(`unbalanced array for ${name}`);
}

const groups = JSON.parse(extractArray(html, "G")); // English group names
const raw = JSON.parse(extractArray(html, "E")); // [char, name, groupIdx, hex, version]

// Keep only what the picker needs: char, name, group index.
const emoji = raw.map(([c, n, g]) => ({ c, n, g }));

const out =
  "// AUTO-GENERATED from docs/reference/EMOJI.html. Do not edit by hand.\n" +
  "// Regenerate with: node scripts/gen-emoji.mjs\n\n" +
  "export interface Emoji { c: string; n: string; g: number }\n\n" +
  `export const EMOJI_GROUPS: string[] = ${JSON.stringify(groups)};\n\n` +
  `export const EMOJI: Emoji[] = ${JSON.stringify(emoji)};\n`;

writeFileSync("src/data/emoji.generated.ts", out);
console.log(`wrote ${emoji.length} emoji across ${groups.length} groups`);
