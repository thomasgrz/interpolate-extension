import { BrowserRules } from "#src/utils/browser/BrowserRules.ts";
import { AnyInterpolation } from "#src/utils/factories/Interpolation.ts";
import { logger } from "#src/utils/logger.ts";
import { reducer } from "./reducer";

export const handleInterpolationRemovals = async (
  interpolations: AnyInterpolation[],
) => {
  const { headers, userScripts } = interpolations.reduce(reducer, {
    headers: [],
    redirects: [],
    userScripts: [],
  });

  // Remove user scripts
  const userScriptIdsToRemove = userScripts.map((script) => script.details.id);
  try {
    await chrome.userScripts?.unregister({ ids: userScriptIdsToRemove });
  } catch (e) {
    logger({ error: e });
  }

  headers.map((rule) => {
    try {
      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [Number(rule.details.id)],
      });
    } catch (e) {
      logger({ error: e });
    }
  });

  // Remove user scripts from browser
  await BrowserRules.removeUserScriptsById(userScriptIdsToRemove);
};
