import {
  Box,
  Flex,
  IconButton,
  Strong,
  Switch,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import { CreateInterpolationsView } from "../CreateInterpolationsView/CreateInterpolationsView.tsx";
import { GlobalInterpolationOptions } from "../GlobalInterpolationOptions/GlobalInterpolationOptions.tsx";
import styles from "./ControlCenter.module.scss";
import { useEffect, useState } from "react";
import { DropdownMenu, Label } from "radix-ui";
import { InterpolateStorage } from "#src/utils/storage/InterpolateStorage/InterpolateStorage.ts";
import {
  EyeClosedIcon,
  EyeOpenIcon,
  MixerHorizontalIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";

const BrowserUIToggle = ({
  isEnabled,
  onChange,
}: {
  onChange: (value: boolean) => void;
  isEnabled: boolean;
}) => {
  return (
    <Label.Root>
      <Flex justify={"center"} align="center" gap="2">
        <Tooltip
          maxWidth={"250px"}
          content={
            <Flex direction="column">
              <Text mb="3">
                {isEnabled
                  ? "Hide interpolations in viewport"
                  : "Show interpolations in viewport"}
              </Text>{" "}
              You may need to reload the page the first time you enable the UI.
            </Flex>
          }
        >
          <IconButton
            color={isEnabled ? "blue" : "gray"}
            onClick={() => onChange(!isEnabled)}
            style={{ cursor: "pointer" }}
            radius="full"
          >
            {isEnabled ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </IconButton>
        </Tooltip>
      </Flex>
    </Label.Root>
  );
};
export const ControlCenter = ({ onCreate }: { onCreate: () => void }) => {
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
        align={"end"}
        gap="3"
        p="3"
        className={styles.FormContainer}
      >
        <Flex
          width="stretch"
          align="center"
          justify="between"
          flexGrow={"grow"}
        >
          <GlobalInterpolationOptions />
          <CreateInterpolationsView
            onCreate={onCreate}
            onOpenChange={handleOpenChange}
            isOpen={isOpen}
          />
          <BrowserUIToggle
            onChange={handleBrowserUIToggle}
            isEnabled={isBrowserUIEnabled}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
