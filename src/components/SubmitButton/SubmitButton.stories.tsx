import preview from "#.storybook/preview";
import { SubmitButton } from "./SubmitButton";

const meta = preview.meta({
  component: SubmitButton,
});

export default meta;

export const Default = meta.story({
  // TODO: fix sb next type assertions
  // @ts-expect-error
  args: {
    children: "Submit button example",
  },
});
