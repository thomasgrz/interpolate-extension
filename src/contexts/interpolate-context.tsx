import { SortOption } from "#src/components/SortingOptions/SortingOptions.tsx";
import { GroupConfigInStorage } from "#src/utils/factories/InterpolationGroup.ts";
import { logger } from "#src/utils/logger.ts";
import { sortInterpolations } from "#src/utils/sortInterpolations.ts";
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

export const InterpolateContext = createContext({
  interpolations: [] as AnyInterpolation[] | [] | undefined,
  add: async (_interps: AnyInterpolation[] | AnyInterpolation) => {},
  addToGroup: (_value: {
    interps: AnyInterpolation[] | AnyInterpolation | GroupConfigInStorage;
    groupId: string;
    onSuccess?: () => void;
  }) => {},
  isExtensionEnabled: undefined as boolean | undefined,
  enabledInterpolations: [],
  filter: "",
  filteredInterpolations: [],
  groups: [] as GroupConfigInStorage[],
  onChangeFilter: (_filter: string) => {},
  onChangeSort: (_sortOption: SortOption) => {},
  pause: (_id: string | number) => {},
  disableExtension: () => {},
  recentlyActive: [] as AnyInterpolation[] | [] | undefined,
  resume: (_id: string | number) => {},
  enableExtension: () => {},
  remove: (_id: string | number) => {},
  removeAll: () => {},
  refresh: () => {},
  removeGroup: (_id: string) => {},
  showGroups: false,
  sortOption: SortOption.NEWEST,
  setShowGroups: (_showGroups: boolean) => {},
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
    groups?: GroupConfigInStorage[];
  };
} = {}) => {
  const [groups, setGroups] = useState<GroupConfigInStorage[]>(
    initialValue?.groups ?? [],
  );
  const isInitialized = useRef(false);
  const [showGroups, setShowGroups] = useState(false);
  const [interpolations, setInterpolations] = useState<AnyInterpolation[]>([]);
  const [recentlyActive, setRecentlyActive] = useState<
    AnyInterpolation[] | []
  >();
  const [sortOption, setSortOption] = useState(SortOption.NEWEST);
  const [filter, setFilter] = useState<string>("");
  const sortedInterpolations = useMemo(() => {
    const noInterps = !interpolations?.length;
    if (noInterps) return [];
    return (
      sortInterpolations(interpolations, sortOption).filter((interp) =>
        interp?.name?.toLowerCase()?.includes(filter?.toLowerCase?.()),
      ) ?? []
    );
  }, [sortOption, interpolations, filter]);
  const [isExtensionEnabled, setIsExtensionEnabled] = useState<boolean>(false);

  const filteredInterpolations = useMemo(() => {
    const nofilter = !filter;
    if (nofilter) return [];
    return sortedInterpolations.filter((interp) =>
      interp.name?.includes(filter),
    );
  }, [sortedInterpolations, filter]);

  const onChangeSort = (option: SortOption) => {
    setSortOption(option);
    chrome?.storage?.local.set({ sortOption: option });
  };

  const onChangeFilter = (value: string) => {
    setFilter(value);
  };

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

  const disableExtension = async () => {
    try {
      setIsExtensionEnabled(false);
      await InterpolateStorage.disableExtension();
    } catch (e) {
      logger(e);
    }
  };

  const removeAll = async () => {
    const result = await InterpolateStorage.deleteAll();
    return result;
  };

  const enableExtension = async () => {
    try {
      setIsExtensionEnabled(true);
      await InterpolateStorage.enableExtension();
    } catch (e) {
      logger(e);
    }
  };

  const refresh = () => {
    alert("not implemented");
  };

  const removeGroup = (groupId: string) => {
    InterpolateStorage.removeGroup(groupId);
  };

  const getInitIsExtensionEnabled = async () => {
    const isExtensionEnabled = await InterpolateStorage.getIsExtensionEnabled();
    setIsExtensionEnabled(isExtensionEnabled);
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

  const handleShowGroups = (value: boolean) => {
    setShowGroups(value);
    chrome.storage?.local.set({ showGroups: value });
  };

  const addToGroup = ({
    interps,
    groupId,
  }: {
    groupId: string;
    interps: AnyInterpolation[] | AnyInterpolation;
  }) => {
    setShowGroups(true);
    return InterpolateStorage?.addToGroup({ groupId, interps });
  };

  const enabledInterpolations = useMemo(
    () => interpolations?.filter?.((interp) => interp?.enabledByUser),
    [interpolations],
  );
  useEffect(() => {
    const getInitialSortOption = async () => {
      const result = await chrome?.storage?.local.get("sortOption");
      const noDefault = !result?.sortOption;
      if (noDefault) return;
      setSortOption(result?.sortOption);
    };
    getInitialSortOption().catch();

    const getInitialGroupView = async () => {
      const result = await chrome?.storage?.local.get("showGroups");
      setShowGroups(result?.showGroups);
    };
    getInitialGroupView();
  }, []);

  useEffect(() => {
    InterpolateStorage.getAllGroups().then((initialGroups) => {
      setGroups(initialGroups);
    });
  }, []);

  const callbackRefs = useRef<{
    handleTabActivated?: boolean;
    handleTabChangesInStorage?: boolean;
    handleGroupChanges?: boolean;
    initRecentlyActive?: boolean;
  }>({});

  useEffect(() => {
    InterpolateStorage.subscribeToExtensionEnablement((value) => {
      setIsExtensionEnabled(value);
    });

    (async () => {
      const initialIsExtensionEnabled =
        await InterpolateStorage.getIsExtensionEnabled();
      setIsExtensionEnabled(initialIsExtensionEnabled);
    })();
  }, []);

  useEffect(() => {
    InterpolateStorage.syncWithUserScripts();
  }, []);

  useEffect(() => {
    // USE THIS EFFECT TO HANDLE GROUP CHANGES
    if (callbackRefs.current.handleGroupChanges) return;
    callbackRefs.current.handleGroupChanges = true;

    chrome?.storage?.local?.onChanged?.addListener(async (changes) => {
      InterpolateStorage.handleGroupChanges(changes, (updates) => {
        setGroups((prevState) => {
          const filteredGroups = prevState?.filter?.((group) => {
            // @ts-expect-error
            const isNotRemoved = !updates.removedGroups[group?.groupId];

            return isNotRemoved && !!group;
          });
          const updatedGroups = filteredGroups.map((group) => {
            // @ts-expect-error
            const isUpdated = !!updates.updatedGroups[group?.groupId];
            // @ts-expect-error
            if (isUpdated) return updates.updatedGroups[group?.groupId];
            return group;
          });

          const newGroups = Object.values(updates.newGroups) ?? [];

          return updatedGroups?.concat(newGroups);
        });
      });
    });
  }, []);

  useEffect(() => {
    // USE THIS EFFECT TO HANDLE TAB ACTIVE
    if (callbackRefs.current["handleTabActivated"])
      callbackRefs.current["handleTabActivated"] = true;
    // Update recentlyActive when a user switches tabs
    chrome.tabs?.onActivated?.addListener(async ({ tabId }) => {
      const currentActivity = await InterpolateStorage.getTabActivity(tabId);
      setRecentlyActive(currentActivity ?? []);
    });
  }, []);

  useEffect(() => {
    chrome.storage?.local.get("showGroups", (records) => {
      const { showGroups } = records ?? {};
      setShowGroups(showGroups);
    });
  }, []);

  useEffect(() => {
    if (callbackRefs.current["handleTabChangesInStorage"])
      callbackRefs.current["handleTabChangesInStorage"] = true;
    // Update recentlyActive when an active tab invokes interpolation
    chrome?.storage?.local?.onChanged?.addListener(async (changes) => {
      const currentTabActivityKey = await InterpolateStorage.getActiveTab();
      const currentTabChanges =
        changes[InterpolateStorage.getTabActivityId(currentTabActivityKey)]
          ?.newValue;
      const noChangesForCurrentTab = !currentTabChanges;

      if (noChangesForCurrentTab) return;

      setRecentlyActive(currentTabChanges ?? []);
    });
  }, []);

  useEffect(() => {
    // USE THIS EFFECT TO HANDLE INIT RECENTLY ACTIVE
    if (callbackRefs.current["initRecentlyActive"]) return;
    callbackRefs.current["initRecentlyActive"] = true;

    const initRecentlyActive = async () => {
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
    // USE THIS EFFECT TO HANDLE INITIALIZATION
    if (isInitialized.current) return;

    handleInitialization();
  }, []);

  useEffect(() => {
    getInitIsExtensionEnabled();
  }, []);

  if (!initialValue) return "loading...";

  return (
    <InterpolateContext
      value={{
        add,
        // @ts-expect-error TODO: FIXME: types
        addToGroup,
        isExtensionEnabled,
        // @ts-expect-error TODO: FIXME types
        enabledInterpolations,
        filter,
        interpolations,
        onChangeSort,
        onChangeFilter,
        pause,
        disableExtension,
        refresh,
        remove,
        removeGroup,
        removeAll,
        resume,
        enableExtension,
        showGroups,
        setShowGroups: handleShowGroups,
        groups,
        recentlyActive,
        sortOption,
        // @ts-expect-error TODO: fix types
        filteredInterpolations,
        // @ts-expect-error TODO: fix types
        sortedInterpolations,
      }}
    >
      {children}
    </InterpolateContext>
  );
};
