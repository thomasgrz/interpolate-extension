import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/components/RuleToggle/RuleToggle.tsx.js");import __vite__cjsImport0_react_jsxDevRuntime from "/vendor/.vite-deps-react_jsx-dev-runtime.js__v--2086482d.js"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/RuleToggle/RuleToggle.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
import { PauseIcon, PlayIcon } from "/vendor/.vite-deps-@radix-ui_react-icons.js__v--2086482d.js";
import { Flex, Button, IconButton, Tooltip } from "/vendor/.vite-deps-@radix-ui_themes.js__v--2086482d.js";
export const RuleToggle = ({
  isPaused,
  onPauseClick,
  onResumeClick,
  disabled
}) => {
  return /* @__PURE__ */ jsxDEV(
    Flex,
    {
      align: "center",
      "data-testid": `${isPaused ? "play" : "pause"}-rule-toggle`,
      children: isPaused ? /* @__PURE__ */ jsxDEV(
        Tooltip,
        {
          content: disabled ? "rule cannot be enabled due to error" : "resume",
          children: /* @__PURE__ */ jsxDEV(
            IconButton,
            {
              radius: "full",
              disabled,
              onClick: onResumeClick,
              color: "green",
              children: /* @__PURE__ */ jsxDEV(PlayIcon, {}, void 0, false, {
                fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/RuleToggle/RuleToggle.tsx",
                lineNumber: 49,
                columnNumber: 13
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/RuleToggle/RuleToggle.tsx",
              lineNumber: 43,
              columnNumber: 11
            },
            this
          )
        },
        void 0,
        false,
        {
          fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/RuleToggle/RuleToggle.tsx",
          lineNumber: 40,
          columnNumber: 7
        },
        this
      ) : /* @__PURE__ */ jsxDEV(Tooltip, { content: "pause", children: /* @__PURE__ */ jsxDEV(
        Button,
        {
          size: "1",
          variant: "surface",
          disabled,
          onClick: onPauseClick,
          color: "blue",
          children: /* @__PURE__ */ jsxDEV(PauseIcon, {}, void 0, false, {
            fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/RuleToggle/RuleToggle.tsx",
            lineNumber: 61,
            columnNumber: 13
          }, this)
        },
        void 0,
        false,
        {
          fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/RuleToggle/RuleToggle.tsx",
          lineNumber: 54,
          columnNumber: 11
        },
        this
      ) }, void 0, false, {
        fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/RuleToggle/RuleToggle.tsx",
        lineNumber: 53,
        columnNumber: 7
      }, this)
    },
    void 0,
    false,
    {
      fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/RuleToggle/RuleToggle.tsx",
      lineNumber: 35,
      columnNumber: 5
    },
    this
  );
};
_c = RuleToggle;
var _c;
$RefreshReg$(_c, "RuleToggle");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/RuleToggle/RuleToggle.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/RuleToggle/RuleToggle.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
