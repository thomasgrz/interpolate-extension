import { useInterpolations } from "@/hooks/useInterpolations/useInterpolations";
import { AnyInterpolation } from "@/utils/factories/Interpolation";
import { createContext, ReactNode } from "react";

export const InterpolateContext = createContext({
  interpolations: [] as AnyInterpolation[] | [] | undefined,
  allPaused: undefined as boolean | undefined,
  pause: (id: string) => {},
  pauseAll: () => {},
  resume: (id: string) => {},
  resumeAll: () => {},
  remove: (id: string) => {},
  removeAll: () => {},
});

export const InterpolateProvider = ({ children }: { children: ReactNode }) => {
  const value = useInterpolations();

  return <InterpolateContext value={value}>{children}</InterpolateContext>;
};
