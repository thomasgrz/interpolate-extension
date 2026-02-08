import { useInterpolations } from "@/hooks/useInterpolations/useInterpolations";
import { AnyInterpolation } from "@/utils/factories/Interpolation";
import { createContext, ReactNode } from "react";

export const InterpolateContext = createContext({
  interpolations: [] as AnyInterpolation[] | [] | undefined,
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
  handleInterpolationNotifications,
}: {
  children?: ReactNode;
  initialValue?: AnyInterpolation[];
  handleInterpolationNotifications?: (interps: AnyInterpolation[]) => void;
}) => {
  const value = useInterpolations(initialValue, {
    handleInterpolationNotifications,
  });
  return <InterpolateContext value={value}>{children}</InterpolateContext>;
};
