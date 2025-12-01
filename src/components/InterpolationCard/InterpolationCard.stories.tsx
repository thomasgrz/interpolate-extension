// Button.stories.ts
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.
import type { Meta, StoryObj } from "@storybook/react-vite";
import "../../sidepanel/Sidepanel.css";

import { createRedirectInterpolation } from "@/utils/factories/createRedirectInterpolation/createRedirectInterpolation";
import { InterpolationCard } from "./InterpolationCard";
import { createHeaderInterpolation } from "@/utils/factories/createHeaderInterpolation/createHeaderInterpolation";
import { createScriptInterpolation } from "@/utils/factories/createScriptInterpolation/createScriptInterpolation";

const meta = {
  // 👇 The component you're working on
  component: InterpolationCard,
} satisfies Meta<typeof InterpolationCard>;

export default meta;
// 👇 Type helper to reduce boilerplate
type Story = StoryObj<typeof meta>;

// 👇 A story named Primary that renders `<Button primary label="Button" />`
export const RedirectPreview: Story = {
  args: {
    info: createRedirectInterpolation({
      source: ".*example.com",
      destination: "https://google.com",
      name: "rule name",
    }),
  },
};

export const HeaderPreview: Story = {
  args: {
    info: createHeaderInterpolation({
      headerKey: "header key",
      headerValue: "header value",
      name: "rule name",
    }),
  },
};

export const ScriptPreview: Story = {
  args: {
    info: createScriptInterpolation({
      body: 'console.log("hello world")!',
      name: "say hello world",
    }),
  },
};
