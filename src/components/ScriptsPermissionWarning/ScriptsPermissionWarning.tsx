import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Callout, Flex, Text } from "@radix-ui/themes";

export const ScriptsPermissionWarning = () => {
  return (
    <Callout.Root role="alert" color="red" size="1">
      <Flex direction={"column"} justify={"center"} align={"center"}>
        <Callout.Text>
          <ExclamationTriangleIcon />
          <Text>
            You need to enable user scripts in chrome extension settings
          </Text>
        </Callout.Text>
      </Flex>
    </Callout.Root>
  );
};
