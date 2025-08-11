import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

const __dirname = import.meta.dirname;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/testing/setup.js",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
