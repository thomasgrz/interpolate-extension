import preview from "#.storybook/preview";
import { SortingOptions, SortOption } from "./SortingOptions";

const meta = preview.meta({
  component: SortingOptions,
});

export const Example = meta.story({
  args: {
    value: SortOption.A_TO_Z,
    onChange: () => {},
  },
});
