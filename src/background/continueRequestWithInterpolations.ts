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
  const redirectInterpolation = interpolations?.find(
    (interp) => interp.type === "redirect",
  );

  let urlOverride = redirectInterpolation?.details?.destination!;
  const regex = new RegExp(redirectInterpolation?.details?.regexFilter!);
  const noInterpsApplied = !interpolations?.length;
  if (noInterpsApplied) {
    return chrome.debugger.sendCommand({ tabId }, "Fetch.continueRequest", {
      requestId,
      url: requestUrl,
    });
  }

  if (urlOverride) {
    // check if the matcher contains capture groups
    const captureGroupNames = [...urlOverride.matchAll(/\$\d/g)].map(
      (match) => match[0],
    );
    const matches = regex.exec(requestUrl!);
    const capturedGroups = matches?.slice?.(1) ?? [];
    const eligibleForUrlTransformation =
      !!captureGroupNames?.length && !!capturedGroups?.length;
    if (eligibleForUrlTransformation) {
      captureGroupNames.forEach((groupName) => {
        const indexOfCaptureGroupName = +groupName.replace("$", "");
        const matchingCaptureGroup =
          capturedGroups[indexOfCaptureGroupName - 1];
        if (typeof matchingCaptureGroup !== "string") return;
        urlOverride = urlOverride.replace(groupName, matchingCaptureGroup);
      });
    }
  }
  const originalHeaders = Object.entries(request.headers).map(
    ([key, value]) => ({ name: key, value }),
  );

  const headerInterpolations =
    interpolations?.filter?.((interp) => interp.type === "headers") ?? [];

  const requestHeadersOverrides = headerInterpolations.map((interp) => ({
    name: interp?.details?.headerKey,
    value: interp?.details?.headerValue,
  }));

  const apiMock = interpolations?.find((interp) => interp.type === "mockAPI");

  const { isJson } = apiMock?.details ?? {};
  if (isJson) {
    requestHeadersOverrides.push({
      name: "Content-Type",
      value: "application/json",
    });
  }

  if (apiMock) {
    chrome.debugger.sendCommand({ tabId }, "Fetch.fulfillRequest", {
      requestId,
      responseCode: Number(apiMock?.details?.httpCode ?? 200),
      body: btoa(apiMock?.details?.body ?? ""),
      responseHeaders: [...originalHeaders, ...requestHeadersOverrides],
    });
  } else {
    chrome.debugger.sendCommand({ tabId }, "Fetch.continueRequest", {
      requestId,
      url: urlOverride ?? requestUrl,
      headers: [...originalHeaders, ...requestHeadersOverrides],
    });
  }

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
  }, 1000);
};
