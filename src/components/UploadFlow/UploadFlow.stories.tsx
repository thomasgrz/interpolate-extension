import preview from "#.storybook/preview";

import { UploadFlow } from "./UploadFlow.tsx";

const meta = preview.meta({
  component: UploadFlow,
});

export default meta;

export const Example = meta.story();
