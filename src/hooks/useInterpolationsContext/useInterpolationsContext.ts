import { useContext } from "react";
import { InterpolateContext } from "../../contexts/interpolate-context.tsx";

export const useInterpolationsContext = () => {
  const {
    interpolations,
    pauseAll,
    recentlyActive,
    resumeAll,
    removeAll,
    allPaused,
    notifications,
  } = useContext(InterpolateContext);
  return {
    interpolations,
    pauseAll,
    recentlyActive,
    resumeAll,
    removeAll,
    allPaused,
    notifications,
  };
};
