import { AnyInterpolation } from "#src/utils/factories/Interpolation.ts";
import { debouncedPushTabActivity } from "./debouncedPushTabActivity";

export const continueRequestWithInterpolations = async ({
  request,
  requestId,
  tabId,
  requestUrl,
  interpolations,
}: {
  request: { headers: Record<string, unknown> };
  requestId: string;
  tabId: number;
  requestUrl?: string;
  interpolations?: AnyInterpolation[];
}) => {
  // for now we'll apply the first url override we find in the interpolations array
  const urlOverride = interpolations?.find(
    (interp) => interp.type === "redirect",
  )?.details?.action?.redirect?.url;

  const noInterpsApplied = !interpolations?.length;

  if (noInterpsApplied) {
    return chrome.debugger.sendCommand({ tabId }, "Fetch.continueRequest", {
      requestId,
      url: urlOverride ?? requestUrl,
    });
  }

  const originalHeaders = Object.entries(request.headers).map(
    ([key, value]) => ({ name: key, value }),
  );

  const headerInterpolations =
    interpolations?.filter?.((interp) => interp.type === "headers") ?? [];

  const requestHeadersOverrides = headerInterpolations.map((interp) => ({
    name: interp?.details?.action?.requestHeaders?.[0]?.header,
    value: interp?.details?.action?.requestHeaders?.[0]?.value,
  }));

  chrome.debugger.sendCommand({ tabId }, "Fetch.continueRequest", {
    requestId,
    url: urlOverride ?? requestUrl,
    headers: [...originalHeaders, ...requestHeadersOverrides],
  });

  setTimeout(() => {
    // Update storage without hammering it..
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
};
