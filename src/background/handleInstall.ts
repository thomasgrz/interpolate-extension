import { logger } from "@/utils/logger";
import { InterpolateStorage } from "@/utils/storage/InterpolateStorage/InterpolateStorage";
import { handleInterpolationStorageChanges } from "./handleInterpolationStorageChanges";

export const handleInstall = async () => {
  try {
    await InterpolateStorage.enableExtension();
  } catch (e) {}
  if (chrome.runtime.lastError) {
    logger("*ahem* RAHHHHHHHHHHHHHH!" + chrome.runtime.lastError);
  }

  InterpolateStorage.subscribeToInterpolationChanges(async (values) => {
    await handleInterpolationStorageChanges(values);
  });
};
