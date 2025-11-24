import { BrowserRules } from "./utils/browser/BrowserRules";
import {
  HeaderInterpolation,
  RedirectInterpolation,
} from "./utils/factories/Interpolation";
import { logger } from "./utils/logger";
import { InterpolateStorage } from "./utils/storage/InterpolateStorage/InterpolateStorage";

try {
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .then(() => logger("side panel behavior set (open on action click)"))
    .catch((error) => console.error(error));

  chrome.runtime.onInstalled.addListener(() => {
    logger("service worker installed successfully");

    chrome.contextMenus.create({
      id: "openSidePanel",
      title: "Open Interpolate panel",
      contexts: ["all"],
    });

    InterpolateStorage.subscribeToChanges(async (values) => {
      try {
        try {
          const userScriptChanges = values.scripts;
          BrowserRules.updateUserScripts(userScriptChanges);
        } catch (e) {
          logger(`updateUserScripts error: ${e}`);
        }

        try {
          BrowserRules.updateDynamicRules([
            ...values.redirects,
            ...values.headers,
          ]);
        } catch (e) {
          logger(`updateDynamicRules error: ${e}`);
        }

        logger("syncAllInterpolationsWithStorage invoked successfully");
      } catch (e) {
        logger(`syncAllInterpolationsWithStorage resulted with error: ${e}`);
      }
    });
  });

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "openSidePanel" && tab?.windowId) {
      // This will open the panel in all the pages on the current window.
      chrome.sidePanel.open({ windowId: tab?.windowId });
    }
  });

  /**
   * Listen for redirects so that we can inform the user interface
   * to display some visual queue to the user that a redirect Interpolation
   * was enforced during navigation or fetching.
   */
  chrome.webRequest.onBeforeRedirect.addListener(
    async (details) => {
      const redirectUriIfExists = details?.redirectUrl;
      const rulesFromStorage =
        ((await InterpolateStorage.getAllByTypes(["headers", "redirect"])) as (
          | RedirectInterpolation
          | HeaderInterpolation
        )[]) ?? [];

      const redirectUrls = rulesFromStorage.map((rule) => ({
        id: rule?.details?.id,
        redirectUrl: rule?.details?.action?.redirect?.url,
      }));

      const invokedRule = redirectUrls.find((redirect) => {
        return (
          redirect.redirectUrl &&
          redirectUriIfExists.startsWith(redirect.redirectUrl)
        );
      });

      if (invokedRule) {
        chrome.runtime.sendMessage(`redirect-${invokedRule.id}-hit`);
      }
    },
    { urls: ["<all_urls>"] },
  );
} catch (e) {
  logger("Error in background.ts", e);
}
