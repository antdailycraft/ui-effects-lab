import "@testing-library/jest-dom";

// jsdom has no canvas backend; sampleImage.ts calls getContext and already
// treats a null context as "no image". Stub it to silence the noisy
// "HTMLCanvasElement.prototype.getContext not implemented" errors in test output.
if (typeof HTMLCanvasElement !== "undefined") {
  HTMLCanvasElement.prototype.getContext = (() =>
    null) as typeof HTMLCanvasElement.prototype.getContext;
}

// jsdom has no IntersectionObserver. Provide a no-op that never intersects, so
// gallery generator tiles stay as placeholders (no WebGL mount) in tests.
if (typeof IntersectionObserver === "undefined") {
  class IO {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  (globalThis as unknown as { IntersectionObserver: unknown }).IntersectionObserver = IO;
}
