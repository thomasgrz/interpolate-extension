import { defineManifest } from "@crxjs/vite-plugin";
import pkg from "./package.json";

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  icons: {
    128: "public/logo.png",
  },
  action: {
    default_icon: {
      128: "public/logo.png",
    },
    // default_popup: "src/popup/index.html",
    default_title: "click to open sidepanel",
  },
  devtools_page: "src/sidepanel/side-panel.html",
  permissions: [
    "activeTab",
    "contextMenus", // add an item to the menu displayed on right click
    "debugger",
    "sidePanel",
    "storage",
    "tabs",
    "userScripts",
    "webNavigation",
  ],
  content_scripts: [
    {
      js: ["src/content/main.tsx"],
      matches: ["https://*/*", "http://*/*"],
    },
  ],
  options_page: "src/options/index.html",
  host_permissions: ["<all_urls>"],
  side_panel: {
    default_path: "src/sidepanel/side-panel.html",
  },
  background: {
    service_worker: "src/background/background.ts",
    type: "module",
  },
  web_accessible_resources: [
    {
      resources: ["public/logo.png"],
      extension_ids: ["*"],
      matches: ["*://*/*"],
    },
  ],
});
