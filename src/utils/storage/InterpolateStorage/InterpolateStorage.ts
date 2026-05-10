import { addUserScripts } from "@/utils/browser/addUserScripts";
import { createScriptInterpolation } from "@/utils/factories/createScriptInterpolation/createScriptInterpolation";
import {
  AnyInterpolation,
  InterpolationType,
  RedirectInterpolation,
  ScriptInterpolation,
} from "@/utils/factories/Interpolation";
import { logger } from "@/utils/logger";
import { INTERPOLATE_RECORD_PREFIX } from "../storage.constants";
import {
  GroupConfigInStorage,
  InterpolationGroup,
} from "#src/utils/factories/InterpolationGroup.ts";
import { createHeaderInterpolation } from "#src/utils/factories/createHeaderInterpolation/createHeaderInterpolation.ts";
import { createMockAPIInterpolation } from "#src/utils/factories/createMockAPIInterpolation/createMockAPIInterpolation.ts";
import { createRedirectInterpolation } from "#src/utils/factories/createRedirectInterpolation/createRedirectInterpolation.ts";
import { createTabManagermentInterpolation } from "#src/utils/factories/createTabManagerInterpolation/createTabManagerInterpolation.ts";

export const InterpolateStorage = {
  BROWSER_UI_TOGGLE_KEY: "displayBrowserUI",
  DEBUGGING_TABS_KEY: "debuggingTabs",
  logInvocation(caller: string) {
    logger(`(invocation): ${caller}`);
  },
  logError(caller: string, error: unknown) {
    logger(`${caller} threw (error): `, error);
  },
  getTabActivityId(tabId: number) {
    return `${tabId}-active`;
  },
  async addToGroup({
    interps,
    groupId,
  }: {
    groupId: string;
    interps: AnyInterpolation[] | AnyInterpolation;
  }) {
    const storageRecords = await chrome?.storage?.local.get([groupId]);
    const currentGroupFromRecord = storageRecords?.[groupId] ?? {};
    const interpolationIds = currentGroupFromRecord?.interpolationIds ?? {};
    const newInterpsIds = Array.isArray(interps)
      ? interps?.map?.((interp) => interp?.details?.id)
      : [interps?.details?.id];
    const updatedInterpolationIds = [...interpolationIds, ...newInterpsIds];

    const updatedGroup = new InterpolationGroup({
      name: currentGroupFromRecord?.name,
      groupId: currentGroupFromRecord?.groupId,
      createdAt: currentGroupFromRecord?.createdAt,
      interpolationIds: updatedInterpolationIds,
    });

    const groupStorageRecord = updatedGroup.createStorageRecord();

    chrome?.storage?.local.set({
      [groupId]: groupStorageRecord,
      showGroups: true,
    });
  },
  async createGroup({
    interpolations,
    groupId,
    name,
  }: {
    interpolations: AnyInterpolation | AnyInterpolation[];
    groupId?: string;
    name: string;
  }) {
    try {
      const group = new InterpolationGroup({
        groupId,
        name,
        interpolationIds: Array.isArray(interpolations)
          ? interpolations?.map((interp) => interp.details?.id)
          : [interpolations.details.id],
      });
      await chrome?.storage?.local.set({
        [groupId ?? group.groupId]: group.createStorageRecord(),
        showGroups: true,
      });
    } catch (e) {
      console.error(e);
    }
  },
  async getActiveTab() {
    const { activeTab } = await chrome?.storage?.local.get("activeTab");
    return activeTab;
  },
  async getAllGroups() {
    const result = await chrome?.storage?.local.get(null);
    const groupConfigs = Object.entries(result ?? {})
      ?.filter?.(([key]) => {
        return key?.startsWith("group-config");
      })
      .map((configTuple) => configTuple[1]);
    return groupConfigs;
  },
  async getTabActivity(tabId: number) {
    try {
      const key = this.getTabActivityId(tabId);
      const activity = await chrome?.storage?.local.get([key]);
      const tabActivity = activity[key].newValue ?? activity[key];
      const isInvalidValueType = !Array.isArray(tabActivity);
      if (isInvalidValueType) return [];
      return tabActivity ?? [];
    } catch (e) {
      logger("Error in getTabActivity: " + String((e as Error).message));
    }
  },
  async setActiveTab(tabId: number) {
    await chrome?.storage?.local.set({ activeTab: tabId });
  },
  async handleGroupChanges(
    changes: Record<
      string,
      { oldValue?: unknown; newValue?: Record<string, unknown> }
    >,
    onChanged: (updates: {
      newGroups: GroupConfigInStorage[];
      updatedGroups: GroupConfigInStorage[];
      removedGroups: GroupConfigInStorage[];
    }) => void,
  ) {
    const groupChanges = Object.entries(changes).filter(([key]) =>
      key.startsWith("group-"),
    );
    const noGroupChanges = !groupChanges?.length;

    if (noGroupChanges) return;

    const { newGroups, updatedGroups, removedGroups } = groupChanges.reduce(
      (accumulatedValue, currentValue) => {
        const [key, change] = currentValue;
        const isNew = !change?.oldValue;
        if (isNew) {
          return {
            ...accumulatedValue,
            newGroups: {
              ...(accumulatedValue?.newGroups ?? {}),
              [key]: {
                ...change.newValue,
              },
            },
          };
        }

        const isUpdated = change.oldValue && change.newValue;
        if (isUpdated) {
          return {
            ...accumulatedValue,
            updatedGroups: {
              ...(accumulatedValue?.updatedGroups ?? []),
              [key]: change.newValue,
            },
          };
        }

        const isRemoved = change?.oldValue && !change.newValue;

        if (isRemoved) {
          return {
            ...accumulatedValue,
            removedGroups: {
              ...(accumulatedValue?.removedGroups ?? []),
              [key]: change.oldValue,
            },
          };
        }

        return accumulatedValue;
      },
      { newGroups: [], updatedGroups: [], removedGroups: [] },
    );

    onChanged({ newGroups, updatedGroups, removedGroups });
  },
  async removeGroup(groupId: string) {
    return chrome?.storage?.local.remove(groupId);
  },
  async pushTabActivity({
    tabId,
    interpolations,
  }: {
    tabId: number;
    interpolations: AnyInterpolation[];
  }) {
    const currentActivity = (await this.getTabActivity(tabId)) ?? [];
    const uniqueNewActivity = interpolations.filter((interp) => {
      const isAlreadyTracked = currentActivity.some(
        (value) => value?.details?.id === interp?.details?.id,
      );
      if (isAlreadyTracked) return false;

      return true;
    });

    await this.setTabActivity({
      tabId,
      interpolations: [...currentActivity, ...uniqueNewActivity],
    });
  },
  async setTabActivity({
    tabId,
    interpolations,
  }: {
    tabId: number;
    interpolations: AnyInterpolation[];
  }) {
    const key = this.getTabActivityId(tabId);

    try {
      await chrome?.storage?.local.set({
        [key]: interpolations,
      });
    } catch (e) {
      logger("Error with setTabActivity: " + String((e as Error).message));
    }
  },
  async create(interpolationsToCreate: AnyInterpolation | AnyInterpolation[]) {
    const caller = "create";
    try {
      const formatInterp = (interp: AnyInterpolation) => {
        switch (interp.type) {
          case "tab-manager":
            return createTabManagermentInterpolation({
              name: interp.name,
              groupId: interp.details.groupId,
              groupName: interp.details.groupName,
              matcher: interp.details.matcher,
              id: interp.details.id,
              createdAt: interp.createdAt,
            });
          case "headers":
            return createHeaderInterpolation({
              name: interp.name,
              headerKey: interp.details.headerKey,
              headerValue: interp.details.headerValue,
              id: interp.details.id,
            });
          case "mockAPI":
            return createMockAPIInterpolation({
              name: interp.name,
              ...interp.details,
            });
          case "redirect":
            return createRedirectInterpolation({
              destination: interp.details.destination,
              source: interp.details.regexFilter,
              id: interp.details.id,
              name: interp.name,
            });
          case "script":
            return createScriptInterpolation({
              script: interp.details.js?.[0].code!,
              matches: interp.details.matches![0],
              name: interp.name,
              id: interp?.details?.id,
            });
        }
      };

      await this.setInterpolations(
        Array.isArray(interpolationsToCreate)
          ? interpolationsToCreate.map(formatInterp)
          : [formatInterp(interpolationsToCreate)],
      );
    } catch (e) {
      this.logError(caller, e);
    }
  },
  async disableAll() {
    const caller = "disableAll";
    try {
      const allCurrent = await this.getAllInterpolations();
      if (!allCurrent) return;
      await chrome?.storage?.local.set({ allPaused: true });
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
  async deleteAll() {
    const caller = "deleteAll";
    try {
      return chrome.storage?.local?.clear();
    } catch (e) {
      this.logError(caller, e as string);
    }
    try {
      return chrome.userScripts.unregister();
    } catch (e) {
      this.logError(caller, e as string);
    }
  },
  async delete(ids: (number | string)[] | (string | number)) {
    const caller = "delete";
    try {
      let resolvedIds: string[] = [];
      if (Array.isArray(ids)) {
        resolvedIds = ids.map((id) => this.getInterpolationRecordKey(id));
      } else {
        resolvedIds = [this.getInterpolationRecordKey(ids)];
      }
      await chrome.storage?.local?.remove(resolvedIds);
    } catch (e) {
      this.logError(caller, e as string);
    }
  },
  async enableAll() {
    const caller = "enableAll";
    try {
      const allCurrent = await this.getAllInterpolations();
      if (!allCurrent) return;
      await chrome?.storage?.local.set({ allPaused: false });

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
  async getAllMatchingPatterns() {
    const redirectRules = (await this.getAllByTypes([
      "redirect",
    ])) as RedirectInterpolation[];
    const patterns = redirectRules?.map((rule) => rule?.details?.regexFilter);
    return patterns;
  },
  async getAllActive() {
    const interpolations = await this.getAllInterpolations();
    const active = interpolations?.filter?.((interp) => interp.isActive);
    return active;
  },
  async getAllEnabled() {
    const interpolations = await this.getAllInterpolations();
    const allEnabled = interpolations?.filter?.(
      (interp) => interp?.enabledByUser,
    );
    return allEnabled;
  },
  getInterpolationRecordKey(id: number | string) {
    if (typeof id === "string" && id?.startsWith("interp")) {
      return id;
    }
    return `${INTERPOLATE_RECORD_PREFIX}${id}`;
  },
  async getInterpolationById(id: number | string) {
    const key = this.getInterpolationRecordKey(id);
    const interp = await chrome.storage?.local?.get(key);
    const value = interp[key];
    return value;
  },
  async getAllByTypes(types: InterpolationType[]) {
    const caller = "getAllByTypes";
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
    try {
      const result = await chrome.storage?.local?.getKeys();
      const interpolations = result?.filter((key) =>
        key.startsWith(INTERPOLATE_RECORD_PREFIX),
      );
      const storageRecords = await chrome.storage?.local?.get(interpolations);
      const interpolationConfigs = Object.values(storageRecords ?? {}).reduce<
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
  async setInterpolationError(id: number | string, e: Error | string) {
    const caller = "setInterpolationError";
    try {
      const interp = await this.getInterpolationById(id);
      const updatedInterpolation = {
        ...interp,
        error: typeof e === "object" ? e.message : e,
      };
      await this.setInterpolations([updatedInterpolation]);
    } catch (e) {
      this.logError(caller, e);
    }
  },
  async setInterpolations(interpolations?: AnyInterpolation[]) {
    const caller = "set";
    if (!interpolations) return;
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
      await chrome.storage?.local?.set({
        ...interpolationRecords,
      });
    } catch (e) {
      this.logError(caller, e);
    }
  },
  async setInterpolationActive({
    interpolation,
    isActive,
  }: {
    interpolation: AnyInterpolation | string;
    isActive: boolean;
  }) {
    const isInterpolationId = typeof interpolation === "string";

    if (isInterpolationId) {
      const target = await this.getInterpolationById(interpolation);
      await this.setInterpolations([{ ...target, isActive }]);
    } else {
      await this.setInterpolations([{ ...interpolation, isActive }]);
    }
  },
  async setIsEnabled(id: string | number, enabledByUser: boolean) {
    const caller = "setIsEnabled";
    const interpolationToUpdate = await this.getInterpolationById(id);
    try {
      await this.setInterpolations([
        { ...interpolationToUpdate, enabledByUser },
      ]);
      chrome.runtime.sendMessage(
        `interpolation-${id}-${enabledByUser ? "resumed" : "paused"}`,
      );
    } catch (e) {
      this.logError(caller, e as string);
    }
  },
  async subscribeToRecentlyInvoked(
    cb: (arg: { recentlyInvoked: AnyInterpolation[] }) => Promise<void>,
  ) {
    const caller = "subscribeToRecentlyInvoked";

    try {
      chrome.storage?.local?.onChanged.addListener(async (changes) => {
        if (!Object.hasOwn(changes, "recentlyInvoked")) return;
        const recentlyInvoked = changes.recentlyInvoked;
        const { newValue } = recentlyInvoked;
        cb({ recentlyInvoked: JSON.parse(newValue) });
      });
    } catch (e) {
      this.logError(caller, e);
    }
  },
  async subscribeToInterpolationChanges(
    cb: (arg: {
      created: AnyInterpolation[];
      updated: AnyInterpolation[];
      removed: AnyInterpolation[];
    }) => Promise<void>,
  ) {
    const caller = "subscribeToChanges";

    try {
      chrome.storage?.local?.onChanged.addListener(async (changes) => {
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
      const allScriptsInBrowser =
        (await chrome?.userScripts?.getScripts()) ?? [];
      const browserScriptSet = allScriptsInBrowser.reduce((acc, curr) => {
        const currentId = curr.id;
        const matchingInterp = interpolateScriptsMap.get(currentId);
        acc.add(
          matchingInterp ??
            createScriptInterpolation({
              script: curr.js?.[0]?.code ?? "",
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
  async syncAll() {
    return Promise.allSettled([this.syncWithUserScripts()]);
  },
  async getDebuggerTabs() {
    const storageResult = await chrome?.storage?.local.get(
      this.DEBUGGING_TABS_KEY,
    );
    const currentDebuggingTabs = storageResult?.[this.DEBUGGING_TABS_KEY];
    if (currentDebuggingTabs) return new Set<number>(currentDebuggingTabs);

    await chrome?.storage?.local.set({ [this.DEBUGGING_TABS_KEY]: [] });
    return new Set<number>();
  },
  async addTabDebugger(tabId: number) {
    const debuggingTabs = await this.getDebuggerTabs();
    debuggingTabs.add(tabId);
    const debuggingTabsAsArray = debuggingTabs.values().toArray();
    await chrome?.storage?.local.set({
      [this.DEBUGGING_TABS_KEY]: debuggingTabsAsArray,
    });
    return debuggingTabs;
  },
  async toggleBrowserUI(value: boolean) {
    await chrome?.storage?.local.set({
      [this.BROWSER_UI_TOGGLE_KEY]: value,
    });
  },
  async deleteDebuggerTab(tabId: number) {
    const debuggingTabs = await this.getDebuggerTabs();

    debuggingTabs.delete(tabId);
    const debuggingTabsAsArray = debuggingTabs.values().toArray();

    await chrome?.storage?.local.set({
      [this.DEBUGGING_TABS_KEY]: debuggingTabsAsArray,
    });
    return debuggingTabs;
  },
};
