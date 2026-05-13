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

  const debuggerTabs = await chrome.debugger.getTargets();
  const debuggerTargetInfo = debuggerTabs.find(
    (target) => target.tabId === tab.id,
  );

  const isDebuggerAttached = debuggerTargetInfo?.attached;

  if (isDebuggerAttached) return;
  // Attach to the tab's debugger session.

  chrome.debugger.attach({ tabId: tab.id }, "1.3", () => {
    InterpolateStorage.addTabDebugger(tab.id as number);
    chrome.debugger.sendCommand({ tabId: tab.id }, "Fetch.enable", {}, () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      }
    });
  });
};
