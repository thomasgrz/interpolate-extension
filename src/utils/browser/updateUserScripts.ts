import { ScriptInterpolation } from "../factories/Interpolation";

export const updateUserScripts = async (
  interpolations: ScriptInterpolation[],
) => {
  // get all registered scripts
  const registeredScripts = (await chrome.userScripts?.getScripts()) ?? [];

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

  await chrome.userScripts?.unregister({
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
};
