import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/components/InterpolationCard/InterpolationCard.tsx.js");import __vite__cjsImport0_react_jsxDevRuntime from "/vendor/.vite-deps-react_jsx-dev-runtime.js__v--2086482d.js"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/InterpolationCard/InterpolationCard.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/vendor/.vite-deps-react.js__v--2086482d.js"; const useEffect = __vite__cjsImport3_react["useEffect"]; const useRef = __vite__cjsImport3_react["useRef"]; const useState = __vite__cjsImport3_react["useState"];
import { InterpolateStorage } from "/src/utils/storage/InterpolateStorage/InterpolateStorage.ts.js";
import { DoubleArrowDownIcon, DoubleArrowUpIcon } from "/vendor/.vite-deps-@radix-ui_react-icons.js__v--2086482d.js";
import {
  Badge,
  Box,
  Callout,
  Card,
  Flex,
  IconButton,
  Text,
  Tooltip
} from "/vendor/.vite-deps-@radix-ui_themes.js__v--2086482d.js";
import { Collapsible } from "/vendor/.vite-deps-radix-ui.js__v--2086482d.js";
import { HeaderRulePreview } from "/src/components/HeaderPreview/HeaderPreview.tsx.js";
import { RedirectRulePreview } from "/src/components/RedirectPreview/RedirectPreview.tsx.js";
import { RuleDeleteAction } from "/src/components/RuleDeleteAction/RuleDeleteAction.tsx.js";
import { RuleToggle } from "/src/components/RuleToggle/RuleToggle.tsx.js";
import styles from "/src/components/InterpolationCard/InterpolationCard.module.scss.js";
import { ScriptPreview } from "/src/components/ScriptPreview/ScriptPreview.tsx.js";
export const InterpolationCard = ({ info }) => {
  _s();
  const [isOpen, setIsOpen] = useState(false);
  const [hit, setHit] = useState(false);
  const [_, setRecentlyHitColor] = useState("green");
  const { enabledByUser, error, type, details, name } = info;
  const formattedError = error instanceof Error ? error.message : String(error);
  useEffect(() => {
    chrome.runtime?.onMessage?.addListener?.((msg) => {
      if (msg === `redirect-${details.id}-hit`) {
        setRecentlyHitColor("green");
        setHit(true);
        setTimeout(() => {
          setRecentlyHitColor("gray");
        }, 5e3);
        setTimeout(() => {
          setHit(false);
        }, 3e4);
      }
    });
  }, [enabledByUser]);
  const onDelete = async () => {
    await InterpolateStorage.delete(details.id);
  };
  const handleResumeClick = async () => {
    await InterpolateStorage.setIsEnabled(details?.id, true);
  };
  const handlePauseClick = async () => {
    await InterpolateStorage.setIsEnabled(details?.id, false);
  };
  const handleOpenChange = (value) => {
    setIsOpen(value);
  };
  const badgeColor = () => {
    switch (type) {
      case "headers":
        return "green";
      case "script":
        return "purple";
      case "redirect":
        return "blue";
    }
  };
  const [orientation, setOrientation] = useState(
    "horizontal"
  );
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(() => {
      const elementWidth = ref.current?.clientWidth;
      if (!elementWidth) return;
      if (elementWidth > 300) {
        setOrientation("horizontal");
      } else {
        setOrientation("vertical");
      }
    });
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref]);
  const getPreview = () => {
    switch (type) {
      case "headers":
        return /* @__PURE__ */ jsxDEV(
          HeaderRulePreview,
          {
            dataOrientation: orientation,
            details,
            name
          },
          void 0,
          false,
          {
            fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/InterpolationCard/InterpolationCard.tsx",
            lineNumber: 128,
            columnNumber: 11
          },
          this
        );
      case "redirect":
        return /* @__PURE__ */ jsxDEV(RedirectRulePreview, { name, rule: info }, void 0, false, {
          fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/InterpolationCard/InterpolationCard.tsx",
          lineNumber: 135,
          columnNumber: 16
        }, this);
      case "script":
        return /* @__PURE__ */ jsxDEV(ScriptPreview, { name, rule: info }, void 0, false, {
          fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/InterpolationCard/InterpolationCard.tsx",
          lineNumber: 137,
          columnNumber: 16
        }, this);
    }
  };
  return /* @__PURE__ */ jsxDEV(Collapsible.Root, { onOpenChange: handleOpenChange, children: /* @__PURE__ */ jsxDEV(
    Card,
    {
      ref,
      "data-ui-active": hit,
      "data-ui-error": !!info.error,
      "data-testid": `${type}-preview-${info?.details?.id}`,
      className: styles.InterpolationCard,
      variant: "surface",
      children: [
        error && /* @__PURE__ */ jsxDEV(Callout.Root, { color: "red", children: /* @__PURE__ */ jsxDEV(Callout.Text, { size: "1", children: formattedError }, void 0, false, {
          fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/InterpolationCard/InterpolationCard.tsx",
          lineNumber: 153,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/InterpolationCard/InterpolationCard.tsx",
          lineNumber: 152,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV(Flex, { justify: "between", align: "center", children: [
          /* @__PURE__ */ jsxDEV(
            RuleToggle,
            {
              disabled: !!info.error,
              onResumeClick: handleResumeClick,
              onPauseClick: handlePauseClick,
              isPaused: !enabledByUser || !!info.error
            },
            void 0,
            false,
            {
              fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/InterpolationCard/InterpolationCard.tsx",
              lineNumber: 157,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(Collapsible.Trigger, { asChild: true, children: /* @__PURE__ */ jsxDEV(Flex, { px: "1", flexGrow: "1", justify: "between", children: [
            /* @__PURE__ */ jsxDEV(Flex, { p: "3", align: "center", children: /* @__PURE__ */ jsxDEV(Text, { weight: "medium", size: "2", children: name }, void 0, false, {
              fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/InterpolationCard/InterpolationCard.tsx",
              lineNumber: 166,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/InterpolationCard/InterpolationCard.tsx",
              lineNumber: 165,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(Flex, { align: "center", children: [
              /* @__PURE__ */ jsxDEV(Box, { p: "1", children: /* @__PURE__ */ jsxDEV(Badge, { variant: "soft", color: badgeColor(), size: "1", children: type }, void 0, false, {
                fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/InterpolationCard/InterpolationCard.tsx",
                lineNumber: 172,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/InterpolationCard/InterpolationCard.tsx",
                lineNumber: 171,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV(Tooltip, { content: "options", children: /* @__PURE__ */ jsxDEV(IconButton, { size: "1", radius: "full", variant: "outline", children: isOpen ? /* @__PURE__ */ jsxDEV(DoubleArrowUpIcon, {}, void 0, false, {
                fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/InterpolationCard/InterpolationCard.tsx",
                lineNumber: 178,
                columnNumber: 31
              }, this) : /* @__PURE__ */ jsxDEV(DoubleArrowDownIcon, {}, void 0, false, {
                fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/InterpolationCard/InterpolationCard.tsx",
                lineNumber: 178,
                columnNumber: 55
              }, this) }, void 0, false, {
                fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/InterpolationCard/InterpolationCard.tsx",
                lineNumber: 177,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/InterpolationCard/InterpolationCard.tsx",
                lineNumber: 176,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/InterpolationCard/InterpolationCard.tsx",
              lineNumber: 170,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/InterpolationCard/InterpolationCard.tsx",
            lineNumber: 164,
            columnNumber: 13
          }, this) }, void 0, false, {
            fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/InterpolationCard/InterpolationCard.tsx",
            lineNumber: 163,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/InterpolationCard/InterpolationCard.tsx",
          lineNumber: 156,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV(Collapsible.Content, { children: /* @__PURE__ */ jsxDEV(Flex, { align: "end", justify: "between", children: [
          /* @__PURE__ */ jsxDEV(Flex, { flexGrow: "1", children: getPreview() }, void 0, false, {
            fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/InterpolationCard/InterpolationCard.tsx",
            lineNumber: 187,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(Box, { children: /* @__PURE__ */ jsxDEV(RuleDeleteAction, { onDelete }, void 0, false, {
            fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/InterpolationCard/InterpolationCard.tsx",
            lineNumber: 189,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/InterpolationCard/InterpolationCard.tsx",
            lineNumber: 188,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/InterpolationCard/InterpolationCard.tsx",
          lineNumber: 186,
          columnNumber: 11
        }, this) }, void 0, false, {
          fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/InterpolationCard/InterpolationCard.tsx",
          lineNumber: 185,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/InterpolationCard/InterpolationCard.tsx",
      lineNumber: 143,
      columnNumber: 7
    },
    this
  ) }, void 0, false, {
    fileName: "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/InterpolationCard/InterpolationCard.tsx",
    lineNumber: 142,
    columnNumber: 5
  }, this);
};
_s(InterpolationCard, "JvMiDg+SmYja1H2897HDVYK8bh8=");
_c = InterpolationCard;
var _c;
$RefreshReg$(_c, "InterpolationCard");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/InterpolationCard/InterpolationCard.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/InterpolationCard/InterpolationCard.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
