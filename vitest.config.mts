// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    // This runs BEFORE all test files and their imports execute
    setupFiles: ["./vitest.setup.ts"],
    alias: {
      "@": path.resolve(__dirname, "./"),
      "@components": path.resolve(__dirname, "./app/components"),
      "@utils": path.resolve(__dirname, "./app/utils"),
      "@styles": path.resolve(__dirname, "./app/styles"),
    },
  },
});
