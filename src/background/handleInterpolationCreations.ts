import { BrowserRules } from "#src/utils/browser/BrowserRules.ts";
import { AnyInterpolation } from "#src/utils/factories/Interpolation.ts";
import { logger } from "#src/utils/logger.ts";
import { reducer } from "./reducer";

export const handleInterpolationCreations = async (
  interpolations: AnyInterpolation[],
) => {
  const { userScripts, headers } = interpolations.reduce(reducer, {
    headers: [],
    redirects: [],
    userScripts: [],
  });

  await Promise.all(
    headers.map(async (rule) => {
      try {
        await chrome.declarativeNetRequest.updateDynamicRules({
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
    }),
  );

  const userScriptConfigs = userScripts.map((script) => script.details);

  // Add user scripts
  await BrowserRules.addUserScripts(userScriptConfigs);
};
