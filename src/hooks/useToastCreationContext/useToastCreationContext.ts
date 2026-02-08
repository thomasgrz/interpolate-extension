import { useContext, createContext } from "react";

export const ToastCreationContext = createContext({});

export const useToastCreationContext = () => {
  const context = useContext(ToastCreationContext);
  if (context) return context;

  throw new Error(
    "useToastCreationContext should only be used inside a ToastCreationContext",
  );
};
