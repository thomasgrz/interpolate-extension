import { Flex } from "@radix-ui/themes";
import { CreateInterpolationsView } from "../CreateInterpolationsView/CreateInterpolationsView.tsx";
import { GlobalInterpolationOptions } from "../GlobalInterpolationOptions/GlobalInterpolationOptions.tsx";
import styles from "./ControlCenter.module.scss";
import { useEffect, useState } from "react";
import { InterpolateStorage } from "#src/utils/storage/InterpolateStorage/InterpolateStorage.ts";
import { BrowserUIToggle } from "../BrowserUIToggle/BrowserUIToggle.tsx";

export const ControlCenter = ({
  onCreate,
  defaultIsBrowserUIEnabled,
}: {
  defaultIsBrowserUIEnabled?: boolean;
  onCreate: () => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isBrowserUIEnabled, setIsBrowserUIEnabled] = useState(
    defaultIsBrowserUIEnabled,
  );
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
    <Flex
      p="0"
      gap="1"
      direction="column"
      className={styles.ControlCenterContainer}
    >
      <Flex
        direction={"column"}
        flexGrow={"1"}
        data-testid={"dashboard"}
        align={"end"}
        pb="3"
        className={styles.FormContainer}
      >
        <Flex
          p="0"
          width="stretch"
          align="center"
          justify="between"
          flexGrow={"grow"}
        >
          <Flex gap="3">
            <GlobalInterpolationOptions />

            <BrowserUIToggle
              onChange={handleBrowserUIToggle}
              isEnabled={!!isBrowserUIEnabled}
            />
          </Flex>

          <CreateInterpolationsView
            onCreate={onCreate}
            onOpenChange={handleOpenChange}
            isOpen={isOpen}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
