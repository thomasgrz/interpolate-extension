import { defineManifest } from "@crxjs/vite-plugin";
import pkg from "./package.json";

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  icons: {
    48: "public/icon.png",
  },
  action: {
    default_icon: {
      48: "public/icon.png",
    },
    // default_popup: "src/popup/index.html",
    default_title: "click to open sidepanel",
  },
  devtools_page: "src/sidepanel/side-panel.html",
  permissions: [
    "action",
    "activeTab",
    "contentSettings",
    "contextMenus", // add an item to the menu displayed on right click
    "debugger",
    "declarativeNetRequest",
    "declarativeNetRequestFeedback",
    "nativeMessaging",
    "offscreen",
    "sidePanel",
    "storage",
    "tabs",
    "userScripts",
    "webNavigation",
    "webRequest", // intercept request as it goes out (rather than subsequent requests after page load)
  ],
  content_scripts: [
    {
      js: ["src/content/main.tsx"],
      matches: ["https://*/*"],
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
});
