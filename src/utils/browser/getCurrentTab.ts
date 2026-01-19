export const getCurrentTab = (callback: (tab: chrome.tabs.Tab) => void) => {
  let queryOptions = { active: true, lastFocusedWindow: true };
  chrome.tabs.query(queryOptions, ([_tab]) => {
    if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    callback(_tab);
  });
};
