import { Link1Icon } from "@radix-ui/react-icons";
import { Code, Flex, Strong, Text } from "@radix-ui/themes";

export const TabManagerPreview = ({
  regex,
  tabGroupName,
}: {
  regex: string;
  tabGroupName: string;
}) => {
  return (
    <Flex direction="column" align="start" width="stretch" gap="2">
      <Flex direction="column" gap="2" width="100%">
        <Flex align="center" gap="2">
          <Text size="1">Open links like</Text>
          <Code>
            <Flex gap="2">
              <Link1Icon /> <Text size="1">{regex}</Text>
            </Flex>
          </Code>
        </Flex>
        <Text size="1">
          <Flex align="center" gap="2">
            in <Strong>"{tabGroupName}"</Strong> tab group
          </Flex>
        </Text>
      </Flex>
    </Flex>
  );
};
