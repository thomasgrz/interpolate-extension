import "@radix-ui/themes/styles.css";
import { definePreview } from "@storybook/react-vite";
import { Theme } from "@radix-ui/themes";
import { InterpolateProvider } from "../src/contexts/interpolate-context.tsx";
import { createRedirectInterpolation } from "../src/utils/factories/createRedirectInterpolation/createRedirectInterpolation.ts";
import { ErrorBoundary } from "react-error-boundary";

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
      return (
        <ErrorBoundary fallback="something went horribly wrong~">
          <Theme radius="large">
            <InterpolateProvider
              initialValue={{
                interpolations: initialValue,
              }}
            >
              <Story />
            </InterpolateProvider>
          </Theme>
        </ErrorBoundary>
      );
    },
  ],
});
