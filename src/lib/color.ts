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
