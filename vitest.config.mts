import { defineConfig, configDefaults, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig((configEnv) => {
  return mergeConfig(
    viteConfig({ ...configEnv, mode: "unit-test" }),
    defineConfig({
      define: {
        TEST: "true",
      },
      test: {
        exclude: [...configDefaults.exclude, "browser-tests"],
        projects: [
          {
            // Unit tests that can be run in Node environment
            extends: true,
            test: {
              setupFiles: ["./vitest.node.setup.mts"],
              environment: "happy-dom",
              name: "unit",
              include: ["**/*.node.test.ts", "**/*.node.test.tsx"],
              exclude: ["**/*.browser.test.tsx", "**/*.browser.test.ts"],
            },
          },
          {
            // Browser tests using Playwright in browser mode
            extends: true,
            test: {
              fileParallelism: false,
              setupFiles: ["./vitest.browser.setup.mts"],
              name: "browser",
              include: ["**/*.browser.test.tsx", "**/*.browser.test.ts"],
              browser: {
                headless: !!process.env.CI,
                enabled: true,
                provider: playwright({
                  actionTimeout: 2000,
                  launchOptions: {
                    // channel: "chrome",
                    timeout: 2000,
                  },
                }),
                instances: [{ browser: "chromium" }],
              },
            },
          },
        ],
      },
    }),
  );
});
