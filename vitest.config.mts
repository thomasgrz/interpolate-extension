import { defineConfig, configDefaults, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig((configEnv) => {
  return mergeConfig(viteConfig, {
    excludeCrx: true,
    test: {
      exclude: [...configDefaults.exclude, "browser-tests"],

      browser: {
        enabled: true,
        provider: playwright({
          actionTimeout: 2000,
          launchOptions: {
            channel: "chrome-beta",
            timeout: 2000,
          },
        }),
        instances: [{ browser: "chrome" }],
      },
    },
  });
});
