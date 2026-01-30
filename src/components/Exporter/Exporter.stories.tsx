import preview from "#.storybook/preview";
import { Exporter } from "./Exporter.tsx";
import { createHeaderInterpolation } from "../../utils/factories/createHeaderInterpolation/createHeaderInterpolation.ts";
import { createRedirectInterpolation } from "../../utils/factories/createRedirectInterpolation/createRedirectInterpolation.ts";
import { createScriptInterpolation } from "../../utils/factories/createScriptInterpolation/createScriptInterpolation.ts";

const meta = preview.meta({
  component: Exporter,
});

export default meta;

export const Default = meta.story({
  args: {
    interpolations: [
      createHeaderInterpolation({ name: "header" }),
      createRedirectInterpolation({ name: "redirect" }),
      createScriptInterpolation({ name: "script" }),
    ],
  },
});
