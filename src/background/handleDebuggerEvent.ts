import { logger } from "#src/utils/logger.ts";
import { InterpolateStorage } from "#src/utils/storage/InterpolateStorage/InterpolateStorage.ts";
import { continueRequestWithInterpolations } from "./continueRequestWithInterpolations";

export const handleDebuggerEvent = async (
  source: chrome._debugger.DebuggerSession,
  event: string,
  params?:
    | {
        sessionId?: string;
        request?: { url?: string; headers: Record<string, unknown> };
        requestId?: string;
      }
    | undefined,
) => {
  if (chrome.runtime.lastError) {
    logger("*ahem* RAHHHHHHHHHHHHHH!" + chrome.runtime.lastError);
  }

  if (event === "Target.attachedToTarget") {
    // `source` identifies the parent session, but we need to construct a new
    // identifier for the child session
    const session = {
      ...source,
      sessionId: params?.sessionId!,
    };
    logger("Target.attachedToTarget", session);

    // Ensure we're listening to _all_ fetch invocations from the tab
    return chrome.debugger.sendCommand(session, "Fetch.enable");
  }
  const isIrrelevantEvent = event !== "Fetch.requestPaused";

  const { tabId } = source;
  const { request, requestId } = params ?? {};

  const { url: requestUrl } = request ?? {};
  // If is not a request paused event do nothing, exit early
  if (isIrrelevantEvent) return;

  const isChromeExtensionEvent = request?.url?.startsWith("chrome-extension");

  if (!requestId) {
    throw Error("Missing request id in handleDebuggerEvent");
  }

  if (!request) {
    throw Error("Missing request info in params within handleDebuggerEvent");
  }
  // If we it's a chrome extension request do nothing, exit
  if (isChromeExtensionEvent)
    return continueRequestWithInterpolations({
      requestId,
      tabId: tabId as number,
      requestUrl,
      request,
    });

  // Get the latest of all the redirect rules
  const allInterpolations = await InterpolateStorage.getAllInterpolations();

  const debuggerTabs = await InterpolateStorage.getDebuggerTabs();

  const isNonDebuggingTab = !debuggerTabs.has(tabId!);

  // If we are not debugging this tab continue request, exit
  if (isNonDebuggingTab)
    return continueRequestWithInterpolations({
      requestId,
      tabId: tabId as number,
      requestUrl,
      request,
    });

  const activeInterpolations =
    allInterpolations?.filter?.((rule) => {
      const isDisabled = !rule?.enabledByUser;
      if (isDisabled) return false;
      return true;
    }) ?? [];

  const applicableInterpolations = activeInterpolations?.filter((interp) => {
    let regexPattern = ".*";
    switch (interp.type) {
      case "redirect":
        regexPattern = interp?.details?.condition?.regexFilter ?? "";

        return regexPattern && requestUrl?.match?.(regexPattern)?.[0]?.length;
      case "script":
      case "headers":
        return true;
    }
  });

  return continueRequestWithInterpolations({
    tabId: tabId as number,
    request,
    requestId,
    interpolations: applicableInterpolations,
  });
};
