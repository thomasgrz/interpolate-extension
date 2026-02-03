import {
  HeaderInterpolation,
  RedirectInterpolation,
} from "../factories/Interpolation";

export const updateDynamicRules = async (
  interpolations: (RedirectInterpolation | HeaderInterpolation)[],
  cb: {
    onSuccess?: () => void;
    onError?: (id: string | number, e: Error) => void;
  },
) => {
  const { onError } = cb;
  const registeredDynamicRules = [];
  // await chrome.declarativeNetRequest.getDynamicRules();
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
    //await chrome.declarativeNetRequest.updateDynamicRules({
    //  removeRuleIds: rulesToPause?.map((rule) => rule.id),
    // });
  }
  // register any enabled rules
  const rulesToEnable = rulesByStatus?.enabledRules?.filter((interp) => {
    return !registeredDynamicRules.some(
      (rule) => rule.id === interp.details.id,
    );
  });

  if (rulesToEnable?.length) {
    try {
      const allPromises = rulesToEnable?.map((rule) => {
        return new Promise(async (resolve, reject) => {
          try {
            // await chrome.declarativeNetRequest.updateDynamicRules({
            //  addRules: [rule.details],
            // });
            resolve({ id: rule.details.id, status: "fulfilled" });
          } catch (e) {
            onError?.(rule?.details?.id, e as Error);
            reject({ id: rule.details.id, status: "rejected", reason: e });
          }
        });
      });
      await Promise.allSettled(allPromises);
    } catch (e) {
      // logger
    }
  }
};
