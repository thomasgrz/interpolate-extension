import {
  HeaderInterpolation,
  RedirectInterpolation,
} from "../utils/factories/Interpolation";
import { logger } from "../utils/logger";
import { InterpolateStorage } from "../utils/storage/InterpolateStorage/InterpolateStorage";
import { handleInstall } from "./handleInstall";
import { AnyInterpolation } from "@/utils/factories/Interpolation";

const debuggerTabs = new Set<number>();

const continueRequest = async ({
  requestId,
  tabId,
  requestUrl,
  headers,
  interpolation,
  urlOverride,
}: {
  headers?: {
    name?: string;
    value?: string;
  }[];
  requestId: string;
  tabId: number;
  requestUrl?: string;
  urlOverride?: string;
  interpolation?: AnyInterpolation;
}) => {
  logger(
    "OVERRIDE:" +
      !!urlOverride +
      " Request URL:" +
      requestUrl +
      " urlOverride:" +
      urlOverride,
  );
  if (interpolation) {
    InterpolateStorage.pushTabActivity({ tabId, interpolation });

    setTimeout(() => {
      // TODO: find a more robust solution for updating activity
      // and sending messages..
      // the delay here is just a rough workaround to ensure that if the
      // interpolation is a redirect at the top level, the page
      // will still show the notifs (rather than have them eschewed instantly during navigation)
      chrome.tabs.sendMessage(tabId, {
        ...interpolation,
        isInterpolation: true,
        requestUrl,
        urlOverride,
        requestId,
        tabId,
      });
    }, 2000);
  }
  chrome.debugger.sendCommand({ tabId }, "Fetch.continueRequest", {
    requestId,
    url: urlOverride ?? requestUrl,
    ...(headers ? { headers } : {}),
  });
};

try {
  chrome.tabs.onRemoved.addListener((tabId) => {
    // Remove reference to tabs as they're closed.
    // might not be necessary but cant hurt?
    debuggerTabs.delete(tabId);
  });

  // For this tab, make sure we only handle
  // request paused events
  chrome.debugger.onEvent.addListener(
    async (source, event, requestInfo: unknown) => {
      if (event === "Target.attachedToTarget") {
        // `source` identifies the parent session, but we need to construct a new
        // identifier for the child session
        const session = {
          ...source,
          sessionId: (requestInfo as { sessionId: number })?.sessionId!,
        };
        logger("Target.attachedToTarget", session);

        // Ensure we're listening to _all_ fetch invocations from the tab
        // @ts-expect-error debugging rn
        return chrome.debugger.sendCommand(session, "Fetch.enable");
      }
      const isIrrelevantEvent = event !== "Fetch.requestPaused";

      // If is not a request paused event do nothing, exit early
      if (isIrrelevantEvent) return;

      const { tabId } = source;
      const { request, requestId } =
        (requestInfo as { requestId: string; request: { url: string } }) ?? {};

      const { url: requestUrl } = request;
      // Get the latest of all the redirect rules
      const redirectRules = (await InterpolateStorage.getAllByTypes([
        "redirect",
        "headers",
      ])) as (RedirectInterpolation | HeaderInterpolation)[];

      const noRedirectMatchingpatterns = !redirectRules?.length;

      // If we have no redirect rules continue request, exit
      if (noRedirectMatchingpatterns)
        return continueRequest({
          requestId,
          tabId: tabId as number,
          requestUrl,
        });

      const isChromeExtensionEvent =
        request?.url?.startsWith("chrome-extension");

      // If we it's a chrome extension request do nothing, exit
      if (isChromeExtensionEvent)
        return continueRequest({
          requestId,
          tabId: tabId as number,
          requestUrl,
        });

      const isNonDebuggingTab = !debuggerTabs.has(tabId!);

      // If we are not debugging this tab continue request, exit
      if (isNonDebuggingTab)
        return continueRequest({
          requestId,
          tabId: tabId as number,
          requestUrl,
        });

      const matchingInterpolation = redirectRules.find((rule) => {
        const regexMatcher = rule?.details?.condition?.regexFilter;
        const isMatchPatternMissing = !regexMatcher;
        if (isMatchPatternMissing) return false;
        const isMatch = new RegExp(regexMatcher).test(requestUrl);
        return isMatch;
      });

      const noMatchingInterpolation = !matchingInterpolation;
      // If we have no matching redirect interpolations continue request, exit
      if (noMatchingInterpolation)
        return continueRequest({
          tabId: tabId as number,
          requestId,
          requestUrl,
        });

      const isInterpolationDisabled = !matchingInterpolation.enabledByUser;
      if (isInterpolationDisabled)
        return continueRequest({
          tabId: tabId as number,
          requestId,
          requestUrl,
        });

      const interpolationType = matchingInterpolation?.type;
      switch (interpolationType) {
        case "headers":
          return continueRequest({
            interpolation: matchingInterpolation,
            headers: [
              {
                name: matchingInterpolation?.details?.action
                  ?.requestHeaders?.[0]?.header,
                value:
                  matchingInterpolation?.details?.action?.requestHeaders?.[0]
                    ?.value,
              },
            ],
            tabId: tabId as number,
            requestId,
            requestUrl,
          });
          break;
        case "redirect":
          // If we've not bailed by now then,
          // apply the associated redirect rule
          return continueRequest({
            interpolation: matchingInterpolation,
            tabId: tabId as number,
            requestId,
            urlOverride: matchingInterpolation?.details?.action?.redirect?.url,
            requestUrl,
          });
          break;
        default:
          return continueRequest({
            tabId: tabId as number,
            requestId,
            requestUrl,
          });
      }
    },
  );
  // Set up initial listeners whenever a new tab is updated.
  // This should ensure that we're listening to this tab's target
  // and all other related targets from that tab (iframes, service workers, third party sources etc)
  // NOTE: onUpdated can happen in the background too so we shouldnt
  chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    const isNotDebuggable = !tab.url?.startsWith("http");
    if (isNotDebuggable) return;

    const isTabMissing = !tabId;
    if (isTabMissing) return;
    const isDebuggerAttached = debuggerTabs.has(tabId);
    if (isDebuggerAttached) return;
    // Attach to the tab's debugger session.
    chrome.debugger.attach({ tabId }, "1.3", () => {
      debuggerTabs.add(tabId);
      chrome.debugger.sendCommand({ tabId }, "Fetch.enable", {}, () => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
        }
      });
    });
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
  chrome.webNavigation.onCommitted.addListener(async (details) => {
    const { tabId } = details;
    await InterpolateStorage.setTabActivity({ tabId, interpolations: [] });
  });
} catch (e) {
  logger("Error in background.ts", e);
}
