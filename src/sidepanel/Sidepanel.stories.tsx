import { Dashboard } from "../components/Dashboard/Dashboard";
import preview from "#.storybook/preview";
import { createRedirectInterpolation } from "#src/utils/factories/createRedirectInterpolation/createRedirectInterpolation.ts";
import { createHeaderInterpolation } from "#src/utils/factories/createHeaderInterpolation/createHeaderInterpolation.ts";
import { createScriptInterpolation } from "#src/utils/factories/createScriptInterpolation/createScriptInterpolation.ts";

const meta = preview.meta({
  component: Dashboard,
});

export default meta;

export const Default = meta.story({
  // @ts-expect-error testing
  parameters: {
    interpolations: [
      createRedirectInterpolation({
        name: "Test redirect",
        source: ".*google.*",
        destination: "https://example.com",
      }),
      createHeaderInterpolation({
        headerKey: "headerKey",
        headerValue: "headerValue",
        name: "example header interpolation",
      }),
      createScriptInterpolation({ name: "example script", body: "" }),
    ],
  },
});
