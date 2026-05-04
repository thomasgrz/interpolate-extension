import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Box, Flex, Text, Tooltip } from "@radix-ui/themes";
import { Label, Switch } from "radix-ui";
import styles from "./BrowserUIToggle.module.scss";

export const BrowserUIToggle = ({
  isEnabled,
  onChange,
}: {
  onChange: (value: boolean) => void;
  isEnabled: boolean;
}) => {
  return (
    <Label.Root>
      <Flex
        style={{
          "--switch-background": isEnabled ? "var(--green-8)" : "var(--gray-8)",
        }}
        justify={"center"}
        align="center"
        gap="2"
      >
        <Tooltip
          maxWidth={"250px"}
          content={
            <Flex direction="column">
              <Text mb="3">
                {isEnabled
                  ? "Show interpolations in viewport"
                  : "Hide interpolations in viewport"}
              </Text>{" "}
              You may need to reload the page the first time you enable the UI.
            </Flex>
          }
        >
          <Switch.Root
            defaultChecked={isEnabled}
            onCheckedChange={onChange}
            className={styles.SwitchRoot}
          >
            <Flex align="center" justify={"between"}>
              <Flex px="2">
                <EyeOpenIcon color="white" />
              </Flex>

              <Switch.Thumb
                defaultChecked={isEnabled}
                className={styles.SwitchThumb}
              />
              <Flex px="2">
                <EyeClosedIcon color="white" />
              </Flex>
            </Flex>
          </Switch.Root>
        </Tooltip>
      </Flex>
    </Label.Root>
  );
};
