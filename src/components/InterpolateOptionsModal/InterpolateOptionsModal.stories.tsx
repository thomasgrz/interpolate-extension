import preview from "#.storybook/preview";

import { InterpolateOptionsModal } from "./InterpolateOptionsModal.tsx";

const meta = preview.meta({
  component: InterpolateOptionsModal,
});

export default meta;

export const Example = meta.story();
