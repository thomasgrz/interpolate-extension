import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Callout, Flex, Text } from "@radix-ui/themes";

export const ScriptsPermissionWarning = () => {
  return (
    <Callout.Root role="alert" color="red" size="1">
      <Callout.Text>
        <Flex direction={"column"} justify={"center"} align={"center"}>
          <ExclamationTriangleIcon />
          <Text>
            You need to enable user scripts in chrome extension settings
          </Text>
        </Flex>
      </Callout.Text>
    </Callout.Root>
  );
};
