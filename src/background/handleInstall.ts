import { BrowserRules } from "@/utils/browser/BrowserRules";
import {
  AnyInterpolation,
  HeaderInterpolation,
  RedirectInterpolation,
  ScriptInterpolation,
} from "@/utils/factories/Interpolation";
import { logger } from "@/utils/logger";
import { InterpolateStorage } from "@/utils/storage/InterpolateStorage/InterpolateStorage";

export const handleInstall = () => {
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
    logger("Handling interpolation updates...");
    const { dynamicRules, userScripts } = interpolations.reduce(reducer, {
      dynamicRules: [],
      userScripts: [],
    });

    // Update user scripts
    await BrowserRules.updateUserScripts(userScripts);
    // Update declarative net request rules
    await BrowserRules.updateDynamicRules(dynamicRules);
  };

  const handleInterpolationRemovals = async (
    interpolations: AnyInterpolation[],
  ) => {
    logger("Handling interpolation removals...");
    const { dynamicRules, userScripts } = interpolations.reduce(reducer, {
      dynamicRules: [],
      userScripts: [],
    });
    // Remove user scripts
    const userScriptIdsToRemove = userScripts.map(
      (script) => script.details.id,
    );
    await chrome.userScripts?.unregister({ ids: userScriptIdsToRemove });

    const dynamicRuleIdsToRemove = dynamicRules.map((rule) => rule.details.id);
    // Remove declarative net request rules
    await BrowserRules.removeDynamicRulesById(dynamicRuleIdsToRemove);

    // Remove user scripts from browser
    await BrowserRules.removeUserScriptsById(userScriptIdsToRemove);
  };
  const handleInterpolationCreations = async (
    interpolations: AnyInterpolation[],
  ) => {
    logger("Handling interpolation creations...");
    const { dynamicRules, userScripts } = interpolations.reduce(reducer, {
      dynamicRules: [],
      userScripts: [],
    });
    const userScriptConfigs = userScripts.map((script) => script.details);
    const dynamicRuleConfigs = dynamicRules.map((rule) => rule.details);
    // Add user scripts
    await BrowserRules.addUserScripts(userScriptConfigs);
    // Add declarative net request rules
    await BrowserRules.addDynamicRules(dynamicRuleConfigs);
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
