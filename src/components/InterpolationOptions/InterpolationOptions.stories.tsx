import preview from "#.storybook/preview";
import { InterpolationOptions } from "./InterpolationOptions.tsx";
import { createRedirectInterpolation } from "../../utils/factories/createRedirectInterpolation/createRedirectInterpolation";

const meta = preview.meta({
  component: InterpolationOptions,
});

export default meta;

export const Example = meta.story({
  // @ts-expect-error TODO: fix types
  args: {
    config: createRedirectInterpolation({
      name: "test",
      source: "",
      destination: "",
    }),
  },
});
