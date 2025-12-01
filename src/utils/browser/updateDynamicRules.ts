import {
  HeaderInterpolation,
  RedirectInterpolation,
} from "../factories/Interpolation";

export const updateDynamicRules = async (
  interpolations: (RedirectInterpolation | HeaderInterpolation)[],
) => {
  const registeredDynamicRules =
    await chrome.declarativeNetRequest.getDynamicRules();
  const rulesByStatus = interpolations?.reduce(
    (
      acc: {
        enabledRules: (RedirectInterpolation | HeaderInterpolation)[];
        pausedRules: (RedirectInterpolation | HeaderInterpolation)[];
      },
      curr,
    ) => {
      if (curr?.enabledByUser) {
        return {
          ...acc,
          enabledRules: [...(acc?.enabledRules ?? []), curr],
        };
      }
      return {
        ...acc,
        pausedRules: [...(acc?.pausedRules ?? []), curr],
      };
    },
    {
      enabledRules: [] as (RedirectInterpolation | HeaderInterpolation)[],
      pausedRules: [] as (RedirectInterpolation | HeaderInterpolation)[],
    },
  );
  // unregister any paused rules
  const rulesToPause = registeredDynamicRules?.filter((rule) => {
    return rulesByStatus?.pausedRules?.some(
      (interp) => interp.details.id === rule.id,
    );
  });

  if (rulesToPause?.length) {
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: rulesToPause?.map((rule) => rule.id),
    });
  }
  // register any enabled rules
  const rulesToEnable = rulesByStatus?.enabledRules?.filter((interp) => {
    return !registeredDynamicRules.some(
      (rule) => rule.id === interp.details.id,
    );
  });

  if (rulesToEnable?.length) {
    await chrome.declarativeNetRequest.updateDynamicRules({
      addRules: rulesToEnable?.map((rule) => rule.details),
    });
  }
};
