import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  const isLibraryBuild = mode === "lib";
  const isDemoBuild = mode === "demo";

  return {
    plugins: [vue()],
    base: isDemoBuild ? "/Organization-Chart-Vue3/" : "/",
    build: isLibraryBuild
      ? {
          outDir: "dist",
          emptyOutDir: false,
          copyPublicDir: false,
          lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "OrganizationChart",
            fileName: "organization-chart-vue3",
            cssFileName: "style",
          },
          rollupOptions: {
            external: ["vue"],
            output: {
              globals: {
                vue: "Vue",
              },
            },
          },
        }
      : isDemoBuild
        ? {
            outDir: "docs",
            emptyOutDir: true,
          }
        : undefined,
    test: {
      environment: "jsdom",
      globals: true,
      include: ["tests/**/*.spec.ts"],
    },
  };
});
