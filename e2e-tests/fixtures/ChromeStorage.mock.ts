import { vi } from "vitest";
import { AnyInterpolation } from "../../src/utils/factories/Interpolation";
import { InterpolateStorage } from "../../src/utils/storage/InterpolateStorage/InterpolateStorage";
import { on } from "events";

type OnChangedArg = {
  [key: string]: {
    newValue?: unknown;
    oldValue?: unknown;
  };
};

export class ChromeStorage {
  onChangedCallback: ((arg: OnChangedArg) => void) | null = null;
  storageMock = new Map<string, AnyInterpolation>();
  onChanged = {
    addListener: (cb: (arg: OnChangedArg) => void) => {
      this.onChangedCallback = cb;
    },
  };
  clear = () => {
    const updatedValues = [...this.storageMock.entries()].reduce<{
      [key: string]: { newValue?: unknown; oldValue?: unknown };
    }>((acc, curr) => {
      const [key, value] = curr;
      acc[key] = { oldValue: value };
      return acc;
    }, {});

    this.onChangedCallback?.(updatedValues);
    this.storageMock.clear();
  };
  get = vi.fn(async (keys: string[]) => {
    // get every key, value pair from storageMock and return as object
    const result = Array.isArray(keys)
      ? keys.reduce(
          (acc, curr) => {
            acc[curr] = this.storageMock.get(curr);
            return acc;
          },
          {} as Record<string, unknown>,
        )
      : { [keys]: this.storageMock.get(keys) };

    return Promise.resolve(result);
  });
  getKeys = vi.fn(async () => {
    const keys = [...this.storageMock.keys()];
    return Promise.resolve(keys);
  });
  set = vi.fn(async (arg: Record<string, unknown>) => {
    const changes = new Map();
    Object.entries(arg).forEach(([key, value]) => {
      if (this.storageMock.has(key)) {
        changes.set(key, {
          oldValue: this.storageMock.get(key),
          newValue: value,
        });
      } else {
        changes.set(key, {
          newValue: value,
        });
      }
    });

    const updatedValue = [...changes.entries()].reduce<{
      [key: string]: { newValue?: unknown; oldValue?: unknown };
    }>((acc, curr) => {
      const [key, change] = curr;
      this.storageMock.set(key, change.newValue as AnyInterpolation);
      acc[key] = change;
      return acc;
    }, {});

    this.onChangedCallback?.(updatedValue);
  });
  remove = vi.fn(async (keys: string | string[]) => {
    const keysArray = Array.isArray(keys) ? keys : [keys];
    const changes = new Map();
    keysArray.forEach((key) => {
      const recordKey = InterpolateStorage.getInterpolationRecordKey(key);
      if (this.storageMock.has(recordKey)) {
        changes.set(recordKey, {
          oldValue: this.storageMock.get(recordKey),
        });
        this.storageMock.delete(recordKey);
      }
    });

    const updatedValue = [...changes.entries()].reduce<{
      [key: string]: { newValue?: unknown; oldValue?: unknown };
    }>((acc, curr) => {
      const [key, change] = curr;
      acc[key] = change;
      return acc;
    }, {});

    this.onChangedCallback?.(updatedValue);

    return Promise.resolve();
  });
  storageArea = {
    clear: this.clear,
    get: this.get,
    getKeys: this.getKeys,
    onChanged: this.onChanged,
    set: this.set,
    remove: this.remove,
  };
  sync = this.storageArea;
  local = this.storageArea;
}
