import preview from "#.storybook/preview";

import { ImportForm } from "./Import.tsx";

const meta = preview.meta({
  component: ImportForm,
});

export default meta;

export const Example = meta.story();
