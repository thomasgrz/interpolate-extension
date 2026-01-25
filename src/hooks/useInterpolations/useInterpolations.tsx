import { AnyInterpolation } from "@/utils/factories/Interpolation";
import { InterpolateStorage } from "@/utils/storage/InterpolateStorage/InterpolateStorage";
import { useEffect, useRef, useState } from "react";
import { logger } from "@/utils/logger";

const getIsEveryRulePaused = async () => {
  const rulesInStorage = await InterpolateStorage.getAllInterpolations();
  const isEveryRulePaused = rulesInStorage?.every(
    (rule) => rule?.enabledByUser === false,
  );

  return !!isEveryRulePaused;
};

export const useInterpolations = () => {
  const [interpolations, setInterpolations] = useState<AnyInterpolation[] | []>(
    [],
  );
  const [recentlyUsed, setRecentlyUsed] = useState<
    (AnyInterpolation & {
      hidden: boolean;
      onOpenChange: (isOpen: boolean) => void;
    })[]
  >([]);
  const [allPaused, setAllPaused] = useState<boolean>();
  const isInitialized = useRef(false);
  useEffect(() => {
    try {
      chrome.runtime.onMessage.addListener((message) => {
        // In background.ts we send a message
        // to the content script whenever an interpolation is used
        // (this happens on a tab by tab basis)
        const isRedirect = message?.type === "redirect";
        const isHeader = message?.type === "headers";
        const isNonInterpolationEvent = !isRedirect && !isHeader;

        if (isNonInterpolationEvent) return;
        const interpolation = message;

        setRecentlyUsed((topLevelPrev) => [
          ...topLevelPrev,
          {
            ...interpolation,
            hidden: false,
            onOpenChange: (isOpen: boolean) => {
              setRecentlyUsed((innerPrev) => [
                ...innerPrev,
                { ...interpolation, hidden: !isOpen },
              ]);
            },
          },
        ]);
      });
    } catch (e) {
      logger(e);
    }
  }, []);

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
    setAllPaused(true);
    try {
      await InterpolateStorage.disableAll();
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
    setAllPaused(false);
    try {
      await InterpolateStorage.enableAll();
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

  return {
    add,
    allPaused,
    remove,
    removeAll,
    recentlyUsed,
    interpolations,
    pause,
    pauseAll,
    resume,
    resumeAll,
  };
};
