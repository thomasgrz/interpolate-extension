import { Dashboard } from "../components/Dashboard/Dashboard";
import preview from "#.storybook/preview";

const meta = preview.meta({
  component: Dashboard,
});

export default meta;

export const Default = meta.story();
