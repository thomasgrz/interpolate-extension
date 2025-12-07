import {
  AnyInterpolation,
  HeaderInterpolation,
  InterpolationType,
  RedirectInterpolation,
  ScriptInterpolation,
} from "@/utils/factories/Interpolation";
import { logger } from "@/utils/logger";
import { INTERPOLATE_RECORD_PREFIX } from "../storage.constants";
import { createScriptInterpolation } from "@/utils/factories/createScriptInterpolation/createScriptInterpolation";
import { addUserScripts } from "@/utils/browser/addUserScripts";
import { createHeaderInterpolation } from "@/utils/factories/createHeaderInterpolation/createHeaderInterpolation";
import { createRedirectInterpolation } from "@/utils/factories/createRedirectInterpolation/createRedirectInterpolation";
import { addDynamicRules } from "@/utils/browser/addDynamicRules";

enum RollbackAction {
  RESUMED = "resume",
  PAUSED = "pause",
  DELETE = "delete",
}

export const InterpolateStorage = {
  logInvocation(caller: string) {
    logger(`(invocation): ${caller}`);
  },
  logError(caller: string, error: unknown) {
    logger(`${caller} threw (error): `, error);
  },
  getInterpolationRecordKey(id: number | string) {
    if (typeof id === "string" && id?.startsWith("interp")) {
      return id;
    }
    return `${INTERPOLATE_RECORD_PREFIX}${id}`;
  },
  getRollbackRecordKey(id: number | string) {
    return `rollback-record-${this.getInterpolationRecordKey(id)}`;
  },
  async getInterpolationById(id: number | string) {
    const key = this.getInterpolationRecordKey(id);
    const interp = await chrome.storage?.sync?.get(key);
    const value = interp[key];
    return value;
  },
  async setInterpolations(interpolations?: AnyInterpolation[]) {
    const caller = "set";
    this.logInvocation(caller);
    if (!interpolations) return;
    logger(interpolations);

    const interpolationRecords = interpolations.reduce((acc, curr) => {
      const isObject = curr && !Array.isArray(curr) && typeof curr === "object";
      const invalid = !isObject;
      if (invalid) return acc;
      return {
        ...acc,
        [this.getInterpolationRecordKey(curr.details.id)]: curr,
      };
    }, {});
    try {
      await chrome.storage?.sync?.set({
        ...interpolationRecords,
      });
    } catch (e) {
      this.logError(caller, e);
    }
  },
  async create(interpolationsToCreate: AnyInterpolation | AnyInterpolation[]) {
    const caller = "create";
    this.logInvocation(caller);
    try {
      await this.setInterpolations(
        Array.isArray(interpolationsToCreate)
          ? interpolationsToCreate
          : [interpolationsToCreate],
      );
    } catch (e) {
      this.logError(caller, e);
    }
  },
  async disableAll() {
    const caller = "disableAll";
    this.logInvocation(caller);
    try {
      const allCurrent = await this.getAllInterpolations();
      if (!allCurrent) return;
      const rollbackRecords = allCurrent?.map((interp) => {
        return {
          action: RollbackAction.PAUSED,
          id: interp?.details?.id,
          before: interp,
          after: {
            ...interp,
            enabledByUser: false,
          },
        };
      });

      await this.createRollbackRecords(rollbackRecords);

      const updatedInterpolations = allCurrent?.map((interpolation) => {
        return {
          ...interpolation,
          enabledByUser: false,
        };
      });
      await this.setInterpolations(updatedInterpolations);
    } catch (e) {
      this.logError(caller, e as string);
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
          action: RollbackAction.RESUMED,
          id: interp?.details?.id,
          before: interp,
          after: {
            ...interp,
            enabledByUser: true,
          },
        };
      });

      await this.createRollbackRecords(rollbackRecords);

      const updatedInterpolations = allCurrent?.map((interpolation) => {
        return {
          ...interpolation,
          enabledByUser: true,
        };
      });
      await this.setInterpolations(updatedInterpolations);
    } catch (e) {
      this.logError(caller, e as string);
    }
  },
  async setIsEnabled(id: string | number, enabledByUser: boolean) {
    const caller = "setIsEnabled";
    this.logInvocation(caller);
    const interpolationToUpdate = await this.getInterpolationById(id);
    try {
      await this.createRollbackRecords([
        {
          action: enabledByUser
            ? RollbackAction.RESUMED
            : RollbackAction.PAUSED,
          id: interpolationToUpdate?.details?.id,
          before: interpolationToUpdate,
          after: {
            ...interpolationToUpdate,
            enabledByUser,
          },
        },
      ]);
      await this.setInterpolations([
        { ...interpolationToUpdate, enabledByUser },
      ]);
    } catch (e) {
      this.logError(caller, e as string);
    }
  },
  async createRollbackRecords(
    records: {
      action: RollbackAction;
      before: AnyInterpolation | null;
      after: AnyInterpolation | null;
      id: string | number;
    }[],
  ) {
    const caller = "createRollbackRecord";
    this.logInvocation(caller);
    let result;
    try {
      const rollbackRecords = records.reduce((acc, curr) => {
        return {
          ...acc,
          [this.getRollbackRecordKey(curr.id)]: {
            ...curr,
          },
        };
      }, {});
      result = await chrome.storage?.sync?.set(rollbackRecords);
    } catch (e) {
      this.logError(caller, e as string);
    }
    return result;
  },
  async getAllByTypes(types: InterpolationType[]) {
    const caller = "getAllByTypes";
    this.logInvocation(caller);
    let result;
    try {
      result = await this.getAllInterpolations();
      return result?.filter((interpolation) => {
        return types.includes(interpolation?.type);
      });
    } catch (e) {
      this.logError(caller, e as string);
    }
  },
  async getAllInterpolations() {
    const caller = "getAllInterpolations";
    this.logInvocation(caller);
    try {
      const result = await chrome.storage?.sync?.getKeys();
      const interpolations = result.filter((key) =>
        key.startsWith(INTERPOLATE_RECORD_PREFIX),
      );
      const storageRecords = await chrome.storage?.sync?.get(interpolations);
      logger(storageRecords);
      const interpolationConfigs = Object.values(storageRecords).reduce<
        AnyInterpolation[]
      >((acc, curr) => {
        const isInterpolation =
          curr &&
          !Array.isArray(curr) &&
          typeof curr === "object" &&
          Object.hasOwn(curr, "type") &&
          Object.hasOwn(curr, "details");
        if (isInterpolation) {
          acc.push(curr as AnyInterpolation);
        }
        return acc;
      }, []);

      return interpolationConfigs.length ? interpolationConfigs : [];
    } catch (e) {
      this.logError(caller, e as string);
    }
  },
  async deleteAll() {
    const caller = "deleteAll";
    this.logInvocation(caller);
    try {
      return chrome.storage?.sync?.clear();
    } catch (e) {
      this.logError(caller, e as string);
    }
  },
  async delete(ids: (number | string)[] | (string | number)) {
    const caller = "delete";
    this.logInvocation(caller);
    try {
      let resolvedIds: string[] = [];
      if (Array.isArray(ids)) {
        resolvedIds = ids.map((id) => this.getInterpolationRecordKey(id));
      } else {
        resolvedIds = [this.getInterpolationRecordKey(ids)];
      }
      await chrome.storage?.sync?.remove(resolvedIds);
    } catch (e) {
      this.logError(caller, e as string);
    }
  },
  async subscribeToRecentlyInvoked(
    cb: (arg: { recentlyInvoked: AnyInterpolation[] }) => Promise<void>,
  ) {
    const caller = "subscribeToRecentlyInvoked";
    this.logInvocation(caller);
    try {
      chrome.storage?.sync?.onChanged.addListener(async (changes) => {
        this.logInvocation("chrome.storage?.sync?.onChanged");
        if (!Object.hasOwn(changes, "recentlyInvoked")) return;
        const recentlyInvoked = changes.recentlyInvoked;
        const { newValue } = recentlyInvoked;
        cb({ recentlyInvoked: newValue });
      });
    } catch (e) {}
  },
  async subscribeToInterpolationChanges(
    cb: (arg: {
      created: AnyInterpolation[];
      updated: AnyInterpolation[];
      removed: AnyInterpolation[];
    }) => Promise<void>,
  ) {
    const caller = "subscribeToChanges";
    this.logInvocation(caller);
    try {
      chrome.storage?.sync?.onChanged.addListener(async (changes) => {
        this.logInvocation("chrome.storage?.sync?.onChanged");
        const interpolationConfigs = Object.entries(changes)?.reduce<{
          created: AnyInterpolation[];
          updated: AnyInterpolation[];
          removed: AnyInterpolation[];
        }>(
          (acc, curr) => {
            const [key, value] = curr;
            const isInterpolation = key.startsWith(INTERPOLATE_RECORD_PREFIX);
            if (isInterpolation) {
              const isCreated = !Object.hasOwn(value, "oldValue");
              if (isCreated) {
                acc.created.push(value.newValue);
                return acc;
              }
              const isUpdated =
                Object.hasOwn(value, "oldValue") &&
                Object.hasOwn(value, "newValue");
              if (isUpdated) {
                acc.updated.push(value.newValue);
                return acc;
              }
              const isRemoved =
                Object.hasOwn(value, "oldValue") && !value.newValue;
              if (isRemoved) {
                acc.removed.push(value.oldValue);
              }
            }
            return acc;
          },
          {
            created: [],
            updated: [],
            removed: [],
          },
        );
        cb(interpolationConfigs);
      });
    } catch (e) {
      this.logError(caller, e as string);
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
    const scriptsFromStorage = (await this.getAllByTypes([
      "script",
    ])) as ScriptInterpolation[];
    const interpolateScriptsMap = new Map(
      scriptsFromStorage?.map((interp) => [interp.details.id, interp]),
    );
    try {
      const allScriptsInBrowser = await chrome?.userScripts?.getScripts();
      const browserScriptSet = allScriptsInBrowser.reduce((acc, curr) => {
        const currentId = curr.id;
        const matchingInterp = interpolateScriptsMap.get(currentId);
        acc.add(
          matchingInterp ??
            createScriptInterpolation({
              body: curr.js?.[0]?.code ?? "",
              name: "unknown-" + currentId,
              matches: curr?.matches?.[0],
              runAt: curr?.runAt,
            }),
        );
        return acc;
      }, new Set<ScriptInterpolation>());
      const interpolateScriptsSet = interpolateScriptsMap
        .entries()
        .reduce((acc, curr) => {
          const [, interp] = curr;
          acc.add(interp);
          return acc;
        }, new Set<ScriptInterpolation>());
      const scriptsToAddToStorage = browserScriptSet.difference(
        interpolateScriptsSet,
      );
      const newInterpolations = scriptsToAddToStorage
        .entries()
        .reduce<ScriptInterpolation[]>((acc, curr) => {
          acc.push(curr[0]);
          return acc;
        }, []);

      // Add missing browser rules to storage
      await this.create(newInterpolations);
      const newScripts = interpolateScriptsSet.difference(browserScriptSet);
      const newScriptInterpolations = newScripts
        ?.entries?.()
        .reduce<chrome.userScripts.RegisteredUserScript[]>((acc, curr) => {
          acc.push(curr[0].details);
          return acc;
        }, []);
      // Add missing interpolations to browser
      await addUserScripts(newScriptInterpolations);
    } catch (e) {
      this.logError(caller, e);
    }
  },
  /**
   * Identify any user scripts enabled in the browser that are not
   * yet tracked in storage. Then add those user scripts in storage.
   *
   * Likewise, find any user scripts enabled in storage that are not
   * yet enabled in the browser. Then add those user scripts in the browser.
   */
  async syncWithDynamicRules() {
    const caller = "syncWithDynamicRules";
    const dynamicRulesFromStorage = (await this.getAllByTypes([
      "redirect",
      "headers",
    ])) as (HeaderInterpolation | RedirectInterpolation)[];
    const interpolateDynamicRulesMap = new Map(
      dynamicRulesFromStorage?.map((interp) => [interp.details.id, interp]),
    );
    try {
      const allRulesInBrowser =
        await chrome?.declarativeNetRequest?.getDynamicRules?.();
      const browserScriptSet = allRulesInBrowser.reduce((acc, curr) => {
        const currentId = curr.id;
        const matchingInterp = interpolateDynamicRulesMap.get(currentId);
        if (matchingInterp) {
          acc.add(matchingInterp);
        } else {
          switch (curr.action.type) {
            case "modifyHeaders":
              acc.add(
                createHeaderInterpolation({
                  headerKey:
                    curr?.action?.requestHeaders?.[0]?.header ?? "unknown",
                  headerValue:
                    curr?.action?.requestHeaders?.[0]?.value ?? "unknown",
                  name: "orphan-header-" + curr?.id,
                  id: curr?.id,
                }),
              );
              break;
            case "redirect":
              acc.add(
                createRedirectInterpolation({
                  source: curr?.condition?.regexFilter ?? "unknown",
                  destination: curr?.action?.redirect?.url ?? "unknown",
                  name: "orphan-redirect-" + curr?.id,
                  id: curr?.id,
                }),
              );
              break;
            default:
              break;
          }
        }

        return acc;
      }, new Set<HeaderInterpolation | RedirectInterpolation>());
      const interpolateScriptsSet = interpolateDynamicRulesMap
        .entries()
        .reduce((acc, curr) => {
          const [, interp] = curr;
          acc.add(interp);
          return acc;
        }, new Set<HeaderInterpolation | RedirectInterpolation>());
      const scriptsToAddToStorage = browserScriptSet.difference(
        interpolateScriptsSet,
      );
      const newInterpolationsToAddToStorage = scriptsToAddToStorage
        .entries()
        .reduce<
          (HeaderInterpolation | RedirectInterpolation)[]
        >((acc, curr) => {
          acc.push(curr[0]);
          return acc;
        }, []);

      // Add missing browser rules to storage
      await this.create(newInterpolationsToAddToStorage);
      const newRules = interpolateScriptsSet.difference(browserScriptSet);
      const newRulesToAddToBrowser = newRules
        ?.entries?.()
        .reduce<chrome.declarativeNetRequest.Rule[]>((acc, curr) => {
          acc.push(curr[0].details);
          return acc;
        }, []);
      // Add missing interpolations to browser
      await addDynamicRules(newRulesToAddToBrowser);
    } catch (e) {
      this.logError(caller, e);
    }
  },
  async syncAll() {
    return Promise.allSettled([
      this.syncWithDynamicRules(),
      this.syncWithUserScripts(),
    ]);
  },
};
