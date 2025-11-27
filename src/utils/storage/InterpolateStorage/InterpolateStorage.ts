import {
  AnyInterpolation,
  HeaderInterpolation,
  InterpolationType,
  RedirectInterpolation,
  ScriptInterpolation,
} from "@/utils/factories/Interpolation";
import { logger } from "@/utils/logger";
import {
  INTERPOLATE_RECORD_PREFIX,
  INTERPOLATION_RECORD_IDS_STORAGE_KEY,
} from "../storage.constants";
import { createHeaderInterpolation } from "@/utils/factories/createHeaderInterpolation/createHeaderInterpolation";
import { createScriptInterpolation } from "@/utils/factories/createScriptInterpolation/createScriptInterpolation";
import { createRedirectInterpolation } from "@/utils/factories/createRedirectInterpolation/createRedirectInterpolation";
import { BrowserRules } from "@/utils/browser/BrowserRules";
import { getInterpolationType } from "@/utils/browser/getInterpolationType";

enum RollbackAction {
  RESUMED = "resume",
  PAUSED = "pause",
  DELETE = "delete",
}

export const InterpolateStorage = {
  name: "InterpolateStorage",
  logInvocation(caller: string) {
    logger(`${this.name} (invocation): ${caller}`);
  },
  logError(caller: string, error: unknown) {
    logger(`${this.name}: ${caller} threw (error): `, error);
  },
  getInterpolationRecordKey(id: number | string) {
    return `${INTERPOLATE_RECORD_PREFIX}${id}`;
  },
  getRollbackRecordKey(id: number | string) {
    return `rollback-record-${this.getInterpolationRecordKey(id)}`;
  },
  async getInterpolationById(id: number | string) {
    const key = this.getInterpolationRecordKey(id);
    const interp = await chrome.storage.sync.get(key);
    const value = interp[key];
    return value;
  },
  async setInterpolationIds(ids: string[]) {
    const caller = "setInterpolationIds";
    try {
      await chrome.storage.sync.set({
        [INTERPOLATION_RECORD_IDS_STORAGE_KEY]: ids,
      });

      const result = await chrome.storage.sync.get<{
        [INTERPOLATION_RECORD_IDS_STORAGE_KEY]: string[];
      }>(INTERPOLATION_RECORD_IDS_STORAGE_KEY);
      return result[INTERPOLATION_RECORD_IDS_STORAGE_KEY];
    } catch (e) {
      this.logError(caller, e);
    }
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
      chrome.storage.sync.set({
        ...interpolationRecords,
      });
    } catch (e) {
      this.logError(caller, e);
    }
  },
  async create(interpolationsToCreate: AnyInterpolation[]) {
    const caller = "create";
    this.logInvocation(caller);
    try {
      const allCurrent = await this.getAllInterpolations();
      const currentWithNewlyCreated =
        allCurrent?.concat(interpolationsToCreate) ?? [];
      await this.setInterpolations(currentWithNewlyCreated);
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
    const caller = "update";
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
      result = await chrome.storage.sync.set(rollbackRecords);
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
  async getAllInterpolationIds() {
    const caller = "getAllInterpolationIds";
    this.logInvocation(caller);
    try {
      const result = await chrome.storage.sync.getKeys();
      const ids =
        result
          .filter((key) => key.startsWith("interpolation-config"))
          .map((key) => key.match(/interpolation-config-(.*)/)?.[1]) ?? [];
      return ids as string[];
    } catch (e) {
      logger(caller, e);
    }
  },
  async getAllInterpolations() {
    const caller = "getAllInterpolations";
    this.logInvocation(caller);
    try {
      const interpolationIds = await this.getAllInterpolationIds();

      const ruleKeys =
        interpolationIds?.map((id) => this.getInterpolationRecordKey(id)) ?? [];

      const interpolations = ruleKeys.length
        ? ((await chrome.storage.sync.get(ruleKeys)) as Record<
            string,
            AnyInterpolation
          >)
        : [];
      const interpolationConfigs = Object.values(interpolations);
      return interpolationConfigs.length ? interpolationConfigs : [];
    } catch (e) {
      this.logError(caller, e as string);
    }
  },
  async deleteAll() {
    const caller = "deleteAll";
    this.logInvocation(caller);
    try {
      return chrome.storage.sync.clear();
    } catch (e) {
      this.logError(caller, e as string);
    }
  },
  async delete(ids: string[] | string) {
    const caller = "delete";
    this.logInvocation(caller);
    try {
      await chrome.storage.sync.remove(ids);
    } catch (e) {
      this.logError(caller, e as string);
    }
  },
  async subscribeToInterpolationChanges(
    cb: (arg: {
      created: {
        newValue?: AnyInterpolation;
      }[];
      updated: {
        newValue?: AnyInterpolation;
        oldValue?: AnyInterpolation;
      }[];
      removed: {
        newValue?: null;
        oldValue?: AnyInterpolation;
      }[];
    }) => Promise<void>,
  ) {
    const caller = "subscribeToChanges";
    this.logInvocation(caller);
    try {
      chrome.storage.sync.onChanged.addListener(async (changes) => {
        this.logInvocation("chrome.storage.sync.onChanged");
        logger("[sync storage] onChanged: updatedValues", changes);
        const interpolationConfigs = Object.entries(changes)?.reduce<{
          created: {
            newValue?: AnyInterpolation;
          }[];
          updated: {
            oldValue?: AnyInterpolation;
            newValue?: AnyInterpolation;
          }[];
          removed: {
            oldValue: AnyInterpolation;
            newValue?: null;
          }[];
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
                acc.removed.push(value.newValue);
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
  async setPollingStatus(isPolling: boolean) {
    const caller = "setPollingStatus";
    this.logInvocation(caller);
    chrome.storage.local.set({
      polling: isPolling.toString(),
    });
  },
  async synchronizeWithClient() {
    const caller = "synchronizeWithClient";
    this.logInvocation(caller);
    this.setPollingStatus(true);
    try {
      // Turn into Interpolate configs into a O(1) accessible object
      let allPreviousInterpolations = await this.getAllInterpolations();

      const interpolateConfigs = allPreviousInterpolations?.reduce(
        (acc, curr) => {
          const type = curr.type;
          const currentId = curr.details.id;

          switch (type) {
            case "headers":
              acc.headerInterpolateConfigs.set(currentId as number, curr);
              break;
            case "redirect":
              acc.redirectInterpolateConfigs.set(currentId as number, curr);
              break;
            case "script":
              acc.scriptInterpolateConfigs.set(currentId as string, curr);
              break;
            default:
              break;
          }
          return acc;
        },
        {
          redirectInterpolateConfigs: new Map<number, RedirectInterpolation>(),
          headerInterpolateConfigs: new Map<number, HeaderInterpolation>(),
          scriptInterpolateConfigs: new Map<string, ScriptInterpolation>(),
        },
      ) ?? {
        redirectInterpolateConfigs: new Map<number, RedirectInterpolation>(),
        headerInterpolateConfigs: new Map<number, HeaderInterpolation>(),
        scriptInterpolateConfigs: new Map<string, ScriptInterpolation>(),
      };
      // All user scripts from browser
      const allUserScripts = await chrome.userScripts.getScripts();
      // All dynamic rules from browser
      const allDynamicRules =
        await chrome.declarativeNetRequest.getDynamicRules();

      // Create Interpolate configs or re-use existing Interpolate configs
      // in the form of a Set for comparison later
      const interpolationsInBrowser = [
        ...(allUserScripts ?? []),
        ...(allDynamicRules ?? []),
      ].reduce((acc, curr) => {
        const interpolationType = getInterpolationType(curr);
        const currentId = curr.id;
        let matchingInterpolation;
        switch (interpolationType) {
          case "headers":
            matchingInterpolation =
              interpolateConfigs.headerInterpolateConfigs.get(
                currentId as number,
              );
            if (matchingInterpolation) {
              return acc.add(matchingInterpolation);
            } else {
              return acc.add(
                createHeaderInterpolation({
                  headerKey:
                    (curr as chrome.declarativeNetRequest.Rule)?.action
                      ?.requestHeaders?.[0]?.header ?? "unknown",
                  headerValue:
                    (curr as chrome.declarativeNetRequest.Rule)?.action
                      ?.requestHeaders?.[0]?.value ?? "unknown",
                  name: "unknown-from-browser",
                }),
              );
            }
          case "script":
            matchingInterpolation =
              interpolateConfigs.scriptInterpolateConfigs.get(
                currentId as string,
              );
            if (matchingInterpolation) {
              return acc.add(matchingInterpolation);
            } else {
              return acc.add(
                createScriptInterpolation({
                  body:
                    (curr as chrome.userScripts.RegisteredUserScript)?.js?.[0]
                      ?.code ?? "",
                  name: "unknown-from-browser",
                }),
              );
            }
          case "redirect":
            matchingInterpolation =
              interpolateConfigs.redirectInterpolateConfigs.get(
                currentId as number,
              );
            if (matchingInterpolation) {
              return acc.add(matchingInterpolation);
            } else {
              return acc.add(
                createRedirectInterpolation({
                  source:
                    (curr as chrome.declarativeNetRequest.Rule)?.condition
                      ?.regexFilter ?? "unknown",
                  destination:
                    (curr as chrome.declarativeNetRequest.Rule)?.action
                      ?.redirect?.url ?? "unknown",
                  name: "unknown-from-browser",
                }),
              );
            }
          default:
            return acc;
        }
      }, new Set<AnyInterpolation>());
      // Turn Interpolate configs into a Set for easier comparison
      const setOfPreviousInterpolateConfigs = new Set([
        ...interpolateConfigs.scriptInterpolateConfigs
          ?.entries()
          ?.map(([, value]) => {
            return value;
          }),
        ...interpolateConfigs.redirectInterpolateConfigs
          ?.entries()
          ?.map(([, value]) => {
            return value;
          }),
        ...interpolateConfigs.headerInterpolateConfigs
          ?.entries()
          ?.map(([, value]) => {
            return value;
          }),
      ]);
      // Orphaned Interpolate configs in browser (that Interpolate doesnt know about)
      const orphanedInterpolateConfigsInBrowser =
        interpolationsInBrowser.difference(setOfPreviousInterpolateConfigs);
      // Add the orphaned configs to Interpolate storage
      this.create(
        orphanedInterpolateConfigsInBrowser?.entries()?.reduce((acc, curr) => {
          acc.push(curr[0]);
          return acc;
        }, [] as AnyInterpolation[]),
      );
      // New Interpolate configs defined but not enabled in browser
      const interpolationsToUpdateInBrowser =
        setOfPreviousInterpolateConfigs.difference(interpolationsInBrowser);
      // Update browser
      await BrowserRules.updateInterpolationsInBrowser([
        ...(interpolationsToUpdateInBrowser ?? []),
      ]);
      logger("synchronized with client successfully!");
      this.setPollingStatus(false);
    } catch (e) {
      this.setPollingStatus(false);
      this.logError(caller, (e as Error).message);
    }
  },
};
