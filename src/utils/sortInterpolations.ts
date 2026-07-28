import { SortOption } from "#src/components/SortingOptions/SortingOptions.tsx";
import { AnyInterpolation } from "./factories/Interpolation";
import { GroupConfigInStorage } from "./factories/InterpolationGroup";

export const sortInterpolations = (
  interpolations: (AnyInterpolation | GroupConfigInStorage)[],
  sortOption: SortOption,
) => {
  switch (sortOption) {
    case SortOption.TYPE:
      return interpolations?.sort?.((a, b) => (a?.type < b?.type ? -1 : 1));
    case SortOption.A_TO_Z:
      return interpolations?.sort?.((a, b) =>
        a?.name?.toLowerCase() < b?.name?.toLowerCase() ? -1 : 1,
      );
    case SortOption.Z_TO_A:
      return interpolations?.sort((a, b) =>
        a?.name?.toLowerCase() > b?.name?.toLowerCase() ? -1 : 1,
      );
    case SortOption.OLDEST:
      return interpolations?.sort?.((a, b) => {
        if (a.createdAt === b.createdAt)
          return a?.name?.toLowerCase() < b?.name?.toLowerCase() ? -1 : 1;
        return a.createdAt < b.createdAt ? -1 : 1;
      });
    case SortOption.NEWEST:
    default:
      return interpolations?.sort?.((a, b) => {
        if (a.createdAt === b.createdAt)
          return a?.name?.toLowerCase() < b?.name?.toLowerCase() ? -1 : 1;
        return a.createdAt < b.createdAt ? 1 : -1;
      });
  }
};
