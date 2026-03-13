import preview from "#.storybook/preview";

import { ImportInterpolations } from "./ImportInterpolations.tsx";

const meta = preview.meta({
  component: ImportInterpolations,
});

export default meta;

export const Example = meta.story();
