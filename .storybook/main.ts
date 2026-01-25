import type { StorybookConfig } from "@storybook/react-vite";
import { defineMain } from "@storybook/react-vite/node";

export default defineMain({
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-a11y", "@storybook/addon-docs"],
  framework: "@storybook/react-vite",
});

