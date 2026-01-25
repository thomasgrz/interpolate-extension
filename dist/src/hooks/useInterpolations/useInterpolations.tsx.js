var _s = $RefreshSig$();
import { InterpolateStorage } from "/src/utils/storage/InterpolateStorage/InterpolateStorage.ts.js";
import __vite__cjsImport1_react from "/vendor/.vite-deps-react.js__v--2086482d.js"; const useEffect = __vite__cjsImport1_react["useEffect"]; const useRef = __vite__cjsImport1_react["useRef"]; const useState = __vite__cjsImport1_react["useState"];
import { logger } from "/src/utils/logger.ts.js";
const getIsEveryRulePaused = async () => {
  const rulesInStorage = await InterpolateStorage.getAllInterpolations();
  const isEveryRulePaused = rulesInStorage?.every(
    (rule) => rule?.enabledByUser === false
  );
  return !!isEveryRulePaused;
};
export const useInterpolations = () => {
  _s();
  const [interpolations, setInterpolations] = useState(
    []
  );
  const [recentlyUsed, setRecentlyUsed] = useState(
    []
  );
  const [allPaused, setAllPaused] = useState();
  const isInitialized = useRef(false);
  useEffect(() => {
    try {
      chrome.runtime.onMessage.addListener((message) => {
        const isRedirect = message?.type === "redirect";
        const isHeader = message?.type === "headers";
        const isNonInterpolationEvent = !isRedirect && !isHeader;
        if (isNonInterpolationEvent) return;
        const interpolation = message;
        setRecentlyUsed(
          (topLevelPrev) => [
            ...topLevelPrev,
            {
              ...interpolation,
              hidden: false,
              onOpenChange: (isOpen) => {
                setRecentlyUsed(
                  (innerPrev) => [
                    ...innerPrev,
                    { ...interpolation, hidden: !isOpen }
                  ]
                );
              }
            }
          ]
        );
      });
    } catch (e) {
      logger(e);
    }
  }, []);
  const add = (interp) => {
    const result = InterpolateStorage.create(
      Array.isArray(interp) ? interp : [interp]
    );
    return result;
  };
  const resume = async (id) => {
    const result = await InterpolateStorage.setIsEnabled(id, true);
    return result;
  };
  const pause = async (id) => {
    const result = await InterpolateStorage.setIsEnabled(id, false);
    return result;
  };
  const remove = async (id) => {
    const result = InterpolateStorage.delete(Array.isArray(id) ? id : [id]);
    return result;
  };
  const pauseAll = async () => {
    setAllPaused(true);
    try {
      await InterpolateStorage.disableAll();
    } catch (e) {
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
      setAllPaused(true);
    }
  };
  const handleStorageChanges = async (changes) => {
    setInterpolations((prevInterpolations) => {
      let interpolationsAfterChanges = prevInterpolations;
      if (changes.created?.length) {
        const newInterpolations = changes.created;
        if (newInterpolations.length) {
          interpolationsAfterChanges = [
            ...interpolationsAfterChanges,
            ...newInterpolations
          ];
        }
      }
      if (changes.removed?.length) {
        const removalMap = new Map(
          changes.removed.map((interp) => [interp.details.id, interp])
        );
        interpolationsAfterChanges = interpolationsAfterChanges.filter(
          (interp) => !removalMap.get(interp.details.id)
        );
      }
      if (changes.updated?.length) {
        const updateMap = new Map(
          changes.updated.map((interp) => [interp.details.id, interp])
        );
        interpolationsAfterChanges = interpolationsAfterChanges.map(
          (interp) => {
            const updated = updateMap.get(interp.details.id);
            if (updated) {
              return updated;
            }
            return interp;
          }
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
    resumeAll
  };
};
_s(useInterpolations, "Z8odkNv2BkP+LNOm0spd63+MXDs=");
