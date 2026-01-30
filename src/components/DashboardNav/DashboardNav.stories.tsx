import preview from "#.storybook/preview";

import { CreateInterpolationButton } from "./DashboardNav.tsx";

const meta = preview.meta({
  component: CreateInterpolationButton,
});

export default meta;

export const Example = meta.story();
