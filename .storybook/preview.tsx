import "@radix-ui/themes/styles.css";
import { definePreview } from "@storybook/react-vite";
import { Container, Theme, ThemePanel } from "@radix-ui/themes";

export default definePreview({
  decorators: [
    // @ts-expect-error CSF next issue?
    (Story) => {
      return (
        <Container style={{ width: "50dvw", border: "3px dotted grey" }}>
          <Theme
            style={{ fontFamily: '"Space Mono", monospace', width: "100%" }}
          >
            <Story />
            <ThemePanel defaultOpen={true} />
          </Theme>
        </Container>
      );
    },
  ],
  // @ts-expect-error CSF next issue?
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
});
