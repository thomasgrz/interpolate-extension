import { HeaderInterpolation } from "@/utils/factories/Interpolation";
import { Code, Flex, ScrollArea, Text } from "@radix-ui/themes";

export const HeaderRulePreview = ({
  details,
}: {
  details: HeaderInterpolation["details"];
}) => {
  return (
    <Flex gap="2" direction={"column"}>
      <Flex gap="2">
        <Text size="2">key:</Text>
        <Flex>
          <Code size="2">{details.headerKey}</Code>
        </Flex>
      </Flex>
      <Flex direction={"column"}>
        <Text size="2">value:</Text>
        <ScrollArea style={{ maxHeight: 80 }}>
          <Flex>
            <Code size="2">{details.headerValue}</Code>
          </Flex>
        </ScrollArea>
      </Flex>
    </Flex>
  );
};
