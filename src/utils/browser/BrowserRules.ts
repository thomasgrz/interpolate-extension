import {
  AnyInterpolation,
  HeaderInterpolation,
  RedirectInterpolation,
  ScriptInterpolation,
} from "../factories/Interpolation";

export const BrowserRules = {
  async updateUserScripts(interpolations: ScriptInterpolation[]) {
    // get all registered scripts
    const registeredScripts = (await chrome.userScripts.getScripts()) ?? [];

    const scriptsByStatus = interpolations?.reduce(
      (
        acc: {
          enabledScripts: ScriptInterpolation[];
          pausedScripts: ScriptInterpolation[];
        },
        curr,
      ) => {
        if (curr?.enabledByUser) {
          return {
            ...acc,
            enabledScripts: [...(acc?.enabledScripts ?? []), curr],
          };
        }
        return {
          ...acc,
          pausedScripts: [...(acc?.pausedScripts ?? []), curr],
        };
      },
      {
        enabledScripts: [],
        pausedScripts: [],
      },
    );

    // unregister paused scripts
    const scriptsToUnRegister = registeredScripts?.filter?.((script) => {
      return scriptsByStatus?.pausedScripts?.some(
        (paused) => paused?.details?.id === script?.id,
      );
    });

    await chrome.userScripts.unregister({
      ids: [...scriptsToUnRegister?.map((script) => script.id)],
    });

    // register any new enabled scripts
    const scriptsToRegister = interpolations?.filter((interp) => {
      const registeredScript = registeredScripts?.find(
        (script) => script?.id === interp?.details.id,
      );
      const isScriptUnregistered = !registeredScript;
      return isScriptUnregistered;
    });

    if (scriptsToRegister?.length) {
      await chrome.userScripts.register([
        ...scriptsToRegister?.map((script) => script.details),
      ]);
    }
  },
  async updateDynamicRules(
    interpolations: (RedirectInterpolation | HeaderInterpolation)[],
  ) {
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
  },
  async updateInterpolationsInBrowser(interpolations: AnyInterpolation[]) {
    let { dynamicRules, userScripts } = interpolations.reduce(
      (acc, curr) => {
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
      },
      {
        dynamicRules: [] as (RedirectInterpolation | HeaderInterpolation)[],
        userScripts: [] as ScriptInterpolation[],
      },
    );
    await this.updateDynamicRules(dynamicRules);
    await this.updateUserScripts(userScripts);
    return;
  },
};
