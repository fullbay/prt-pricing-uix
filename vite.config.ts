import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { loadEnv } from "vite";
import { configDefaults, defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Check if we're in test mode
  const isTest = mode === "test";

  const env = loadEnv(mode, process.cwd(), "");
  const BaseURL = env.VITE_MY_URL || "/";

  return {
    base: BaseURL,
    plugins: [
      react(),
      // Only use federation plugin when not testing
      ...(!isTest
        ? [
            federation({
              name: "temp",
              filename: "fullbay-mf-maincomponent.js",
              exposes: {
                "./MyComponent": "./src/entryPoints/partPricingScales.tsx",
              },
              shared: {
                react: { singleton: true },
                "react-dom": {
                  singleton: true,
                },
                i18next: {
                  singleton: true,
                },
                "@tanstack/react-query": {
                  singleton: true,
                },
                "react-router-dom": {
                  singleton: true,
                },
              },
            }),
          ]
        : []),
    ],
    build: {
      target: "esnext",
    },
    optimizeDeps: {
      exclude: ["js-big-decimal"],
    },
    resolve: {
      alias: {
        "@src": path.resolve(__dirname, "src"),
        "@components": path.resolve(__dirname, "src/components"),
        "@features": path.resolve(__dirname, "src/features"),
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./vitest.setup.ts"],
      exclude: [...configDefaults.exclude],
      deps: {
        moduleDirectories: ["node_modules", path.resolve("../../packages")],
      },
      coverage: {
        reporter: ["text", "html"],
        exclude: [
          ...configDefaults.exclude,
          "codegen.ts",
          ".__mf__temp/",
          "src/vite-env.d.ts",
          "src/__mocks__",
          "src/__tests__",
          "src/types",
        ],
      },
    },
  };
});
