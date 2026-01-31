import preview from "#.storybook/preview";
import { InterpolationsList } from "./InterpolationsList.tsx";

const meta = preview.meta({
  component: InterpolationsList,
});

export default meta;

export const Default = meta.story({});
