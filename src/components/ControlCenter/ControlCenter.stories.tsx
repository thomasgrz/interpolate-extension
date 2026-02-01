import preview from "#.storybook/preview";
import { ControlCenter } from "./ControlCenter.tsx";

export const meta = preview.meta({
  component: ControlCenter,
});

export default meta;

// @ts-expect-error TODO: fix types
export const Default = meta.story({});
