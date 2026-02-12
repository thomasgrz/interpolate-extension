import {
  HeaderInterpolation,
  RedirectInterpolation,
} from "../utils/factories/Interpolation";
import { logger } from "../utils/logger";
import { InterpolateStorage } from "../utils/storage/InterpolateStorage/InterpolateStorage";
import { handleInstall } from "./handleInstall";
import { AnyInterpolation } from "@/utils/factories/Interpolation";
const debuggerTabs = new Set<number>();

/**
 * Returns an id string like <tabId>:<number>,<number>... (ex: "1234:6789,1011,1213")
 */
const getRecentTabActivitySetKey = ({
  tabId,
  interpolations,
}: {
  tabId: number;
  interpolations: AnyInterpolation[];
}) => {
  return `${tabId}:${interpolations?.map((interp) => interp.details.id).join(",")}`;
};

const recentTabActivity = new Set<string>();

/**
 * There's a storage quota that can be easily reached
 * with things like headers added to every request.
 * (For example, if a page is sending constant vitals to the server from the client)
 */
const debouncedPushTabActivity = ({
  tabId,
  interpolations,
}: {
  tabId: number;
  interpolations: AnyInterpolation[];
}) => {
  let tabActivityKey = getRecentTabActivitySetKey({ tabId, interpolations });
  const alreadyRecentlyTracked = recentTabActivity.has(tabActivityKey);

  if (alreadyRecentlyTracked) return;

  InterpolateStorage.pushTabActivity({ tabId, interpolations });

  recentTabActivity.add(tabActivityKey);

  setTimeout(() => {
    recentTabActivity.delete(tabActivityKey);
  }, 2000);
};

const continueRequest = async ({
  request,
  requestId,
  tabId,
  requestUrl,
  headerOverrides = [],
  interpolations,
  urlOverride,
}: {
  headerOverrides?: {
    name?: string;
    value?: string;
    interpolationId: number;
  }[];
  request: { headers: Record<string, unknown> };
  requestId: string;
  tabId: number;
  requestUrl?: string;
  urlOverride?: string;
  interpolations?: AnyInterpolation[];
}) => {
  logger(
    "OVERRIDE:" +
      !!urlOverride +
      " Request URL:" +
      requestUrl +
      " urlOverride:" +
      urlOverride,
  );
  if (interpolations) {
    setTimeout(() => {
      debouncedPushTabActivity({ tabId, interpolations });

      // TODO: find a more robust solution for updating activity
      // and sending messages..
      // the delay here is just a rough workaround to ensure that if the
      // interpolation is a redirect at the top level, the page
      // will still show the notifs (rather than have them eschewed instantly during navigation)
      chrome.tabs.sendMessage(tabId, {
        interpolations,
        isInterpolation: true,
        requestUrl,
        urlOverride,
        requestId,
        tabId,
      });
    }, 2000);
  }

  const requestHeaders = Object.entries(request.headers).map(
    ([key, value]) => ({ name: key, value }),
  );
  chrome.debugger.sendCommand({ tabId }, "Fetch.continueRequest", {
    requestId,
    url: urlOverride ?? requestUrl,
    headers: [
      ...requestHeaders,
      ...headerOverrides.map((header) => ({
        name: header.name,
        value: header.value,
      })),
    ],
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
        (requestInfo as {
          requestId: string;
          request: { url: string; headers: { [key: string]: string } };
        }) ?? {};

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
          request,
        });

      const isChromeExtensionEvent =
        request?.url?.startsWith("chrome-extension");

      // If we it's a chrome extension request do nothing, exit
      if (isChromeExtensionEvent)
        return continueRequest({
          requestId,
          tabId: tabId as number,
          requestUrl,
          request,
        });

      const isNonDebuggingTab = !debuggerTabs.has(tabId!);

      // If we are not debugging this tab continue request, exit
      if (isNonDebuggingTab)
        return continueRequest({
          requestId,
          tabId: tabId as number,
          requestUrl,
          request,
        });

      const matchingInterpolations = redirectRules.filter((rule) => {
        const isDisabled = !rule?.enabledByUser;
        if (isDisabled) return false;
        const regexMatcher = rule?.details?.condition?.regexFilter;
        const isMatchPatternMissing = !regexMatcher;
        if (isMatchPatternMissing) return false;
        const isMatch = new RegExp(regexMatcher).test(requestUrl);
        return isMatch;
      });

      const noMatchingInterpolation = !matchingInterpolations.length;
      // If we have no matching redirect interpolations continue request, exit
      if (noMatchingInterpolation)
        return continueRequest({
          tabId: tabId as number,
          requestId,
          requestUrl,
          request,
        });

      const isEveryInterpolationDisabled = matchingInterpolations.every(
        (interp) => !interp?.enabledByUser,
      );
      if (isEveryInterpolationDisabled)
        return continueRequest({
          tabId: tabId as number,
          requestId,
          requestUrl,
          request,
        });

      const headerOverrides = matchingInterpolations.reduce(
        (acc, curr: HeaderInterpolation | RedirectInterpolation) => {
          if (curr.type === "headers") {
            const isHeaderInvalid =
              !curr?.details?.action?.requestHeaders?.[0]?.header ||
              !curr?.details?.action?.requestHeaders?.[0]?.value;

            if (isHeaderInvalid) return acc;

            const isDisabled = !curr?.enabledByUser;

            if (isDisabled) return acc;

            return [
              ...acc,
              {
                interpolationId: curr.details.id ?? 0,
                name: curr?.details?.action?.requestHeaders?.[0]?.header ?? "",
                value: curr?.details?.action?.requestHeaders?.[0]?.value ?? "",
              },
            ];
          }
          return acc;
        },
        [] as { name: string; value: string; interpolationId: number }[],
      );

      const redirectInterpolation = matchingInterpolations?.find(
        (interp) => interp?.type === "redirect",
      );

      const containsRedirectInterpolation = !!redirectInterpolation;

      if (containsRedirectInterpolation) {
        return continueRequest({
          interpolations: matchingInterpolations,
          tabId: tabId as number,
          requestId,
          urlOverride: redirectInterpolation?.details?.action?.redirect?.url,
          requestUrl,
          headerOverrides,
          request,
        });
      }

      const ifContainsHeaderOverrides = !!headerOverrides.length;

      if (ifContainsHeaderOverrides) {
        return continueRequest({
          tabId: tabId as number,
          requestId,
          requestUrl,
          headerOverrides,
          interpolations: matchingInterpolations,
          request,
        });
      }

      return continueRequest({
        tabId: tabId as number,
        request,
        requestId,
      });
    },
  );
  // Set up initial listeners whenever a new tab is updated.
  // This should ensure that we're listening to this tab's target
  // and all other related targets from that tab (iframes, service workers, third party sources etc)
  // NOTE: onUpdated can happen in the background too so we shouldnt
  chrome.tabs.onUpdated.addListener(async (tabId, _, tab) => {
    const isNotDebuggable = !tab.url?.startsWith("http");
    if (isNotDebuggable) return;

    const isTabMissing = !tabId;
    if (isTabMissing) return;
    const isDebuggerAttached = debuggerTabs.has(tabId);
    if (isDebuggerAttached) return;
    // Attach to the tab's debugger session.
    chrome.debugger.attach({ tabId }, "1.3", () => {
      if (debuggerTabs.has(tabId)) return;

      debuggerTabs.add(tabId);
      chrome.debugger.sendCommand({ tabId }, "Fetch.enable", {}, () => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
        }
      });
    });

    if (chrome.runtime.lastError) {
      console.log("AHHHHHHHHHHHHHH! " + chrome.runtime.lastError);
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
