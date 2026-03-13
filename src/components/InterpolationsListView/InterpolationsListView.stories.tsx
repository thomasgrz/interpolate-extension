import preview from "#.storybook/preview";
import { InterpolationsListView } from "./InterpolationsListView.tsx";

const meta = preview.meta({
  component: InterpolationsListView,
});

export default meta;
export const Default = meta.story();
