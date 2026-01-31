import preview from "#.storybook/preview";
import { EditRedirectForm } from "./EditRedirectForm.tsx";

const meta = preview.meta({
  component: EditRedirectForm,
});

export default meta;

export const Default = meta.story({
  args: {
    defaultValues: {
      name: "test",
    },
  },
});
