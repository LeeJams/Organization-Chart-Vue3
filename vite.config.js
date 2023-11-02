import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // base: "/Organization-Chart-Vue3/",
  build: {
    // outDir: "docs",
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "OrganizationChart",
      fileName: "organization-chart-vue3",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
