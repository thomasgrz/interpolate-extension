import "@radix-ui/themes/styles.css";
import { definePreview } from "@storybook/react-vite";
import { Theme } from "@radix-ui/themes";
import { InterpolateProvider } from "../src/contexts/interpolate-context.tsx";
import { createRedirectInterpolation } from "../src/utils/factories/createRedirectInterpolation/createRedirectInterpolation.ts";

export default definePreview({
  decorators: [
    // @ts-expect-error TODO: fix
    (Story, contexts) => {
      const { parameters } = contexts;
      const initialValue = [
        createRedirectInterpolation({
          name: "test",
          source: ".*something.*",
          destination: "http://www.example.com",
        }),
        ...(parameters?.interpolations ?? []),
      ];
      console.log("HIT");
      return (
        <Theme style={{ backgroundColor: "#FFDE21" }} radius="large">
          <InterpolateProvider initialValue={initialValue}>
            <Story />
          </InterpolateProvider>
        </Theme>
      );
    },
  ],
});
