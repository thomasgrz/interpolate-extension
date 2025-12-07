import { Callout, Flex, Text } from "@radix-ui/themes";

export const ScriptsPermissionWarning = () => {
  return (
    <Callout.Root role="alert" color="red" size="1">
      <Flex
        style={{ textAlign: "center" }}
        direction={"column"}
        justify={"center"}
        align={"center"}
      >
        <Callout.Text>
          <Text>
            You must enable user scripts in chrome extension settings to enable
            script creation.
          </Text>
        </Callout.Text>
      </Flex>
    </Callout.Root>
  );
};
