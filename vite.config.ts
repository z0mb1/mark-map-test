import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    target: "es2022",
  },
  // @ts-ignore
  test: {
    include: ["src/**/*.test.ts"],
    environment: "jsdom",
    pool: "vmThreads",
  },
});
