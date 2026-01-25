import preview from "#.storybook/preview";

import { Notifier } from "./Notifier";

const meta = preview.meta({
  component: Notifier,
});

export default meta;

export const Example = meta.story({
  args: {},
});
