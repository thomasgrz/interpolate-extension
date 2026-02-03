import { useInterpolations } from "@/hooks/useInterpolations/useInterpolations";
import { AnyInterpolation } from "@/utils/factories/Interpolation";
import { createContext, ReactNode } from "react";

export const InterpolateContext = createContext({
  interpolations: [] as AnyInterpolation[] | [] | undefined,
  isActive: (_interp: AnyInterpolation): boolean => false,
  allPaused: undefined as boolean | undefined,
  pause: (_id: string) => {},
  pauseAll: () => {},
  recentlyActive: [] as AnyInterpolation[] | [] | undefined,
  resume: (_id: string) => {},
  resumeAll: () => {},
  remove: (_id: string) => {},
  removeAll: () => {},
  notifications: [] as AnyInterpolation[] | [],
});

export const InterpolateProvider = ({
  children,
  initialValue = [],
}: {
  children: ReactNode;
  initialValue?: AnyInterpolation[];
}) => {
  const value = useInterpolations(initialValue);
  return <InterpolateContext value={value}>{children}</InterpolateContext>;
};
