export const addDynamicRules = async (
  rules: chrome.declarativeNetRequest.Rule[],
) => {
  const createRulesAtomically = async () => {
    try {
      await chrome.declarativeNetRequest.updateDynamicRules({
        addRules: rules,
      });
    } catch (error) {
      console.error(
        "Error adding dynamic rules atomically, attempting to add individually:",
        error,
      );
      // If atomic addition fails, try adding rules one by one
      for (const rule of rules) {
        try {
          await chrome.declarativeNetRequest.updateDynamicRules({
            addRules: [rule],
          });
        } catch (individualError) {
          console.error(
            `Failed to add rule with id ${rule.id}:`,
            individualError,
          );
        }
      }
    }
  };
  await createRulesAtomically();
};
