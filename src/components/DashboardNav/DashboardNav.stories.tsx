import preview from "#.storybook/preview";

import { DashboardNav } from "./DashboardNav.tsx";

const meta = preview.meta({
  component: DashboardNav,
});

export default meta;

export const Example = meta.story();
