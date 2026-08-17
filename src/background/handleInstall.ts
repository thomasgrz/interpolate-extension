import { BrowserRules } from "@/utils/browser/BrowserRules";
import {
  AnyInterpolation,
  HeaderInterpolation,
  RedirectInterpolation,
  ScriptInterpolation,
} from "@/utils/factories/Interpolation";
import { logger } from "@/utils/logger";
import { InterpolateStorage } from "@/utils/storage/InterpolateStorage/InterpolateStorage";

export const handleInstall = async () => {
  try {
    await InterpolateStorage.enableExtension();
  } catch (e) {}
  if (chrome.runtime.lastError) {
    logger("*ahem* RAHHHHHHHHHHHHHH!" + chrome.runtime.lastError);
  }
  const reducer = (
    acc: {
      redirects: RedirectInterpolation[];
      headers: HeaderInterpolation[];
      userScripts: ScriptInterpolation[];
    },
    curr: AnyInterpolation,
  ) => {
    const { type } = curr;

    switch (type) {
      case "headers":
        acc.headers.push(curr);
        break;
      case "redirect":
        acc.redirects.push(curr);
        break;
      case "script":
        acc.userScripts.push(curr);
        break;
      default:
        break;
    }
    return acc;
  };

  const handleInterpolationUpdates = async (
    interpolations: AnyInterpolation[],
  ) => {
    const { headers, userScripts } = interpolations.reduce(reducer, {
      headers: [],
      redirects: [],
      userScripts: [],
    });

    const addedHeaders = headers.filter((rule) => rule.enabledByUser);
    const removedHeaders = headers.filter((rule) => !rule.enabledByUser);

    addedHeaders.map((rule) => {
      try {
        chrome.declarativeNetRequest.updateDynamicRules({
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

  const handleInterpolationRemovals = async (
    interpolations: AnyInterpolation[],
  ) => {
    const { headers, userScripts } = interpolations.reduce(reducer, {
      headers: [],
      redirects: [],
      userScripts: [],
    });

    // Remove user scripts
    const userScriptIdsToRemove = userScripts.map(
      (script) => script.details.id,
    );
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

  const handleInterpolationCreations = async (
    interpolations: AnyInterpolation[],
  ) => {
    const { userScripts, headers } = interpolations.reduce(reducer, {
      headers: [],
      redirects: [],
      userScripts: [],
    });

    headers.map((rule) => {
      try {
        chrome.declarativeNetRequest.updateDynamicRules({
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

    const userScriptConfigs = userScripts.map((script) => script.details);

    // Add user scripts
    await BrowserRules.addUserScripts(userScriptConfigs);
  };

  const handleInterpolationChanges = async (values: {
    updated: any[];
    removed: any[];
    created: any[];
  }) => {
    try {
      const containsUpdatedValues = !!values.updated.length;
      const containsRemovedValues = !!values.removed.length;
      const contatinsCreatedValues = !!values.created.length;

      if (containsUpdatedValues) {
        await handleInterpolationUpdates(values.updated);
      }

      if (containsRemovedValues) {
        await handleInterpolationRemovals(values.removed);
      }

      if (contatinsCreatedValues) {
        await handleInterpolationCreations(values.created);
      }
    } catch (e) {
      logger(`syncAllInterpolationsWithStorage resulted with error: ${e}`);
    }
  };

  InterpolateStorage.subscribeToInterpolationChanges(async (values) => {
    await handleInterpolationChanges(values);
  });
};
