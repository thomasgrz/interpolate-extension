import preview from "#.storybook/preview";
import { EditRedirectForm } from "./EditRedirectForm.tsx";

const meta = preview.meta({
  component: EditRedirectForm,
});

export default meta;

export const Default = meta.story({
  // @ts-expect-error TODO: fix types
  args: {
    defaultValues: {
      name: "test",
    },
  },
});
