import { useInterpolationsContext } from "#src/hooks/useInterpolationsContext/useInterpolationsContext.ts";
import { Callout, Flex, Strong, Text } from "@radix-ui/themes";
import styles from "./ExtensionEnablementNotice.module.scss";

export const ExtensionEnablmentNotice = () => {
  const { isExtensionEnabled } = useInterpolationsContext();
  const isDisabled = !isExtensionEnabled;
  return (
    isDisabled && (
      <Callout.Root
        variant="surface"
        highContrast
        style={{ padding: "var(--space-3)" }}
        className={styles.InterpolateStatus}
        size={"1"}
        color="red"
      >
        <Callout.Text size="2">
          <Flex justify="center" direction={"column"} gap="1">
            <Strong>
              <Text>Interpolate is disabled</Text>
            </Strong>
            <Text size="1">Configurations will be automatically paused</Text>
          </Flex>
        </Callout.Text>
      </Callout.Root>
    )
  );
};
