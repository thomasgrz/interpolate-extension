// Button.stories.ts
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.
import type { Meta, StoryObj } from "@storybook/react-vite";
import "./Sidepanel.css";

import { Dashboard } from "../components/Dashboard/Dashboard";
import { Theme } from "@radix-ui/themes";
import { InterpolateProvider } from "@/contexts/interpolate-context";

const meta = {
  // 👇 The component you're working on
  component: Dashboard,
  decorators: (Story) => {
    return (
      <Theme style={{ backgroundColor: "#FFDE21" }} radius="large">
        <InterpolateProvider>
          <Story />
        </InterpolateProvider>
      </Theme>
    );
  },
} satisfies Meta<typeof Dashboard>;

export default meta;
// 👇 Type helper to reduce boilerplate
type Story = StoryObj<typeof meta>;

// 👇 A story named Primary that renders `<Button primary label="Button" />`
export const Sidepanel: Story = {
  args: {},
};
