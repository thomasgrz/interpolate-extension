import { BrowserRules } from "#src/utils/browser/BrowserRules.ts";
import { AnyInterpolation } from "#src/utils/factories/Interpolation.ts";
import { logger } from "#src/utils/logger.ts";
import { reducer } from "./reducer";

export const handleInterpolationUpdates = async (
  interpolations: AnyInterpolation[],
) => {
  const { headers, userScripts } = interpolations.reduce(reducer, {
    headers: [],
    redirects: [],
    userScripts: [],
  });

  const addedHeaders = headers.filter((rule) => rule.enabledByUser);
  const removedHeaders = headers.filter((rule) => !rule.enabledByUser);

  addedHeaders.forEach(async (rule) => {
    try {
      await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [Number(rule?.details?.id)],
        addRules: [
          {
            action: {
              type: "modifyHeaders",
              requestHeaders: [
                {
                  header: rule.details.headerKey,
                  operation: chrome.declarativeNetRequest.HeaderOperation.SET,
                  value: rule.details.headerValue,
                },
              ],
            },
            condition: {
              regexFilter: ".*",
              resourceTypes: ["main_frame", "sub_frame", "script"],
            } as chrome.declarativeNetRequest.RuleCondition,
            id: Number(rule.details.id),
            priority: 1,
          } as chrome.declarativeNetRequest.Rule,
        ],
      });
    } catch (e) {
      logger({ error: e });
    }
  });

  removedHeaders.map((rule) => {
    try {
      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [Number(rule.details.id)],
      });
    } catch (e) {
      logger({ error: e });
    }
  });

  // Update user scripts
  await BrowserRules.updateUserScripts(userScripts);
};
