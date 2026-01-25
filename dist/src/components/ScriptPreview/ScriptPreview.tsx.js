import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/components/ScriptPreview/ScriptPreview.tsx.js");import __vite__cjsImport0_react_jsxDevRuntime from "/vendor/.vite-deps-react_jsx-dev-runtime.js__v--2086482d.js"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/ScriptPreview/ScriptPreview.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
import { Code, DataList } from "/vendor/.vite-deps-@radix-ui_themes.js__v--2086482d.js";
export const ScriptPreview = (props) => {
  const { rule, name } = props;
  return /* @__PURE__ */ jsxDEV(DataList.Root, { trim: "end", size: "1", m: "1", children: [
    /* @__PURE__ */ jsxDEV(DataList.Item, { align: "center", children: [
      /* @__PURE__ */ jsxDEV(DataList.Label, { children: "Name:" }, void 0, false, {
        fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/ScriptPreview/ScriptPreview.tsx",
        lineNumber: 32,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(DataList.Value, { children: name }, void 0, false, {
        fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/ScriptPreview/ScriptPreview.tsx",
        lineNumber: 33,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/ScriptPreview/ScriptPreview.tsx",
      lineNumber: 31,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(DataList.Item, { align: "center", children: [
      /* @__PURE__ */ jsxDEV(DataList.Label, { children: "Type:" }, void 0, false, {
        fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/ScriptPreview/ScriptPreview.tsx",
        lineNumber: 36,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(DataList.Value, { children: "Script" }, void 0, false, {
        fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/ScriptPreview/ScriptPreview.tsx",
        lineNumber: 37,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/ScriptPreview/ScriptPreview.tsx",
      lineNumber: 35,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(DataList.Item, { children: [
      /* @__PURE__ */ jsxDEV(DataList.Label, { children: "Snippet:" }, void 0, false, {
        fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/ScriptPreview/ScriptPreview.tsx",
        lineNumber: 40,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(DataList.Value, { children: /* @__PURE__ */ jsxDEV(Code, { children: rule?.details?.js?.[0]?.code }, void 0, false, {
        fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/ScriptPreview/ScriptPreview.tsx",
        lineNumber: 42,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/ScriptPreview/ScriptPreview.tsx",
        lineNumber: 41,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/ScriptPreview/ScriptPreview.tsx",
      lineNumber: 39,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(DataList.Item, { children: [
      /* @__PURE__ */ jsxDEV(DataList.Label, { children: "Matches:" }, void 0, false, {
        fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/ScriptPreview/ScriptPreview.tsx",
        lineNumber: 46,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(DataList.Value, { children: /* @__PURE__ */ jsxDEV("strong", { children: rule?.details?.matches }, void 0, false, {
        fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/ScriptPreview/ScriptPreview.tsx",
        lineNumber: 48,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/ScriptPreview/ScriptPreview.tsx",
        lineNumber: 47,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/ScriptPreview/ScriptPreview.tsx",
      lineNumber: 45,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/ScriptPreview/ScriptPreview.tsx",
    lineNumber: 30,
    columnNumber: 5
  }, this);
};
_c = ScriptPreview;
var _c;
$RefreshReg$(_c, "ScriptPreview");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/ScriptPreview/ScriptPreview.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/ScriptPreview/ScriptPreview.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
