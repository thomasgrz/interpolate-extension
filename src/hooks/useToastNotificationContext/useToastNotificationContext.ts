import { createContext, useContext } from "react";

export const ToastNotificationContext = createContext({
  sortToasts: () => {},
  toastElementsMapRef: { current: new Map() },
});

export const useToastNotificationContext = () => {
  const context = useContext(ToastNotificationContext);
  if (context) return context;
  throw new Error("useToastContext should only be used inside a ToastContext");
};
