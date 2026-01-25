import { Toast } from "radix-ui";
import React from "react";
import styles from "./NotifierToast.module.scss";
import { InterpolationCard } from "../InterpolationCard/InterpolationCard";

export const NotifierToast: React.PropsWithChildren<{
  title: string;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}> = ({ children, title, open, onOpenChange }) => {
  return (
    <Toast.Provider>
      <Toast.Root
        onOpenChange={onOpenChange}
        open={open}
        className={styles.ToastRoot}
      >
        {title && (
          <Toast.Title className={styles.ToastTitle}>{title}</Toast.Title>
        )}
        <Toast.Description className={styles.ToastDescription}>
          {children}
        </Toast.Description>
      </Toast.Root>
      <Toast.Viewport className={styles.ToastViewport} />
    </Toast.Provider>
  );
};
