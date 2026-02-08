import * as ToastPrimitive from "@radix-ui/react-toast";
import { useLayoutEffect, useRef } from "react";
import styles from "./ToastNotification.module.scss";
import { useToastNotificationContext } from "#src/hooks/useToastNotificationContext/useToastNotificationContext.ts";
import { Card } from "@radix-ui/themes";

export const ToastNotification = (
  props: {
    onOpenChange: (value: boolean) => void;
    toast: {
      action?: string | React.ReactNode;
      description?: string | React.ReactNode;
      content?: string | React.ReactNode;
      close?: string | React.ReactNode;
      title?: string | React.ReactNode;
      duration?: number;
      type: "foreground" | "background" | undefined;
    } & Record<string, unknown>;
    id: string;
  } & Record<string, unknown>,
) => {
  const { onOpenChange, toast, id, ...toastProps } = props;
  const ref = useRef(null);
  const context = useToastNotificationContext();
  const { sortToasts, toastElementsMapRef } = context;
  const toastElementsMap = toastElementsMapRef.current!;

  useLayoutEffect(() => {
    if (ref.current) {
      toastElementsMap.set(id, ref.current);
      sortToasts();
    }
  }, [id, sortToasts, toastElementsMap]);
  return (
    <ToastPrimitive.Root
      {...toastProps}
      ref={ref}
      type={toast?.type}
      duration={toast.duration}
      className={styles.ToastRoot}
      onOpenChange={onOpenChange}
    >
      <Card>
        {toast?.title && (
          <ToastPrimitive.Title>{toast?.title}</ToastPrimitive.Title>
        )}
        {toast?.description && (
          <ToastPrimitive.Description>
            {toast.description}
          </ToastPrimitive.Description>
        )}
        {toast?.action && (
          <ToastPrimitive.Action altText="action">
            {toast.action}
          </ToastPrimitive.Action>
        )}
        {toast?.close && (
          <ToastPrimitive.Close>{toast?.close}</ToastPrimitive.Close>
        )}
        {toast?.content}
      </Card>
    </ToastPrimitive.Root>
  );
};
