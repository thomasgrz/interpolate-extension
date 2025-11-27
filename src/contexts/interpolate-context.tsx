import { useInterpolations } from "@/hooks/useInterpolations/userInterpolations";
import { AnyInterpolation } from "@/utils/factories/Interpolation";
import { createContext, ReactNode } from "react";

export const InterpolateContext = createContext({
  interpolations: [] as AnyInterpolation[] | [] | undefined,
  allPaused: undefined as boolean | undefined,
  pause: async (id: string) => {},
  pauseAll: () => {},
  resume: async (id: string) => {},
  resumeAll: () => {},
  remove: async (id: string) => {},
  removeAll: () => {},
});

export const InterpolateProvider = ({ children }: { children: ReactNode }) => {
  const value = useInterpolations();

  return <InterpolateContext value={value}>{children}</InterpolateContext>;
};
