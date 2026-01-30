import preview from "#.storybook/preview";

import { Import } from "./Import.tsx";

const meta = preview.meta({
  component: Import,
});

export default meta;

export const Example = meta.story();
