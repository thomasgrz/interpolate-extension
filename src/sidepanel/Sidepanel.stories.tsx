// Button.stories.ts
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect } from "react";
import { Dashboard } from "../components/Dashboard/Dashboard";
import { Theme } from "@radix-ui/themes";
import { InterpolateProvider } from "@/contexts/interpolate-context";
import { InterpolateStorage } from "../utils/storage/InterpolateStorage/InterpolateStorage.ts";
import { createRedirectInterpolation } from "../utils/factories/createRedirectInterpolation/createRedirectInterpolation.ts";
import preview from "#.storybook/preview";
const meta = preview.meta({
  component: Dashboard,
});

export default meta;

export const Default = meta.story({});
