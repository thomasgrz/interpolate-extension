import { RedirectInterpolation } from "@/utils/factories/Interpolation";
import {
  DotsVerticalIcon,
  SewingPinFilledIcon,
  SewingPinIcon,
} from "@radix-ui/react-icons";
import { Code, Flex } from "@radix-ui/themes";

export const RedirectRulePreview = (props: {
  rule: RedirectInterpolation;
  name: string;
}) => {
  const { rule } = props;

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
