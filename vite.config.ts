/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Expose the dev server on all network interfaces (external access).
    host: true,
    port: 5174,
    strictPort: true,
    // Vite blocks unknown Host headers; permit access via http://atlas:5174.
    allowedHosts: ["atlas"],
  },
  preview: {
    host: true,
    port: 5174,
    strictPort: true,
    allowedHosts: ["atlas"],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
});
