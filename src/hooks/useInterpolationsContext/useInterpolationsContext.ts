import { useContext } from "react";
import { InterpolateContext } from "../../contexts/interpolate-context.tsx";

export const useInterpolationsContext = () => {
  const {
    interpolations,
    pauseAll,
    groups,
    recentlyActive,
    resumeAll,
    removeAll,
    removeGroup,
    allPaused,
  } = useContext(InterpolateContext);
  return {
    groups,
    interpolations,
    pauseAll,
    recentlyActive,
    resumeAll,
    removeAll,
    removeGroup,
    allPaused,
  };
};
