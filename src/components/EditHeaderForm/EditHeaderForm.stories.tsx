import preview from "#.storybook/preview";
import { EditHeaderForm } from "./EditHeaderForm.tsx";

const meta = preview.meta({
  component: EditRedirectForm,
});

export default meta;

export const Default = meta.story({
  arg: {
    defaultValues: {
      name: "test header",
      headerKey: "key",
      headerValue: "value",
      id: 23424,
    },
  },
});
