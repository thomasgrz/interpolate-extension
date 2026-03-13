import preview from "#.storybook/preview";
import { ExportInterpolations } from "./ExportInterpolations.tsx";
import { createHeaderInterpolation } from "../../utils/factories/createHeaderInterpolation/createHeaderInterpolation.ts";
import { createRedirectInterpolation } from "../../utils/factories/createRedirectInterpolation/createRedirectInterpolation.ts";
import { createScriptInterpolation } from "../../utils/factories/createScriptInterpolation/createScriptInterpolation.ts";

const meta = preview.meta({
  component: ExportInterpolations,
});

export default meta;

export const Default = meta.story({
  // @ts-expect-error TS asserts args not assignable to never
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
      createScriptInterpolation({
        name: "script",
        script: "console.log('hello world')",
      }),
    ],
  },
});
