import { FC } from "react";
import "@radix-ui/themes/styles.css";
import type { Preview } from "@storybook/react";
import { Container, Theme, ThemePanel } from "@radix-ui/themes";

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
      <Container style={{ width: "50dvw", border: "3px dotted grey" }}>
        <Theme style={{ fontFamily: '"Space Mono", monospace', width: "100%" }}>
          <Story />
          <ThemePanel defaultOpen={true} />
        </Theme>
      </Container>
    );
  },
];

export default preview;
