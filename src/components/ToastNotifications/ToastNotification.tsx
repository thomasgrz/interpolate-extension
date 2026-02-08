import * as ToastPrimitive from "@radix-ui/react-toast";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./ToastNotification.module.scss";

const ToastNotificationContext = createContext({
  sortToasts: () => {},
  toastElementsMapRef: { current: new Map() },
});

const ToastCreationContext = createContext({});
const ANIMATION_OUT_DURATION = 350;

export const ToastNotification = (
  props: {
    onOpenChange: (value: boolean) => void;
    toast: {
      duration?: number;
      type: "foreground" | "background" | undefined;
    } & Record<string, unknown>;
    id: string;
  } & Record<string, unknown>,
) => {
  const { onOpenChange, toast, id, ...toastProps } = props;
  const ref = useRef(null);
  const context = useNotificationToastContext();
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
      <ToastPrimitive.Title>toast title</ToastPrimitive.Title>
      <ToastPrimitive.Description>toast description</ToastPrimitive.Description>
      <ToastPrimitive.Action altText="pause">
        toast action
      </ToastPrimitive.Action>
      <ToastPrimitive.Close>toast close</ToastPrimitive.Close>
    </ToastPrimitive.Root>
  );
};

export const useToastCreationContext = () => {
  const context = useContext(ToastCreationContext);
  if (context) return context;

  throw new Error(
    "useToastCreationContext should only be used inside a ToastCreationContext",
  );
};

const useNotificationToastContext = () => {
  const context = useContext(ToastNotificationContext);
  if (context) return context;
  throw new Error("useToastContext should only be used inside a ToastContext");
};

export const ToastNotificationsContainer = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  const [toasts, setToasts] = useState(new Map());
  const toastElementsMapRef = useRef(new Map());
  const toastViewportRef = useRef<HTMLOListElement>(null);
  const sortToasts = useCallback(() => {
    const toastElements = Array.from(toastElementsMapRef.current).reverse();
    const heights = [] as number[];
    toastElements.forEach(([, toast], index) => {
      if (!toast) return;
      const height = toast.clientHeight as number;
      heights.push(height);
      const frontToastHeight = heights?.[0];
      toast.setAttribute("data-front", index === 0);
      toast.setAttribute("data-hidden", index > 2);
      toast.style.setProperty("--index", index);
      toast.style.setProperty("--height", `${height}px`);
      toast.style.setProperty("--front-height", `${frontToastHeight}px`);
      const hoverOffsetY = heights
        .slice(0, index)
        .reduce((res, next) => (res += next), 0);
      toast.style.setProperty("--hover-offset-y", `-${hoverOffsetY}px`);
    });
  }, []);

  const handleAddToast = useCallback(
    (
      toast: {
        description?: string;
        status: "error" | "success" | "default";
      } & Record<string, unknown>,
    ) => {
      setToasts((currentToasts) => {
        const newMap = new Map(currentToasts);
        newMap.set(String(Date.now()), { ...toast, open: true });
        return newMap;
      });
    },
    [],
  );

  const handleRemoveToast = useCallback((key: string) => {
    setToasts((currentToasts) => {
      const newMap = new Map(currentToasts);
      newMap.delete(key);
      return newMap;
    });
  }, []);

  const handleDispatchDefault = useCallback(
    (payload: Record<string, unknown>) =>
      handleAddToast({ ...payload, status: "default" }),
    [handleAddToast],
  );

  const handleDispatchSuccess = useCallback(
    (payload: Record<string, unknown>) =>
      handleAddToast({ ...payload, status: "success" }),
    [handleAddToast],
  );

  const handleDispatchError = useCallback(
    (payload: Record<string, unknown>) =>
      handleAddToast({ ...payload, status: "error" }),
    [handleAddToast],
  );

  useEffect(() => {
    const toastViewport = toastViewportRef.current;
    if (toastViewport) {
      const handleFocus = () => {
        toastElementsMapRef.current.forEach((toast) => {
          toast.setAttribute("data-hovering", "true");
        });
      };
      const handleBlur = (event: PointerEvent | Event) => {
        if (
          !toastViewport.contains(event.target as Node) ||
          toastViewport === event.target
        ) {
          toastElementsMapRef.current.forEach((toast) => {
            toast.setAttribute("data-hovering", "false");
          });
        }
      };
      toastViewport.addEventListener("pointermove", handleFocus);
      toastViewport.addEventListener("pointerleave", handleBlur);
      toastViewport.addEventListener("focusin", handleFocus);
      toastViewport.addEventListener("focusout", handleBlur);

      return () => {
        toastViewport.removeEventListener("pointermove", handleFocus);
        toastViewport.removeEventListener("pointerleave", handleBlur);
        toastViewport.removeEventListener("focusin", handleFocus);
        toastViewport.removeEventListener("focusout", handleBlur);
      };
    }
  });

  const toastContextValue = useMemo(
    () =>
      Object.assign(handleDispatchDefault, {
        success: handleDispatchSuccess,
        error: handleDispatchError,
      }),
    [handleDispatchDefault, handleDispatchError],
  );

  const toastCreationContextValue = useMemo(() => {
    return {
      toastElementsMapRef,
      sortToasts,
    };
  }, [sortToasts]);
  return (
    <ToastCreationContext.Provider value={toastContextValue}>
      <ToastNotificationContext.Provider value={toastCreationContextValue}>
        <ToastPrimitive.Provider {...props}>
          {children}
          {Array.from(toasts).map(([key, toast]) => (
            <ToastNotification
              key={key}
              id={key}
              toast={toast}
              onOpenChange={(open: boolean) => {
                const isClosed = !open;
                if (isClosed) {
                  toastElementsMapRef.current.delete(key);
                  sortToasts();
                  setTimeout(() => {
                    handleRemoveToast(key);
                  }, ANIMATION_OUT_DURATION);
                }
              }}
            />
          ))}
          <ToastPrimitive.Viewport
            ref={toastViewportRef!}
            className={styles.ToastViewport}
          />
        </ToastPrimitive.Provider>
      </ToastNotificationContext.Provider>
    </ToastCreationContext.Provider>
  );
};
