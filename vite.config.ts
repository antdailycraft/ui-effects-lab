/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves a project site under /<repo>/, so the built asset URLs
// need that prefix. Vercel (and local dev/preview) serve from the root.
// The Pages workflow sets DEPLOY_TARGET=gh-pages; everything else uses "/".
const base = process.env.DEPLOY_TARGET === "gh-pages" ? "/ui-effects-lab/" : "/";

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    // Expose the dev server on all network interfaces (external access).
    host: true,
    port: 5180,
    strictPort: true,
    // Vite blocks unknown Host headers; permit access via http://atlas:5174.
    allowedHosts: ["atlas"],
  },
  preview: {
    host: true,
    port: 5180,
    strictPort: true,
    allowedHosts: ["atlas"],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
});
