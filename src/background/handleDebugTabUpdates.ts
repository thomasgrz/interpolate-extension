import { InterpolateStorage } from "#src/utils/storage/InterpolateStorage/InterpolateStorage.ts";

export const handleDebugTabUpdates = async (
  tabId: number,
  tab: chrome.tabs.Tab,
) => {
  const isNotDebuggable = !tab.url?.startsWith("http");
  if (isNotDebuggable) return;

  const isTabMissing = !tabId;
  if (isTabMissing) return;

  const debuggerTabs = await InterpolateStorage.getDebuggerTabs();
  const isDebuggerAttached = debuggerTabs.has(tabId);
  if (isDebuggerAttached) return;
  // Attach to the tab's debugger session.
  chrome.debugger.attach({ tabId }, "1.3", () => {
    if (debuggerTabs.has(tabId)) return;

    InterpolateStorage.addTabDebugger(tabId);
    chrome.debugger.sendCommand({ tabId }, "Fetch.enable", {}, () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      }
    });
  });
};
