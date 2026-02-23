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
  if (chrome.runtime.lastError) {
    logger("*ahem* RAHHHHHHHHHHHHHH!" + chrome.runtime.lastError);
  }
  const reducer = (
    acc: {
      dynamicRules: (RedirectInterpolation | HeaderInterpolation)[];
      userScripts: ScriptInterpolation[];
    },
    curr: AnyInterpolation,
  ) => {
    const { type } = curr;
    switch (type) {
      case "headers":
      case "redirect":
        acc.dynamicRules.push(curr);
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
    const { userScripts } = interpolations.reduce(reducer, {
      dynamicRules: [],
      userScripts: [],
    });

    // Update user scripts
    await BrowserRules.updateUserScripts(userScripts);
  };

  const handleInterpolationRemovals = async (
    interpolations: AnyInterpolation[],
  ) => {
    const { userScripts } = interpolations.reduce(reducer, {
      dynamicRules: [],
      userScripts: [],
    });
    // Remove user scripts
    const userScriptIdsToRemove = userScripts.map(
      (script) => script.details.id,
    );
    await chrome.userScripts?.unregister({ ids: userScriptIdsToRemove });

    // Remove user scripts from browser
    await BrowserRules.removeUserScriptsById(userScriptIdsToRemove);
  };
  const handleInterpolationCreations = async (
    interpolations: AnyInterpolation[],
  ) => {
    const { userScripts } = interpolations.reduce(reducer, {
      dynamicRules: [],
      userScripts: [],
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
