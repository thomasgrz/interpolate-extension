import { Toast } from "radix-ui";
import { Flex, Card, Container, IconButton, Box } from "@radix-ui/themes";
import React from "react";
import styles from "./NotifierToast.module.scss";
import { CrossCircledIcon } from "@radix-ui/react-icons";

export const NotifierToast = ({
  children,
  title,
  open,
  onOpenChange,
}: React.PropsWithChildren<{
  title?: string;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}>) => {
  return (
    <Toast.Provider>
      <Toast.Root
        onOpenChange={onOpenChange}
        open={open}
        className={styles.ToastRoot}
      >
        <Container className={styles.ToastContainer}>
          <Box radius="full" className={styles.InterpWithLabel}>
            <Toast.Description className={styles.ToastDescription}>
              {children}
            </Toast.Description>
            {title && (
              <Toast.Title className={styles.ToastTitle}>{title}</Toast.Title>
            )}
          </Box>
          <IconButton onClick={onOpenChange} size="1" asChild radius="full">
            <CrossCircledIcon className={styles.CloseIcon} />
          </IconButton>
        </Container>
      </Toast.Root>
      <Toast.Viewport className={styles.ToastViewport} />
    </Toast.Provider>
  );
};
