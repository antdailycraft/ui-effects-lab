import { expect, test } from "vitest";
import { encodeShare, decodeShare, shareUrl } from "./share";

test("encode → decode round-trips effect, params, and preview type", () => {
  const payload = {
    e: "swirl",
    p: { speed: 0.5, bandCount: 4, twist: 0.1, color1: "#ff00aa" },
    pv: "newspaper" as const,
  };
  const decoded = decodeShare(encodeShare(payload));
  expect(decoded).toEqual(payload);
});

test("decode handles unicode params", () => {
  const payload = { e: "text", p: { label: "안녕 · café" } };
  expect(decodeShare(encodeShare(payload))).toEqual(payload);
});

test("decode returns null for absent or malformed hashes", () => {
  expect(decodeShare("")).toBeNull();
  expect(decodeShare("#other=1")).toBeNull();
  expect(decodeShare("#s=not-valid-base64!!")).toBeNull();
});

test("decode drops an unrecognized preview type but keeps the rest", () => {
  const encoded = encodeShare({ e: "water", p: { scale: 20 }, pv: "hologram" as never });
  expect(decodeShare(encoded)).toEqual({ e: "water", p: { scale: 20 } });
});

test("shareUrl appends the encoded hash to a base", () => {
  const url = shareUrl({ e: "water", p: { scale: 20 } }, "https://x.dev/app");
  expect(url.startsWith("https://x.dev/app#s=")).toBe(true);
  expect(decodeShare(url.slice(url.indexOf("#")))).toEqual({ e: "water", p: { scale: 20 } });
});
