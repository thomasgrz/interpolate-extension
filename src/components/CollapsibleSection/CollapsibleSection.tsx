import {
  ChevronRightIcon,
  DoubleArrowDownIcon,
  DoubleArrowUpIcon,
  MinusIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { Box, Flex, Separator, Text } from "@radix-ui/themes";
import { Collapsible, ScrollArea } from "radix-ui";
import { useState } from "react";
import * as styles from "./CollapsibleSection.module.scss";

export const CollapsibleSection = ({
  title,
  children,
  initialIsOpen,
  onOpenChange,
  defaultIsOpen,
}: {
  defaultIsOpen?: boolean;
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

  const derivedIsOpen = defaultIsOpen ?? isOpen;
  return (
    <Flex width="stretch" className={styles.CollapsibleSection}>
      <Collapsible.Root
        open={derivedIsOpen}
        onOpenChange={handleOpen}
        style={{ width: "stretch" }}
        asChild
      >
        <Flex direction="column">
          <Collapsible.Trigger asChild>
            <Flex
              className={styles.Trigger}
              width="stretch"
              flexGrow="grow"
              justify={"between"}
              align={"center"}
              minHeight="3em"
            >
              <Text size="2">{title} </Text>
              <ChevronRightIcon
                width={"1.5em"}
                height={"1.5em"}
                data-open={derivedIsOpen}
                className={styles.IconOpen}
              />
            </Flex>
          </Collapsible.Trigger>
          <Collapsible.Content className={styles.CollapsedContent}>
            {children}
          </Collapsible.Content>
        </Flex>
      </Collapsible.Root>
    </Flex>
  );
};
