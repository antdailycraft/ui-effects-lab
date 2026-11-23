/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Every deploy target serves from the root: GitHub Pages uses the custom
// domain https://effects.aidaon.com, and Vercel / local dev / preview use "/".
const base = "/";

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // React in its own cacheable chunk. The WebGL shader library is now
        // reached only via dynamic import (lazy generators), so Rollup emits it
        // as an on-demand chunk automatically — it's no longer in the initial load.
        manualChunks: {
          react: ["react", "react-dom"],
        },
      },
    },
  },
  server: {
    // Expose the dev server on all network interfaces (external access).
    host: true,
    port: 5180,
    strictPort: true,
  },
  preview: {
    host: true,
    port: 5180,
    strictPort: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
});
