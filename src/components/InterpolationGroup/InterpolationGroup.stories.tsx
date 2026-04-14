import preview from "#.storybook/preview";
import { createHeaderInterpolation } from "#src/utils/factories/createHeaderInterpolation/createHeaderInterpolation.ts";
import { createMockAPIInterpolation } from "#src/utils/factories/createMockAPIInterpolation/createMockAPIInterpolation.ts";
import { createRedirectInterpolation } from "#src/utils/factories/createRedirectInterpolation/createRedirectInterpolation.ts";
import { createScriptInterpolation } from "#src/utils/factories/createScriptInterpolation/createScriptInterpolation.ts";
import { InterpolationGroup } from "./InterpolationGroup";

const meta = preview.meta({
  component: InterpolationGroup,
});

export default meta;

export const Default = meta.story({
  // @ts-expect-error TODO: FIXME: types issues
  args: {
    name: "test group",
    interpolations: [
      createRedirectInterpolation({
        source: "asdf",
        destination: "asdfadf",
        name: "asdfasdfasdf",
      }),
      createHeaderInterpolation({
        headerKey: "hasdfasdf",
        headerValue: "asdfoijoij",
        name: "asdoiajsdifs",
      }),
      // @ts-expect-error TODO: FIXME:
      createScriptInterpolation({
        script: "stringasdfas",
        runAt: "document_start",
        matches: "asdfasdf",
      }),
      // @ts-expect-error TODO: FIXME:
      createMockAPIInterpolation({ isJson: true, body: "asdfoiaiosjdf" }),
    ],
  },
});
