import { useContext, createContext } from "react";

export const ToastCreationContext = createContext(
  // @ts-expect-error unused var
  (payload: Record<string, unknown>) => {},
);

export const useToastCreationContext = () => {
  const context = useContext(ToastCreationContext);
  if (context) return context;

  throw new Error(
    "useToastCreationContext should only be used inside a ToastCreationContext",
  );
};
