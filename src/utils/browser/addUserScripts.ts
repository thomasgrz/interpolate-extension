export const addUserScripts = async (
  scripts: chrome.userScripts.RegisteredUserScript[],
) => {
  const registerScriptsAtomically = async () => {
    try {
      await chrome.userScripts?.register(scripts);
    } catch (error) {
      console.error(
        "Error registering user scripts atomically, attempting to register individually:",
        error,
      );
      // If atomic registration fails, try registering scripts one by one
      for (const script of scripts) {
        try {
          await chrome.userScripts?.register([script]);
        } catch (individualError) {
          console.error(
            `Failed to register script with id ${script.id}:`,
            individualError,
          );
        }
      }
    }
  };
  await registerScriptsAtomically();
};
