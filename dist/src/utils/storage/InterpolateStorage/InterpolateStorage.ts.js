import { logger } from "/src/utils/logger.ts.js";
import { INTERPOLATE_RECORD_PREFIX } from "/src/utils/storage/storage.constants.ts.js";
import { createScriptInterpolation } from "/src/utils/factories/createScriptInterpolation/createScriptInterpolation.ts.js";
import { addUserScripts } from "/src/utils/browser/addUserScripts.ts.js";
var RollbackAction = /* @__PURE__ */ ((RollbackAction2) => {
  RollbackAction2["RESUMED"] = "resume";
  RollbackAction2["PAUSED"] = "pause";
  RollbackAction2["DELETE"] = "delete";
  return RollbackAction2;
})(RollbackAction || {});
export const InterpolateStorage = {
  logInvocation(caller) {
    logger(`(invocation): ${caller}`);
  },
  logError(caller, error) {
    logger(`${caller} threw (error): `, error);
  },
  async create(interpolationsToCreate) {
    const caller = "create";
    this.logInvocation(caller);
    try {
      await this.setInterpolations(
        Array.isArray(interpolationsToCreate) ? interpolationsToCreate : [interpolationsToCreate]
      );
    } catch (e) {
      this.logError(caller, e);
    }
  },
  async createRollbackRecords(records) {
    const caller = "createRollbackRecord";
    this.logInvocation(caller);
    let result;
    try {
      const rollbackRecords = records.reduce((acc, curr) => {
        return {
          ...acc,
          [this.getRollbackRecordKey(curr.id)]: {
            ...curr
          }
        };
      }, {});
      result = await chrome.storage?.sync?.set(rollbackRecords);
    } catch (e) {
      this.logError(caller, e);
    }
    return result;
  },
  async disableAll() {
    const caller = "disableAll";
    this.logInvocation(caller);
    try {
      const allCurrent = await this.getAllInterpolations();
      if (!allCurrent) return;
      const rollbackRecords = allCurrent?.map((interp) => {
        return {
          action: "pause" /* PAUSED */,
          id: interp?.details?.id,
          before: interp,
          after: {
            ...interp,
            enabledByUser: false
          }
        };
      });
      await this.createRollbackRecords(rollbackRecords);
      const updatedInterpolations = allCurrent?.map((interpolation) => {
        return {
          ...interpolation,
          enabledByUser: false
        };
      });
      await this.setInterpolations(updatedInterpolations);
    } catch (e) {
      this.logError(caller, e);
    }
  },
  async deleteAll() {
    const caller = "deleteAll";
    this.logInvocation(caller);
    try {
      return chrome.storage?.sync?.clear();
    } catch (e) {
      this.logError(caller, e);
    }
  },
  async delete(ids) {
    const caller = "delete";
    this.logInvocation(caller);
    try {
      let resolvedIds = [];
      if (Array.isArray(ids)) {
        resolvedIds = ids.map((id) => this.getInterpolationRecordKey(id));
      } else {
        resolvedIds = [this.getInterpolationRecordKey(ids)];
      }
      await chrome.storage?.sync?.remove(resolvedIds);
    } catch (e) {
      this.logError(caller, e);
    }
  },
  async enableAll() {
    const caller = "enableAll";
    this.logInvocation(caller);
    try {
      const allCurrent = await this.getAllInterpolations();
      if (!allCurrent) return;
      const rollbackRecords = allCurrent?.map((interp) => {
        return {
          action: "resume" /* RESUMED */,
          id: interp?.details?.id,
          before: interp,
          after: {
            ...interp,
            enabledByUser: true
          }
        };
      });
      await this.createRollbackRecords(rollbackRecords);
      const updatedInterpolations = allCurrent?.map((interpolation) => {
        return {
          ...interpolation,
          enabledByUser: true
        };
      });
      await this.setInterpolations(updatedInterpolations);
    } catch (e) {
      this.logError(caller, e);
    }
  },
  async getAllMatchingPatterns() {
    const redirectRules = await this.getAllByTypes([
      "redirect"
    ]);
    const patterns = redirectRules?.map(
      (rule) => rule?.details?.condition?.regexFilter
    );
    return patterns;
  },
  getInterpolationRecordKey(id) {
    if (typeof id === "string" && id?.startsWith("interp")) {
      return id;
    }
    return `${INTERPOLATE_RECORD_PREFIX}${id}`;
  },
  getRollbackRecordKey(id) {
    return `rollback-record-${this.getInterpolationRecordKey(id)}`;
  },
  async getInterpolationById(id) {
    const key = this.getInterpolationRecordKey(id);
    const interp = await chrome.storage?.sync?.get(key);
    const value = interp[key];
    return value;
  },
  async getAllByTypes(types) {
    const caller = "getAllByTypes";
    let result;
    try {
      result = await this.getAllInterpolations();
      return result?.filter((interpolation) => {
        return types.includes(interpolation?.type);
      });
    } catch (e) {
      this.logError(caller, e);
    }
  },
  async getAllInterpolations() {
    const caller = "getAllInterpolations";
    try {
      const result = await chrome.storage?.sync?.getKeys();
      const interpolations = result.filter(
        (key) => key.startsWith(INTERPOLATE_RECORD_PREFIX)
      );
      const storageRecords = await chrome.storage?.sync?.get(interpolations);
      const interpolationConfigs = Object.values(storageRecords).reduce((acc, curr) => {
        const isInterpolation = curr && !Array.isArray(curr) && typeof curr === "object" && Object.hasOwn(curr, "type") && Object.hasOwn(curr, "details");
        if (isInterpolation) {
          acc.push(curr);
        }
        return acc;
      }, []);
      return interpolationConfigs.length ? interpolationConfigs : [];
    } catch (e) {
      this.logError(caller, e);
    }
  },
  async setInterpolationError(id, e) {
    const caller = "setInterpolationError";
    try {
      const interp = await this.getInterpolationById(id);
      const updatedInterpolation = {
        ...interp,
        error: typeof e === "object" ? e.message : e
      };
      await this.setInterpolations([updatedInterpolation]);
    } catch (e2) {
      this.logError(caller, e2);
    }
  },
  async setInterpolations(interpolations) {
    const caller = "set";
    this.logInvocation(caller);
    if (!interpolations) return;
    const interpolationRecords = interpolations.reduce((acc, curr) => {
      const isObject = curr && !Array.isArray(curr) && typeof curr === "object";
      const invalid = !isObject;
      if (invalid) return acc;
      return {
        ...acc,
        [this.getInterpolationRecordKey(curr.details.id)]: curr
      };
    }, {});
    try {
      await chrome.storage?.sync?.set({
        ...interpolationRecords
      });
    } catch (e) {
      this.logError(caller, e);
    }
  },
  async setIsEnabled(id, enabledByUser) {
    const caller = "setIsEnabled";
    this.logInvocation(caller);
    const interpolationToUpdate = await this.getInterpolationById(id);
    try {
      await this.createRollbackRecords([
        {
          action: enabledByUser ? "resume" /* RESUMED */ : "pause" /* PAUSED */,
          id: interpolationToUpdate?.details?.id,
          before: interpolationToUpdate,
          after: {
            ...interpolationToUpdate,
            enabledByUser
          }
        }
      ]);
      await this.setInterpolations([
        { ...interpolationToUpdate, enabledByUser }
      ]);
    } catch (e) {
      this.logError(caller, e);
    }
  },
  async subscribeToRecentlyInvoked(cb) {
    const caller = "subscribeToRecentlyInvoked";
    this.logInvocation(caller);
    try {
      chrome.storage?.sync?.onChanged.addListener(async (changes) => {
        this.logInvocation("chrome.storage?.sync?.onChanged");
        if (!Object.hasOwn(changes, "recentlyInvoked")) return;
        const recentlyInvoked = changes.recentlyInvoked;
        const { newValue } = recentlyInvoked;
        cb({ recentlyInvoked: JSON.parse(newValue) });
      });
    } catch (e) {
    }
  },
  async subscribeToInterpolationChanges(cb) {
    const caller = "subscribeToChanges";
    this.logInvocation(caller);
    try {
      chrome.storage?.sync?.onChanged.addListener(async (changes) => {
        this.logInvocation("chrome.storage?.sync?.onChanged");
        const interpolationConfigs = Object.entries(changes)?.reduce(
          (acc, curr) => {
            const [key, value] = curr;
            const isInterpolation = key.startsWith(INTERPOLATE_RECORD_PREFIX);
            if (isInterpolation) {
              const isCreated = !Object.hasOwn(value, "oldValue");
              if (isCreated) {
                acc.created.push(value.newValue);
                return acc;
              }
              const isUpdated = Object.hasOwn(value, "oldValue") && Object.hasOwn(value, "newValue");
              if (isUpdated) {
                acc.updated.push(value.newValue);
                return acc;
              }
              const isRemoved = Object.hasOwn(value, "oldValue") && !value.newValue;
              if (isRemoved) {
                acc.removed.push(value.oldValue);
              }
            }
            return acc;
          },
          {
            created: [],
            updated: [],
            removed: []
          }
        );
        cb(interpolationConfigs);
      });
    } catch (e) {
      this.logError(caller, e);
    }
  },
  /**
   * Identify any rules enabled in the browser that are not
   * yet tracked in storage. Then add those rules in storage.
   *
   * Likewise, find any rules enabled in storage that are not
   * yet enabled in the browser. Then add those rules in the browser.
   */
  async syncWithUserScripts() {
    const caller = "syncWithUserScripts";
    const scriptsFromStorage = await this.getAllByTypes([
      "script"
    ]);
    const interpolateScriptsMap = new Map(
      scriptsFromStorage?.map((interp) => [interp.details.id, interp])
    );
    try {
      const allScriptsInBrowser = await chrome?.userScripts?.getScripts();
      const browserScriptSet = allScriptsInBrowser.reduce((acc, curr) => {
        const currentId = curr.id;
        const matchingInterp = interpolateScriptsMap.get(currentId);
        acc.add(
          matchingInterp ?? createScriptInterpolation({
            body: curr.js?.[0]?.code ?? "",
            name: "unknown-" + currentId,
            matches: curr?.matches?.[0],
            runAt: curr?.runAt
          })
        );
        return acc;
      }, /* @__PURE__ */ new Set());
      const interpolateScriptsSet = interpolateScriptsMap.entries().reduce((acc, curr) => {
        const [, interp] = curr;
        acc.add(interp);
        return acc;
      }, /* @__PURE__ */ new Set());
      const scriptsToAddToStorage = browserScriptSet.difference(
        interpolateScriptsSet
      );
      const newInterpolations = scriptsToAddToStorage.entries().reduce((acc, curr) => {
        acc.push(curr[0]);
        return acc;
      }, []);
      await this.create(newInterpolations);
      const newScripts = interpolateScriptsSet.difference(browserScriptSet);
      const newScriptInterpolations = newScripts?.entries?.().reduce((acc, curr) => {
        acc.push(curr[0].details);
        return acc;
      }, []);
      await addUserScripts(newScriptInterpolations);
    } catch (e) {
      this.logError(caller, e);
    }
  },
  async syncAll() {
    return Promise.allSettled([this.syncWithUserScripts()]);
  }
};
