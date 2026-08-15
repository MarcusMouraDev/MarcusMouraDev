import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    include: ["src/**/*.test.{ts,tsx}"],
    environment: "jsdom",
    environmentOptions: {
      jsdom: {
        url: "https://portfolio.test/",
      },
    },
    setupFiles: "./src/test/setup.ts",
    css: true,
  },
});
