export const removeDynamicRulesById = async (ids: number[]) => {
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: ids,
  });
};
