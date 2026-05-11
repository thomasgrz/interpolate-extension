import { RedirectInterpolation } from "@/utils/factories/Interpolation";
import {
  DotsVerticalIcon,
  SewingPinFilledIcon,
  SewingPinIcon,
} from "@radix-ui/react-icons";
import { Box, Code, Flex } from "@radix-ui/themes";

export const RedirectRulePreview = (props: {
  rule: RedirectInterpolation;
  name: string;
}) => {
  const { rule } = props;

  return (
    <Flex direction="column" gap="1">
      <Flex>
        <Box minHeight={"15px"} minWidth={"15px"}>
          <SewingPinIcon />
        </Box>
        <Code style={{ maxWidth: "300px" }} size="2">
          {rule.details.regexFilter}
        </Code>
      </Flex>
      <DotsVerticalIcon color="gray" />
      <Flex>
        <Box minHeight={"15px"} minWidth={"15px"}>
          <SewingPinFilledIcon height="15" width="15px" />
        </Box>

        <Code style={{ maxWidth: "300px" }} size="2">
          {rule.details.destination}
        </Code>
      </Flex>
    </Flex>
  );
};
