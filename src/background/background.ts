import { TabManagerInterpolation } from "#src/utils/factories/Interpolation.ts";
import { logger } from "../utils/logger";
import { InterpolateStorage } from "../utils/storage/InterpolateStorage/InterpolateStorage";
import { debouncedPushTabActivity } from "./debouncedPushTabActivity";
import { handleDebuggerEvent } from "./handleDebuggerEvent";
import { handleDebugTabUpdates } from "./handleDebugTabUpdates";
import { handleInstall } from "./handleInstall";

try {
  chrome.tabs.onRemoved.addListener((tabId) => {
    // Remove reference to tabs as they're closed.
    // might not be necessary but cant hurt?
    InterpolateStorage.deleteDebuggerTab(tabId);
  });

  chrome.storage.local.onChanged.addListener(async (changes) => {
    const { isExtensionEnabled } = changes;

    const isIrrelevant = !isExtensionEnabled;
    if (isIrrelevant) return;

    const isUserEnablingExtension = isExtensionEnabled.newValue === true;
    const isUserDisablingExtension = isExtensionEnabled.newValue === false;

    if (isUserEnablingExtension) {
      const tabs = await chrome.tabs.query({});
      const debuggableTabs = tabs.filter((tab) => tab.url?.startsWith("http"));

      await Promise.all(
        debuggableTabs.map((tab) => handleDebugTabUpdates(null, tab)),
      );
    }

    if (isUserDisablingExtension) {
      const tabs = await chrome.tabs.query({});
      const debuggableTabs = tabs.filter((tab) => tab.url?.startsWith("http"));
      const debuggerTargets = await chrome.debugger.getTargets();
      const tabsBeingDebugged = debuggableTabs.filter((debuggableTab) => {
        const matchingDebuggerTarget = debuggerTargets.find(
          (target) => target.tabId === debuggableTab.id,
        );

        const isBeingDebugged = matchingDebuggerTarget?.attached;

        return isBeingDebugged;
      });
      await Promise.all(
        tabsBeingDebugged.map((tab) =>
          chrome.debugger.detach({ tabId: tab.id }),
        ),
      );
    }
  });

  // For this tab, make sure we only handle
  // request paused events
  chrome.debugger.onEvent.addListener(handleDebuggerEvent);

  // Set up initial listeners whenever a new tab is updated.
  // This should ensure that we're listening to this tab's target
  // and all other related targets from that tab (iframes, service workers, third party sources etc)
  // NOTE: onUpdated can happen in the background too so we shouldnt
  chrome.tabs.onUpdated.addListener(async (tabId, _, tab) => {
    try {
      handleDebugTabUpdates(tabId, tab);
    } catch (e) {
      if (chrome.runtime.lastError) {
        logger("*ahem* RAHHHHHHHHHHHHHH!" + chrome.runtime.lastError);
      }
    }
  });

  chrome.debugger.onDetach.addListener(async () => {
    await InterpolateStorage.disableExtension();
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

  chrome.tabs.onCreated.addListener(async (tab) => {
    const currentTabManagementConfigs = await InterpolateStorage.getAllByTypes([
      "tab-manager",
    ]);

    const matchingGroup = (
      currentTabManagementConfigs as TabManagerInterpolation[]
    ).find((interpTabMgmtConfig) => {
      const isInterpolationDisabled = !interpTabMgmtConfig.enabledByUser;

      if (isInterpolationDisabled) return false;
      const regex = new RegExp(interpTabMgmtConfig.details.matcher);

      const isMatch = tab.pendingUrl && regex.exec(tab.pendingUrl);

      return isMatch;
    });

    chrome.tabs.group({
      groupId: Number(matchingGroup?.details.groupId),
      tabIds: tab?.id,
    });

    setTimeout(() => {
      if (!matchingGroup || !tab.id) return;
      // Update storage without hammering it..
      debouncedPushTabActivity({
        tabId: tab.id,
        interpolations: [matchingGroup],
      });
      // TODO: find a more robust solution for updating activity
      // and sending messages..
      // the delay here is just a rough workaround to ensure that if the
      // interpolation is a redirect at the top level, the page
      // will still show the notifs (rather than have them eschewed instantly during navigation)
      chrome.tabs.sendMessage(tab?.id, {
        interpolations: [matchingGroup],
        isInterpolation: true,
        tabId: tab.id,
      });
    }, 2000);
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
