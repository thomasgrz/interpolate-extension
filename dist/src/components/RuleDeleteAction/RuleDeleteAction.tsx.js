import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/components/RuleDeleteAction/RuleDeleteAction.tsx.js");import __vite__cjsImport0_react_jsxDevRuntime from "/vendor/.vite-deps-react_jsx-dev-runtime.js__v--2086482d.js"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/RuleDeleteAction/RuleDeleteAction.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
import { TrashIcon } from "/vendor/.vite-deps-@radix-ui_react-icons.js__v--2086482d.js";
import { AlertDialog, Button, Flex, IconButton } from "/vendor/.vite-deps-@radix-ui_themes.js__v--2086482d.js";
export const RuleDeleteAction = ({ onDelete }) => {
  return /* @__PURE__ */ jsxDEV(AlertDialog.Root, { children: [
    /* @__PURE__ */ jsxDEV(AlertDialog.Trigger, { children: /* @__PURE__ */ jsxDEV(IconButton, { variant: "outline", color: "red", children: /* @__PURE__ */ jsxDEV(TrashIcon, {}, void 0, false, {
      fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/RuleDeleteAction/RuleDeleteAction.tsx",
      lineNumber: 28,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/RuleDeleteAction/RuleDeleteAction.tsx",
      lineNumber: 27,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/RuleDeleteAction/RuleDeleteAction.tsx",
      lineNumber: 26,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(AlertDialog.Content, { children: [
      /* @__PURE__ */ jsxDEV(AlertDialog.Title, { children: "Delete this rule forever?" }, void 0, false, {
        fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/RuleDeleteAction/RuleDeleteAction.tsx",
        lineNumber: 32,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(AlertDialog.Description, { children: "You can also just pause this rule." }, void 0, false, {
        fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/RuleDeleteAction/RuleDeleteAction.tsx",
        lineNumber: 33,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(Flex, { p: "3", justify: "between", children: [
        /* @__PURE__ */ jsxDEV(AlertDialog.Cancel, { children: /* @__PURE__ */ jsxDEV(Button, { radius: "small", variant: "soft", color: "gray", children: "Exit" }, void 0, false, {
          fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/RuleDeleteAction/RuleDeleteAction.tsx",
          lineNumber: 38,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/RuleDeleteAction/RuleDeleteAction.tsx",
          lineNumber: 37,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(AlertDialog.Action, { children: /* @__PURE__ */ jsxDEV(Button, { onClick: onDelete, radius: "small", color: "red", children: "Delete" }, void 0, false, {
          fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/RuleDeleteAction/RuleDeleteAction.tsx",
          lineNumber: 43,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/RuleDeleteAction/RuleDeleteAction.tsx",
          lineNumber: 42,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/RuleDeleteAction/RuleDeleteAction.tsx",
        lineNumber: 36,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/RuleDeleteAction/RuleDeleteAction.tsx",
      lineNumber: 31,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/RuleDeleteAction/RuleDeleteAction.tsx",
    lineNumber: 25,
    columnNumber: 5
  }, this);
};
_c = RuleDeleteAction;
var _c;
$RefreshReg$(_c, "RuleDeleteAction");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/RuleDeleteAction/RuleDeleteAction.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/RuleDeleteAction/RuleDeleteAction.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
