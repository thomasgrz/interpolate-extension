// Button.stories.ts
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.
import * as React from "react";
import "../../sidepanel/Sidepanel.css";

import { createRedirectInterpolation } from "@/utils/factories/createRedirectInterpolation/createRedirectInterpolation";
import { InterpolationCard } from "./InterpolationCard";
import { createHeaderInterpolation } from "@/utils/factories/createHeaderInterpolation/createHeaderInterpolation";
import { createScriptInterpolation } from "@/utils/factories/createScriptInterpolation/createScriptInterpolation";

import preview from "#.storybook/preview";

type CustomProps = React.ComponentProps<typeof InterpolationCard>;

const meta = preview.meta({
  component: InterpolationCard,
  // 👇 Correct types
  render: ({ ...args }) => <InterpolationCard {...args} />,
});

export default meta;

// 👇 A story named Primary that renders `<Button primary label="Button" />`
export const RedirectPreview = meta.story({
  args: {
    info: createRedirectInterpolation({
      source: ".*example.com",
      destination: "https://google.com",
      name: "rule name",
    }),
  },
});

export const HeaderPreview = meta.story({
  args: {
    info: createHeaderInterpolation({
      headerKey: "header key",
      headerValue: "header value",
      name: "rule name",
    }),
  },
});

export const ScriptPreview = meta.story({
  args: {
    info: createScriptInterpolation({
      body: 'console.log("hello world")!',
      name: "say hello world",
    }),
  },
});
