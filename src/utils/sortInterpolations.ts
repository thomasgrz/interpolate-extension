import { SortOption } from "#src/components/SortingOptions/SortingOptions.tsx";
import { AnyInterpolation } from "./factories/Interpolation";
import { GroupConfigInStorage } from "./factories/InterpolationGroup";

export const sortInterpolations = (
  interpolations: (AnyInterpolation | GroupConfigInStorage)[],
  sortOption: SortOption,
) => {
  switch (sortOption) {
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
        return a.createdAt < b.createdAt ? 1 : -1;
      });
    case SortOption.DISABLED:
      return interpolations?.sort?.((a, b) => {
        if (a.enabledByUser && !b.enabledByUser) return 1;
        if (a.enabledByUser && b.enabledByUser) {
          return a?.name?.toLowerCase() < b?.name?.toLowerCase() ? -1 : 1;
        }
        return !a?.enabledByUser ? -1 : 1;
      });

    case SortOption.ENABLED:
      return interpolations?.sort?.((a, b) => {
        if (a.enabledByUser && !b.enabledByUser) return -1;
        if (a.enabledByUser && b.enabledByUser) {
          return a?.name?.toLowerCase() < b?.name?.toLowerCase() ? -1 : 1;
        }
        return a?.enabledByUser ? -1 : 1;
      });
    case SortOption.INVOKED:
      return interpolations?.sort?.((a, b) => {
        if (a.isActive && !b.isActive) return -1;
        if (a.isActive && b.isActive) {
          return a?.name?.toLowerCase() < b?.name?.toLowerCase() ? -1 : 1;
        }
        return a?.isActive ? -1 : 1;
      });
    case SortOption.NOT_INVOKED:
      return interpolations?.sort?.((a, b) => {
        if (a.isActive && !b.isActive) return 1;
        if (!a.isActive && !b.isActive) {
          return a?.name?.toLowerCase() < b?.name?.toLowerCase() ? -1 : 1;
        }
        return a?.isActive ? 1 : -1;
      });
    case SortOption.NEWEST:
    default:
      return interpolations?.sort?.((a, b) => {
        if (a.createdAt === b.createdAt)
          return a?.name?.toLowerCase() < b?.name?.toLowerCase() ? -1 : 1;
        return a.createdAt < b.createdAt ? -1 : 1;
      });
  }
};
