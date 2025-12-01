import { FC } from "react";
import "@radix-ui/themes/styles.css";
import type { Preview } from "@storybook/react";
import { Theme, ThemePanel } from "@radix-ui/themes";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const decorators = [
  (Story: FC) => {
    return (
      <Theme>
        <Story />
        <ThemePanel defaultOpen={true} />
      </Theme>
    );
  },
];

export default preview;
