import preview from "#.storybook/preview";
import { Flex, Separator } from "@radix-ui/themes";
import { CollapsibleSection } from "./CollapsibleSection";

const meta = preview.meta({
  component: CollapsibleSection,
  render: (args) => (
    <Flex width="stretch" direction="column" gap="3">
      <CollapsibleSection {...args} />
      <Separator size="4" />
    </Flex>
  ),
});

export default meta;

export const Default = meta.story({
  args: {
    title: "this is an example",
    children: <div>hello</div>,
  },
});
