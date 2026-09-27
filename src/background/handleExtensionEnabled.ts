import { InterpolateStorage } from "#src/utils/storage/InterpolateStorage/InterpolateStorage.ts";

/**
 * We only handle re-enabling user scripts here
 * because the guard/enablement for all other interpolations
 * is in handled in background.ts (by attaching or re-attaching from debugger)
 *
 * TODO: move all enablement logic here...
 */
export const handleExtensionEnabled = async () => {
  const scripts = await InterpolateStorage.getAllEnabled().then((interps) =>
    interps?.filter((interp) => interp.type === "script"),
  );

  const noScriptsEnabled = !scripts;

  if (noScriptsEnabled) return;

  await chrome.userScripts.register(scripts.map((script) => script.details));
};
