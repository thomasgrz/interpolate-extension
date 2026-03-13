import { Flex, Switch, Text } from "@radix-ui/themes";
import { CreateInterpolationsView } from "../CreateInterpolationsView/CreateInterpolationsView.tsx";
import { GlobalInterpolationOptions } from "../GlobalInterpolationOptions/GlobalInterpolationOptions.tsx";
import styles from "./ControlCenter.module.scss";
import { useEffect, useState } from "react";
import { Label } from "radix-ui";
import { InterpolateStorage } from "#src/utils/storage/InterpolateStorage/InterpolateStorage.ts";

export const ControlCenter = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isBrowserUIEnabled, setIsBrowserUIEnabled] = useState(true);
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };
  const handleBrowserUIToggle = async (value: boolean) => {
    await InterpolateStorage.toggleBrowserUI(value);
    setIsBrowserUIEnabled(value);
  };

  useEffect(() => {
    chrome.storage?.local
      .get(InterpolateStorage.BROWSER_UI_TOGGLE_KEY)
      .then((value) => {
        setIsBrowserUIEnabled(
          value?.[InterpolateStorage.BROWSER_UI_TOGGLE_KEY],
        );
      });
  }, []);

  return (
    <Flex gap="1" direction="column" className={styles.ControlCenterContainer}>
      <Flex
        direction={"column"}
        flexGrow={"1"}
        data-testid={"dashboard"}
        justify={"start"}
        gap="3"
        p="3"
        className={styles.FormContainer}
      >
        <CreateInterpolationsView
          onOpenChange={handleOpenChange}
          isOpen={isOpen}
        />
        <Label.Root>
          <Flex justify={"center"} align="center" gap="2">
            <Text size="1"> Browser UI</Text>
            <Switch
              checked={isBrowserUIEnabled}
              onCheckedChange={handleBrowserUIToggle}
            />
          </Flex>
        </Label.Root>
        <GlobalInterpolationOptions />
      </Flex>
    </Flex>
  );
};
