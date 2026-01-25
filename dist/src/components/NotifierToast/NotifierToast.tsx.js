import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/components/NotifierToast/NotifierToast.tsx.js");import __vite__cjsImport0_react_jsxDevRuntime from "/vendor/.vite-deps-react_jsx-dev-runtime.js__v--2086482d.js"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/NotifierToast/NotifierToast.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
import { Toast } from "/vendor/.vite-deps-radix-ui.js__v--2086482d.js";
import styles from "/src/components/NotifierToast/NotifierToast.module.scss.js";
export const NotifierToast = ({
  children,
  title,
  open,
  onOpenChange
}) => {
  return /* @__PURE__ */ jsxDEV(Toast.Provider, { children: [
    /* @__PURE__ */ jsxDEV(
      Toast.Root,
      {
        onOpenChange,
        open,
        className: styles.ToastRoot,
        children: [
          title && /* @__PURE__ */ jsxDEV(Toast.Title, { className: styles.ToastTitle, children: title }, void 0, false, {
            fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/NotifierToast/NotifierToast.tsx",
            lineNumber: 42,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV(Toast.Description, { className: styles.ToastDescription, children }, void 0, false, {
            fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/NotifierToast/NotifierToast.tsx",
            lineNumber: 44,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/NotifierToast/NotifierToast.tsx",
        lineNumber: 36,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(Toast.Viewport, { className: styles.ToastViewport }, void 0, false, {
      fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/NotifierToast/NotifierToast.tsx",
      lineNumber: 48,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/NotifierToast/NotifierToast.tsx",
    lineNumber: 35,
    columnNumber: 5
  }, this);
};
_c = NotifierToast;
var _c;
$RefreshReg$(_c, "NotifierToast");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/NotifierToast/NotifierToast.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/NotifierToast/NotifierToast.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
