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
  // @ts-expect-error TODO: fix types
  args: {
    interpolations: [
      createHeaderInterpolation({
        name: "header",
        headerKey: "",
        headerValue: "",
      }),
      createRedirectInterpolation({
        name: "redirect",
        source: "",
        destination: "",
      }),
      createScriptInterpolation({ name: "script", body: "" }),
    ],
  },
});
