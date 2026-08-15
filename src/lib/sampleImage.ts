/**
 * Self-contained sample images (PNG data URIs drawn on a canvas) so the
 * image-based shaders have content to process offline. Falls back to an empty
 * string outside a browser (e.g. in tests), where shaders are never rendered.
 */
type Paint = (ctx: CanvasRenderingContext2D, w: number, h: number) => void;

function toDataUrl(paint: Paint): string {
  if (typeof document === "undefined") return "";
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 420;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";
    paint(ctx, canvas.width, canvas.height);
    return canvas.toDataURL("image/png");
  } catch {
    return "";
  }
}

function blob(ctx: CanvasRenderingContext2D, w: number, h: number, x: number, y: number, r: number, color: string) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, color);
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

const aurora: Paint = (ctx, w, h) => {
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, "#241d9a");
  g.addColorStop(0.5, "#f75092");
  g.addColorStop(1, "#00bfff");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  blob(ctx, w, h, w * 0.2, h * 0.25, 260, "#ffd36e");
  blob(ctx, w, h, w * 0.82, h * 0.3, 240, "#9f50d3");
  blob(ctx, w, h, w * 0.5, h * 0.95, 320, "#3bffd1");
};

const shapes: Paint = (ctx, w, h) => {
  ctx.fillStyle = "#0e1116";
  ctx.fillRect(0, 0, w, h);
  const cols = ["#ff5d73", "#ffb020", "#3bffd1", "#6a5cff", "#f585ff"];
  for (let i = 0; i < 30; i++) {
    ctx.fillStyle = cols[i % cols.length];
    const x = (i * 137) % w;
    const y = (i * 89) % h;
    const s = 22 + ((i * 53) % 78);
    ctx.beginPath();
    ctx.arc(x, y, s / 2, 0, Math.PI * 2);
    ctx.fill();
  }
};

const poster: Paint = (ctx, w, h) => {
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, "#ff8a3d");
  g.addColorStop(0.55, "#ff5d73");
  g.addColorStop(1, "#c0417a");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  blob(ctx, w, h, w * 0.75, h * 0.2, 220, "#ffd36e");
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 150px system-ui, sans-serif";
  ctx.textBaseline = "middle";
  ctx.fillText("AB", w * 0.08, h * 0.55);
};

export interface SampleImage {
  name: string;
  url: string;
}

export const SAMPLE_IMAGES: SampleImage[] = [
  { name: "Aurora", url: toDataUrl(aurora) },
  { name: "Shapes", url: toDataUrl(shapes) },
  { name: "Poster", url: toDataUrl(poster) },
];

export const DEFAULT_IMAGE = SAMPLE_IMAGES[0].url;
