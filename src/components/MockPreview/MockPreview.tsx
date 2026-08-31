import { MockAPIInterpolation } from "#src/utils/factories/Interpolation.ts";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  InfoCircledIcon,
  QuestionMarkCircledIcon,
  ResetIcon,
} from "@radix-ui/react-icons";
import { Code, Flex, Text, ScrollArea, Card, Strong } from "@radix-ui/themes";

export const MockPreview = ({
  details,
}: {
  details: MockAPIInterpolation["details"];
}) => {
  const getIcon = () => {
    const { httpCode = 200 } = details;
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
    <Flex direction="column" gap="2" minWidth="100%">
      <Flex align={"center"}>
        <Text size="1">Mock responses from&nbsp;</Text>{" "}
        <Code size="1">{details.matcher}</Code>{" "}
      </Flex>
      <Flex>
        <Text size={"1"}>
          {details.bodyMatcher ? (
            <>
              if request body contains&nbsp;
              <Strong>/{details.bodyMatcher || ".*"}/</Strong>
            </>
          ) : (
            <></>
          )}
        </Text>
      </Flex>

      <Card>
        <Flex direction={"column"} gap="2">
          <Flex gap="2" justify={"start"}>
            <Text size="1">
              Response status: <Code>HTTP {details.httpCode ?? 200}</Code>
            </Text>
            {getIcon()}
          </Flex>
          <Text size="1">Response body:</Text>

          <ScrollArea style={{ maxHeight: 100 }}>
            <Flex direction={"column"}>
              <Code size="1">{details.body}</Code>
            </Flex>
          </ScrollArea>
        </Flex>
      </Card>
    </Flex>
  );
};
