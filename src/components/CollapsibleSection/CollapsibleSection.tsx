import {
  DoubleArrowDownIcon,
  DoubleArrowUpIcon,
  MinusIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { Box, Flex, Separator } from "@radix-ui/themes";
import { Collapsible, ScrollArea } from "radix-ui";
import { useState } from "react";
import * as styles from "./CollapsibleSection.module.scss";

export const CollapsibleSection = ({
  title,
  children,
  initialIsOpen,
  onOpenChange,
}: {
  title: React.ReactElement;
  children: React.ReactElement | React.ReactElement[];
  initialIsOpen?: boolean;
  onOpenChange?: (value: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(!!initialIsOpen);
  const handleOpen = (value: boolean) => {
    setIsOpen(value);
    onOpenChange?.(value);
  };
  return (
    <Flex width="stretch" className={styles.CollapsibleSection}>
      <Collapsible.Root
        open={isOpen}
        onOpenChange={handleOpen}
        style={{ width: "stretch" }}
        asChild
      >
        <Flex direction="column">
          <Separator size="4" />
          <Collapsible.Trigger asChild>
            <Flex
              width="stretch"
              flexGrow="grow"
              justify={"between"}
              align={"center"}
            >
              {title} {isOpen ? <MinusIcon /> : <PlusIcon />}
            </Flex>
          </Collapsible.Trigger>
          <Collapsible.Content className={styles.CollapsedContent}>
            <Separator size="4" />
            {children}
          </Collapsible.Content>
        </Flex>
      </Collapsible.Root>
    </Flex>
  );
};
