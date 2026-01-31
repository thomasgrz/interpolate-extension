import "@radix-ui/themes/styles.css";
import { definePreview } from "@storybook/react-vite";
import { Container, Theme, ThemePanel } from "@radix-ui/themes";
import { InterpolateProvider } from "../src/contexts/interpolate-context.tsx";
import { createRedirectInterpolation } from "../src/utils/factories/createRedirectInterpolation/createRedirectInterpolation.ts";

export default definePreview({
  decorators: [
    (Story) => {
      const initialValue = [createRedirectInterpolation({ name: "test" })];
      return (
        <Theme
          theme={"light"}
          style={{ backgroundColor: "#FFDE21" }}
          radius="large"
        >
          <InterpolateProvider initialValue={initialValue}>
            <Story />
          </InterpolateProvider>
        </Theme>
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
