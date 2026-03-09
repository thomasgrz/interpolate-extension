import preview from "#.storybook/preview.tsx";
import { MockResponseForm } from "./MockResponseForm";

const meta = preview.meta({
  component: MockResponseForm,
});

export default meta;

export const Default = meta.story();
