import { useInterpolationsContext } from "#src/hooks/useInterpolationsContext/useInterpolationsContext.ts";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { Callout, Flex, Strong } from "@radix-ui/themes";
import styles from "./ExtensionEnablementNotice.module.scss";

export const ExtensionEnablmentNotice = () => {
  const { isExtensionEnabled } = useInterpolationsContext();

  return isExtensionEnabled ? (
    <Callout.Root
      highContrast
      variant={"surface"}
      className={styles.InterpolateStatus}
      size={"1"}
      color="green"
    >
      <Flex gap="3" align={"center"}>
        <Callout.Icon>
          <CheckCircledIcon />
        </Callout.Icon>
        <Callout.Text size={"1"}>
          Interpolate is currently <Strong>ENABLED</Strong>
        </Callout.Text>
      </Flex>
    </Callout.Root>
  ) : (
    <Callout.Root
      highContrast
      variant={"surface"}
      className={styles.InterpolateStatus}
      size={"1"}
      color="gray"
    >
      <Flex gap="3" align="center">
        <Callout.Icon>
          <CrossCircledIcon />
        </Callout.Icon>
        <Callout.Text size="1">
          Interpolate is currently <Strong>DISABLED</Strong>
        </Callout.Text>
      </Flex>
    </Callout.Root>
  );
};
