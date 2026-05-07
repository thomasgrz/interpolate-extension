import { ChevronRightIcon } from "@radix-ui/react-icons";
import { Flex, Text } from "@radix-ui/themes";
import { Collapsible } from "radix-ui";
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
    // @ts-expect-error TODO: fix types
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
              // @ts-expect-error TODO: fix types
              className={styles.Trigger}
              width="stretch"
              flexGrow="grow"
              justify={"between"}
              align={"center"}
              minHeight="2em"
              pr="3"
            >
              <Text size="2">{title} </Text>
              <ChevronRightIcon
                width={"1.5em"}
                height={"1.5em"}
                data-open={derivedIsOpen}
                // @ts-expect-error TODO fix types
                className={styles.IconOpen}
              />
            </Flex>
          </Collapsible.Trigger>
          {/** @ts-expect-error TODO: fix types */}
          <Collapsible.Content className={styles.CollapsedContent}>
            {children}
          </Collapsible.Content>
        </Flex>
      </Collapsible.Root>
    </Flex>
  );
};
