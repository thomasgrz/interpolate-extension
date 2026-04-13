import { useContext } from "react";
import { InterpolateContext } from "../../contexts/interpolate-context.tsx";

export const useInterpolationsContext = () => {
  const value = useContext(InterpolateContext);
  return value;
};
