export const createSyncStorageSubscription = <T>(
  callback: (values: {
    created: T[];
    updated: T[];
    removed: T[];
  }) => Promise<void> | void,
) => {
  return chrome.storage?.local?.onChanged.addListener(
    async (changes: { [key: string]: chrome.storage.StorageChange }) => {
      const created: T[] = [];
      const updated: T[] = [];
      const removed: T[] = [];

      for (const key in changes) {
        const change = changes[key];
        if (change.oldValue === undefined && change.newValue !== undefined) {
          created.push(change.newValue as T);
        } else if (
          change.oldValue !== undefined &&
          change.newValue !== undefined
        ) {
          updated.push(change.newValue as T);
        } else if (
          change.oldValue !== undefined &&
          change.newValue === undefined
        ) {
          removed.push(change.oldValue as T);
        }
      }
      await callback({ created, updated, removed });
    },
  );
};
