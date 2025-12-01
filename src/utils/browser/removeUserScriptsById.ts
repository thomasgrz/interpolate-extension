export const removeUserScriptsById = async (ids: string[]) => {
  await chrome.userScripts?.unregister({ ids });
};
