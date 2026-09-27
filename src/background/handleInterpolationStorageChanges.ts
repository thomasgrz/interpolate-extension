import { logger } from "#src/utils/logger.ts";
import { SubscriptionCallback } from "#src/utils/storage/InterpolateStorage/InterpolateStorage.ts";
import { handleExtensionPause } from "./handleExtensionPause";
import { handleInterpolationCreations } from "./handleInterpolationCreations";
import { handleInterpolationUpdates } from "./handleInterpolationUpdates";

export const handleInterpolationStorageChanges: SubscriptionCallback = async (
  values,
) => {
  try {
    const containsUpdatedValues = !!values.updated.length;
    const containsRemovedValues = !!values.removed.length;
    const containsCreatedValues = !!values.created.length;
    const isExtensionBeingPaused = values.extensionEnabled === false;

    if (isExtensionBeingPaused) {
      await handleExtensionPause();
    }
    if (containsUpdatedValues) {
      await handleInterpolationUpdates(values.updated);
    }

    if (containsRemovedValues) {
      await handleInterpolationUpdates(values.removed);
    }

    if (containsCreatedValues) {
      await handleInterpolationCreations(values.created);
    }
  } catch (e) {
    logger(`handleInterpolationStorageChanges resulted with error: ${e}`);
  }
};
