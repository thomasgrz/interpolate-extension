// Button.stories.ts
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.
import { StrictMode } from "react";
import { Dashboard } from "../components/Dashboard/Dashboard";
import preview from ".storybook/preview";
import { Theme } from "@radix-ui/themes";
import { InterpolateProvider } from "#src/contexts/interpolate-context.tsx";

const meta = preview.meta({
  component: () => {
    return (
      <StrictMode>
        <Theme style={{ backgroundColor: "#FFDE21" }} radius="large">
          <InterpolateProvider>
            <Dashboard />
          </InterpolateProvider>
        </Theme>
      </StrictMode>
    );
  },
});

export default meta;

export const Default = meta.story({
  // @ts-expect-error TODO
  args: {},
});
