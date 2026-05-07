import preview from "#.storybook/preview";
import { Flex, Separator } from "@radix-ui/themes";
import { CollapsibleSection } from "./CollapsibleSection";

const meta = preview.meta({
  component: CollapsibleSection,
  // @ts-expect-error TODO: fix types
  render: (args) => (
    <Flex width="stretch" direction="column" gap="3">
      <CollapsibleSection {...args} />
      <Separator size="4" />
    </Flex>
  ),
});

export default meta;

export const Default = meta.story({
  // @ts-expect-error TODO: fix types

  args: {
    title: "this is an example",
    children: <div>hello</div>,
  },
});
