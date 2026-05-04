import preview from "#.storybook/preview";
import { BrowserUIToggle } from "./BrowserUIToggle";

const meta = preview.meta({
  component: BrowserUIToggle,
});

export default meta;

export const Default = meta.story();
