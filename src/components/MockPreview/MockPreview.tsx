import { MockAPIInterpolation } from "#src/utils/factories/Interpolation.ts";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  DotsVerticalIcon,
  InfoCircledIcon,
  QuestionMarkCircledIcon,
  ResetIcon,
  SewingPinIcon,
} from "@radix-ui/react-icons";
import { Code, Flex, Text, ScrollArea, Card } from "@radix-ui/themes";

export const MockPreview = ({
  details,
}: {
  details: MockAPIInterpolation["details"];
}) => {
  const getIcon = () => {
    const { httpCode } = details;
    if (!httpCode) return <QuestionMarkCircledIcon />;
    if (httpCode >= 100 && httpCode <= 199) {
      return <InfoCircledIcon />;
    }

    if (httpCode >= 200 && httpCode <= 299) {
      return <CheckCircledIcon />;
    }

    if (httpCode >= 300 && httpCode <= 399) {
      return <ResetIcon />;
    }

    if (httpCode >= 400 && httpCode <= 599) {
      return <CrossCircledIcon />;
    }
  };
  return (
    <Flex direction="column" gap="2">
      <Flex>
        <SewingPinIcon /> <Code size="1">{details.matcher}</Code>
      </Flex>
      <DotsVerticalIcon />

      <Card>
        <Flex direction={"column"} gap="2">
          <Flex gap="2" justify={"start"}>
            <Text size="1">
              <Code>{details.httpCode}</Code>
            </Text>
            {getIcon()}
          </Flex>

          <ScrollArea style={{ maxHeight: 80 }}>
            <Flex direction={"column"}>
              <Code size="1">{details.body}</Code>
            </Flex>
          </ScrollArea>
        </Flex>
      </Card>
    </Flex>
  );
};
