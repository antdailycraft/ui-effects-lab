import type { Params, PreviewType } from "../types/effects";

/** Everything needed to reconstruct a shared playground view. */
export interface SharePayload {
  /** effectId */
  e: string;
  /** parameters */
  p: Params;
  /** previewType (optional) */
  pv?: PreviewType;
}

const PREFIX = "#s=";
const PREVIEW_TYPES: PreviewType[] = ["card", "text", "image", "button", "newspaper"];

/** UTF-8 string → base64url (no padding). */
function toB64Url(s: string): string {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** base64url → UTF-8 string. */
function fromB64Url(s: string): string {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4 ? "=".repeat(4 - (b64.length % 4)) : "";
  const bin = atob(b64 + pad);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

/** The `#s=…` hash fragment encoding this payload. */
export function encodeShare(payload: SharePayload): string {
  return PREFIX + toB64Url(JSON.stringify(payload));
}

/** A full shareable URL for the payload (defaults to the current page). */
export function shareUrl(
  payload: SharePayload,
  base = typeof location !== "undefined" ? location.origin + location.pathname : ""
): string {
  return base + encodeShare(payload);
}

/** Parse a `#s=…` hash back into a payload, or null if absent/malformed. */
export function decodeShare(hash: string): SharePayload | null {
  if (!hash || !hash.startsWith(PREFIX)) return null;
  try {
    const obj = JSON.parse(fromB64Url(hash.slice(PREFIX.length))) as unknown;
    if (
      obj &&
      typeof obj === "object" &&
      typeof (obj as SharePayload).e === "string" &&
      (obj as SharePayload).p &&
      typeof (obj as SharePayload).p === "object"
    ) {
      const payload = obj as SharePayload;
      // Drop an unrecognized preview type rather than trust it blindly.
      if (payload.pv && !PREVIEW_TYPES.includes(payload.pv)) delete payload.pv;
      return payload;
    }
  } catch {
    /* malformed hash */
  }
  return null;
}
