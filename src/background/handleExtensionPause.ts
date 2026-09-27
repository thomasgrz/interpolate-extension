import { logger } from "#src/utils/logger.ts";

export const handleExtensionPause = async () => {
  try {
    const activeRules = await chrome.declarativeNetRequest.getDynamicRules();

    const removeRuleIds = activeRules?.map((rule) => rule.id);

    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds,
    });

    const scriptIds = await chrome.userScripts
      .getScripts()
      .then((scripts) => scripts.map((script) => script.id));
    await chrome.userScripts.unregister({
      ids: scriptIds,
    });
  } catch (e) {
    logger({ error: e });
  }
};
