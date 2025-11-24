// Helper for identifying what kind of Interpolate configs
// are in the browser
export const getInterpolationType = (
  browserConfig:
    | chrome.userScripts.RegisteredUserScript
    | chrome.declarativeNetRequest.Rule,
) => {
  const isUserScript =
    typeof browserConfig?.id === "string" &&
    (browserConfig as chrome.userScripts.RegisteredUserScript).js?.length;
  const isDynamicRedirectRule =
    typeof browserConfig?.id === "number" &&
    (browserConfig as chrome.declarativeNetRequest.Rule)?.action?.type ===
      "redirect";
  const isDynamicHeaderRule =
    typeof browserConfig?.id === "number" &&
    (browserConfig as chrome.declarativeNetRequest.Rule)?.action?.type ===
      "modifyHeaders";

  if (isUserScript) return "script";
  if (isDynamicHeaderRule) return "headers";
  if (isDynamicRedirectRule) return "redirect";
  return null;
};
