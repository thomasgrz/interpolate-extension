import "@radix-ui/themes/styles.css";
import { definePreview } from "@storybook/react-vite";
import { Theme } from "@radix-ui/themes";
import { InterpolateProvider } from "../src/contexts/interpolate-context.tsx";
import { createRedirectInterpolation } from "../src/utils/factories/createRedirectInterpolation/createRedirectInterpolation.ts";

export default definePreview({
  decorators: [
    // @ts-expect-error TODO: fix types
    (Story) => {
      const initialValue = [
        createRedirectInterpolation({
          name: "test",
          source: ".*something.*",
          destination: "http://www.example.com",
        }),
      ];
      return (
        <Theme style={{ backgroundColor: "#FFDE21" }} radius="large">
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
