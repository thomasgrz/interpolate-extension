import { MockAPIInterpolation } from "#src/utils/factories/Interpolation.ts";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  DotsVerticalIcon,
  EnvelopeOpenIcon,
  FileTextIcon,
  InfoCircledIcon,
  QuestionMarkCircledIcon,
  ResetIcon,
  SewingPinIcon,
  UploadIcon,
} from "@radix-ui/react-icons";
import { Code, DataList, Flex, Text, ScrollArea, Card } from "@radix-ui/themes";

export const MockPreview = ({
  details,
  name,
  dataOrientation,
}: {
  details: MockAPIInterpolation["details"];
  name: string;
  dataOrientation: "horizontal" | "vertical";
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
