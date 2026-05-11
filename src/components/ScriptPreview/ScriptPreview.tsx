import { ScriptInterpolation } from "@/utils/factories/Interpolation";
import { ClockIcon } from "@radix-ui/react-icons";
import { Code, ScrollArea, Flex, Text } from "@radix-ui/themes";

export const ScriptPreview = (props: { rule: ScriptInterpolation }) => {
  const { rule } = props;

  return (
    <Flex direction={"column"} width="stretch" gap="3">
      <ScrollArea style={{ maxHeight: 80 }}>
        <Flex>
          <Code size="2">{rule.details.js?.[0]?.code}</Code>
        </Flex>
      </ScrollArea>
      <Flex gap="2" align={"center"}>
        <ClockIcon /> <Text size="1">{rule.details.runAt}</Text>
      </Flex>
    </Flex>
  );
};
