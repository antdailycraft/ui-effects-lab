/** HSL (h in degrees, s/l in 0..1) → RGB channels in 0..1. */
export function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const hue = (((h % 360) + 360) % 360) / 360;
  if (s === 0) return [l, l, l];
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hue2rgb = (t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [hue2rgb(hue + 1 / 3), hue2rgb(hue), hue2rgb(hue - 1 / 3)];
}

/** HSL → "#rrggbb". */
export function hslToHex(h: number, s: number, l: number): string {
  const to = (x: number) => Math.round(x * 255).toString(16).padStart(2, "0");
  const [r, g, b] = hslToRgb(h, s, l);
  return `#${to(r)}${to(g)}${to(b)}`;
}

/** "#rgb" or "#rrggbb" → RGB channels in 0..1 (falls back to black on bad input). */
export function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return [0, 0, 0];
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

/** RGB channels in 0..1 → HSL (h in degrees, s/l in 0..1). */
export function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return [h * 60, s, l];
}

/** Rotate a hex color's hue by `deg` degrees, preserving saturation/lightness. */
export function rotateHueHex(hex: string, deg: number): string {
  const [h, s, l] = rgbToHsl(...hexToRgb(hex));
  return hslToHex(h + deg, s, l);
}
