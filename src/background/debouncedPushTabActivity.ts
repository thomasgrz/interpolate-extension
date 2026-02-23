import { AnyInterpolation } from "#src/utils/factories/Interpolation.ts";
import { InterpolateStorage } from "#src/utils/storage/InterpolateStorage/InterpolateStorage.ts";

/**
 * Returns an id string like <tabId>:<number>,<number>... (ex: "1234:6789,1011,1213")
 */
const getRecentTabActivitySetKey = ({
  tabId,
  interpolations,
}: {
  tabId: number;
  interpolations: AnyInterpolation[];
}) => {
  return `${tabId}:${interpolations?.map((interp) => interp.details.id).join(",")}`;
};

const recentTabActivity = new Set<string>();

/**
 * There's a storage quota that can be easily reached
 * with things like headers added to every request.
 * (For example, if a page is sending constant vitals to the server from the client)
 */
export const debouncedPushTabActivity = async ({
  tabId,
  interpolations,
}: {
  tabId: number;
  interpolations: AnyInterpolation[];
}) => {
  let tabActivityKey = getRecentTabActivitySetKey({ tabId, interpolations });
  const alreadyRecentlyTracked = recentTabActivity.has(tabActivityKey);

  if (alreadyRecentlyTracked) return;

  await InterpolateStorage.pushTabActivity({ tabId, interpolations });

  recentTabActivity.add(tabActivityKey);

  setTimeout(() => {
    recentTabActivity.delete(tabActivityKey);
  });
};
