import { crx } from "@crxjs/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import zip from "vite-plugin-zip-pack";
import manifest from "./manifest.config.js";
import { name, version } from "./package.json";

export default defineConfig(({ mode }) => ({
  resolve: {
    alias: {
      "@": `${path.resolve(__dirname, "src")}`,
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      svgrOptions: {
        exportType: "default",
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: "**/*.svg",
    }),
    mode === "unit-test" ? null : crx({ manifest }),
    zip({ outDir: "release", outFileName: `crx-${name}-${version}.zip` }),
  ],
  server: {
    cors: {
      origin: [/chrome-extension:\/\//],
    },
  },
}));
