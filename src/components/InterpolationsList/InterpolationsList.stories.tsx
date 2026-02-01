import preview from "#.storybook/preview";
import { InterpolationsList } from "./InterpolationsList.tsx";

const meta = preview.meta({
  component: InterpolationsList,
});

export default meta;
// @ts-expect-error TODO: fix types
export const Default = meta.story({ args: {} });
