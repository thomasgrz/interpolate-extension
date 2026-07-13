import { InterpolateStorage } from "#src/utils/storage/InterpolateStorage/InterpolateStorage.ts";

export const handleDebugTabUpdates = async (
  _: number | null,
  tab: chrome.tabs.Tab,
) => {
  const isExtensionEnabled = await InterpolateStorage.getIsExtensionEnabled();
  const isExtensionDisabled = !isExtensionEnabled;

  if (isExtensionDisabled) return;

  const isNotDebuggable = !tab.url?.startsWith("http");
  if (isNotDebuggable) return;

  const isTabMissing = !tab.id;
  if (isTabMissing) return;

  // TODO: re-enable guard that asserts we don't attach
  // to tab if it already has a debugger attached ...
  // right now it doesnt really tell us enough info to
  // discern between if OUR extension (interpolate) is attached
  // of if some other extension/worker is attached...
  // this breaks CI and could cause issues in production env
  // const debuggerTabs = await chrome.debugger.getTargets();
  // const debuggerTargetInfo = debuggerTabs.find(
  //   (target) => target.tabId === tab.id,
  // );
  // const isDebuggerAttached = debuggerTargetInfo?.attached;

  chrome.debugger.attach({ tabId: tab.id }, "1.3", () => {
    InterpolateStorage.addTabDebugger(tab.id as number);
    chrome.debugger.sendCommand({ tabId: tab.id }, "Fetch.enable", {}, () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      }
    });
  });
};
