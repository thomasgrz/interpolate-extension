import { AnyInterpolation } from "@/utils/factories/Interpolation";
import { InterpolateStorage } from "@/utils/storage/InterpolateStorage/InterpolateStorage";
import { useEffect, useMemo, useRef, useState } from "react";

const getIsEveryRulePaused = async () => {
  const rulesInStorage = await InterpolateStorage.getAllInterpolations();
  const isEveryRulePaused = rulesInStorage?.every(
    (rule) => rule?.enabledByUser === false,
  );
  return !!isEveryRulePaused;
};

export const useInterpolations = (initialValue?: AnyInterpolation[]) => {
  const [interpolations, setInterpolations] = useState<AnyInterpolation[] | []>(
    initialValue ?? [],
  );
  const [recentlyActive, setRecentlyActive] = useState<
    AnyInterpolation[] | []
  >();

  const sortedInterpolations = useMemo(() => {
    return interpolations
      .sort(
        (interp) =>
          new Date(interp?.createdAt).getTime() -
          new Date(interp?.createdAt).getTime(),
      )
      .toReversed();
  }, [interpolations]);

  useEffect(() => {
    // Update recentlyActive when a user switches tabs
    chrome.tabs?.onActivated?.addListener(async ({ tabId }) => {
      const currentActivity = await InterpolateStorage.getTabActivity(tabId);
      setRecentlyActive(currentActivity);
    });

    // Update recentlyActive when an active tab invokes interpolation
    chrome?.storage?.sync?.onChanged?.addListener(async (changes) => {
      const currentTabActivityKey = await InterpolateStorage.getActiveTab();
      const currentTabChanges =
        changes[InterpolateStorage.getTabActivityId(currentTabActivityKey)]
          ?.newValue;
      const noChangesForCurrentTab = !currentTabChanges;

      if (noChangesForCurrentTab) return;

      setRecentlyActive(currentTabChanges);
    });

    const initRecentlyActive = async () => {
      let queryOptions = { active: true, lastFocusedWindow: true };
      // `tab` will either be a `tabs.Tab` instance or `undefined`.
      let [tab] = await chrome.tabs.query(queryOptions);
      const isMissingTabId = !tab.id;
      if (isMissingTabId) return;
      const tabActivity = await InterpolateStorage.getTabActivity(tab.id!);
      setRecentlyActive(tabActivity);
    };

    initRecentlyActive().catch(console.error);
  }, []);

  const [allPaused, setAllPaused] = useState<boolean>();
  const isInitialized = useRef(false);

  const add = (interp: AnyInterpolation[] | AnyInterpolation) => {
    const result = InterpolateStorage.create(
      Array.isArray(interp) ? interp : [interp],
    );
    return result;
  };
  const resume = async (id: string | number) => {
    const result = await InterpolateStorage.setIsEnabled(id, true);
    return result;
  };

  const pause = async (id: string | number) => {
    const result = await InterpolateStorage.setIsEnabled(id, false);
    return result;
  };

  const remove = async (id: (string | number) | (string | number)[]) => {
    const result = InterpolateStorage.delete(Array.isArray(id) ? id : [id]);
    return result;
  };

  const pauseAll = async () => {
    try {
      await InterpolateStorage.disableAll();
      setAllPaused(true);
    } catch (e) {
      // reset "resume" status if theres a failures
      setAllPaused(false);
    }
  };

  const removeAll = async () => {
    const result = await InterpolateStorage.deleteAll();
    return result;
  };

  const resumeAll = async () => {
    try {
      await InterpolateStorage.enableAll();
      setAllPaused(false);
    } catch (e) {
      // reset "pause" status if theres a failure
      setAllPaused(true);
    }
  };

  const handleStorageChanges = async (changes: {
    updated: AnyInterpolation[];
    removed: AnyInterpolation[];
    created: AnyInterpolation[];
  }) => {
    setInterpolations((prevInterpolations) => {
      let interpolationsAfterChanges = prevInterpolations as
        | AnyInterpolation[]
        | [];

      if (changes.created?.length) {
        const newInterpolations = changes.created;

        if (newInterpolations.length) {
          interpolationsAfterChanges = [
            ...interpolationsAfterChanges,
            ...newInterpolations,
          ];
        }
      }

      if (changes.removed?.length) {
        const removalMap = new Map(
          changes.removed.map((interp) => [interp.details.id, interp]),
        );

        interpolationsAfterChanges = interpolationsAfterChanges.filter(
          (interp) => !removalMap.get(interp.details.id),
        );
      }

      if (changes.updated?.length) {
        const updateMap = new Map(
          changes.updated.map((interp) => [interp.details.id, interp]),
        );

        interpolationsAfterChanges = interpolationsAfterChanges.map(
          (interp) => {
            const updated = updateMap.get(interp.details.id);
            if (updated) {
              return updated;
            }
            return interp;
          },
        );
      }

      return interpolationsAfterChanges;
    });

    const isEveryRulePaused = await getIsEveryRulePaused();
    setAllPaused(isEveryRulePaused);
  };

  const handleInitialization = async () => {
    isInitialized.current = true;

    InterpolateStorage.subscribeToInterpolationChanges(async (changes) => {
      handleStorageChanges(changes);
    });

    const getInitialInterpolations = async () => {
      const interps = await InterpolateStorage.getAllInterpolations();

      return interps;
    };

    const initialInterps = await getInitialInterpolations();

    if (!initialInterps) return;

    setInterpolations(initialInterps);
  };

  useEffect(() => {
    if (isInitialized.current) return;

    handleInitialization();
  }, []);

  useEffect(() => {
    const getInitAllPaused = async () => {
      const isEveryRulePaused = await getIsEveryRulePaused();
      setAllPaused(isEveryRulePaused);
    };

    getInitAllPaused();
  }, []);

  console.log({ sortedInterpolations });
  return {
    add,
    allPaused,
    remove,
    removeAll,
    interpolations: sortedInterpolations,
    pause,
    pauseAll,
    recentlyActive,
    resume,
    resumeAll,
  };
};
