import preview from "#.storybook/preview";
import { EditHeaderForm } from "./EditHeaderForm.tsx";

const meta = preview.meta({
  component: EditHeaderForm,
});

export default meta;

export const Default = meta.story({
  // @ts-expect-error TODO: fix types
  arg: {
    defaultValues: {
      name: "test header",
      headerKey: "key",
      headerValue: "value",
      id: 23424,
    },
  },
});
