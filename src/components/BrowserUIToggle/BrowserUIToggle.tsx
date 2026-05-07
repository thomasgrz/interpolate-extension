import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Flex, Text, Tooltip } from "@radix-ui/themes";
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
          // @ts-expect-error TODO: fix types
          "--switch-background": isEnabled
            ? "var(--theme-choice-action)"
            : "var(--gray-8)",
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
                  ? "Toggle off to hide Interpolate UI in bottom of viewport"
                  : "Toggle on to show Interpolate UI in bottom of viewport"}
              </Text>{" "}
              {!isEnabled &&
                "You may need to reload the page the first time you enable the UI."}
            </Flex>
          }
        >
          <Switch.Root
            checked={isEnabled}
            defaultChecked={isEnabled}
            onCheckedChange={onChange}
            className={styles.SwitchRoot}
            style={{
              boxShadow: "var(--shadow-1)",
            }}
          >
            <Flex align="center" justify={"between"}>
              <Flex px="2">
                <EyeOpenIcon color="black" />
              </Flex>

              <Switch.Thumb
                data-testid="browser-ui-toggle"
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
