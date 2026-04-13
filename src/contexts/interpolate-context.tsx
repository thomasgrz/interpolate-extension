import { GroupConfigInStorage } from "#src/utils/factories/InterpolationGroup.ts";
import { InterpolateStorage } from "#src/utils/storage/InterpolateStorage/InterpolateStorage.ts";
import { AnyInterpolation } from "@/utils/factories/Interpolation";
import {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const getIsEveryRulePaused = async () => {
  const rulesInStorage = await InterpolateStorage.getAllInterpolations();
  const isEveryRulePaused = rulesInStorage?.every(
    (rule) => rule?.enabledByUser === false,
  );
  return !!isEveryRulePaused;
};

export const InterpolateContext = createContext({
  interpolations: [] as AnyInterpolation[] | [] | undefined,
  add: async (_interps: AnyInterpolation[] | AnyInterpolation) => {},
  addToGroup: (_value: {
    interps: AnyInterpolation[] | AnyInterpolation;
    groupName: string;
  }) => {},
  allPaused: undefined as boolean | undefined,
  groups: [] as GroupConfigInStorage[],
  pause: (_id: string) => {},
  pauseAll: () => {},
  recentlyActive: [] as AnyInterpolation[] | [] | undefined,
  resume: (_id: string) => {},
  resumeAll: () => {},
  remove: (_id: string) => {},
  removeAll: () => {},
  refresh: () => {},
  removeGroup: (_id: string) => {},
  sortedInterpolations: [] as AnyInterpolation[],
});

export const InterpolateProvider = ({
  children,
  initialValue = {
    interpolations: [],
    groups: [],
  },
}: {
  children?: ReactNode;
  initialValue?: {
    interpolations: AnyInterpolation[];
    groups: GroupConfigInStorage[];
  };
} = {}) => {
  const [groups, setGroups] = useState<GroupConfigInStorage[]>(
    initialValue?.groups,
  );
  const isInitialized = useRef(false);
  const [interpolations, setInterpolations] = useState<AnyInterpolation[]>([]);
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
  const [allPaused, setAllPaused] = useState<boolean>();

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

  const refresh = () => {
    alert("not implemented");
  };

  const removeGroup = (groupId: string) => {
    InterpolateStorage.removeGroup(groupId);
  };

  const getInitAllPaused = async () => {
    const isEveryRulePaused = await getIsEveryRulePaused();
    setAllPaused(isEveryRulePaused);
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

  const addToGroup = ({
    interps,
    groupName,
  }: {
    groupName: string;
    interps: AnyInterpolation[] | AnyInterpolation;
  }) => {
    return InterpolateStorage?.addToGroup({ groupName, interps });
  };

  useEffect(() => {
    InterpolateStorage.getAllGroups().then((initialGroups) =>
      setGroups(initialGroups),
    );
  }, []);

  const callbackRefs = useRef<{
    handleTabActive?: boolean;
    handleTabChanges?: boolean;
    handleGroupChanges?: boolean;
    initRecentlyActive?: boolean;
  }>({});

  useEffect(() => {
    // Update recentlyActive when a user switches tabs
    chrome.tabs?.onActivated?.addListener(async ({ tabId }) => {
      if (callbackRefs.current["handleTabActive"])
        callbackRefs.current["handleTabActive"] = true;

      const currentActivity = await InterpolateStorage.getTabActivity(tabId);
      setRecentlyActive(currentActivity);
    });

    // Update recentlyActive when an active tab invokes interpolation
    chrome?.storage?.local?.onChanged?.addListener(async (changes) => {
      if (callbackRefs.current["handleTabChanges"]) return;
      callbackRefs.current["handleTabChanges"] = true;

      const currentTabActivityKey = await InterpolateStorage.getActiveTab();
      const currentTabChanges =
        changes[InterpolateStorage.getTabActivityId(currentTabActivityKey)]
          ?.newValue;
      const noChangesForCurrentTab = !currentTabChanges;

      if (noChangesForCurrentTab) return;

      setRecentlyActive(currentTabChanges);
    });

    chrome?.storage?.local?.onChanged?.addListener(async (changes) => {
      if (callbackRefs.current["handleGroupChanges"]) return;
      callbackRefs.current["handleGroupChanges"] = true;

      InterpolateStorage.handleGroupChanges(changes, (updates) => {
        setGroups((prevState) => {
          return prevState
            ?.filter?.((group) => {
              // @ts-expect-error
              const isNotRemoved = !updates.removedGroups[group?.groupId];

              return isNotRemoved && !!group;
            })
            .map((group) => {
              // @ts-expect-error
              const isUpdated = !!updates.updatedGroups[group?.groupId];
              // @ts-expect-error
              if (isUpdated) return updates.updatedGroups[group?.groupId];
              return group;
            })
            .concat([...Object.values(updates.newGroups)]);
        });
      });
    });

    const initRecentlyActive = async () => {
      if (callbackRefs.current["initRecentlyActive"]) return;
      callbackRefs.current["initRecentlyActive"] = true;

      let queryOptions = { active: true, lastFocusedWindow: true };
      // `tab` will either be a `tabs.Tab` instance or `undefined`.
      let [tab] = (await chrome.tabs?.query?.(queryOptions)) ?? [{ id: null }];
      const isMissingTabId = !tab?.id;
      if (isMissingTabId) return;
      const tabActivity = await InterpolateStorage.getTabActivity(tab.id!);
      setRecentlyActive(tabActivity);
    };

    initRecentlyActive().catch(console.error);
  }, []);

  useEffect(() => {
    if (isInitialized.current) return;

    handleInitialization();
  }, []);

  useEffect(() => {
    getInitAllPaused();
  }, []);

  if (!initialValue) return "loading...";

  return (
    <InterpolateContext
      value={{
        add,
        addToGroup,
        allPaused,
        interpolations,
        pause,
        pauseAll,
        refresh,
        remove,
        removeGroup,
        removeAll,
        resume,
        resumeAll,
        groups,
        recentlyActive,
        sortedInterpolations,
      }}
    >
      {children}
    </InterpolateContext>
  );
};
