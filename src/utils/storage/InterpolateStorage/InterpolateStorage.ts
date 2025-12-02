import {
  AnyInterpolation,
  InterpolationType,
} from "@/utils/factories/Interpolation";
import { logger } from "@/utils/logger";
import { INTERPOLATE_RECORD_PREFIX } from "../storage.constants";

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
      await chrome.storage.sync.set({
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
  async getAllInterpolations() {
    const caller = "getAllInterpolations";
    this.logInvocation(caller);
    try {
      const result = await chrome.storage.sync.getKeys();
      const interpolations = result.filter((key) =>
        key.startsWith(INTERPOLATE_RECORD_PREFIX),
      );
      const storageRecords = await chrome.storage.sync.get(interpolations);
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
      return chrome.storage.sync.clear();
    } catch (e) {
      this.logError(caller, e as string);
    }
  },
  async delete(ids: (number | string)[] | (string | number)) {
    const caller = "delete";
    this.logInvocation(caller);
    try {
      await chrome.storage.sync.remove(ids);
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
      chrome.storage.sync.onChanged.addListener(async (changes) => {
        this.logInvocation("chrome.storage.sync.onChanged");
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
      chrome.storage.sync.onChanged.addListener(async (changes) => {
        this.logInvocation("chrome.storage.sync.onChanged");
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
};
