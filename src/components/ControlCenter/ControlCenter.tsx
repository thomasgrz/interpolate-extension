import { Flex } from "@radix-ui/themes";
import { InterpolateOptionsModal } from "../InterpolateOptionsModal/InterpolateOptionsModal.tsx";
import { GlobalInterpolationOptions } from "../GlobalInterpolationOptions/GlobalInterpolationOptions.tsx";
import styles from "./ControlCenter.module.scss";
import { useState } from "react";

export const ControlCenter = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };
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
        <GlobalInterpolationOptions />
        <InterpolateOptionsModal
          onOpenChange={handleOpenChange}
          isOpen={isOpen}
        />
      </Flex>
    </Flex>
  );
};
