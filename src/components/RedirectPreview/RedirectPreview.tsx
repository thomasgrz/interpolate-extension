import { RedirectInterpolation } from "@/utils/factories/Interpolation";
import {
  DotsHorizontalIcon,
  DotsVerticalIcon,
  ResetIcon,
  SewingPinFilledIcon,
  SewingPinIcon,
} from "@radix-ui/react-icons";
import { Code, DataList, Flex, Text } from "@radix-ui/themes";

export const RedirectRulePreview = (props: {
  rule: RedirectInterpolation;
  name: string;
}) => {
  const { rule, name } = props;

  return (
    <Flex direction="column" gap="1">
      <Flex>
        <SewingPinIcon />
        <Code size="2">{rule.details.regexFilter}</Code>
      </Flex>
      <DotsVerticalIcon color="gray" />
      <Flex>
        <SewingPinFilledIcon />
        <Code size="2">{rule.details.destination}</Code>
      </Flex>
    </Flex>
  );
};
