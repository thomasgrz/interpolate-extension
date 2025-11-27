import { AnyInterpolation } from "@/utils/factories/Interpolation";
import { logger } from "@/utils/logger";
import { InterpolateStorage } from "@/utils/storage/InterpolateStorage/InterpolateStorage";
import { useEffect, useState } from "react";

const getIsEveryRulePaused = async () => {
  const rulesInStorage = await InterpolateStorage.getAllInterpolations();
  const isEveryRulePaused = rulesInStorage?.every(
    (rule) => rule?.enabledByUser === false,
  );

  return !!isEveryRulePaused;
};

export const useInterpolations = () => {
  const [interpolations, setInterpolations] = useState<
    AnyInterpolation[] | []
  >();
  const [allPaused, setAllPaused] = useState<boolean>();

  const add = (interp: AnyInterpolation[] | AnyInterpolation) => {
    return InterpolateStorage.create(Array.isArray(interp) ? interp : [interp]);
  };
  const resume = async (id: string | number) => {
    return InterpolateStorage.setIsEnabled(id, true);
  };

  const pause = async (id: string | number) => {
    return InterpolateStorage.setIsEnabled(id, false);
  };

  const remove = async (id: string | string[]) => {
    return InterpolateStorage.delete(Array.isArray(id) ? id : [id]);
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

  const resumeAll = async () => {
    setAllPaused(false);
    try {
      await InterpolateStorage.enableAll();
    } catch (e) {
      // reset "pause" status if theres a failure
      setAllPaused(true);
    }
  };

  useEffect(() => {
    const getInitialRulesFromStorage = async () => {
      const allRules = (await InterpolateStorage.getAllInterpolations()) ?? [];
      setInterpolations(allRules);
    };

    getInitialRulesFromStorage();
  }, []);

  useEffect(() => {
    InterpolateStorage.subscribeToInterpolationChanges(async (changes) => {
      setInterpolations((prevInterpolations) => {
        let interpolationsAfterChanges = prevInterpolations as
          | AnyInterpolation[]
          | [];

        if (changes.created?.length) {
          const newInterpolations = changes.created
            .map((interp) => interp.newValue)
            .filter((interp) => interp !== undefined);

          if (newInterpolations.length) {
            interpolationsAfterChanges = [
              ...interpolationsAfterChanges,
              ...newInterpolations,
            ];
          }
        }

        if (changes.removed?.length) {
          const removalMap = new Map(
            changes.removed.map((interp) => [
              interp.oldValue?.details.id,
              interp.oldValue,
            ]),
          );

          interpolationsAfterChanges = interpolationsAfterChanges.filter(
            (interp) => !removalMap.get(interp.details.id),
          );
        }

        if (changes.updated?.length) {
          const updateMap = new Map(
            changes.updated.map((interp) => [
              interp.newValue?.details.id,
              interp.newValue,
            ]),
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
    });
  }, []);

  useEffect(() => {
    const getInitAllPaused = async () => {
      const isEveryRulePaused = await getIsEveryRulePaused();
      setAllPaused(isEveryRulePaused);
    };

    getInitAllPaused();
  }, []);

  const removeAll = async () => {
    await InterpolateStorage.deleteAll();
  };

  return {
    add,
    allPaused,
    remove,
    removeAll,
    interpolations,
    pause,
    pauseAll,
    resume,
    resumeAll,
  };
};
