import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/Notifier.tsx.js");import __vite__cjsImport0_react_jsxDevRuntime from "/vendor/.vite-deps-react_jsx-dev-runtime.js__v--2086482d.js"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import * as RefreshRuntime from "/vendor/react-refresh.js";
const inWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/content/Notifier.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import { InterpolationCard } from "/src/components/InterpolationCard/InterpolationCard.tsx.js";
import { useInterpolations } from "/src/hooks/useInterpolations/useInterpolations.tsx.js";
import styles from "/src/content/Notifier.module.scss.js";
import { Flex, Theme } from "/vendor/.vite-deps-@radix-ui_themes.js__v--2086482d.js";
import { NotifierToast } from "/src/components/NotifierToast/NotifierToast.tsx.js";
export const Notifier = () => {
  _s();
  const { recentlyUsed } = useInterpolations();
  return /* @__PURE__ */ jsxDEV(
    Theme,
    {
      style: {
        minHeight: 0,
        backgroundColor: "transparent"
      },
      children: /* @__PURE__ */ jsxDEV(Flex, { direction: "column", className: styles.Root, children: recentlyUsed.map(
        (interp) => /* @__PURE__ */ jsxDEV(
          NotifierToast,
          {
            onOpenChange: interp?.onOpenChange,
            open: !interp?.hidden,
            children: /* @__PURE__ */ jsxDEV(InterpolationCard, { info: interp }, void 0, false, {
              fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/content/Notifier.tsx",
              lineNumber: 42,
              columnNumber: 13
            }, this)
          },
          void 0,
          false,
          {
            fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/content/Notifier.tsx",
            lineNumber: 38,
            columnNumber: 9
          },
          this
        )
      ) }, void 0, false, {
        fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/content/Notifier.tsx",
        lineNumber: 36,
        columnNumber: 7
      }, this)
    },
    void 0,
    false,
    {
      fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/content/Notifier.tsx",
      lineNumber: 30,
      columnNumber: 5
    },
    this
  );
};
_s(Notifier, "DFPuxCpu+TYd3MQ7V4JEnba0doM=", false, function() {
  return [useInterpolations];
});
_c = Notifier;
var _c;
$RefreshReg$(_c, "Notifier");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/content/Notifier.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/content/Notifier.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
