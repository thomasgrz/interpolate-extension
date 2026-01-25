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
  url,
  headers,
  matchingInterpolation,
}: {
  headers?: {
    name?: string;
    value?: string;
  }[];
  requestId: string;
  tabId: number;
  url?: string;
  matchingInterpolation?: AnyInterpolation;
}) => {
  logger(
    "Continuing request in tab: " + tabId + " for request with id " + requestId,
  );
  chrome.debugger.sendCommand({ tabId }, "Fetch.continueRequest", {
    requestId,
    ...(url ? { url } : {}),
    ...(headers ? { headers } : {}),
  });

  if (matchingInterpolation) {
    chrome.tabs.sendMessage(tabId, matchingInterpolation);
  }
};

try {
  chrome.tabs.onRemoved.addListener((tabId) => {
    // Remove reference to tabs as they're closed.
    // might not be necessary but cant hurt?
    debuggerTabs.delete(tabId);
  });

  const attachToRelatedTargetsInTab = () => {
    chrome.debugger.onEvent.addListener(async (source, method, params) => {
      if (method === "Target.attachedToTarget") {
        // `source` identifies the parent session, but we need to construct a new
        // identifier for the child session
        const session = {
          ...source,
          sessionId: (params as { sessionId: number })?.sessionId!,
        };
        logger("Target.attachedToTarget", session);

        // Ensure we're listening to _all_ fetch invocations from the tab
        // @ts-expect-error debugging rn
        return chrome.debugger.sendCommand(session, "Fetch.enable");
      }
    });
  };

  // For this tab, make sure we only handle
  // request paused events
  chrome.debugger.onEvent.addListener(
    async (source, event, requestInfo: unknown) => {
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
          url: requestUrl,
        });

      const isChromeExtensionEvent =
        request?.url?.startsWith("chrome-extension");

      // If we it's a chrome extension request do nothing, exit
      if (isChromeExtensionEvent)
        return continueRequest({
          requestId,
          tabId: tabId as number,
          url: requestUrl,
        });

      const isNonDebuggingTab = !debuggerTabs.has(tabId!);

      // If we are not debugging this tab continue request, exit
      if (isNonDebuggingTab)
        return continueRequest({
          requestId,
          tabId: tabId as number,
          url: requestUrl,
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
          url: requestUrl,
        });

      const isInterpolationDisabled = !matchingInterpolation.enabledByUser;
      if (isInterpolationDisabled)
        return continueRequest({
          tabId: tabId as number,
          requestId,
          url: requestUrl,
        });

      const interpolationType = matchingInterpolation?.type;
      switch (interpolationType) {
        case "headers":
          return continueRequest({
            matchingInterpolation,
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
            url: matchingInterpolation?.details?.action?.redirect?.url,
          });
          break;
        case "redirect":
          // If we've not bailed by now then,
          // apply the associated redirect rule
          return continueRequest({
            matchingInterpolation,
            tabId: tabId as number,
            requestId,
            url: matchingInterpolation?.details?.action?.redirect?.url,
          });
          break;
        default:
          return continueRequest({
            tabId: tabId as number,
            requestId,
            url: requestUrl,
          });
      }
      // If we've not bailed by now then,
      // apply the associated redirect rule
      return continueRequest({
        tabId: tabId as number,
        requestId,
        url: matchingInterpolation?.details?.action?.redirect?.url,
      });
    },
  );
  // Set up initial listeners whenever a new tab is updated.
  // This should ensure that we're listening to this tab's target
  // and all other related targets from that tab (iframes, service workers, third party sources etc)
  // NOTE: onUpdated can happen in the background too so we shouldnt
  chrome.tabs.onUpdated.addListener(async (tabId) => {
    const isDebuggerAttached = debuggerTabs.has(tabId);
    // If the initial listeners have been setup we can exit early
    if (isDebuggerAttached) return;
    console.count("tabId onUpdated setup logic called for: " + tabId);

    // Attach to the tab's debugger session.
    chrome.debugger.attach({ tabId }, "1.3");
    // Ensure that we attach to related targets in the tab (like 3rd party scripts etc.)
    attachToRelatedTargetsInTab();
    // Track which tabs we've attached to already.
    debuggerTabs.add(tabId);
    // Assert that debugger should run all Fetch requests
    // through Interpolate (by default)
    chrome.debugger.sendCommand({ tabId }, "Fetch.enable");
  });

  chrome.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === "install") {
      chrome.tabs.create({
        url: "onboarding.html",
      });
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
} catch (e) {
  logger("Error in background.ts", e);
}
