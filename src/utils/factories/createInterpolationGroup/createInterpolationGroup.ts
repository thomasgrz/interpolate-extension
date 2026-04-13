import { InterpolationGroup } from "../InterpolationGroup";

export const createInterpolationGroup = (config: {
  name: string;
  interpolationIds: string[];
}) => {
  return new InterpolationGroup({
    name: config?.name,
    interpolationIds: config?.interpolationIds,
  });
};
