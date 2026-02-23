import { logger } from "../utils/logger";
import { InterpolateStorage } from "../utils/storage/InterpolateStorage/InterpolateStorage";
import { handleDebuggerEvent } from "./handleDebuggerEvent";
import { handleDebugTabUpdates } from "./handleDebugTabUpdates";
import { handleInstall } from "./handleInstall";

try {
  chrome.tabs.onRemoved.addListener((tabId) => {
    // Remove reference to tabs as they're closed.
    // might not be necessary but cant hurt?
    InterpolateStorage.deleteDebuggerTab(tabId);
  });

  // For this tab, make sure we only handle
  // request paused events
  chrome.debugger.onEvent.addListener(handleDebuggerEvent);

  // Set up initial listeners whenever a new tab is updated.
  // This should ensure that we're listening to this tab's target
  // and all other related targets from that tab (iframes, service workers, third party sources etc)
  // NOTE: onUpdated can happen in the background too so we shouldnt
  chrome.tabs.onUpdated.addListener(async (tabId, _, tab) => {
    handleDebugTabUpdates(tabId, tab);
    if (chrome.runtime.lastError) {
      logger("*ahem* RAHHHHHHHHHHHHHH!" + chrome.runtime.lastError);
    }
  });

  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));

  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "openSidePanel",
      title: "Open Interpolate panel",
      contexts: ["all"],
    });

    handleInstall();
  });

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "openSidePanel" && tab?.windowId) {
      // This will open the panel in all the pages on the current window.
      chrome.sidePanel.open({ windowId: tab?.windowId });
      // chrome.action.setPopup({ popup: './popup.html'})
    }
  });
  chrome.tabs.onHighlighted.addListener(async (highlightInfo) => {
    const { tabIds } = highlightInfo;
    const activeTab = tabIds[0];
    await InterpolateStorage.setActiveTab(activeTab);
  });
  chrome.webNavigation.onBeforeNavigate.addListener(
    ({ parentFrameId, tabId }) => {
      if (parentFrameId !== -1) return;

      InterpolateStorage.setTabActivity({ tabId, interpolations: [] });
    },
  );
} catch (e) {
  logger("Error in background.ts", e);
}
