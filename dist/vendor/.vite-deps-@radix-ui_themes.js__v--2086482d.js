import {
  Primitive,
  composeEventHandlers,
  composeRefs,
  dispatchDiscreteCustomEvent,
  dist_exports,
  dist_exports10 as dist_exports8,
  dist_exports11 as dist_exports9,
  dist_exports12 as dist_exports10,
  dist_exports13 as dist_exports11,
  dist_exports14 as dist_exports12,
  dist_exports15 as dist_exports13,
  dist_exports16 as dist_exports14,
  dist_exports19 as dist_exports15,
  dist_exports2,
  dist_exports21 as dist_exports16,
  dist_exports24 as dist_exports17,
  dist_exports25 as dist_exports18,
  dist_exports26 as dist_exports19,
  dist_exports27 as dist_exports20,
  dist_exports28 as dist_exports21,
  dist_exports3,
  dist_exports30 as dist_exports22,
  dist_exports31 as dist_exports23,
  dist_exports32 as dist_exports24,
  dist_exports35 as dist_exports25,
  dist_exports37 as dist_exports26,
  dist_exports4,
  dist_exports6 as dist_exports5,
  dist_exports8 as dist_exports6,
  dist_exports9 as dist_exports7,
  useCallbackRef,
  useComposedRefs,
  useControllableState
} from "/vendor/.vite-deps-chunk-FFM6SIBK.js__v--2086482d.js";
import "/vendor/.vite-deps-chunk-S3Z6QACX.js__v--2086482d.js";
import "/vendor/.vite-deps-chunk-J22JBKEQ.js__v--2086482d.js";
import "/vendor/.vite-deps-chunk-2ZET3HRN.js__v--2086482d.js";
import {
  __commonJS,
  __export,
  __toESM,
  require_react
} from "/vendor/.vite-deps-chunk-IYDKXRZQ.js__v--2086482d.js";

// node_modules/classnames/index.js
var require_classnames = __commonJS({
  "node_modules/classnames/index.js"(exports, module) {
    (function() {
      "use strict";
      var hasOwn = {}.hasOwnProperty;
      function classNames() {
        var classes = "";
        for (var i24 = 0; i24 < arguments.length; i24++) {
          var arg = arguments[i24];
          if (arg) {
            classes = appendClass(classes, parseValue(arg));
          }
        }
        return classes;
      }
      function parseValue(arg) {
        if (typeof arg === "string" || typeof arg === "number") {
          return arg;
        }
        if (typeof arg !== "object") {
          return "";
        }
        if (Array.isArray(arg)) {
          return classNames.apply(null, arg);
        }
        if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes("[native code]")) {
          return arg.toString();
        }
        var classes = "";
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes = appendClass(classes, key);
          }
        }
        return classes;
      }
      function appendClass(value, newClass) {
        if (!newClass) {
          return value;
        }
        if (value) {
          return value + " " + newClass;
        }
        return value + newClass;
      }
      if (typeof module !== "undefined" && module.exports) {
        classNames.default = classNames;
        module.exports = classNames;
      } else if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
        define("classnames", [], function() {
          return classNames;
        });
      } else {
        window.classNames = classNames;
      }
    })();
  }
});

// node_modules/@radix-ui/themes/dist/esm/components/accessible-icon.js
var s = dist_exports3.Root;

// node_modules/@radix-ui/themes/dist/esm/components/alert-dialog.js
var alert_dialog_exports = {};
__export(alert_dialog_exports, {
  Action: () => D,
  Cancel: () => A2,
  Content: () => p3,
  Description: () => m4,
  Root: () => n4,
  Title: () => g2,
  Trigger: () => s5
});
var e13 = __toESM(require_react(), 1);
var import_classnames5 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/props/as-child.prop.js
var o = { asChild: { type: "boolean" } };

// node_modules/@radix-ui/themes/dist/esm/props/width.props.js
var t = { width: { type: "string", className: "rt-r-w", customProperties: ["--width"], responsive: true }, minWidth: { type: "string", className: "rt-r-min-w", customProperties: ["--min-width"], responsive: true }, maxWidth: { type: "string", className: "rt-r-max-w", customProperties: ["--max-width"], responsive: true } };

// node_modules/@radix-ui/themes/dist/esm/props/height.props.js
var e = { height: { type: "string", className: "rt-r-h", customProperties: ["--height"], responsive: true }, minHeight: { type: "string", className: "rt-r-min-h", customProperties: ["--min-height"], responsive: true }, maxHeight: { type: "string", className: "rt-r-max-h", customProperties: ["--max-height"], responsive: true } };

// node_modules/@radix-ui/themes/dist/esm/components/dialog.props.js
var r = ["1", "2", "3", "4"];
var s2 = { ...o, align: { type: "enum", className: "rt-r-align", values: ["start", "center"], default: "center" }, size: { type: "enum", className: "rt-r-size", values: r, default: "3", responsive: true }, width: t.width, minWidth: t.minWidth, maxWidth: { ...t.maxWidth, default: "600px" }, ...e };

// node_modules/@radix-ui/themes/dist/esm/components/heading.js
var o5 = __toESM(require_react(), 1);
var import_classnames2 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/props/color.prop.js
var o2 = ["gray", "gold", "bronze", "brown", "yellow", "amber", "orange", "tomato", "red", "ruby", "crimson", "pink", "plum", "purple", "violet", "iris", "indigo", "blue", "cyan", "teal", "jade", "green", "grass", "lime", "mint", "sky"];
var e2 = ["auto", "gray", "mauve", "slate", "sage", "olive", "sand"];
var r2 = { color: { type: "enum", values: o2, default: void 0 } };
var s3 = { color: { type: "enum", values: o2, default: "" } };

// node_modules/@radix-ui/themes/dist/esm/props/high-contrast.prop.js
var o3 = { highContrast: { type: "boolean", className: "rt-high-contrast", default: void 0 } };

// node_modules/@radix-ui/themes/dist/esm/props/leading-trim.prop.js
var e3 = ["normal", "start", "end", "both"];
var r3 = { trim: { type: "enum", className: "rt-r-lt", values: e3, responsive: true } };

// node_modules/@radix-ui/themes/dist/esm/props/text-align.prop.js
var e4 = ["left", "center", "right"];
var t2 = { align: { type: "enum", className: "rt-r-ta", values: e4, responsive: true } };

// node_modules/@radix-ui/themes/dist/esm/props/text-wrap.prop.js
var e5 = ["wrap", "nowrap", "pretty", "balance"];
var r4 = { wrap: { type: "enum", className: "rt-r-tw", values: e5, responsive: true } };

// node_modules/@radix-ui/themes/dist/esm/props/truncate.prop.js
var e6 = { truncate: { type: "boolean", className: "rt-truncate" } };

// node_modules/@radix-ui/themes/dist/esm/props/weight.prop.js
var e7 = ["light", "regular", "medium", "bold"];
var t3 = { weight: { type: "enum", className: "rt-r-weight", values: e7, responsive: true } };

// node_modules/@radix-ui/themes/dist/esm/components/heading.props.js
var m = ["h1", "h2", "h3", "h4", "h5", "h6"];
var a = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
var n = { as: { type: "enum", values: m, default: "h1" }, ...o, size: { type: "enum", className: "rt-r-size", values: a, default: "6", responsive: true }, ...t3, ...t2, ...r3, ...e6, ...r4, ...r2, ...o3 };

// node_modules/@radix-ui/themes/dist/esm/helpers/extract-props.js
var import_classnames = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/props/prop-def.js
var e8 = ["initial", "xs", "sm", "md", "lg", "xl"];

// node_modules/@radix-ui/themes/dist/esm/helpers/has-own-property.js
function e9(n26, r46) {
  return Object.prototype.hasOwnProperty.call(n26, r46);
}

// node_modules/@radix-ui/themes/dist/esm/helpers/is-responsive-object.js
function i(e45) {
  return typeof e45 == "object" && Object.keys(e45).some((s26) => e8.includes(s26));
}

// node_modules/@radix-ui/themes/dist/esm/helpers/get-responsive-styles.js
function R({ className: r46, customProperties: n26, ...t35 }) {
  const p37 = g({ allowArbitraryValues: true, className: r46, ...t35 }), e45 = m2({ customProperties: n26, ...t35 });
  return [p37, e45];
}
function g({ allowArbitraryValues: r46, value: n26, className: t35, propValues: p37, parseValue: e45 = (s26) => s26 }) {
  const s26 = [];
  if (n26) {
    if (typeof n26 == "string" && p37.includes(n26)) return l(t35, n26, e45);
    if (i(n26)) {
      const i24 = n26;
      for (const o59 in i24) {
        if (!e9(i24, o59) || !e8.includes(o59)) continue;
        const u10 = i24[o59];
        if (u10 !== void 0) {
          if (p37.includes(u10)) {
            const f21 = l(t35, u10, e45), v11 = o59 === "initial" ? f21 : `${o59}:${f21}`;
            s26.push(v11);
          } else if (r46) {
            const f21 = o59 === "initial" ? t35 : `${o59}:${t35}`;
            s26.push(f21);
          }
        }
      }
      return s26.join(" ");
    }
    if (r46) return t35;
  }
}
function l(r46, n26, t35) {
  const p37 = r46 ? "-" : "", e45 = t35(n26), s26 = e45?.startsWith("-"), i24 = s26 ? "-" : "", o59 = s26 ? e45?.substring(1) : e45;
  return `${i24}${r46}${p37}${o59}`;
}
function m2({ customProperties: r46, value: n26, propValues: t35, parseValue: p37 = (e45) => e45 }) {
  let e45 = {};
  if (!(!n26 || typeof n26 == "string" && t35.includes(n26))) {
    if (typeof n26 == "string" && (e45 = Object.fromEntries(r46.map((s26) => [s26, n26]))), i(n26)) {
      const s26 = n26;
      for (const i24 in s26) {
        if (!e9(s26, i24) || !e8.includes(i24)) continue;
        const o59 = s26[i24];
        if (!t35.includes(o59)) for (const u10 of r46) e45 = { [i24 === "initial" ? u10 : `${u10}-${i24}`]: o59, ...e45 };
      }
    }
    for (const s26 in e45) {
      const i24 = e45[s26];
      i24 !== void 0 && (e45[s26] = p37(i24));
    }
    return e45;
  }
}

// node_modules/@radix-ui/themes/dist/esm/helpers/merge-styles.js
function l2(...t35) {
  let e45 = {};
  for (const n26 of t35) n26 && (e45 = { ...e45, ...n26 });
  return Object.keys(e45).length ? e45 : void 0;
}

// node_modules/@radix-ui/themes/dist/esm/helpers/extract-props.js
function N(...r46) {
  return Object.assign({}, ...r46);
}
function v(r46, ...m16) {
  let t35, l13;
  const a39 = { ...r46 }, f21 = N(...m16);
  for (const n26 in f21) {
    let s26 = a39[n26];
    const e45 = f21[n26];
    if (e45.default !== void 0 && s26 === void 0 && (s26 = e45.default), e45.type === "enum" && ![e45.default, ...e45.values].includes(s26) && !i(s26) && (s26 = e45.default), a39[n26] = s26, "className" in e45 && e45.className) {
      delete a39[n26];
      const u10 = "responsive" in e45;
      if (!s26 || i(s26) && !u10) continue;
      if (i(s26) && (e45.default !== void 0 && s26.initial === void 0 && (s26.initial = e45.default), e45.type === "enum" && ([e45.default, ...e45.values].includes(s26.initial) || (s26.initial = e45.default))), e45.type === "enum") {
        const i24 = g({ allowArbitraryValues: false, value: s26, className: e45.className, propValues: e45.values, parseValue: e45.parseValue });
        t35 = (0, import_classnames.default)(t35, i24);
        continue;
      }
      if (e45.type === "string" || e45.type === "enum | string") {
        const i24 = e45.type === "string" ? [] : e45.values, [d10, y7] = R({ className: e45.className, customProperties: e45.customProperties, propValues: i24, parseValue: e45.parseValue, value: s26 });
        l13 = l2(l13, y7), t35 = (0, import_classnames.default)(t35, d10);
        continue;
      }
      if (e45.type === "boolean" && s26) {
        t35 = (0, import_classnames.default)(t35, e45.className);
        continue;
      }
    }
  }
  return a39.className = (0, import_classnames.default)(t35, r46.className), a39.style = l2(l13, r46.style), a39;
}

// node_modules/@radix-ui/themes/dist/esm/props/margin.props.js
var e10 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-1", "-2", "-3", "-4", "-5", "-6", "-7", "-8", "-9"];
var r5 = { m: { type: "enum | string", values: e10, responsive: true, className: "rt-r-m", customProperties: ["--m"] }, mx: { type: "enum | string", values: e10, responsive: true, className: "rt-r-mx", customProperties: ["--ml", "--mr"] }, my: { type: "enum | string", values: e10, responsive: true, className: "rt-r-my", customProperties: ["--mt", "--mb"] }, mt: { type: "enum | string", values: e10, responsive: true, className: "rt-r-mt", customProperties: ["--mt"] }, mr: { type: "enum | string", values: e10, responsive: true, className: "rt-r-mr", customProperties: ["--mr"] }, mb: { type: "enum | string", values: e10, responsive: true, className: "rt-r-mb", customProperties: ["--mb"] }, ml: { type: "enum | string", values: e10, responsive: true, className: "rt-r-ml", customProperties: ["--ml"] } };

// node_modules/@radix-ui/themes/dist/esm/components/heading.js
var r6 = o5.forwardRef((p37, t35) => {
  const { children: e45, className: s26, asChild: a39, as: n26 = "h1", color: i24, ...m16 } = v(p37, n, r5);
  return o5.createElement(dist_exports.Root, { "data-accent-color": i24, ...m16, ref: t35, className: (0, import_classnames2.default)("rt-Heading", s26) }, a39 ? e45 : o5.createElement(n26, null, e45));
});
r6.displayName = "Heading";

// node_modules/@radix-ui/themes/dist/esm/components/text.js
var o6 = __toESM(require_react(), 1);
var import_classnames3 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/text.props.js
var m3 = ["span", "div", "label", "p"];
var a2 = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
var n2 = { as: { type: "enum", values: m3, default: "span" }, ...o, size: { type: "enum", className: "rt-r-size", values: a2, responsive: true }, ...t3, ...t2, ...r3, ...e6, ...r4, ...r2, ...o3 };

// node_modules/@radix-ui/themes/dist/esm/components/text.js
var p = o6.forwardRef((t35, r46) => {
  const { children: e45, className: s26, asChild: m16, as: a39 = "span", color: n26, ...P9 } = v(t35, n2, r5);
  return o6.createElement(dist_exports.Root, { "data-accent-color": n26, ...P9, ref: r46, className: (0, import_classnames3.default)("rt-Text", s26) }, m16 ? e45 : o6.createElement(a39, null, e45));
});
p.displayName = "Text";

// node_modules/@radix-ui/themes/dist/esm/components/theme.js
var e12 = __toESM(require_react(), 1);
var import_classnames4 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/helpers/get-matching-gray-color.js
function a3(e45) {
  switch (e45) {
    case "tomato":
    case "red":
    case "ruby":
    case "crimson":
    case "pink":
    case "plum":
    case "purple":
    case "violet":
      return "mauve";
    case "iris":
    case "indigo":
    case "blue":
    case "sky":
    case "cyan":
      return "slate";
    case "teal":
    case "jade":
    case "mint":
    case "green":
      return "sage";
    case "grass":
    case "lime":
      return "olive";
    case "yellow":
    case "amber":
    case "orange":
    case "brown":
    case "gold":
    case "bronze":
      return "sand";
    case "gray":
      return "gray";
  }
}

// node_modules/@radix-ui/themes/dist/esm/props/radius.prop.js
var e11 = ["none", "small", "medium", "large", "full"];
var r7 = { radius: { type: "enum", values: e11, default: void 0 } };

// node_modules/@radix-ui/themes/dist/esm/components/theme.props.js
var p2 = ["inherit", "light", "dark"];
var t4 = ["solid", "translucent"];
var n3 = ["90%", "95%", "100%", "105%", "110%"];
var s4 = { ...o, hasBackground: { type: "boolean", default: true }, appearance: { type: "enum", values: p2, default: "inherit" }, accentColor: { type: "enum", values: o2, default: "indigo" }, grayColor: { type: "enum", values: e2, default: "auto" }, panelBackground: { type: "enum", values: t4, default: "translucent" }, radius: { type: "enum", values: e11, default: "medium" }, scaling: { type: "enum", values: n3, default: "100%" } };

// node_modules/@radix-ui/themes/dist/esm/components/theme.js
var d2 = () => {
};
var P = e12.createContext(void 0);
function H() {
  const a39 = e12.useContext(P);
  if (a39 === void 0) throw new Error("`useThemeContext` must be used within a `Theme`");
  return a39;
}
var R2 = e12.forwardRef((a39, s26) => e12.useContext(P) === void 0 ? e12.createElement(dist_exports26.Provider, { delayDuration: 200 }, e12.createElement(dist_exports5.Provider, { dir: "ltr" }, e12.createElement(I, { ...a39, ref: s26 }))) : e12.createElement(A, { ...a39, ref: s26 }));
R2.displayName = "Theme";
var I = e12.forwardRef((a39, s26) => {
  const { appearance: r46 = s4.appearance.default, accentColor: c5 = s4.accentColor.default, grayColor: l13 = s4.grayColor.default, panelBackground: p37 = s4.panelBackground.default, radius: n26 = s4.radius.default, scaling: t35 = s4.scaling.default, hasBackground: i24 = s4.hasBackground.default, ...u10 } = a39, [h4, m16] = e12.useState(r46);
  e12.useEffect(() => m16(r46), [r46]);
  const [y7, g8] = e12.useState(c5);
  e12.useEffect(() => g8(c5), [c5]);
  const [v11, C7] = e12.useState(l13);
  e12.useEffect(() => C7(l13), [l13]);
  const [k3, f21] = e12.useState(p37);
  e12.useEffect(() => f21(p37), [p37]);
  const [B5, x4] = e12.useState(n26);
  e12.useEffect(() => x4(n26), [n26]);
  const [T6, b6] = e12.useState(t35);
  return e12.useEffect(() => b6(t35), [t35]), e12.createElement(A, { ...u10, ref: s26, isRoot: true, hasBackground: i24, appearance: h4, accentColor: y7, grayColor: v11, panelBackground: k3, radius: B5, scaling: T6, onAppearanceChange: m16, onAccentColorChange: g8, onGrayColorChange: C7, onPanelBackgroundChange: f21, onRadiusChange: x4, onScalingChange: b6 });
});
I.displayName = "ThemeRoot";
var A = e12.forwardRef((a39, s26) => {
  const r46 = e12.useContext(P), { asChild: c5, isRoot: l13, hasBackground: p37, appearance: n26 = r46?.appearance ?? s4.appearance.default, accentColor: t35 = r46?.accentColor ?? s4.accentColor.default, grayColor: i24 = r46?.resolvedGrayColor ?? s4.grayColor.default, panelBackground: u10 = r46?.panelBackground ?? s4.panelBackground.default, radius: h4 = r46?.radius ?? s4.radius.default, scaling: m16 = r46?.scaling ?? s4.scaling.default, onAppearanceChange: y7 = d2, onAccentColorChange: g8 = d2, onGrayColorChange: v11 = d2, onPanelBackgroundChange: C7 = d2, onRadiusChange: k3 = d2, onScalingChange: f21 = d2, ...B5 } = a39, x4 = c5 ? dist_exports.Root : "div", T6 = i24 === "auto" ? a3(t35) : i24, b6 = a39.appearance === "light" || a39.appearance === "dark", S5 = p37 === void 0 ? l13 || b6 : p37;
  return e12.createElement(P.Provider, { value: e12.useMemo(() => ({ appearance: n26, accentColor: t35, grayColor: i24, resolvedGrayColor: T6, panelBackground: u10, radius: h4, scaling: m16, onAppearanceChange: y7, onAccentColorChange: g8, onGrayColorChange: v11, onPanelBackgroundChange: C7, onRadiusChange: k3, onScalingChange: f21 }), [n26, t35, i24, T6, u10, h4, m16, y7, g8, v11, C7, k3, f21]) }, e12.createElement(x4, { "data-is-root-theme": l13 ? "true" : "false", "data-accent-color": t35, "data-gray-color": T6, "data-has-background": S5 ? "true" : "false", "data-panel-background": u10, "data-radius": h4, "data-scaling": m16, ref: s26, ...B5, className: (0, import_classnames4.default)("radix-themes", { light: n26 === "light", dark: n26 === "dark" }, B5.className) }));
});
A.displayName = "ThemeImpl";

// node_modules/@radix-ui/themes/dist/esm/helpers/require-react-element.js
var o7 = __toESM(require_react(), 1);
var a4 = (t35) => {
  if (!o7.isValidElement(t35)) throw Error(`Expected a single React Element child, but got: ${o7.Children.toArray(t35).map((e45) => typeof e45 == "object" && "type" in e45 && typeof e45.type == "string" ? e45.type : typeof e45).join(", ")}`);
  return t35;
};

// node_modules/@radix-ui/themes/dist/esm/components/alert-dialog.js
var n4 = (t35) => e13.createElement(dist_exports8.Root, { ...t35 });
n4.displayName = "AlertDialog.Root";
var s5 = e13.forwardRef(({ children: t35, ...o59 }, i24) => e13.createElement(dist_exports8.Trigger, { ...o59, ref: i24, asChild: true }, a4(t35)));
s5.displayName = "AlertDialog.Trigger";
var p3 = e13.forwardRef(({ align: t35, ...o59 }, i24) => {
  const { align: P9, ...c5 } = s2, { className: f21 } = v({ align: t35 }, { align: P9 }), { className: C7, forceMount: d10, container: y7, ...v11 } = v(o59, c5);
  return e13.createElement(dist_exports8.Portal, { container: y7, forceMount: d10 }, e13.createElement(R2, { asChild: true }, e13.createElement(dist_exports8.Overlay, { className: "rt-BaseDialogOverlay rt-AlertDialogOverlay" }, e13.createElement("div", { className: "rt-BaseDialogScroll rt-AlertDialogScroll" }, e13.createElement("div", { className: `rt-BaseDialogScrollPadding rt-AlertDialogScrollPadding ${f21}` }, e13.createElement(dist_exports8.Content, { ...v11, ref: i24, className: (0, import_classnames5.default)("rt-BaseDialogContent", "rt-AlertDialogContent", C7) }))))));
});
p3.displayName = "AlertDialog.Content";
var g2 = e13.forwardRef((t35, o59) => e13.createElement(dist_exports8.Title, { asChild: true }, e13.createElement(r6, { size: "5", mb: "3", trim: "start", ...t35, asChild: false, ref: o59 })));
g2.displayName = "AlertDialog.Title";
var m4 = e13.forwardRef((t35, o59) => e13.createElement(dist_exports8.Description, { asChild: true }, e13.createElement(p, { as: "p", size: "3", ...t35, asChild: false, ref: o59 })));
m4.displayName = "AlertDialog.Description";
var D = e13.forwardRef(({ children: t35, ...o59 }, i24) => e13.createElement(dist_exports8.Action, { ...o59, ref: i24, asChild: true }, a4(t35)));
D.displayName = "AlertDialog.Action";
var A2 = e13.forwardRef(({ children: t35, ...o59 }, i24) => e13.createElement(dist_exports8.Cancel, { ...o59, ref: i24, asChild: true }, a4(t35)));
A2.displayName = "AlertDialog.Cancel";

// node_modules/@radix-ui/themes/dist/esm/components/aspect-ratio.js
var i2 = dist_exports9.Root;

// node_modules/@radix-ui/themes/dist/esm/components/avatar.js
var r8 = __toESM(require_react(), 1);
var import_classnames6 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/avatar.props.js
var s6 = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
var a5 = ["solid", "soft"];
var p4 = { ...o, size: { type: "enum", className: "rt-r-size", values: s6, default: "3", responsive: true }, variant: { type: "enum", className: "rt-variant", values: a5, default: "soft" }, ...s3, ...o3, ...r7, fallback: { type: "ReactNode", required: true } };

// node_modules/@radix-ui/themes/dist/esm/helpers/get-subtree.js
var a6 = __toESM(require_react(), 1);
function d3(i24, e45) {
  const { asChild: r46, children: c5 } = i24;
  if (!r46) return typeof e45 == "function" ? e45(c5) : e45;
  const t35 = a6.Children.only(c5);
  return a6.cloneElement(t35, { children: typeof e45 == "function" ? e45(t35.props.children) : e45 });
}

// node_modules/@radix-ui/themes/dist/esm/components/avatar.js
var i3 = r8.forwardRef((t35, e45) => {
  const { asChild: o59, children: a39, className: s26, style: p37, color: v11, radius: f21, ...d10 } = v(t35, p4, r5);
  return r8.createElement(dist_exports10.Root, { "data-accent-color": v11, "data-radius": f21, className: (0, import_classnames6.default)("rt-reset", "rt-AvatarRoot", s26), style: p37, asChild: o59 }, d3({ asChild: o59, children: a39 }, r8.createElement(n5, { ref: e45, ...d10 })));
});
i3.displayName = "Avatar";
var n5 = r8.forwardRef(({ fallback: t35, ...e45 }, o59) => {
  const [a39, s26] = r8.useState("idle");
  return r8.createElement(r8.Fragment, null, a39 === "idle" || a39 === "loading" ? r8.createElement("span", { className: "rt-AvatarFallback" }) : null, a39 === "error" ? r8.createElement(dist_exports10.Fallback, { className: (0, import_classnames6.default)("rt-AvatarFallback", { "rt-one-letter": typeof t35 == "string" && t35.length === 1, "rt-two-letters": typeof t35 == "string" && t35.length === 2 }), delayMs: 0 }, t35) : null, r8.createElement(dist_exports10.Image, { ref: o59, className: "rt-AvatarImage", ...e45, onLoadingStatusChange: (p37) => {
    e45.onLoadingStatusChange?.(p37), s26(p37);
  } }));
});
n5.displayName = "AvatarImpl";

// node_modules/@radix-ui/themes/dist/esm/components/badge.js
var o8 = __toESM(require_react(), 1);
var import_classnames7 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/badge.props.js
var t5 = ["1", "2", "3"];
var a7 = ["solid", "soft", "surface", "outline"];
var p5 = { ...o, size: { type: "enum", className: "rt-r-size", values: t5, default: "1", responsive: true }, variant: { type: "enum", className: "rt-variant", values: a7, default: "soft" }, ...s3, ...o3, ...r7 };

// node_modules/@radix-ui/themes/dist/esm/components/badge.js
var e14 = o8.forwardRef((r46, p37) => {
  const { asChild: t35, className: s26, color: a39, radius: m16, ...n26 } = v(r46, p5, r5), d10 = t35 ? dist_exports.Root : "span";
  return o8.createElement(d10, { "data-accent-color": a39, "data-radius": m16, ...n26, ref: p37, className: (0, import_classnames7.default)("rt-reset", "rt-Badge", s26) });
});
e14.displayName = "Badge";

// node_modules/@radix-ui/themes/dist/esm/components/blockquote.js
var o9 = __toESM(require_react(), 1);
var import_classnames8 = __toESM(require_classnames(), 1);
var e15 = o9.forwardRef((t35, p37) => {
  const { asChild: r46, children: s26, className: m16, ...l13 } = t35, c5 = r46 ? dist_exports.Root : "blockquote";
  return o9.createElement(p, { asChild: true, ...l13, ref: p37, className: (0, import_classnames8.default)("rt-Blockquote", m16) }, o9.createElement(c5, null, s26));
});
e15.displayName = "Blockquote";

// node_modules/@radix-ui/themes/dist/esm/components/box.js
var o11 = __toESM(require_react(), 1);
var import_classnames9 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/slot.js
var l4 = dist_exports.Root;
var e16 = dist_exports.Root;
var r9 = dist_exports.Slottable;

// node_modules/@radix-ui/themes/dist/esm/components/box.props.js
var s7 = ["div", "span"];
var o10 = ["none", "inline", "inline-block", "block", "contents"];
var p6 = { as: { type: "enum", values: s7, default: "div" }, ...o, display: { type: "enum", className: "rt-r-display", values: o10, responsive: true } };

// node_modules/@radix-ui/themes/dist/esm/props/padding.props.js
var e17 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var p7 = { p: { type: "enum | string", className: "rt-r-p", customProperties: ["--p"], values: e17, responsive: true }, px: { type: "enum | string", className: "rt-r-px", customProperties: ["--pl", "--pr"], values: e17, responsive: true }, py: { type: "enum | string", className: "rt-r-py", customProperties: ["--pt", "--pb"], values: e17, responsive: true }, pt: { type: "enum | string", className: "rt-r-pt", customProperties: ["--pt"], values: e17, responsive: true }, pr: { type: "enum | string", className: "rt-r-pr", customProperties: ["--pr"], values: e17, responsive: true }, pb: { type: "enum | string", className: "rt-r-pb", customProperties: ["--pb"], values: e17, responsive: true }, pl: { type: "enum | string", className: "rt-r-pl", customProperties: ["--pl"], values: e17, responsive: true } };

// node_modules/@radix-ui/themes/dist/esm/props/layout.props.js
var r10 = ["visible", "hidden", "clip", "scroll", "auto"];
var i4 = ["static", "relative", "absolute", "fixed", "sticky"];
var e18 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-1", "-2", "-3", "-4", "-5", "-6", "-7", "-8", "-9"];
var p8 = ["0", "1"];
var n7 = ["0", "1"];
var u = { ...p7, ...t, ...e, position: { type: "enum", className: "rt-r-position", values: i4, responsive: true }, inset: { type: "enum | string", className: "rt-r-inset", customProperties: ["--inset"], values: e18, responsive: true }, top: { type: "enum | string", className: "rt-r-top", customProperties: ["--top"], values: e18, responsive: true }, right: { type: "enum | string", className: "rt-r-right", customProperties: ["--right"], values: e18, responsive: true }, bottom: { type: "enum | string", className: "rt-r-bottom", customProperties: ["--bottom"], values: e18, responsive: true }, left: { type: "enum | string", className: "rt-r-left", customProperties: ["--left"], values: e18, responsive: true }, overflow: { type: "enum", className: "rt-r-overflow", values: r10, responsive: true }, overflowX: { type: "enum", className: "rt-r-ox", values: r10, responsive: true }, overflowY: { type: "enum", className: "rt-r-oy", values: r10, responsive: true }, flexBasis: { type: "string", className: "rt-r-fb", customProperties: ["--flex-basis"], responsive: true }, flexShrink: { type: "enum | string", className: "rt-r-fs", customProperties: ["--flex-shrink"], values: p8, responsive: true }, flexGrow: { type: "enum | string", className: "rt-r-fg", customProperties: ["--flex-grow"], values: n7, responsive: true }, gridArea: { type: "string", className: "rt-r-ga", customProperties: ["--grid-area"], responsive: true }, gridColumn: { type: "string", className: "rt-r-gc", customProperties: ["--grid-column"], responsive: true }, gridColumnStart: { type: "string", className: "rt-r-gcs", customProperties: ["--grid-column-start"], responsive: true }, gridColumnEnd: { type: "string", className: "rt-r-gce", customProperties: ["--grid-column-end"], responsive: true }, gridRow: { type: "string", className: "rt-r-gr", customProperties: ["--grid-row"], responsive: true }, gridRowStart: { type: "string", className: "rt-r-grs", customProperties: ["--grid-row-start"], responsive: true }, gridRowEnd: { type: "string", className: "rt-r-gre", customProperties: ["--grid-row-end"], responsive: true } };

// node_modules/@radix-ui/themes/dist/esm/components/box.js
var p9 = o11.forwardRef((r46, s26) => {
  const { className: t35, asChild: e45, as: m16 = "div", ...a39 } = v(r46, p6, u, r5);
  return o11.createElement(e45 ? e16 : m16, { ...a39, ref: s26, className: (0, import_classnames9.default)("rt-Box", t35) });
});
p9.displayName = "Box";

// node_modules/@radix-ui/themes/dist/esm/components/button.js
var t8 = __toESM(require_react(), 1);
var import_classnames13 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/_internal/base-button.js
var o14 = __toESM(require_react(), 1);
var import_classnames12 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/_internal/base-button.props.js
var t6 = ["1", "2", "3", "4"];
var a8 = ["classic", "solid", "soft", "surface", "outline", "ghost"];
var i5 = { ...o, size: { type: "enum", className: "rt-r-size", values: t6, default: "2", responsive: true }, variant: { type: "enum", className: "rt-variant", values: a8, default: "solid" }, ...s3, ...o3, ...r7, loading: { type: "boolean", className: "rt-loading", default: false } };

// node_modules/@radix-ui/themes/dist/esm/components/flex.js
var o13 = __toESM(require_react(), 1);
var import_classnames10 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/props/gap.props.js
var e19 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var p10 = { gap: { type: "enum | string", className: "rt-r-gap", customProperties: ["--gap"], values: e19, responsive: true }, gapX: { type: "enum | string", className: "rt-r-cg", customProperties: ["--column-gap"], values: e19, responsive: true }, gapY: { type: "enum | string", className: "rt-r-rg", customProperties: ["--row-gap"], values: e19, responsive: true } };

// node_modules/@radix-ui/themes/dist/esm/components/flex.props.js
var t7 = ["div", "span"];
var p11 = ["none", "inline-flex", "flex"];
var a9 = ["row", "column", "row-reverse", "column-reverse"];
var o12 = ["start", "center", "end", "baseline", "stretch"];
var n9 = ["start", "center", "end", "between"];
var l5 = ["nowrap", "wrap", "wrap-reverse"];
var u2 = { as: { type: "enum", values: t7, default: "div" }, ...o, display: { type: "enum", className: "rt-r-display", values: p11, responsive: true }, direction: { type: "enum", className: "rt-r-fd", values: a9, responsive: true }, align: { type: "enum", className: "rt-r-ai", values: o12, responsive: true }, justify: { type: "enum", className: "rt-r-jc", values: n9, parseValue: f2, responsive: true }, wrap: { type: "enum", className: "rt-r-fw", values: l5, responsive: true }, ...p10 };
function f2(e45) {
  return e45 === "between" ? "space-between" : e45;
}

// node_modules/@radix-ui/themes/dist/esm/components/flex.js
var p12 = o13.forwardRef((r46, e45) => {
  const { className: s26, asChild: t35, as: m16 = "div", ...l13 } = v(r46, u2, u, r5);
  return o13.createElement(t35 ? e16 : m16, { ...l13, ref: e45, className: (0, import_classnames10.default)("rt-Flex", s26) });
});
p12.displayName = "Flex";

// node_modules/@radix-ui/themes/dist/esm/components/spinner.js
var n10 = __toESM(require_react(), 1);
var import_classnames11 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/spinner.props.js
var e20 = ["1", "2", "3"];
var s8 = { size: { type: "enum", className: "rt-r-size", values: e20, default: "2", responsive: true }, loading: { type: "boolean", default: true } };

// node_modules/@radix-ui/themes/dist/esm/components/spinner.js
var s9 = n10.forwardRef((i24, o59) => {
  const { className: a39, children: e45, loading: t35, ...m16 } = v(i24, s8, r5);
  if (!t35) return e45;
  const r46 = n10.createElement("span", { ...m16, ref: o59, className: (0, import_classnames11.default)("rt-Spinner", a39) }, n10.createElement("span", { className: "rt-SpinnerLeaf" }), n10.createElement("span", { className: "rt-SpinnerLeaf" }), n10.createElement("span", { className: "rt-SpinnerLeaf" }), n10.createElement("span", { className: "rt-SpinnerLeaf" }), n10.createElement("span", { className: "rt-SpinnerLeaf" }), n10.createElement("span", { className: "rt-SpinnerLeaf" }), n10.createElement("span", { className: "rt-SpinnerLeaf" }), n10.createElement("span", { className: "rt-SpinnerLeaf" }));
  return e45 === void 0 ? r46 : n10.createElement(p12, { asChild: true, position: "relative", align: "center", justify: "center" }, n10.createElement("span", null, n10.createElement("span", { "aria-hidden": true, style: { display: "contents", visibility: "hidden" }, inert: void 0 }, e45), n10.createElement(p12, { asChild: true, align: "center", justify: "center", position: "absolute", inset: "0" }, n10.createElement("span", null, r46))));
});
s9.displayName = "Spinner";

// node_modules/@radix-ui/themes/dist/esm/components/visually-hidden.js
var d4 = dist_exports2.Root;
var e21 = dist_exports2.Root;

// node_modules/@radix-ui/themes/dist/esm/helpers/map-prop-values.js
function s10(e45, t35) {
  if (e45 !== void 0) return typeof e45 == "string" ? t35(e45) : Object.fromEntries(Object.entries(e45).map(([n26, o59]) => [n26, t35(o59)]));
}
function p13(e45) {
  return e45 === "3" ? "3" : "2";
}
function r11(e45) {
  switch (e45) {
    case "1":
      return "1";
    case "2":
    case "3":
      return "2";
    case "4":
      return "3";
  }
}

// node_modules/@radix-ui/themes/dist/esm/components/_internal/base-button.js
var n11 = o14.forwardRef((t35, p37) => {
  const { size: i24 = i5.size.default } = t35, { className: a39, children: e45, asChild: m16, color: d10, radius: l13, disabled: s26 = t35.loading, ...u10 } = v(t35, i5, r5), f21 = m16 ? dist_exports.Root : "button";
  return o14.createElement(f21, { "data-disabled": s26 || void 0, "data-accent-color": d10, "data-radius": l13, ...u10, ref: p37, className: (0, import_classnames12.default)("rt-reset", "rt-BaseButton", a39), disabled: s26 }, t35.loading ? o14.createElement(o14.Fragment, null, o14.createElement("span", { style: { display: "contents", visibility: "hidden" }, "aria-hidden": true }, e45), o14.createElement(d4, null, e45), o14.createElement(p12, { asChild: true, align: "center", justify: "center", position: "absolute", inset: "0" }, o14.createElement("span", null, o14.createElement(s9, { size: s10(i24, r11) })))) : e45);
});
n11.displayName = "BaseButton";

// node_modules/@radix-ui/themes/dist/esm/components/button.js
var o15 = t8.forwardRef(({ className: e45, ...n26 }, r46) => t8.createElement(n11, { ...n26, ref: r46, className: (0, import_classnames13.default)("rt-Button", e45) }));
o15.displayName = "Button";

// node_modules/@radix-ui/themes/dist/esm/components/callout.js
var callout_exports = {};
__export(callout_exports, {
  Icon: () => m5,
  Root: () => n12,
  Text: () => u3
});
var o16 = __toESM(require_react(), 1);
var import_classnames14 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/callout.props.js
var t9 = ["1", "2", "3"];
var r12 = ["soft", "surface", "outline"];
var a11 = { ...o, size: { type: "enum", className: "rt-r-size", values: t9, default: "2", responsive: true }, variant: { type: "enum", className: "rt-variant", values: r12, default: "soft" }, ...s3, ...o3 };

// node_modules/@radix-ui/themes/dist/esm/components/callout.js
var a12 = o16.createContext({});
var n12 = o16.forwardRef((t35, l13) => {
  const { size: e45 = a11.size.default } = t35, { asChild: r46, children: C7, className: i24, color: c5, ...f21 } = v(t35, a11, r5), P9 = r46 ? dist_exports.Root : "div";
  return o16.createElement(P9, { "data-accent-color": c5, ...f21, className: (0, import_classnames14.default)("rt-CalloutRoot", i24), ref: l13 }, o16.createElement(a12.Provider, { value: o16.useMemo(() => ({ size: e45 }), [e45]) }, C7));
});
n12.displayName = "Callout.Root";
var m5 = o16.forwardRef(({ className: t35, ...l13 }, e45) => o16.createElement("div", { ...l13, className: (0, import_classnames14.default)("rt-CalloutIcon", t35), ref: e45 }));
m5.displayName = "Callout.Icon";
var u3 = o16.forwardRef(({ className: t35, ...l13 }, e45) => {
  const { size: r46 } = o16.useContext(a12);
  return o16.createElement(p, { as: "p", size: s10(r46, p13), ...l13, asChild: false, ref: e45, className: (0, import_classnames14.default)("rt-CalloutText", t35) });
});
u3.displayName = "Callout.Text";

// node_modules/@radix-ui/themes/dist/esm/components/card.js
var r14 = __toESM(require_react(), 1);
var import_classnames15 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/card.props.js
var e22 = ["1", "2", "3", "4", "5"];
var r13 = ["surface", "classic", "ghost"];
var a13 = { ...o, size: { type: "enum", className: "rt-r-size", values: e22, default: "1", responsive: true }, variant: { type: "enum", className: "rt-variant", values: r13, default: "surface" } };

// node_modules/@radix-ui/themes/dist/esm/components/card.js
var o17 = r14.forwardRef((p37, e45) => {
  const { asChild: t35, className: s26, ...a39 } = v(p37, a13, r5), m16 = t35 ? dist_exports.Root : "div";
  return r14.createElement(m16, { ref: e45, ...a39, className: (0, import_classnames15.default)("rt-reset", "rt-BaseCard", "rt-Card", s26) });
});
o17.displayName = "Card";

// node_modules/@radix-ui/themes/dist/esm/components/checkbox-cards.js
var checkbox_cards_exports = {};
__export(checkbox_cards_exports, {
  Item: () => k,
  Root: () => b
});
var o21 = __toESM(require_react(), 1);
var import_classnames17 = __toESM(require_classnames(), 1);

// node_modules/radix-ui/dist/internal.mjs
var Primitive2 = Primitive;
Primitive2.dispatchDiscreteCustomEvent = dispatchDiscreteCustomEvent;
Primitive2.Root = Primitive;

// node_modules/@radix-ui/themes/dist/esm/components/checkbox-group.primitive.js
var e23 = __toESM(require_react(), 1);
var { useDirection: A3 } = dist_exports5;
var P2 = "CheckboxGroup";
var [M, O] = dist_exports4.createContextScope(P2, [dist_exports12.createRovingFocusGroupScope, dist_exports11.createCheckboxScope]);
var I2 = dist_exports12.createRovingFocusGroupScope();
var g3 = dist_exports11.createCheckboxScope();
var [w, T2] = M(P2);
var v2 = e23.forwardRef((r46, n26) => {
  const { __scopeCheckboxGroup: o59, name: i24, defaultValue: c5, value: t35, required: p37 = false, disabled: s26 = false, orientation: h4, dir: l13, loop: b6 = true, onValueChange: u10, ...k3 } = r46, S5 = I2(o59), R6 = A3(l13), [E5 = [], a39] = useControllableState({ prop: t35, defaultProp: c5, onChange: u10 }), F = e23.useCallback((x4) => a39((m16 = []) => [...m16, x4]), [a39]), _ = e23.useCallback((x4) => a39((m16 = []) => m16.filter((V) => V !== x4)), [a39]);
  return e23.createElement(w, { scope: o59, name: i24, required: p37, disabled: s26, value: E5, onItemCheck: F, onItemUncheck: _ }, e23.createElement(dist_exports12.Root, { asChild: true, ...S5, orientation: h4, dir: R6, loop: b6 }, e23.createElement(Primitive2.div, { role: "group", "data-disabled": s26 ? "" : void 0, dir: R6, ...k3, ref: n26 })));
});
v2.displayName = P2;
var y = "CheckboxGroupItem";
var f4 = e23.forwardRef((r46, n26) => {
  const { __scopeCheckboxGroup: o59, disabled: i24, ...c5 } = r46, t35 = T2(y, o59), p37 = t35.disabled || i24, s26 = I2(o59), h4 = g3(o59), l13 = e23.useRef(null), b6 = useComposedRefs(n26, l13), u10 = t35.value?.includes(c5.value);
  return e23.createElement(dist_exports12.Item, { asChild: true, ...s26, focusable: !p37, active: u10 }, e23.createElement(dist_exports11.Root, { name: t35.name, disabled: p37, required: t35.required, checked: u10, ...h4, ...c5, ref: b6, onCheckedChange: (k3) => {
    k3 ? t35.onItemCheck(r46.value) : t35.onItemUncheck(r46.value);
  } }));
});
f4.displayName = y;
var B2 = "CheckboxGroupIndicator";
var G = e23.forwardRef((r46, n26) => {
  const { __scopeCheckboxGroup: o59, ...i24 } = r46, c5 = g3(o59);
  return e23.createElement(dist_exports11.Indicator, { ...c5, ...i24, ref: n26 });
});
G.displayName = B2;
var H2 = v2;
var K = f4;
var X = G;

// node_modules/@radix-ui/themes/dist/esm/components/grid.props.js
var a14 = ["div", "span"];
var n13 = ["none", "inline-grid", "grid"];
var p14 = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
var u4 = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
var i6 = ["row", "column", "dense", "row-dense", "column-dense"];
var l6 = ["start", "center", "end", "baseline", "stretch"];
var f5 = ["start", "center", "end", "between"];
var s13 = { as: { type: "enum", values: a14, default: "div" }, ...o, display: { type: "enum", className: "rt-r-display", values: n13, responsive: true }, areas: { type: "string", className: "rt-r-gta", customProperties: ["--grid-template-areas"], responsive: true }, columns: { type: "enum | string", className: "rt-r-gtc", customProperties: ["--grid-template-columns"], values: p14, parseValue: r15, responsive: true }, rows: { type: "enum | string", className: "rt-r-gtr", customProperties: ["--grid-template-rows"], values: u4, parseValue: r15, responsive: true }, flow: { type: "enum", className: "rt-r-gaf", values: i6, responsive: true }, align: { type: "enum", className: "rt-r-ai", values: l6, responsive: true }, justify: { type: "enum", className: "rt-r-jc", values: f5, parseValue: m6, responsive: true }, ...p10 };
function r15(e45) {
  return s13.columns.values.includes(e45) ? e45 : e45?.match(/^\d+$/) ? `repeat(${e45}, minmax(0, 1fr))` : e45;
}
function m6(e45) {
  return e45 === "between" ? "space-between" : e45;
}

// node_modules/@radix-ui/themes/dist/esm/components/checkbox-cards.props.js
var a15 = ["1", "2", "3"];
var t10 = ["surface", "classic"];
var p15 = { ...o, size: { type: "enum", className: "rt-r-size", values: a15, default: "2", responsive: true }, variant: { type: "enum", className: "rt-variant", values: t10, default: "surface" }, ...r2, ...o3, columns: { ...s13.columns, default: "repeat(auto-fit, minmax(200px, 1fr))" }, gap: { ...s13.gap, default: "4" } };

// node_modules/@radix-ui/themes/dist/esm/components/_internal/base-checkbox.props.js
var r16 = ["1", "2", "3"];
var o18 = ["classic", "surface", "soft"];
var t11 = { size: { type: "enum", className: "rt-r-size", values: r16, default: "2", responsive: true }, variant: { type: "enum", className: "rt-variant", values: o18, default: "surface" }, ...r2, ...o3 };

// node_modules/@radix-ui/themes/dist/esm/components/grid.js
var r17 = __toESM(require_react(), 1);
var import_classnames16 = __toESM(require_classnames(), 1);
var o19 = r17.forwardRef((p37, s26) => {
  const { className: t35, asChild: e45, as: i24 = "div", ...m16 } = v(p37, s13, u, r5);
  return r17.createElement(e45 ? e16 : i24, { ...m16, ref: s26, className: (0, import_classnames16.default)("rt-Grid", t35) });
});
o19.displayName = "Grid";

// node_modules/@radix-ui/themes/dist/esm/components/icons.js
var import_react = __toESM(require_react(), 1);
var r18 = import_react.default.forwardRef((e45, n26) => import_react.default.createElement("svg", { width: "9", height: "9", viewBox: "0 0 9 9", fill: "currentcolor", xmlns: "http://www.w3.org/2000/svg", ...e45, ref: n26 }, import_react.default.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M0.75 4.5C0.75 4.08579 1.08579 3.75 1.5 3.75H7.5C7.91421 3.75 8.25 4.08579 8.25 4.5C8.25 4.91421 7.91421 5.25 7.5 5.25H1.5C1.08579 5.25 0.75 4.91421 0.75 4.5Z" })));
r18.displayName = "ThickDividerHorizontalIcon";
var t12 = import_react.default.forwardRef((e45, n26) => import_react.default.createElement("svg", { width: "9", height: "9", viewBox: "0 0 9 9", fill: "currentcolor", xmlns: "http://www.w3.org/2000/svg", ...e45, ref: n26 }, import_react.default.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M8.53547 0.62293C8.88226 0.849446 8.97976 1.3142 8.75325 1.66099L4.5083 8.1599C4.38833 8.34356 4.19397 8.4655 3.9764 8.49358C3.75883 8.52167 3.53987 8.45309 3.3772 8.30591L0.616113 5.80777C0.308959 5.52987 0.285246 5.05559 0.563148 4.74844C0.84105 4.44128 1.31533 4.41757 1.62249 4.69547L3.73256 6.60459L7.49741 0.840706C7.72393 0.493916 8.18868 0.396414 8.53547 0.62293Z" })));
t12.displayName = "ThickCheckIcon";
var i7 = import_react.default.forwardRef((e45, n26) => import_react.default.createElement("svg", { width: "9", height: "9", viewBox: "0 0 9 9", fill: "currentcolor", xmlns: "http://www.w3.org/2000/svg", ...e45, ref: n26 }, import_react.default.createElement("path", { d: "M0.135232 3.15803C0.324102 2.95657 0.640521 2.94637 0.841971 3.13523L4.5 6.56464L8.158 3.13523C8.3595 2.94637 8.6759 2.95657 8.8648 3.15803C9.0536 3.35949 9.0434 3.67591 8.842 3.86477L4.84197 7.6148C4.64964 7.7951 4.35036 7.7951 4.15803 7.6148L0.158031 3.86477C-0.0434285 3.67591 -0.0536285 3.35949 0.135232 3.15803Z" })));
i7.displayName = "ChevronDownIcon";
var l7 = import_react.default.forwardRef((e45, n26) => import_react.default.createElement("svg", { width: "9", height: "9", viewBox: "0 0 9 9", fill: "currentcolor", xmlns: "http://www.w3.org/2000/svg", ...e45, ref: n26 }, import_react.default.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M3.23826 0.201711C3.54108 -0.0809141 4.01567 -0.0645489 4.29829 0.238264L7.79829 3.98826C8.06724 4.27642 8.06724 4.72359 7.79829 5.01174L4.29829 8.76174C4.01567 9.06455 3.54108 9.08092 3.23826 8.79829C2.93545 8.51567 2.91909 8.04108 3.20171 7.73826L6.22409 4.5L3.20171 1.26174C2.91909 0.958928 2.93545 0.484337 3.23826 0.201711Z" })));
l7.displayName = "ThickChevronRightIcon";

// node_modules/@radix-ui/themes/dist/esm/components/checkbox-cards.js
var x2 = "CheckboxCards";
var [G2] = dist_exports4.createContextScope(x2, [O]);
var d6 = O();
var [v3, N2] = G2(x2);
var b = o21.forwardRef((e45, s26) => {
  const { __scopeCheckboxCards: r46, className: c5, color: p37, ...C7 } = v(e45, p15, r5), t35 = d6(r46);
  return o21.createElement(v3, { scope: r46, size: e45.size, highContrast: e45.highContrast }, o21.createElement(o19, { asChild: true }, o21.createElement(H2, { ...t35, "data-accent-color": p37, ...C7, ref: s26, className: (0, import_classnames17.default)("rt-CheckboxCardsRoot", c5) })));
});
b.displayName = "CheckboxCards.Root";
var k = o21.forwardRef(({ __scopeCheckboxCards: e45, children: s26, className: r46, style: c5, ...p37 }, C7) => {
  const t35 = N2("CheckboxCardsItem", e45), i24 = d6(e45), { className: P9 } = v({ size: t35?.size, variant: "surface", highContrast: t35?.highContrast }, t11);
  return o21.createElement("label", { className: (0, import_classnames17.default)("rt-BaseCard", "rt-CheckboxCardsItem", r46), style: c5 }, s26, o21.createElement(K, { ...i24, ...p37, ref: C7, className: (0, import_classnames17.default)("rt-reset", "rt-BaseCheckboxRoot", "rt-CheckboxCardCheckbox", P9) }, o21.createElement(X, { ...i24, asChild: true, className: "rt-BaseCheckboxIndicator" }, o21.createElement(t12, null))));
});
k.displayName = "CheckboxCards.Item";

// node_modules/@radix-ui/themes/dist/esm/components/checkbox-group.js
var checkbox_group_exports = {};
__export(checkbox_group_exports, {
  Item: () => l8,
  Root: () => f6
});
var o22 = __toESM(require_react(), 1);
var import_classnames18 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/checkbox-group.props.js
var e24 = { ...o, ...t11 };

// node_modules/@radix-ui/themes/dist/esm/components/checkbox-group.js
var b2 = "CheckboxGroup";
var [N3] = dist_exports4.createContextScope(b2, [O]);
var G3 = O();
var [E2, P3] = N3(b2);
var f6 = o22.forwardRef(({ color: s26 = e24.color.default, highContrast: e45 = e24.highContrast.default, size: r46 = e24.size.default, variant: t35 = e24.variant.default, ...p37 }, m16) => {
  const { __scopeCheckboxGroup: c5, className: h4, ...I6 } = v(p37, r5), d10 = G3(c5);
  return o22.createElement(E2, { scope: c5, color: s26, size: r46, highContrast: e45, variant: t35 }, o22.createElement(H2, { ...d10, ...I6, ref: m16, className: (0, import_classnames18.default)("rt-CheckboxGroupRoot", h4) }));
});
f6.displayName = "CheckboxGroup.Root";
var l8 = o22.forwardRef((s26, e45) => {
  const { __scopeCheckboxGroup: r46, children: t35, className: p37, style: m16, ...c5 } = s26, { size: h4 } = P3("CheckboxGroupItem", r46);
  return t35 ? o22.createElement(p, { as: "label", size: h4, className: (0, import_classnames18.default)("rt-CheckboxGroupItem", p37), style: m16 }, o22.createElement(i8, { __scopeCheckboxGroup: r46, ...c5, ref: e45 }), t35 && o22.createElement("span", { className: "rt-CheckboxGroupItemInner" }, t35)) : o22.createElement(i8, { __scopeCheckboxGroup: r46, ...c5, ref: e45, className: p37, style: m16 });
});
l8.displayName = "CheckboxGroup.Item";
var i8 = o22.forwardRef(({ __scopeCheckboxGroup: s26, ...e45 }, r46) => {
  const t35 = P3("CheckboxGroupItemCheckbox", s26), p37 = G3(s26), { color: m16, className: c5 } = v({ ...e45, ...t35 }, e24, r5);
  return o22.createElement(K, { ...p37, "data-accent-color": m16, ...e45, ref: r46, className: (0, import_classnames18.default)("rt-reset", "rt-BaseCheckboxRoot", "rt-CheckboxGroupItemCheckbox", c5) }, o22.createElement(X, { ...p37, asChild: true, className: "rt-BaseCheckboxIndicator" }, o22.createElement(t12, null)));
});
i8.displayName = "CheckboxGroup.ItemCheckbox";

// node_modules/@radix-ui/themes/dist/esm/components/checkbox.js
var e25 = __toESM(require_react(), 1);
var import_classnames19 = __toESM(require_classnames(), 1);
var c = e25.forwardRef((p37, i24) => {
  const { className: s26, color: h4, checked: a39, defaultChecked: o59, onCheckedChange: m16, ...n26 } = v(p37, t11, r5), [r46, k3] = useControllableState({ prop: a39, defaultProp: o59, onChange: m16 });
  return e25.createElement(dist_exports11.Root, { "data-accent-color": h4, ...n26, defaultChecked: o59, checked: r46, onCheckedChange: k3, asChild: false, ref: i24, className: (0, import_classnames19.default)("rt-reset", "rt-BaseCheckboxRoot", "rt-CheckboxRoot", s26) }, e25.createElement(dist_exports11.Indicator, { asChild: true, className: "rt-BaseCheckboxIndicator rt-CheckboxIndicator" }, e25.createElement(r46 === "indeterminate" ? r18 : t12, null)));
});
c.displayName = "Checkbox";

// node_modules/@radix-ui/themes/dist/esm/components/code.js
var r19 = __toESM(require_react(), 1);
var import_classnames20 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/code.props.js
var a18 = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
var i9 = ["solid", "soft", "outline", "ghost"];
var f7 = { ...o, size: { type: "enum", className: "rt-r-size", values: a18, responsive: true }, variant: { type: "enum", className: "rt-variant", values: i9, default: "soft" }, ...t3, ...s3, ...o3, ...e6, ...r4 };

// node_modules/@radix-ui/themes/dist/esm/components/code.js
var p16 = r19.forwardRef((o59, t35) => {
  const { asChild: s26, className: m16, color: e45, ...d10 } = v(o59, f7, r5), n26 = o59.variant === "ghost" ? e45 || void 0 : e45, a39 = s26 ? dist_exports.Root : "code";
  return r19.createElement(a39, { "data-accent-color": n26, ...d10, ref: t35, className: (0, import_classnames20.default)("rt-reset", "rt-Code", m16) });
});
p16.displayName = "Code";

// node_modules/@radix-ui/themes/dist/esm/components/container.js
var o23 = __toESM(require_react(), 1);
var import_classnames21 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/container.props.js
var r20 = ["1", "2", "3", "4"];
var t13 = ["none", "initial"];
var p17 = ["left", "center", "right"];
var n14 = { ...o, size: { type: "enum", className: "rt-r-size", values: r20, default: "4", responsive: true }, display: { type: "enum", className: "rt-r-display", values: t13, parseValue: a19, responsive: true }, align: { type: "enum", className: "rt-r-ai", values: p17, parseValue: i10, responsive: true } };
function a19(e45) {
  return e45 === "initial" ? "flex" : e45;
}
function i10(e45) {
  return e45 === "left" ? "start" : e45 === "right" ? "end" : e45;
}

// node_modules/@radix-ui/themes/dist/esm/components/container.js
var p18 = o23.forwardRef(({ width: n26, minWidth: s26, maxWidth: i24, height: m16, minHeight: a39, maxHeight: f21, ...P9 }, l13) => {
  const { asChild: r46, children: C7, className: c5, ...y7 } = v(P9, n14, u, r5), { className: d10, style: h4 } = v({ width: n26, minWidth: s26, maxWidth: i24, height: m16, minHeight: a39, maxHeight: f21 }, t, e), u10 = r46 ? dist_exports.Root : "div";
  return o23.createElement(u10, { ...y7, ref: l13, className: (0, import_classnames21.default)("rt-Container", c5) }, d3({ asChild: r46, children: C7 }, (v11) => o23.createElement("div", { className: (0, import_classnames21.default)("rt-ContainerInner", d10), style: h4 }, v11)));
});
p18.displayName = "Container";

// node_modules/@radix-ui/themes/dist/esm/components/context-menu.js
var context_menu_exports = {};
__export(context_menu_exports, {
  CheckboxItem: () => G4,
  Content: () => v4,
  Group: () => N4,
  Item: () => R3,
  Label: () => y2,
  RadioGroup: () => T3,
  RadioItem: () => E3,
  Root: () => h,
  Separator: () => W,
  Sub: () => w2,
  SubContent: () => k2,
  SubTrigger: () => B3,
  Trigger: () => S2
});
var e26 = __toESM(require_react(), 1);
var import_classnames24 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/scroll-area.js
var r23 = __toESM(require_react(), 1);
var import_classnames23 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/scroll-area.props.js
var r21 = ["1", "2", "3"];
var o24 = ["vertical", "horizontal", "both"];
var t15 = { ...o, size: { type: "enum", className: "rt-r-size", values: r21, default: "1", responsive: true }, ...r7, scrollbars: { type: "enum", values: o24, default: "both" } };

// node_modules/@radix-ui/themes/dist/esm/helpers/extract-margin-props.js
function a20(r46) {
  const { m: t35, mx: m16, my: o59, mt: p37, mr: n26, mb: s26, ml: e45, ...i24 } = r46;
  return { m: t35, mx: m16, my: o59, mt: p37, mr: n26, mb: s26, ml: e45, rest: i24 };
}

// node_modules/@radix-ui/themes/dist/esm/helpers/get-margin-styles.js
var import_classnames22 = __toESM(require_classnames(), 1);
var r22 = r5.m.values;
function S(s26) {
  const [e45, t35] = R({ className: "rt-r-m", customProperties: ["--margin"], propValues: r22, value: s26.m }), [a39, o59] = R({ className: "rt-r-mx", customProperties: ["--margin-left", "--margin-right"], propValues: r22, value: s26.mx }), [l13, i24] = R({ className: "rt-r-my", customProperties: ["--margin-top", "--margin-bottom"], propValues: r22, value: s26.my }), [p37, u10] = R({ className: "rt-r-mt", customProperties: ["--margin-top"], propValues: r22, value: s26.mt }), [n26, c5] = R({ className: "rt-r-mr", customProperties: ["--margin-right"], propValues: r22, value: s26.mr }), [g8, P9] = R({ className: "rt-r-mb", customProperties: ["--margin-bottom"], propValues: r22, value: s26.mb }), [N8, C7] = R({ className: "rt-r-ml", customProperties: ["--margin-left"], propValues: r22, value: s26.ml });
  return [(0, import_classnames22.default)(e45, a39, l13, p37, n26, g8, N8), l2(t35, o59, i24, u10, c5, P9, C7)];
}

// node_modules/@radix-ui/themes/dist/esm/components/scroll-area.js
var c2 = r23.forwardRef((n26, S5) => {
  const { rest: f21, ...P9 } = a20(n26), [u10, A4] = S(P9), { asChild: a39, children: d10, className: y7, style: v11, type: t35, scrollHideDelay: N8 = t35 !== "scroll" ? 0 : void 0, dir: V, size: i24 = t15.size.default, radius: p37 = t15.radius.default, scrollbars: l13 = t15.scrollbars.default, ...b6 } = f21;
  return r23.createElement(dist_exports20.Root, { type: t35, scrollHideDelay: N8, className: (0, import_classnames23.default)("rt-ScrollAreaRoot", u10, y7), style: l2(A4, v11), asChild: a39 }, d3({ asChild: a39, children: d10 }, (g8) => r23.createElement(r23.Fragment, null, r23.createElement(dist_exports20.Viewport, { ...b6, ref: S5, className: "rt-ScrollAreaViewport" }, g8), r23.createElement("div", { className: "rt-ScrollAreaViewportFocusRing" }), l13 !== "vertical" ? r23.createElement(dist_exports20.Scrollbar, { "data-radius": p37, orientation: "horizontal", className: (0, import_classnames23.default)("rt-ScrollAreaScrollbar", g({ className: "rt-r-size", value: i24, propValues: t15.size.values })) }, r23.createElement(dist_exports20.Thumb, { className: "rt-ScrollAreaThumb" })) : null, l13 !== "horizontal" ? r23.createElement(dist_exports20.Scrollbar, { "data-radius": p37, orientation: "vertical", className: (0, import_classnames23.default)("rt-ScrollAreaScrollbar", g({ className: "rt-r-size", value: i24, propValues: t15.size.values })) }, r23.createElement(dist_exports20.Thumb, { className: "rt-ScrollAreaThumb" })) : null, l13 === "both" ? r23.createElement(dist_exports20.Corner, { className: "rt-ScrollAreaCorner" }) : null)));
});
c2.displayName = "ScrollArea";

// node_modules/@radix-ui/themes/dist/esm/components/_internal/base-menu.props.js
var o25 = ["1", "2"];
var r24 = ["solid", "soft"];
var n15 = { size: { type: "enum", className: "rt-r-size", values: o25, default: "2", responsive: true }, variant: { type: "enum", className: "rt-variant", values: r24, default: "solid" }, ...r2, ...o3 };
var a21 = { ...o, ...r2, shortcut: { type: "string" } };
var i11 = { ...r2, shortcut: { type: "string" } };
var p19 = { ...r2 };

// node_modules/@radix-ui/themes/dist/esm/components/context-menu.js
var h = (t35) => e26.createElement(dist_exports13.Root, { ...t35 });
h.displayName = "ContextMenu.Root";
var S2 = e26.forwardRef(({ children: t35, ...n26 }, o59) => e26.createElement(dist_exports13.Trigger, { ...n26, ref: o59, asChild: true }, a4(t35)));
S2.displayName = "ContextMenu.Trigger";
var g4 = e26.createContext({});
var v4 = e26.forwardRef((t35, n26) => {
  const o59 = H(), { size: a39 = n15.size.default, variant: u10 = n15.variant.default, highContrast: i24 = n15.highContrast.default } = t35, { className: C7, children: m16, color: x4, container: M2, forceMount: l13, ...L2 } = v(t35, n15), c5 = x4 || o59.accentColor;
  return e26.createElement(dist_exports13.Portal, { container: M2, forceMount: l13 }, e26.createElement(R2, { asChild: true }, e26.createElement(dist_exports13.Content, { "data-accent-color": c5, alignOffset: -Number(a39) * 4, collisionPadding: 10, ...L2, asChild: false, ref: n26, className: (0, import_classnames24.default)("rt-PopperContent", "rt-BaseMenuContent", "rt-ContextMenuContent", C7) }, e26.createElement(c2, { type: "auto" }, e26.createElement("div", { className: (0, import_classnames24.default)("rt-BaseMenuViewport", "rt-ContextMenuViewport") }, e26.createElement(g4.Provider, { value: e26.useMemo(() => ({ size: a39, variant: u10, color: c5, highContrast: i24 }), [a39, u10, c5, i24]) }, m16))))));
});
v4.displayName = "ContextMenu.Content";
var y2 = e26.forwardRef(({ className: t35, ...n26 }, o59) => e26.createElement(dist_exports13.Label, { ...n26, asChild: false, ref: o59, className: (0, import_classnames24.default)("rt-BaseMenuLabel", "rt-ContextMenuLabel", t35) }));
y2.displayName = "ContextMenu.Label";
var R3 = e26.forwardRef((t35, n26) => {
  const { className: o59, children: a39, color: u10 = a21.color.default, shortcut: i24, ...C7 } = t35;
  return e26.createElement(dist_exports13.Item, { "data-accent-color": u10, ...C7, ref: n26, className: (0, import_classnames24.default)("rt-reset", "rt-BaseMenuItem", "rt-ContextMenuItem", o59) }, e26.createElement(dist_exports.Slottable, null, a39), i24 && e26.createElement("div", { className: "rt-BaseMenuShortcut rt-ContextMenuShortcut" }, i24));
});
R3.displayName = "ContextMenu.Item";
var N4 = e26.forwardRef(({ className: t35, ...n26 }, o59) => e26.createElement(dist_exports13.Group, { ...n26, asChild: false, ref: o59, className: (0, import_classnames24.default)("rt-BaseMenuGroup", "rt-ContextMenuGroup", t35) }));
N4.displayName = "ContextMenu.Group";
var T3 = e26.forwardRef(({ className: t35, ...n26 }, o59) => e26.createElement(dist_exports13.RadioGroup, { ...n26, asChild: false, ref: o59, className: (0, import_classnames24.default)("rt-BaseMenuRadioGroup", "rt-ContextMenuRadioGroup", t35) }));
T3.displayName = "ContextMenu.RadioGroup";
var E3 = e26.forwardRef((t35, n26) => {
  const { children: o59, className: a39, color: u10 = p19.color.default, ...i24 } = t35;
  return e26.createElement(dist_exports13.RadioItem, { ...i24, asChild: false, ref: n26, "data-accent-color": u10, className: (0, import_classnames24.default)("rt-BaseMenuItem", "rt-BaseMenuRadioItem", "rt-ContextMenuItem", "rt-ContextMenuRadioItem", a39) }, e26.createElement(dist_exports.Slottable, null, o59), e26.createElement(dist_exports13.ItemIndicator, { className: "rt-BaseMenuItemIndicator rt-ContextMenuItemIndicator" }, e26.createElement(t12, { className: "rt-BaseMenuItemIndicatorIcon rt-ContextMenuItemIndicatorIcon" })));
});
E3.displayName = "ContextMenu.RadioItem";
var G4 = e26.forwardRef((t35, n26) => {
  const { children: o59, className: a39, shortcut: u10, color: i24 = i11.color.default, ...C7 } = t35;
  return e26.createElement(dist_exports13.CheckboxItem, { ...C7, asChild: false, ref: n26, "data-accent-color": i24, className: (0, import_classnames24.default)("rt-BaseMenuItem", "rt-BaseMenuCheckboxItem", "rt-ContextMenuItem", "rt-ContextMenuCheckboxItem", a39) }, e26.createElement(dist_exports.Slottable, null, o59), e26.createElement(dist_exports13.ItemIndicator, { className: "rt-BaseMenuItemIndicator rt-ContextMenuItemIndicator" }, e26.createElement(t12, { className: "rt-BaseMenuItemIndicatorIcon rt-ContextMenuItemIndicatorIcon" })), u10 && e26.createElement("div", { className: "rt-BaseMenuShortcut rt-ContextMenuShortcut" }, u10));
});
G4.displayName = "ContextMenu.CheckboxItem";
var w2 = (t35) => e26.createElement(dist_exports13.Sub, { ...t35 });
w2.displayName = "ContextMenu.Sub";
var B3 = e26.forwardRef((t35, n26) => {
  const { className: o59, children: a39, ...u10 } = t35;
  return e26.createElement(dist_exports13.SubTrigger, { ...u10, asChild: false, ref: n26, className: (0, import_classnames24.default)("rt-BaseMenuItem", "rt-BaseMenuSubTrigger", "rt-ContextMenuItem", "rt-ContextMenuSubTrigger", o59) }, a39, e26.createElement("div", { className: "rt-BaseMenuShortcut rt-ContextMenuShortcut" }, e26.createElement(l7, { className: "rt-BaseMenuSubTriggerIcon rt-ContextMenuSubTriggerIcon" })));
});
B3.displayName = "ContextMenu.SubTrigger";
var k2 = e26.forwardRef((t35, n26) => {
  const { size: o59, variant: a39, color: u10, highContrast: i24 } = e26.useContext(g4), { className: C7, children: m16, container: x4, forceMount: M2, ...l13 } = v({ size: o59, variant: a39, color: u10, highContrast: i24, ...t35 }, n15);
  return e26.createElement(dist_exports13.Portal, { container: x4, forceMount: M2 }, e26.createElement(R2, { asChild: true }, e26.createElement(dist_exports13.SubContent, { "data-accent-color": u10, alignOffset: -Number(o59) * 4, sideOffset: 1, collisionPadding: 10, ...l13, asChild: false, ref: n26, className: (0, import_classnames24.default)("rt-PopperContent", "rt-BaseMenuContent", "rt-BaseMenuSubContent", "rt-ContextMenuContent", "rt-ContextMenuSubContent", C7) }, e26.createElement(c2, { type: "auto" }, e26.createElement("div", { className: (0, import_classnames24.default)("rt-BaseMenuViewport", "rt-ContextMenuViewport") }, m16)))));
});
k2.displayName = "ContextMenu.SubContent";
var W = e26.forwardRef(({ className: t35, ...n26 }, o59) => e26.createElement(dist_exports13.Separator, { ...n26, asChild: false, ref: o59, className: (0, import_classnames24.default)("rt-BaseMenuSeparator", "rt-ContextMenuSeparator", t35) }));
W.displayName = "ContextMenu.Separator";

// node_modules/@radix-ui/themes/dist/esm/components/data-list.js
var data_list_exports = {};
__export(data_list_exports, {
  Item: () => m8,
  Label: () => L,
  Root: () => i13,
  Value: () => l9
});
var import_classnames25 = __toESM(require_classnames(), 1);
var t16 = __toESM(require_react(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/data-list.props.js
var s16 = ["start", "center", "end", "baseline", "stretch"];
var i12 = ["horizontal", "vertical"];
var a22 = ["1", "2", "3"];
var n16 = { orientation: { type: "enum", className: "rt-r-orientation", values: i12, default: "horizontal", responsive: true }, size: { type: "enum", className: "rt-r-size", values: a22, default: "2", responsive: true }, trim: { ...r3.trim, className: "rt-r-trim" } };
var p20 = { align: { type: "enum", className: "rt-r-ai", values: s16, responsive: true } };
var m7 = { ...t, ...r2, ...o3 };

// node_modules/@radix-ui/themes/dist/esm/components/data-list.js
var i13 = t16.forwardRef((a39, e45) => {
  const { className: s26, ...o59 } = v(a39, n16, r5);
  return t16.createElement(p, { asChild: true }, t16.createElement("dl", { ...o59, ref: e45, className: (0, import_classnames25.default)("rt-DataListRoot", s26) }));
});
i13.displayName = "DataList.Root";
var m8 = t16.forwardRef((a39, e45) => {
  const { className: s26, ...o59 } = v(a39, p20);
  return t16.createElement("div", { ...o59, ref: e45, className: (0, import_classnames25.default)("rt-DataListItem", s26) });
});
m8.displayName = "DataList.Item";
var L = t16.forwardRef((a39, e45) => {
  const { className: s26, color: o59, ...n26 } = v(a39, m7);
  return t16.createElement("dt", { ...n26, "data-accent-color": o59, ref: e45, className: (0, import_classnames25.default)("rt-DataListLabel", s26) });
});
L.displayName = "DataList.Label";
var l9 = t16.forwardRef(({ children: a39, className: e45, ...s26 }, o59) => t16.createElement("dd", { ...s26, ref: o59, className: (0, import_classnames25.default)(e45, "rt-DataListValue") }, a39));
l9.displayName = "DataList.Value";

// node_modules/@radix-ui/themes/dist/esm/components/dialog.js
var dialog_exports = {};
__export(dialog_exports, {
  Close: () => D2,
  Content: () => p21,
  Description: () => m9,
  Root: () => s17,
  Title: () => g5,
  Trigger: () => n17
});
var o26 = __toESM(require_react(), 1);
var import_classnames26 = __toESM(require_classnames(), 1);
var s17 = (e45) => o26.createElement(dist_exports7.Root, { ...e45, modal: true });
s17.displayName = "Dialog.Root";
var n17 = o26.forwardRef(({ children: e45, ...i24 }, r46) => o26.createElement(dist_exports7.Trigger, { ...i24, ref: r46, asChild: true }, a4(e45)));
n17.displayName = "Dialog.Trigger";
var p21 = o26.forwardRef(({ align: e45, ...i24 }, r46) => {
  const { align: P9, ...f21 } = s2, { className: C7 } = v({ align: e45 }, { align: P9 }), { className: d10, forceMount: c5, container: y7, ...T6 } = v(i24, f21);
  return o26.createElement(dist_exports7.Portal, { container: y7, forceMount: c5 }, o26.createElement(R2, { asChild: true }, o26.createElement(dist_exports7.Overlay, { className: "rt-BaseDialogOverlay rt-DialogOverlay" }, o26.createElement("div", { className: "rt-BaseDialogScroll rt-DialogScroll" }, o26.createElement("div", { className: `rt-BaseDialogScrollPadding rt-DialogScrollPadding ${C7}` }, o26.createElement(dist_exports7.Content, { ...T6, ref: r46, className: (0, import_classnames26.default)("rt-BaseDialogContent", "rt-DialogContent", d10) }))))));
});
p21.displayName = "Dialog.Content";
var g5 = o26.forwardRef((e45, i24) => o26.createElement(dist_exports7.Title, { asChild: true }, o26.createElement(r6, { size: "5", mb: "3", trim: "start", ...e45, asChild: false, ref: i24 })));
g5.displayName = "Dialog.Title";
var m9 = o26.forwardRef((e45, i24) => o26.createElement(dist_exports7.Description, { asChild: true }, o26.createElement(p, { as: "p", size: "3", ...e45, asChild: false, ref: i24 })));
m9.displayName = "Dialog.Description";
var D2 = o26.forwardRef(({ children: e45, ...i24 }, r46) => o26.createElement(dist_exports7.Close, { ...i24, ref: r46, asChild: true }, a4(e45)));
D2.displayName = "Dialog.Close";

// node_modules/@radix-ui/themes/dist/esm/components/dropdown-menu.js
var dropdown_menu_exports = {};
__export(dropdown_menu_exports, {
  CheckboxItem: () => T4,
  Content: () => g6,
  Group: () => R4,
  Item: () => v6,
  Label: () => y3,
  RadioGroup: () => S3,
  RadioItem: () => x3,
  Root: () => I3,
  Separator: () => B4,
  Sub: () => N5,
  SubContent: () => G5,
  SubTrigger: () => E4,
  Trigger: () => h2,
  TriggerIcon: () => i7
});
var o27 = __toESM(require_react(), 1);
var import_classnames27 = __toESM(require_classnames(), 1);
var I3 = (e45) => o27.createElement(dist_exports14.Root, { ...e45 });
I3.displayName = "DropdownMenu.Root";
var h2 = o27.forwardRef(({ children: e45, ...n26 }, r46) => o27.createElement(dist_exports14.Trigger, { ...n26, ref: r46, asChild: true }, a4(e45)));
h2.displayName = "DropdownMenu.Trigger";
var b3 = o27.createContext({});
var g6 = o27.forwardRef((e45, n26) => {
  const r46 = H(), { size: s26 = n15.size.default, variant: p37 = n15.variant.default, highContrast: u10 = n15.highContrast.default } = e45, { className: a39, children: m16, color: M2, container: w3, forceMount: D3, ...k3 } = v(e45, n15), l13 = M2 || r46.accentColor;
  return o27.createElement(dist_exports14.Portal, { container: w3, forceMount: D3 }, o27.createElement(R2, { asChild: true }, o27.createElement(dist_exports14.Content, { "data-accent-color": l13, align: "start", sideOffset: 4, collisionPadding: 10, ...k3, asChild: false, ref: n26, className: (0, import_classnames27.default)("rt-PopperContent", "rt-BaseMenuContent", "rt-DropdownMenuContent", a39) }, o27.createElement(c2, { type: "auto" }, o27.createElement("div", { className: (0, import_classnames27.default)("rt-BaseMenuViewport", "rt-DropdownMenuViewport") }, o27.createElement(b3.Provider, { value: o27.useMemo(() => ({ size: s26, variant: p37, color: l13, highContrast: u10 }), [s26, p37, l13, u10]) }, m16))))));
});
g6.displayName = "DropdownMenu.Content";
var y3 = o27.forwardRef(({ className: e45, ...n26 }, r46) => o27.createElement(dist_exports14.Label, { ...n26, asChild: false, ref: r46, className: (0, import_classnames27.default)("rt-BaseMenuLabel", "rt-DropdownMenuLabel", e45) }));
y3.displayName = "DropdownMenu.Label";
var v6 = o27.forwardRef((e45, n26) => {
  const { className: r46, children: s26, color: p37 = a21.color.default, shortcut: u10, ...a39 } = e45;
  return o27.createElement(dist_exports14.Item, { "data-accent-color": p37, ...a39, ref: n26, className: (0, import_classnames27.default)("rt-reset", "rt-BaseMenuItem", "rt-DropdownMenuItem", r46) }, o27.createElement(dist_exports.Slottable, null, s26), u10 && o27.createElement("div", { className: "rt-BaseMenuShortcut rt-DropdownMenuShortcut" }, u10));
});
v6.displayName = "DropdownMenu.Item";
var R4 = o27.forwardRef(({ className: e45, ...n26 }, r46) => o27.createElement(dist_exports14.Group, { ...n26, asChild: false, ref: r46, className: (0, import_classnames27.default)("rt-BaseMenuGroup", "rt-DropdownMenuGroup", e45) }));
R4.displayName = "DropdownMenu.Group";
var S3 = o27.forwardRef(({ className: e45, ...n26 }, r46) => o27.createElement(dist_exports14.RadioGroup, { ...n26, asChild: false, ref: r46, className: (0, import_classnames27.default)("rt-BaseMenuRadioGroup", "rt-DropdownMenuRadioGroup", e45) }));
S3.displayName = "DropdownMenu.RadioGroup";
var x3 = o27.forwardRef((e45, n26) => {
  const { children: r46, className: s26, color: p37 = p19.color.default, ...u10 } = e45;
  return o27.createElement(dist_exports14.RadioItem, { ...u10, asChild: false, ref: n26, "data-accent-color": p37, className: (0, import_classnames27.default)("rt-BaseMenuItem", "rt-BaseMenuRadioItem", "rt-DropdownMenuItem", "rt-DropdownMenuRadioItem", s26) }, r46, o27.createElement(dist_exports14.ItemIndicator, { className: "rt-BaseMenuItemIndicator rt-DropdownMenuItemIndicator" }, o27.createElement(t12, { className: "rt-BaseMenuItemIndicatorIcon rt-DropdownMenuItemIndicatorIcon" })));
});
x3.displayName = "DropdownMenu.RadioItem";
var T4 = o27.forwardRef((e45, n26) => {
  const { children: r46, className: s26, shortcut: p37, color: u10 = i11.color.default, ...a39 } = e45;
  return o27.createElement(dist_exports14.CheckboxItem, { ...a39, asChild: false, ref: n26, "data-accent-color": u10, className: (0, import_classnames27.default)("rt-BaseMenuItem", "rt-BaseMenuCheckboxItem", "rt-DropdownMenuItem", "rt-DropdownMenuCheckboxItem", s26) }, r46, o27.createElement(dist_exports14.ItemIndicator, { className: "rt-BaseMenuItemIndicator rt-DropdownMenuItemIndicator" }, o27.createElement(t12, { className: "rt-BaseMenuItemIndicatorIcon rt-ContextMenuItemIndicatorIcon" })), p37 && o27.createElement("div", { className: "rt-BaseMenuShortcut rt-DropdownMenuShortcut" }, p37));
});
T4.displayName = "DropdownMenu.CheckboxItem";
var N5 = (e45) => o27.createElement(dist_exports14.Sub, { ...e45 });
N5.displayName = "DropdownMenu.Sub";
var E4 = o27.forwardRef((e45, n26) => {
  const { className: r46, children: s26, ...p37 } = e45;
  return o27.createElement(dist_exports14.SubTrigger, { ...p37, asChild: false, ref: n26, className: (0, import_classnames27.default)("rt-BaseMenuItem", "rt-BaseMenuSubTrigger", "rt-DropdownMenuItem", "rt-DropdownMenuSubTrigger", r46) }, s26, o27.createElement("div", { className: "rt-BaseMenuShortcut rt-DropdownMenuShortcut" }, o27.createElement(l7, { className: "rt-BaseMenuSubTriggerIcon rt-DropdownMenuSubtriggerIcon" })));
});
E4.displayName = "DropdownMenu.SubTrigger";
var G5 = o27.forwardRef((e45, n26) => {
  const { size: r46, variant: s26, color: p37, highContrast: u10 } = o27.useContext(b3), { className: a39, children: m16, container: M2, forceMount: w3, ...D3 } = v({ size: r46, variant: s26, color: p37, highContrast: u10, ...e45 }, n15);
  return o27.createElement(dist_exports14.Portal, { container: M2, forceMount: w3 }, o27.createElement(R2, { asChild: true }, o27.createElement(dist_exports14.SubContent, { "data-accent-color": p37, alignOffset: -Number(r46) * 4, sideOffset: 1, collisionPadding: 10, ...D3, asChild: false, ref: n26, className: (0, import_classnames27.default)("rt-PopperContent", "rt-BaseMenuContent", "rt-BaseMenuSubContent", "rt-DropdownMenuContent", "rt-DropdownMenuSubContent", a39) }, o27.createElement(c2, { type: "auto" }, o27.createElement("div", { className: (0, import_classnames27.default)("rt-BaseMenuViewport", "rt-DropdownMenuViewport") }, m16)))));
});
G5.displayName = "DropdownMenu.SubContent";
var B4 = o27.forwardRef(({ className: e45, ...n26 }, r46) => o27.createElement(dist_exports14.Separator, { ...n26, asChild: false, ref: r46, className: (0, import_classnames27.default)("rt-BaseMenuSeparator", "rt-DropdownMenuSeparator", e45) }));
B4.displayName = "DropdownMenu.Separator";

// node_modules/@radix-ui/themes/dist/esm/components/em.js
var o28 = __toESM(require_react(), 1);
var import_classnames28 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/em.props.js
var t17 = { ...o, ...e6, ...r4 };

// node_modules/@radix-ui/themes/dist/esm/components/em.js
var e27 = o28.forwardRef((p37, m16) => {
  const { asChild: r46, className: t35, ...s26 } = v(p37, t17), f21 = r46 ? dist_exports.Root : "em";
  return o28.createElement(f21, { ...s26, ref: m16, className: (0, import_classnames28.default)("rt-Em", t35) });
});
e27.displayName = "Em";

// node_modules/@radix-ui/themes/dist/esm/components/hover-card.js
var hover_card_exports = {};
__export(hover_card_exports, {
  Content: () => C3,
  Root: () => p23,
  Trigger: () => s18
});
var r27 = __toESM(require_react(), 1);
var import_classnames29 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/hover-card.props.js
var r26 = ["1", "2", "3"];
var p22 = { ...o, size: { type: "enum", className: "rt-r-size", values: r26, default: "2", responsive: true }, width: t.width, minWidth: t.minWidth, maxWidth: { ...t.maxWidth, default: "480px" }, ...e };

// node_modules/@radix-ui/themes/dist/esm/components/hover-card.js
var p23 = (e45) => r27.createElement(dist_exports15.Root, { closeDelay: 150, openDelay: 200, ...e45 });
p23.displayName = "HoverCard.Root";
var s18 = r27.forwardRef(({ children: e45, className: t35, ...n26 }, a39) => r27.createElement(dist_exports15.Trigger, { ref: a39, className: (0, import_classnames29.default)("rt-HoverCardTrigger", t35), ...n26, asChild: true }, a4(e45)));
s18.displayName = "HoverCard.Trigger";
var C3 = r27.forwardRef((e45, t35) => {
  const { className: n26, forceMount: a39, container: m16, ...d10 } = v(e45, p22);
  return r27.createElement(dist_exports15.Portal, { container: m16, forceMount: a39 }, r27.createElement(R2, { asChild: true }, r27.createElement(dist_exports15.Content, { align: "start", sideOffset: 8, collisionPadding: 10, ...d10, ref: t35, className: (0, import_classnames29.default)("rt-PopperContent", "rt-HoverCardContent", n26) })));
});
C3.displayName = "HoverCard.Content";

// node_modules/@radix-ui/themes/dist/esm/components/icon-button.js
var t18 = __toESM(require_react(), 1);
var import_classnames30 = __toESM(require_classnames(), 1);
var o29 = t18.forwardRef(({ className: e45, ...n26 }, r46) => t18.createElement(n11, { ...n26, ref: r46, className: (0, import_classnames30.default)("rt-IconButton", e45) }));
o29.displayName = "IconButton";

// node_modules/@radix-ui/themes/dist/esm/components/inset.js
var o30 = __toESM(require_react(), 1);
var import_classnames31 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/inset.props.js
var a23 = ["all", "x", "y", "top", "bottom", "left", "right"];
var t19 = ["border-box", "padding-box"];
var e28 = ["current", "0"];
var u5 = { ...o, side: { type: "enum", className: "rt-r-side", values: a23, default: "all", responsive: true }, clip: { type: "enum", className: "rt-r-clip", values: t19, default: "border-box", responsive: true }, p: { type: "enum", className: "rt-r-p", values: e28, parseValue: p24, responsive: true }, px: { type: "enum", className: "rt-r-px", values: e28, parseValue: p24, responsive: true }, py: { type: "enum", className: "rt-r-py", values: e28, parseValue: p24, responsive: true }, pt: { type: "enum", className: "rt-r-pt", values: e28, parseValue: p24, responsive: true }, pr: { type: "enum", className: "rt-r-pr", values: e28, parseValue: p24, responsive: true }, pb: { type: "enum", className: "rt-r-pb", values: e28, parseValue: p24, responsive: true }, pl: { type: "enum", className: "rt-r-pl", values: e28, parseValue: p24, responsive: true } };
function p24(s26) {
  return s26 === "current" ? "inset" : s26;
}

// node_modules/@radix-ui/themes/dist/esm/components/inset.js
var e29 = o30.forwardRef((r46, t35) => {
  const { asChild: p37, className: s26, ...n26 } = v(r46, u5, r5), m16 = p37 ? dist_exports.Root : "div";
  return o30.createElement(m16, { ...n26, ref: t35, className: (0, import_classnames31.default)("rt-Inset", s26) });
});
e29.displayName = "Inset";

// node_modules/@radix-ui/themes/dist/esm/components/kbd.js
var o32 = __toESM(require_react(), 1);
var import_classnames32 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/kbd.props.js
var e30 = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
var o31 = { ...o, size: { type: "enum", className: "rt-r-size", values: e30, responsive: true } };

// node_modules/@radix-ui/themes/dist/esm/components/kbd.js
var r28 = o32.forwardRef((p37, e45) => {
  const { asChild: t35, className: s26, ...m16 } = v(p37, o31, r5), d10 = t35 ? dist_exports.Root : "kbd";
  return o32.createElement(d10, { ...m16, ref: e45, className: (0, import_classnames32.default)("rt-reset", "rt-Kbd", s26) });
});
r28.displayName = "Kbd";

// node_modules/@radix-ui/themes/dist/esm/components/link.js
var o33 = __toESM(require_react(), 1);
var import_classnames33 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/link.props.js
var n19 = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
var f11 = ["auto", "always", "hover", "none"];
var m10 = { ...o, size: { type: "enum", className: "rt-r-size", values: n19, responsive: true }, ...t3, ...r3, ...e6, ...r4, underline: { type: "enum", className: "rt-underline", values: f11, default: "auto" }, ...s3, ...o3 };

// node_modules/@radix-ui/themes/dist/esm/components/link.js
var e31 = o33.forwardRef((p37, t35) => {
  const { children: r46, className: s26, color: n26, asChild: i24, ...m16 } = v(p37, m10);
  return o33.createElement(p, { ...m16, "data-accent-color": n26, ref: t35, asChild: true, className: (0, import_classnames33.default)("rt-reset", "rt-Link", s26) }, i24 ? r46 : o33.createElement("a", null, r46));
});
e31.displayName = "Link";

// node_modules/@radix-ui/themes/dist/esm/components/popover.js
var popover_exports = {};
__export(popover_exports, {
  Anchor: () => m11,
  Close: () => v7,
  Content: () => i16,
  Root: () => P4,
  Trigger: () => s20
});
var o34 = __toESM(require_react(), 1);
var import_classnames34 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/popover.props.js
var p25 = ["1", "2", "3", "4"];
var r29 = { ...o, size: { type: "enum", className: "rt-r-size", values: p25, default: "2", responsive: true }, width: t.width, minWidth: t.minWidth, maxWidth: { ...t.maxWidth, default: "480px" }, ...e };

// node_modules/@radix-ui/themes/dist/esm/components/popover.js
var P4 = (e45) => o34.createElement(dist_exports17.Root, { ...e45 });
P4.displayName = "Popover.Root";
var s20 = o34.forwardRef(({ children: e45, ...r46 }, t35) => o34.createElement(dist_exports17.Trigger, { ...r46, ref: t35, asChild: true }, a4(e45)));
s20.displayName = "Popover.Trigger";
var i16 = o34.forwardRef((e45, r46) => {
  const { className: t35, forceMount: a39, container: f21, ...l13 } = v(e45, r29);
  return o34.createElement(dist_exports17.Portal, { container: f21, forceMount: a39 }, o34.createElement(R2, { asChild: true }, o34.createElement(dist_exports17.Content, { align: "start", sideOffset: 8, collisionPadding: 10, ...l13, ref: r46, className: (0, import_classnames34.default)("rt-PopperContent", "rt-PopoverContent", t35) })));
});
i16.displayName = "Popover.Content";
var v7 = o34.forwardRef(({ children: e45, ...r46 }, t35) => o34.createElement(dist_exports17.Close, { ...r46, ref: t35, asChild: true }, a4(e45)));
v7.displayName = "Popover.Close";
var m11 = o34.forwardRef(({ children: e45, ...r46 }, t35) => o34.createElement(dist_exports17.Anchor, { ...r46, ref: t35 }));
m11.displayName = "Popover.Anchor";

// node_modules/@radix-ui/themes/dist/esm/components/portal.js
var r30 = dist_exports6.Root;
var P5 = dist_exports6.Root;

// node_modules/@radix-ui/themes/dist/esm/components/progress.js
var o36 = __toESM(require_react(), 1);
var import_classnames35 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/progress.props.js
var o35 = ["1", "2", "3"];
var t20 = ["classic", "surface", "soft"];
var a25 = { size: { type: "enum", className: "rt-r-size", values: o35, default: "2", responsive: true }, variant: { type: "enum", className: "rt-variant", values: t20, default: "surface" }, ...r2, ...o3, ...r7, duration: { type: "string" } };

// node_modules/@radix-ui/themes/dist/esm/components/progress.js
var s21 = o36.forwardRef((p37, t35) => {
  const { className: m16, style: i24, color: a39, radius: n26, duration: P9, ...r46 } = v(p37, a25, r5);
  return o36.createElement(dist_exports18.Root, { "data-accent-color": a39, "data-radius": n26, ref: t35, className: (0, import_classnames35.default)("rt-ProgressRoot", m16), style: l2({ "--progress-duration": "value" in r46 ? void 0 : P9, "--progress-value": "value" in r46 ? r46.value : void 0, "--progress-max": "max" in r46 ? r46.max : void 0 }, i24), ...r46, asChild: false }, o36.createElement(dist_exports18.Indicator, { className: "rt-ProgressIndicator" }));
});
s21.displayName = "Progress";

// node_modules/@radix-ui/themes/dist/esm/components/quote.js
var o37 = __toESM(require_react(), 1);
var import_classnames36 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/quote.props.js
var p26 = { ...o, ...e6, ...r4 };

// node_modules/@radix-ui/themes/dist/esm/components/quote.js
var e32 = o37.forwardRef((t35, p37) => {
  const { asChild: r46, className: s26, ...m16 } = v(t35, p26), f21 = r46 ? dist_exports.Root : "q";
  return o37.createElement(f21, { ...m16, ref: p37, className: (0, import_classnames36.default)("rt-Quote", s26) });
});
e32.displayName = "Quote";

// node_modules/@radix-ui/themes/dist/esm/components/radio-cards.js
var radio_cards_exports = {};
__export(radio_cards_exports, {
  Item: () => i17,
  Root: () => p28
});
var o38 = __toESM(require_react(), 1);
var import_classnames37 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/radio-cards.props.js
var a26 = ["1", "2", "3"];
var t21 = ["surface", "classic"];
var p27 = { ...o, size: { type: "enum", className: "rt-r-size", values: a26, default: "2", responsive: true }, variant: { type: "enum", className: "rt-variant", values: t21, default: "surface" }, ...r2, ...o3, columns: { ...s13.columns, default: "repeat(auto-fit, minmax(160px, 1fr))" }, gap: { ...s13.gap, default: "4" } };

// node_modules/@radix-ui/themes/dist/esm/components/radio-cards.js
var p28 = o38.forwardRef((r46, t35) => {
  const { className: e45, color: d10, ...m16 } = v(r46, p27, r5);
  return o38.createElement(o19, { asChild: true }, o38.createElement(dist_exports19.Root, { "data-accent-color": d10, ...m16, ref: t35, className: (0, import_classnames37.default)("rt-RadioCardsRoot", e45) }));
});
p28.displayName = "RadioCards.Root";
var i17 = o38.forwardRef(({ className: r46, ...t35 }, e45) => o38.createElement(dist_exports19.Item, { ...t35, asChild: false, ref: e45, className: (0, import_classnames37.default)("rt-reset", "rt-BaseCard", "rt-RadioCardsItem", r46) }));
i17.displayName = "RadioCards.Item";

// node_modules/@radix-ui/themes/dist/esm/components/radio-group.js
var radio_group_exports = {};
__export(radio_group_exports, {
  Item: () => y4,
  Root: () => I4
});
var o40 = __toESM(require_react(), 1);
var import_classnames38 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/radio-group.props.js
var o39 = ["1", "2", "3"];
var t22 = ["classic", "surface", "soft"];
var a28 = { ...o, size: { type: "enum", className: "rt-r-size", values: o39, default: "2", responsive: true }, variant: { type: "enum", className: "rt-variant", values: t22, default: "surface" }, ...r2, ...o3 };

// node_modules/@radix-ui/themes/dist/esm/components/radio-group.js
var f13 = "RadioGroup";
var [v8] = dist_exports4.createContextScope(f13, [dist_exports19.createRadioGroupScope]);
var P6 = dist_exports19.createRadioGroupScope();
var [S4, l10] = v8(f13);
var I4 = o40.forwardRef(({ color: a39 = a28.color.default, highContrast: e45 = a28.highContrast.default, size: r46 = a28.size.default, variant: t35 = a28.variant.default, ...i24 }, s26) => {
  const { __scopeRadioGroup: p37, className: m16, ...x4 } = v(i24, r5), C7 = P6(p37);
  return o40.createElement(S4, { scope: p37, color: a39, highContrast: e45, size: r46, variant: t35 }, o40.createElement(dist_exports19.Root, { ...C7, ...x4, ref: s26, className: (0, import_classnames38.default)("rt-RadioGroupRoot", m16) }));
});
I4.displayName = "RadioGroup.Root";
var y4 = o40.forwardRef((a39, e45) => {
  const { __scopeRadioGroup: r46, children: t35, className: i24, style: s26, ...p37 } = a39, { size: m16 } = l10("RadioGroupItem", r46);
  return t35 ? o40.createElement(p, { as: "label", size: m16, className: (0, import_classnames38.default)("rt-RadioGroupItem", i24), style: s26 }, o40.createElement(n21, { __scopeRadioGroup: r46, ...p37, ref: e45 }), t35 && o40.createElement("span", { className: "rt-RadioGroupItemInner" }, t35)) : o40.createElement(n21, { __scopeRadioGroup: r46, ...p37, ref: e45, className: i24, style: s26 });
});
y4.displayName = "RadioGroup.Item";
var n21 = o40.forwardRef(({ __scopeRadioGroup: a39, ...e45 }, r46) => {
  const t35 = l10("RadioGroupItemRadio", a39), i24 = P6(a39), { color: s26, className: p37 } = v({ ...e45, ...t35 }, a28, r5);
  return o40.createElement(dist_exports19.Item, { ...i24, "data-accent-color": s26, ...e45, asChild: false, ref: r46, className: (0, import_classnames38.default)("rt-reset", "rt-BaseRadioRoot", p37) });
});
n21.displayName = "RadioGroup.ItemRadio";

// node_modules/@radix-ui/themes/dist/esm/components/radio.js
var o42 = __toESM(require_react(), 1);
var import_classnames39 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/_internal/base-radio.props.js
var r31 = ["1", "2", "3"];
var o41 = ["classic", "surface", "soft"];
var t23 = { size: { type: "enum", className: "rt-r-size", values: r31, default: "2", responsive: true }, variant: { type: "enum", className: "rt-variant", values: o41, default: "surface" }, ...r2, ...o3 };

// node_modules/@radix-ui/themes/dist/esm/components/radio.js
var e33 = o42.forwardRef((r46, t35) => {
  const p37 = o42.useRef(null), { className: a39, color: s26, onChange: i24, onValueChange: n26, ...m16 } = v(r46, t23, r5);
  return o42.createElement("input", { type: "radio", "data-accent-color": s26, ...m16, onChange: composeEventHandlers(i24, (d10) => n26?.(d10.currentTarget.value)), ref: composeRefs(p37, t35), className: (0, import_classnames39.default)("rt-reset", "rt-BaseRadioRoot", "rt-RadioRoot", a39) });
});
e33.displayName = "Radio";

// node_modules/@radix-ui/themes/dist/esm/components/reset.js
var e34 = __toESM(require_react(), 1);
var import_classnames40 = __toESM(require_classnames(), 1);
var o43 = e34.forwardRef(({ className: t35, children: r46, ...s26 }, p37) => e34.createElement(dist_exports.Root, { ...s26, ref: p37, className: (0, import_classnames40.default)("rt-reset", t35) }, a4(r46)));
o43.displayName = "Reset";

// node_modules/@radix-ui/themes/dist/esm/components/segmented-control.js
var segmented_control_exports = {};
__export(segmented_control_exports, {
  Item: () => l11,
  Root: () => p29
});
var e35 = __toESM(require_react(), 1);
var import_classnames41 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/segmented-control.props.js
var s22 = ["1", "2", "3"];
var a29 = ["surface", "classic"];
var o44 = { disabled: { type: "boolean", className: "disabled", default: false }, size: { type: "enum", className: "rt-r-size", values: s22, default: "2", responsive: true }, variant: { type: "enum", className: "rt-variant", values: a29, default: "surface" }, ...r7 };

// node_modules/@radix-ui/themes/dist/esm/components/segmented-control.js
var p29 = e35.forwardRef((o59, t35) => {
  const { className: r46, children: n26, radius: d10, value: i24, defaultValue: g8, onValueChange: f21, ...P9 } = v(o59, o44, r5), [u10, C7] = useControllableState({ prop: i24, onChange: f21, defaultProp: g8 });
  return e35.createElement(dist_exports25.Root, { "data-disabled": o59.disabled || void 0, "data-radius": d10, ref: t35, className: (0, import_classnames41.default)("rt-SegmentedControlRoot", r46), onValueChange: (s26) => {
    s26 && C7(s26);
  }, ...P9, type: "single", value: u10, asChild: false, disabled: !!o59.disabled }, n26, e35.createElement("div", { className: "rt-SegmentedControlIndicator" }));
});
p29.displayName = "SegmentedControl.Root";
var l11 = e35.forwardRef(({ children: o59, className: t35, ...r46 }, n26) => e35.createElement(dist_exports25.Item, { ref: n26, className: (0, import_classnames41.default)("rt-reset", "rt-SegmentedControlItem", t35), ...r46, disabled: false, asChild: false }, e35.createElement("span", { className: "rt-SegmentedControlItemSeparator" }), e35.createElement("span", { className: "rt-SegmentedControlItemLabel" }, e35.createElement("span", { className: "rt-SegmentedControlItemLabelActive" }, o59), e35.createElement("span", { className: "rt-SegmentedControlItemLabelInactive", "aria-hidden": true }, o59))));
l11.displayName = "SegmentedControl.Item";

// node_modules/@radix-ui/themes/dist/esm/components/section.js
var o46 = __toESM(require_react(), 1);
var import_classnames42 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/section.props.js
var p30 = ["1", "2", "3", "4"];
var o45 = ["none", "initial"];
var t24 = { ...o, size: { type: "enum", className: "rt-r-size", values: p30, default: "3", responsive: true }, display: { type: "enum", className: "rt-r-display", values: o45, parseValue: r32, responsive: true } };
function r32(e45) {
  return e45 === "initial" ? "block" : e45;
}

// node_modules/@radix-ui/themes/dist/esm/components/section.js
var r33 = o46.forwardRef((t35, p37) => {
  const { asChild: e45, className: s26, ...m16 } = v(t35, t24, u, r5), i24 = e45 ? dist_exports.Root : "section";
  return o46.createElement(i24, { ...m16, ref: p37, className: (0, import_classnames42.default)("rt-Section", s26) });
});
r33.displayName = "Section";

// node_modules/@radix-ui/themes/dist/esm/components/select.js
var select_exports = {};
__export(select_exports, {
  Content: () => g7,
  Group: () => y5,
  Item: () => v9,
  Label: () => h3,
  Root: () => C5,
  Separator: () => I5,
  Trigger: () => u7
});
var e36 = __toESM(require_react(), 1);
var import_classnames43 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/select.props.js
var r34 = ["1", "2", "3"];
var o47 = { size: { type: "enum", className: "rt-r-size", values: r34, default: "2", responsive: true } };
var a31 = ["classic", "surface", "soft", "ghost"];
var i18 = { variant: { type: "enum", className: "rt-variant", values: a31, default: "surface" }, ...r2, ...r7, placeholder: { type: "string" } };
var n23 = ["solid", "soft"];
var p31 = { variant: { type: "enum", className: "rt-variant", values: n23, default: "solid" }, ...r2, ...o3 };

// node_modules/@radix-ui/themes/dist/esm/components/select.js
var f15 = e36.createContext({});
var C5 = (r46) => {
  const { children: o59, size: t35 = o47.size.default, ...s26 } = r46;
  return e36.createElement(dist_exports21.Root, { ...s26 }, e36.createElement(f15.Provider, { value: e36.useMemo(() => ({ size: t35 }), [t35]) }, o59));
};
C5.displayName = "Select.Root";
var u7 = e36.forwardRef((r46, o59) => {
  const t35 = e36.useContext(f15), { children: s26, className: p37, color: n26, radius: m16, placeholder: c5, ...S5 } = v({ size: t35?.size, ...r46 }, { size: o47.size }, i18, r5);
  return e36.createElement(dist_exports21.Trigger, { asChild: true }, e36.createElement("button", { "data-accent-color": n26, "data-radius": m16, ...S5, ref: o59, className: (0, import_classnames43.default)("rt-reset", "rt-SelectTrigger", p37) }, e36.createElement("span", { className: "rt-SelectTriggerInner" }, e36.createElement(dist_exports21.Value, { placeholder: c5 }, s26)), e36.createElement(dist_exports21.Icon, { asChild: true }, e36.createElement(i7, { className: "rt-SelectIcon" }))));
});
u7.displayName = "Select.Trigger";
var g7 = e36.forwardRef((r46, o59) => {
  const t35 = e36.useContext(f15), { className: s26, children: p37, color: n26, container: m16, ...c5 } = v({ size: t35?.size, ...r46 }, { size: o47.size }, p31), S5 = H(), T6 = n26 || S5.accentColor;
  return e36.createElement(dist_exports21.Portal, { container: m16 }, e36.createElement(R2, { asChild: true }, e36.createElement(dist_exports21.Content, { "data-accent-color": T6, sideOffset: 4, ...c5, asChild: false, ref: o59, className: (0, import_classnames43.default)({ "rt-PopperContent": c5.position === "popper" }, "rt-SelectContent", s26) }, e36.createElement(dist_exports20.Root, { type: "auto", className: "rt-ScrollAreaRoot" }, e36.createElement(dist_exports21.Viewport, { asChild: true, className: "rt-SelectViewport" }, e36.createElement(dist_exports20.Viewport, { className: "rt-ScrollAreaViewport", style: { overflowY: void 0 } }, p37)), e36.createElement(dist_exports20.Scrollbar, { className: "rt-ScrollAreaScrollbar rt-r-size-1", orientation: "vertical" }, e36.createElement(dist_exports20.Thumb, { className: "rt-ScrollAreaThumb" }))))));
});
g7.displayName = "Select.Content";
var v9 = e36.forwardRef((r46, o59) => {
  const { className: t35, children: s26, ...p37 } = r46;
  return e36.createElement(dist_exports21.Item, { ...p37, asChild: false, ref: o59, className: (0, import_classnames43.default)("rt-SelectItem", t35) }, e36.createElement(dist_exports21.ItemIndicator, { className: "rt-SelectItemIndicator" }, e36.createElement(t12, { className: "rt-SelectItemIndicatorIcon" })), e36.createElement(dist_exports21.ItemText, null, s26));
});
v9.displayName = "Select.Item";
var y5 = e36.forwardRef(({ className: r46, ...o59 }, t35) => e36.createElement(dist_exports21.Group, { ...o59, asChild: false, ref: t35, className: (0, import_classnames43.default)("rt-SelectGroup", r46) }));
y5.displayName = "Select.Group";
var h3 = e36.forwardRef(({ className: r46, ...o59 }, t35) => e36.createElement(dist_exports21.Label, { ...o59, asChild: false, ref: t35, className: (0, import_classnames43.default)("rt-SelectLabel", r46) }));
h3.displayName = "Select.Label";
var I5 = e36.forwardRef(({ className: r46, ...o59 }, t35) => e36.createElement(dist_exports21.Separator, { ...o59, asChild: false, ref: t35, className: (0, import_classnames43.default)("rt-SelectSeparator", r46) }));
I5.displayName = "Select.Separator";

// node_modules/@radix-ui/themes/dist/esm/components/separator.js
var r36 = __toESM(require_react(), 1);
var import_classnames44 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/separator.props.js
var e37 = ["horizontal", "vertical"];
var r35 = ["1", "2", "3", "4"];
var t25 = { orientation: { type: "enum", className: "rt-r-orientation", values: e37, default: "horizontal", responsive: true }, size: { type: "enum", className: "rt-r-size", values: r35, default: "1", responsive: true }, color: { ...r2.color, default: "gray" }, decorative: { type: "boolean", default: true } };

// node_modules/@radix-ui/themes/dist/esm/components/separator.js
var o48 = r36.forwardRef((p37, e45) => {
  const { className: t35, color: a39, decorative: s26, ...m16 } = v(p37, t25, r5);
  return r36.createElement("span", { "data-accent-color": a39, role: s26 ? void 0 : "separator", ...m16, ref: e45, className: (0, import_classnames44.default)("rt-Separator", t35) });
});
o48.displayName = "Separator";

// node_modules/@radix-ui/themes/dist/esm/components/skeleton.js
var o50 = __toESM(require_react(), 1);
var import_classnames45 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/helpers/inert.js
var o49 = __toESM(require_react(), 1);
var r37 = parseFloat(o49.version) >= 19 || "";

// node_modules/@radix-ui/themes/dist/esm/components/skeleton.props.js
var p32 = { loading: { type: "boolean", default: true }, ...t, ...e };

// node_modules/@radix-ui/themes/dist/esm/components/skeleton.js
var r38 = o50.forwardRef((t35, p37) => {
  const { children: e45, className: n26, loading: s26, ...m16 } = v(t35, p32, r5);
  if (!s26) return e45;
  const i24 = o50.isValidElement(e45) ? dist_exports.Root : "span";
  return o50.createElement(i24, { ref: p37, "aria-hidden": true, className: (0, import_classnames45.default)("rt-Skeleton", n26), "data-inline-skeleton": o50.isValidElement(e45) ? void 0 : true, tabIndex: -1, inert: r37, ...m16 }, e45);
});
r38.displayName = "Skeleton";

// node_modules/@radix-ui/themes/dist/esm/components/slider.js
var e38 = __toESM(require_react(), 1);
var import_classnames46 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/slider.props.js
var o51 = ["1", "2", "3"];
var t26 = ["classic", "surface", "soft"];
var a33 = { size: { type: "enum", className: "rt-r-size", values: o51, default: "2", responsive: true }, variant: { type: "enum", className: "rt-variant", values: t26, default: "surface" }, ...r2, ...o3, ...r7 };

// node_modules/@radix-ui/themes/dist/esm/components/slider.js
var s23 = e38.forwardRef((i24, a39) => {
  const { className: d10, color: l13, radius: m16, tabIndex: t35, ...r46 } = v(i24, a33, r5);
  return e38.createElement(dist_exports22.Root, { "data-accent-color": l13, "data-radius": m16, ref: a39, ...r46, asChild: false, className: (0, import_classnames46.default)("rt-SliderRoot", d10) }, e38.createElement(dist_exports22.Track, { className: "rt-SliderTrack" }, e38.createElement(dist_exports22.Range, { className: (0, import_classnames46.default)("rt-SliderRange", { "rt-high-contrast": i24.highContrast }), "data-inverted": r46.inverted ? "" : void 0 })), (r46.value ?? r46.defaultValue ?? []).map((S5, n26) => e38.createElement(dist_exports22.Thumb, { key: n26, className: "rt-SliderThumb", ...t35 !== void 0 ? { tabIndex: t35 } : void 0 })));
});
s23.displayName = "Slider";

// node_modules/@radix-ui/themes/dist/esm/components/strong.js
var o52 = __toESM(require_react(), 1);
var import_classnames47 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/strong.props.js
var p34 = { ...o, ...e6, ...r4 };

// node_modules/@radix-ui/themes/dist/esm/components/strong.js
var r39 = o52.forwardRef((t35, e45) => {
  const { asChild: p37, className: s26, ...n26 } = v(t35, p34), m16 = p37 ? dist_exports.Root : "strong";
  return o52.createElement(m16, { ...n26, ref: e45, className: (0, import_classnames47.default)("rt-Strong", s26) });
});
r39.displayName = "Strong";

// node_modules/@radix-ui/themes/dist/esm/components/switch.js
var t28 = __toESM(require_react(), 1);
var import_classnames48 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/switch.props.js
var o53 = ["1", "2", "3"];
var t27 = ["classic", "surface", "soft"];
var a34 = { size: { type: "enum", className: "rt-r-size", values: o53, default: "2", responsive: true }, variant: { type: "enum", className: "rt-variant", values: t27, default: "surface" }, ...r2, ...o3, ...r7 };

// node_modules/@radix-ui/themes/dist/esm/components/switch.js
var i20 = t28.forwardRef((o59, p37) => {
  const { className: s26, color: m16, radius: c5, ...a39 } = v(o59, a34, r5);
  return t28.createElement(dist_exports23.Root, { "data-accent-color": m16, "data-radius": c5, ...a39, asChild: false, ref: p37, className: (0, import_classnames48.default)("rt-reset", "rt-SwitchRoot", s26) }, t28.createElement(dist_exports23.Thumb, { className: (0, import_classnames48.default)("rt-SwitchThumb", { "rt-high-contrast": o59.highContrast }) }));
});
i20.displayName = "Switch";

// node_modules/@radix-ui/themes/dist/esm/components/tab-nav.js
var tab_nav_exports = {};
__export(tab_nav_exports, {
  Link: () => v10,
  Root: () => N6
});
var o55 = __toESM(require_react(), 1);
var import_classnames49 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/_internal/base-tab-list.props.js
var r41 = ["1", "2"];
var t29 = ["nowrap", "wrap", "wrap-reverse"];
var o54 = ["start", "center", "end"];
var p35 = { size: { type: "enum", className: "rt-r-size", values: r41, default: "2", responsive: true }, wrap: { type: "enum", className: "rt-r-fw", values: t29, responsive: true }, justify: { type: "enum", className: "rt-r-jc", values: o54, responsive: true }, ...r2, ...o3 };

// node_modules/@radix-ui/themes/dist/esm/components/tab-nav.props.js
var e39 = { ...o, active: { type: "boolean", default: false } };

// node_modules/@radix-ui/themes/dist/esm/components/tab-nav.js
var N6 = o55.forwardRef((t35, r46) => {
  const { children: a39, className: s26, color: n26, ...p37 } = v(t35, p35, r5);
  return o55.createElement(dist_exports16.Root, { className: "rt-TabNavRoot", "data-accent-color": n26, ...p37, asChild: false, ref: r46 }, o55.createElement(dist_exports16.List, { className: (0, import_classnames49.default)("rt-reset", "rt-BaseTabList", "rt-TabNavList", s26) }, a39));
});
N6.displayName = "TabNav.Root";
var v10 = o55.forwardRef((t35, r46) => {
  const { asChild: a39, children: s26, className: n26, ...p37 } = t35;
  return o55.createElement(dist_exports16.Item, { className: "rt-TabNavItem" }, o55.createElement(dist_exports16.Link, { ...p37, ref: r46, className: (0, import_classnames49.default)("rt-reset", "rt-BaseTabListTrigger", "rt-TabNavLink", n26), onSelect: void 0, asChild: a39 }, d3({ asChild: a39, children: s26 }, (i24) => o55.createElement(o55.Fragment, null, o55.createElement("span", { className: "rt-BaseTabListTriggerInner rt-TabNavLinkInner" }, i24), o55.createElement("span", { className: "rt-BaseTabListTriggerInnerHidden rt-TabNavLinkInnerHidden" }, i24)))));
});
v10.displayName = "TabNav.Link";

// node_modules/@radix-ui/themes/dist/esm/components/table.js
var table_exports = {};
__export(table_exports, {
  Body: () => b4,
  Cell: () => T5,
  ColumnHeaderCell: () => f18,
  Header: () => d8,
  Root: () => m14,
  Row: () => P7,
  RowHeaderCell: () => R5
});
var e40 = __toESM(require_react(), 1);
var import_classnames50 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/table.props.js
var r42 = ["1", "2", "3"];
var a35 = ["surface", "ghost"];
var o56 = ["auto", "fixed"];
var n25 = { size: { type: "enum", className: "rt-r-size", values: r42, default: "2", responsive: true }, variant: { type: "enum", className: "rt-variant", values: a35, default: "ghost" }, layout: { type: "enum", className: "rt-r-tl", values: o56, responsive: true } };
var i21 = ["start", "center", "end", "baseline"];
var u8 = { align: { type: "enum", className: "rt-r-va", values: i21, parseValue: l12, responsive: true } };
function l12(e45) {
  return { baseline: "baseline", start: "top", center: "middle", end: "bottom" }[e45];
}
var p36 = ["start", "center", "end"];
var f17 = { justify: { type: "enum", className: "rt-r-ta", values: p36, parseValue: c3, responsive: true }, ...t, ...p7 };
function c3(e45) {
  return { start: "left", center: "center", end: "right" }[e45];
}

// node_modules/@radix-ui/themes/dist/esm/components/table.js
var m14 = e40.forwardRef((o59, l13) => {
  const { layout: a39, ...r46 } = n25, { className: C7, children: c5, layout: y7, ...i24 } = v(o59, r46, r5), w3 = g({ value: y7, className: n25.layout.className, propValues: n25.layout.values });
  return e40.createElement("div", { ref: l13, className: (0, import_classnames50.default)("rt-TableRoot", C7), ...i24 }, e40.createElement(c2, null, e40.createElement("table", { className: (0, import_classnames50.default)("rt-TableRootTable", w3) }, c5)));
});
m14.displayName = "Table.Root";
var d8 = e40.forwardRef(({ className: o59, ...l13 }, a39) => e40.createElement("thead", { ...l13, ref: a39, className: (0, import_classnames50.default)("rt-TableHeader", o59) }));
d8.displayName = "Table.Header";
var b4 = e40.forwardRef(({ className: o59, ...l13 }, a39) => e40.createElement("tbody", { ...l13, ref: a39, className: (0, import_classnames50.default)("rt-TableBody", o59) }));
b4.displayName = "Table.Body";
var P7 = e40.forwardRef((o59, l13) => {
  const { className: a39, ...r46 } = v(o59, u8);
  return e40.createElement("tr", { ...r46, ref: l13, className: (0, import_classnames50.default)("rt-TableRow", a39) });
});
P7.displayName = "Table.Row";
var T5 = e40.forwardRef((o59, l13) => {
  const { className: a39, ...r46 } = v(o59, f17);
  return e40.createElement("td", { className: (0, import_classnames50.default)("rt-TableCell", a39), ref: l13, ...r46 });
});
T5.displayName = "Table.Cell";
var f18 = e40.forwardRef((o59, l13) => {
  const { className: a39, ...r46 } = v(o59, f17);
  return e40.createElement("th", { className: (0, import_classnames50.default)("rt-TableCell", "rt-TableColumnHeaderCell", a39), scope: "col", ref: l13, ...r46 });
});
f18.displayName = "Table.ColumnHeaderCell";
var R5 = e40.forwardRef((o59, l13) => {
  const { className: a39, ...r46 } = v(o59, f17);
  return e40.createElement("th", { className: (0, import_classnames50.default)("rt-TableCell", "rt-TableRowHeaderCell", a39), scope: "row", ref: l13, ...r46 });
});
R5.displayName = "Table.RowHeaderCell";

// node_modules/@radix-ui/themes/dist/esm/components/tabs.js
var tabs_exports = {};
__export(tabs_exports, {
  Content: () => f19,
  List: () => b5,
  Root: () => m15,
  Trigger: () => P8
});
var s25 = __toESM(require_react(), 1);
var import_classnames51 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/tabs.props.js
var s24 = { ...o };
var t31 = { ...o };

// node_modules/@radix-ui/themes/dist/esm/components/tabs.js
var m15 = s25.forwardRef((t35, o59) => {
  const { className: r46, ...e45 } = v(t35, r5);
  return s25.createElement(dist_exports24.Root, { ...e45, ref: o59, className: (0, import_classnames51.default)("rt-TabsRoot", r46) });
});
m15.displayName = "Tabs.Root";
var b5 = s25.forwardRef((t35, o59) => {
  const { className: r46, color: e45, ...n26 } = v(t35, p35, r5);
  return s25.createElement(dist_exports24.List, { "data-accent-color": e45, ...n26, asChild: false, ref: o59, className: (0, import_classnames51.default)("rt-BaseTabList", "rt-TabsList", r46) });
});
b5.displayName = "Tabs.List";
var P8 = s25.forwardRef((t35, o59) => {
  const { className: r46, children: e45, ...n26 } = t35;
  return s25.createElement(dist_exports24.Trigger, { ...n26, asChild: false, ref: o59, className: (0, import_classnames51.default)("rt-reset", "rt-BaseTabListTrigger", "rt-TabsTrigger", r46) }, s25.createElement("span", { className: "rt-BaseTabListTriggerInner rt-TabsTriggerInner" }, e45), s25.createElement("span", { className: "rt-BaseTabListTriggerInnerHidden rt-TabsTriggerInnerHidden" }, e45));
});
P8.displayName = "Tabs.Trigger";
var f19 = s25.forwardRef((t35, o59) => {
  const { className: r46, ...e45 } = v(t35, r5);
  return s25.createElement(dist_exports24.Content, { ...e45, ref: o59, className: (0, import_classnames51.default)("rt-TabsContent", r46) });
});
f19.displayName = "Tabs.Content";

// node_modules/@radix-ui/themes/dist/esm/components/text-area.js
var e41 = __toESM(require_react(), 1);
var import_classnames52 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/text-area.props.js
var r43 = ["1", "2", "3"];
var t32 = ["classic", "surface", "soft"];
var o57 = ["none", "vertical", "horizontal", "both"];
var a37 = { size: { type: "enum", className: "rt-r-size", values: r43, default: "2", responsive: true }, variant: { type: "enum", className: "rt-variant", values: t32, default: "surface" }, resize: { type: "enum", className: "rt-r-resize", values: o57, responsive: true }, ...r2, ...r7 };

// node_modules/@radix-ui/themes/dist/esm/components/text-area.js
var r44 = e41.forwardRef((t35, o59) => {
  const { className: p37, color: a39, radius: s26, style: m16, ...n26 } = v(t35, a37, r5);
  return e41.createElement("div", { "data-accent-color": a39, "data-radius": s26, className: (0, import_classnames52.default)("rt-TextAreaRoot", p37), style: m16 }, e41.createElement("textarea", { className: "rt-reset rt-TextAreaInput", ref: o59, ...n26 }));
});
r44.displayName = "TextArea";

// node_modules/@radix-ui/themes/dist/esm/components/text-field.js
var text_field_exports = {};
__export(text_field_exports, {
  Root: () => u9,
  Slot: () => c4
});
var t34 = __toESM(require_react(), 1);
var import_classnames53 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/text-field.props.js
var r45 = ["1", "2", "3"];
var t33 = ["classic", "surface", "soft"];
var f20 = { size: { type: "enum", className: "rt-r-size", values: r45, default: "2", responsive: true }, variant: { type: "enum", className: "rt-variant", values: t33, default: "surface" }, ...r2, ...r7 };
var a38 = ["left", "right"];
var i23 = { side: { type: "enum", values: a38 }, ...r2, gap: u2.gap, px: p7.px, pl: p7.pl, pr: p7.pr };

// node_modules/@radix-ui/themes/dist/esm/components/text-field.js
var u9 = t34.forwardRef((r46, s26) => {
  const e45 = t34.useRef(null), { children: l13, className: i24, color: p37, radius: f21, style: x4, ...P9 } = v(r46, f20, r5);
  return t34.createElement("div", { "data-accent-color": p37, "data-radius": f21, style: x4, className: (0, import_classnames53.default)("rt-TextFieldRoot", i24), onPointerDown: (T6) => {
    const n26 = T6.target;
    if (n26.closest("input, button, a")) return;
    const o59 = e45.current;
    if (!o59) return;
    const a39 = n26.closest(`
            .rt-TextFieldSlot[data-side='right'],
            .rt-TextFieldSlot:not([data-side='right']) ~ .rt-TextFieldSlot:not([data-side='left'])
          `) ? o59.value.length : 0;
    requestAnimationFrame(() => {
      try {
        o59.setSelectionRange(a39, a39);
      } catch {
      }
      o59.focus();
    });
  } }, t34.createElement("input", { spellCheck: "false", ...P9, ref: composeRefs(e45, s26), className: "rt-reset rt-TextFieldInput" }), l13);
});
u9.displayName = "TextField.Root";
var c4 = t34.forwardRef((r46, s26) => {
  const { className: e45, color: l13, side: i24, ...p37 } = v(r46, i23);
  return t34.createElement("div", { "data-accent-color": l13, "data-side": i24, ...p37, ref: s26, className: (0, import_classnames53.default)("rt-TextFieldSlot", e45) });
});
c4.displayName = "TextField.Slot";

// node_modules/@radix-ui/themes/dist/esm/components/theme-panel.js
var e42 = __toESM(require_react(), 1);
var N7 = e42.forwardRef(({ defaultOpen: n26 = true, ...a39 }, l13) => {
  const [c5, h4] = e42.useState(n26);
  return e42.createElement(z, { ...a39, ref: l13, open: c5, onOpenChange: h4 });
});
N7.displayName = "ThemePanel";
var z = e42.forwardRef((n26, a39) => {
  const { open: l13, onOpenChange: c5, onAppearanceChange: h4, ...v11 } = n26, G6 = H(), { appearance: d10, onAppearanceChange: B5, accentColor: g8, onAccentColorChange: $, grayColor: f21, onGrayColorChange: F, panelBackground: T6, onPanelBackgroundChange: O2, radius: w3, onRadiusChange: D3, scaling: x4, onScalingChange: j } = G6, E5 = h4 !== void 0, K2 = useCallbackRef(h4), k3 = e42.useCallback((t35) => {
    const o59 = a92();
    if (d10 !== "inherit") {
      B5(t35);
      return;
    }
    E5 ? K2(t35) : (H3(t35), l92(t35)), o59();
  }, [d10, B5, E5, K2]), P9 = a3(g8), S5 = f21 === "auto" ? P9 : f21, [W2, M2] = e42.useState("idle");
  async function U() {
    const t35 = { appearance: d10 === s4.appearance.default ? void 0 : d10, accentColor: g8 === s4.accentColor.default ? void 0 : g8, grayColor: f21 === s4.grayColor.default ? void 0 : f21, panelBackground: T6 === s4.panelBackground.default ? void 0 : T6, radius: w3 === s4.radius.default ? void 0 : w3, scaling: x4 === s4.scaling.default ? void 0 : x4 }, o59 = Object.keys(t35).filter((i24) => t35[i24] !== void 0).map((i24) => `${i24}="${t35[i24]}"`).join(" "), m16 = o59 ? `<Theme ${o59}>` : "<Theme>";
    M2("copying"), await navigator.clipboard.writeText(m16), M2("copied"), setTimeout(() => M2("idle"), 2e3);
  }
  const [Z, H3] = e42.useState(d10 === "inherit" ? null : d10), b6 = `
      [contenteditable],
      [role="combobox"],
      [role="listbox"],
      [role="menu"],
      input:not([type="radio"], [type="checkbox"]),
      select,
      textarea
    `;
  return e42.useEffect(() => {
    function t35(o59) {
      const m16 = o59.altKey || o59.ctrlKey || o59.shiftKey || o59.metaKey, i24 = document.activeElement?.closest(b6);
      o59.key?.toUpperCase() === "T" && !m16 && !i24 && c5(!l13);
    }
    return document.addEventListener("keydown", t35), () => document.removeEventListener("keydown", t35);
  }, [c5, l13, b6]), e42.useEffect(() => {
    function t35(o59) {
      const m16 = o59.altKey || o59.ctrlKey || o59.shiftKey || o59.metaKey, i24 = document.activeElement?.closest(b6);
      o59.key?.toUpperCase() === "D" && !m16 && !i24 && k3(Z === "light" ? "dark" : "light");
    }
    return document.addEventListener("keydown", t35), () => document.removeEventListener("keydown", t35);
  }, [k3, Z, b6]), e42.useEffect(() => {
    const t35 = document.documentElement, o59 = document.body;
    function m16() {
      const y7 = t35.classList.contains("dark") || t35.classList.contains("dark-theme") || o59.classList.contains("dark") || o59.classList.contains("dark-theme");
      H3(d10 === "inherit" ? y7 ? "dark" : "light" : d10);
    }
    const i24 = new MutationObserver(function(y7) {
      y7.forEach(function(X2) {
        X2.attributeName === "class" && m16();
      });
    });
    return m16(), d10 === "inherit" && (i24.observe(t35, { attributes: true }), i24.observe(o59, { attributes: true })), () => i24.disconnect();
  }, [d10]), e42.createElement(R2, { asChild: true, radius: "medium", scaling: "100%" }, e42.createElement(p12, { direction: "column", position: "fixed", top: "0", right: "0", mr: "4", mt: "4", inert: l13 ? void 0 : r37, ...v11, ref: a39, style: { zIndex: 9999, overflow: "hidden", maxHeight: "calc(100vh - var(--space-4) - var(--space-4))", borderRadius: "var(--radius-4)", backgroundColor: "var(--color-panel-solid)", transformOrigin: "top center", transitionProperty: "transform, box-shadow", transitionDuration: "200ms", transitionTimingFunction: l13 ? "ease-out" : "ease-in", transform: l13 ? "none" : "translateX(105%)", boxShadow: l13 ? "var(--shadow-5)" : "var(--shadow-2)", ...n26.style } }, e42.createElement(c2, null, e42.createElement(p9, { flexGrow: "1", p: "5", position: "relative" }, e42.createElement(p9, { position: "absolute", top: "0", right: "0", m: "2" }, e42.createElement(e43, { content: "Press T to show/hide the Theme Panel", side: "bottom", sideOffset: 6 }, e42.createElement(r28, { asChild: true, size: "3", tabIndex: 0, className: "rt-ThemePanelShortcut" }, e42.createElement("button", { onClick: () => c5(!l13) }, "T")))), e42.createElement(r6, { size: "5", trim: "both", as: "h3", mb: "5" }, "Theme"), e42.createElement(p, { id: "accent-color-title", as: "p", size: "2", weight: "medium", mt: "5" }, "Accent color"), e42.createElement(o19, { columns: "10", gap: "2", mt: "3", role: "group", "aria-labelledby": "accent-color-title" }, s4.accentColor.values.map((t35) => e42.createElement("label", { key: t35, className: "rt-ThemePanelSwatch", style: { backgroundColor: `var(--${t35}-9)` } }, e42.createElement(e43, { content: `${C6(t35)}${g8 === "gray" && S5 !== "gray" ? ` (${C6(S5)})` : ""}` }, e42.createElement("input", { className: "rt-ThemePanelSwatchInput", type: "radio", name: "accentColor", value: t35, checked: g8 === t35, onChange: (o59) => $(o59.target.value) }))))), e42.createElement(p12, { asChild: true, align: "center", justify: "between" }, e42.createElement(p, { as: "p", id: "gray-color-title", size: "2", weight: "medium", mt: "5" }, "Gray color")), e42.createElement(o19, { columns: "10", gap: "2", mt: "3", role: "group", "aria-labelledby": "gray-color-title" }, s4.grayColor.values.map((t35) => e42.createElement(p12, { key: t35, asChild: true, align: "center", justify: "center" }, e42.createElement("label", { className: "rt-ThemePanelSwatch", style: { backgroundColor: t35 === "auto" ? `var(--${P9}-9)` : t35 === "gray" ? "var(--gray-9)" : `var(--${t35}-9)`, filter: t35 === "gray" ? "saturate(0)" : void 0 } }, e42.createElement(e43, { content: `${C6(t35)}${t35 === "auto" ? ` (${C6(P9)})` : ""}` }, e42.createElement("input", { className: "rt-ThemePanelSwatchInput", type: "radio", name: "grayColor", value: t35, checked: f21 === t35, onChange: (o59) => F(o59.target.value) })))))), e42.createElement(p, { id: "appearance-title", as: "p", size: "2", weight: "medium", mt: "5" }, "Appearance"), e42.createElement(o19, { columns: "2", gap: "2", mt: "3", role: "group", "aria-labelledby": "appearance-title" }, ["light", "dark"].map((t35) => e42.createElement("label", { key: t35, className: "rt-ThemePanelRadioCard" }, e42.createElement("input", { className: "rt-ThemePanelRadioCardInput", type: "radio", name: "appearance", value: t35, checked: Z === t35, onChange: (o59) => k3(o59.target.value) }), e42.createElement(p12, { align: "center", justify: "center", height: "32px", gap: "2" }, t35 === "light" ? e42.createElement("svg", { width: "15", height: "15", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg", style: { margin: "0 -1px" } }, e42.createElement("path", { d: "M7.5 0C7.77614 0 8 0.223858 8 0.5V2.5C8 2.77614 7.77614 3 7.5 3C7.22386 3 7 2.77614 7 2.5V0.5C7 0.223858 7.22386 0 7.5 0ZM2.1967 2.1967C2.39196 2.00144 2.70854 2.00144 2.90381 2.1967L4.31802 3.61091C4.51328 3.80617 4.51328 4.12276 4.31802 4.31802C4.12276 4.51328 3.80617 4.51328 3.61091 4.31802L2.1967 2.90381C2.00144 2.70854 2.00144 2.39196 2.1967 2.1967ZM0.5 7C0.223858 7 0 7.22386 0 7.5C0 7.77614 0.223858 8 0.5 8H2.5C2.77614 8 3 7.77614 3 7.5C3 7.22386 2.77614 7 2.5 7H0.5ZM2.1967 12.8033C2.00144 12.608 2.00144 12.2915 2.1967 12.0962L3.61091 10.682C3.80617 10.4867 4.12276 10.4867 4.31802 10.682C4.51328 10.8772 4.51328 11.1938 4.31802 11.3891L2.90381 12.8033C2.70854 12.9986 2.39196 12.9986 2.1967 12.8033ZM12.5 7C12.2239 7 12 7.22386 12 7.5C12 7.77614 12.2239 8 12.5 8H14.5C14.7761 8 15 7.77614 15 7.5C15 7.22386 14.7761 7 14.5 7H12.5ZM10.682 4.31802C10.4867 4.12276 10.4867 3.80617 10.682 3.61091L12.0962 2.1967C12.2915 2.00144 12.608 2.00144 12.8033 2.1967C12.9986 2.39196 12.9986 2.70854 12.8033 2.90381L11.3891 4.31802C11.1938 4.51328 10.8772 4.51328 10.682 4.31802ZM8 12.5C8 12.2239 7.77614 12 7.5 12C7.22386 12 7 12.2239 7 12.5V14.5C7 14.7761 7.22386 15 7.5 15C7.77614 15 8 14.7761 8 14.5V12.5ZM10.682 10.682C10.8772 10.4867 11.1938 10.4867 11.3891 10.682L12.8033 12.0962C12.9986 12.2915 12.9986 12.608 12.8033 12.8033C12.608 12.9986 12.2915 12.9986 12.0962 12.8033L10.682 11.3891C10.4867 11.1938 10.4867 10.8772 10.682 10.682ZM5.5 7.5C5.5 6.39543 6.39543 5.5 7.5 5.5C8.60457 5.5 9.5 6.39543 9.5 7.5C9.5 8.60457 8.60457 9.5 7.5 9.5C6.39543 9.5 5.5 8.60457 5.5 7.5ZM7.5 4.5C5.84315 4.5 4.5 5.84315 4.5 7.5C4.5 9.15685 5.84315 10.5 7.5 10.5C9.15685 10.5 10.5 9.15685 10.5 7.5C10.5 5.84315 9.15685 4.5 7.5 4.5Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" })) : e42.createElement("svg", { width: "15", height: "15", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg", style: { margin: "0 -1px" } }, e42.createElement("path", { d: "M2.89998 0.499976C2.89998 0.279062 2.72089 0.0999756 2.49998 0.0999756C2.27906 0.0999756 2.09998 0.279062 2.09998 0.499976V1.09998H1.49998C1.27906 1.09998 1.09998 1.27906 1.09998 1.49998C1.09998 1.72089 1.27906 1.89998 1.49998 1.89998H2.09998V2.49998C2.09998 2.72089 2.27906 2.89998 2.49998 2.89998C2.72089 2.89998 2.89998 2.72089 2.89998 2.49998V1.89998H3.49998C3.72089 1.89998 3.89998 1.72089 3.89998 1.49998C3.89998 1.27906 3.72089 1.09998 3.49998 1.09998H2.89998V0.499976ZM5.89998 3.49998C5.89998 3.27906 5.72089 3.09998 5.49998 3.09998C5.27906 3.09998 5.09998 3.27906 5.09998 3.49998V4.09998H4.49998C4.27906 4.09998 4.09998 4.27906 4.09998 4.49998C4.09998 4.72089 4.27906 4.89998 4.49998 4.89998H5.09998V5.49998C5.09998 5.72089 5.27906 5.89998 5.49998 5.89998C5.72089 5.89998 5.89998 5.72089 5.89998 5.49998V4.89998H6.49998C6.72089 4.89998 6.89998 4.72089 6.89998 4.49998C6.89998 4.27906 6.72089 4.09998 6.49998 4.09998H5.89998V3.49998ZM1.89998 6.49998C1.89998 6.27906 1.72089 6.09998 1.49998 6.09998C1.27906 6.09998 1.09998 6.27906 1.09998 6.49998V7.09998H0.499976C0.279062 7.09998 0.0999756 7.27906 0.0999756 7.49998C0.0999756 7.72089 0.279062 7.89998 0.499976 7.89998H1.09998V8.49998C1.09998 8.72089 1.27906 8.89997 1.49998 8.89997C1.72089 8.89997 1.89998 8.72089 1.89998 8.49998V7.89998H2.49998C2.72089 7.89998 2.89998 7.72089 2.89998 7.49998C2.89998 7.27906 2.72089 7.09998 2.49998 7.09998H1.89998V6.49998ZM8.54406 0.98184L8.24618 0.941586C8.03275 0.917676 7.90692 1.1655 8.02936 1.34194C8.17013 1.54479 8.29981 1.75592 8.41754 1.97445C8.91878 2.90485 9.20322 3.96932 9.20322 5.10022C9.20322 8.37201 6.82247 11.0878 3.69887 11.6097C3.45736 11.65 3.20988 11.6772 2.96008 11.6906C2.74563 11.702 2.62729 11.9535 2.77721 12.1072C2.84551 12.1773 2.91535 12.2458 2.98667 12.3128L3.05883 12.3795L3.31883 12.6045L3.50684 12.7532L3.62796 12.8433L3.81491 12.9742L3.99079 13.089C4.11175 13.1651 4.23536 13.2375 4.36157 13.3059L4.62496 13.4412L4.88553 13.5607L5.18837 13.6828L5.43169 13.7686C5.56564 13.8128 5.70149 13.8529 5.83857 13.8885C5.94262 13.9155 6.04767 13.9401 6.15405 13.9622C6.27993 13.9883 6.40713 14.0109 6.53544 14.0298L6.85241 14.0685L7.11934 14.0892C7.24637 14.0965 7.37436 14.1002 7.50322 14.1002C11.1483 14.1002 14.1032 11.1453 14.1032 7.50023C14.1032 7.25044 14.0893 7.00389 14.0623 6.76131L14.0255 6.48407C13.991 6.26083 13.9453 6.04129 13.8891 5.82642C13.8213 5.56709 13.7382 5.31398 13.6409 5.06881L13.5279 4.80132L13.4507 4.63542L13.3766 4.48666C13.2178 4.17773 13.0353 3.88295 12.8312 3.60423L12.6782 3.40352L12.4793 3.16432L12.3157 2.98361L12.1961 2.85951L12.0355 2.70246L11.8134 2.50184L11.4925 2.24191L11.2483 2.06498L10.9562 1.87446L10.6346 1.68894L10.3073 1.52378L10.1938 1.47176L9.95488 1.3706L9.67791 1.2669L9.42566 1.1846L9.10075 1.09489L8.83599 1.03486L8.54406 0.98184ZM10.4032 5.30023C10.4032 4.27588 10.2002 3.29829 9.83244 2.40604C11.7623 3.28995 13.1032 5.23862 13.1032 7.50023C13.1032 10.593 10.596 13.1002 7.50322 13.1002C6.63646 13.1002 5.81597 12.9036 5.08355 12.5522C6.5419 12.0941 7.81081 11.2082 8.74322 10.0416C8.87963 10.2284 9.10028 10.3497 9.34928 10.3497C9.76349 10.3497 10.0993 10.0139 10.0993 9.59971C10.0993 9.24256 9.84965 8.94373 9.51535 8.86816C9.57741 8.75165 9.63653 8.63334 9.6926 8.51332C9.88358 8.63163 10.1088 8.69993 10.35 8.69993C11.0403 8.69993 11.6 8.14028 11.6 7.44993C11.6 6.75976 11.0406 6.20024 10.3505 6.19993C10.3853 5.90487 10.4032 5.60464 10.4032 5.30023Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" })), e42.createElement(p, { size: "1", weight: "medium" }, C6(t35)))))), e42.createElement(p, { id: "radius-title", as: "p", size: "2", weight: "medium", mt: "5" }, "Radius"), e42.createElement(o19, { columns: "5", gap: "2", mt: "3", role: "group", "aria-labelledby": "radius-title" }, s4.radius.values.map((t35) => e42.createElement(p12, { key: t35, direction: "column", align: "center" }, e42.createElement("label", { className: "rt-ThemePanelRadioCard" }, e42.createElement("input", { className: "rt-ThemePanelRadioCardInput", type: "radio", name: "radius", id: `theme-panel-radius-${t35}`, value: t35, checked: w3 === t35, onChange: (o59) => D3(o59.target.value) }), e42.createElement(R2, { asChild: true, radius: t35 }, e42.createElement(p9, { m: "3", width: "32px", height: "32px", style: { borderTopLeftRadius: t35 === "full" ? "80%" : "var(--radius-5)", backgroundImage: "linear-gradient(to bottom right, var(--accent-3), var(--accent-4))", borderTop: "2px solid var(--accent-a8)", borderLeft: "2px solid var(--accent-a8)" } }))), e42.createElement(p9, { asChild: true, pt: "2" }, e42.createElement(p, { asChild: true, size: "1", color: "gray" }, e42.createElement("label", { htmlFor: `theme-panel-radius-${t35}` }, C6(t35))))))), e42.createElement(p, { id: "scaling-title", as: "p", size: "2", weight: "medium", mt: "5" }, "Scaling"), e42.createElement(o19, { columns: "5", gap: "2", mt: "3", role: "group", "aria-labelledby": "scaling-title" }, s4.scaling.values.map((t35) => e42.createElement("label", { key: t35, className: "rt-ThemePanelRadioCard" }, e42.createElement("input", { className: "rt-ThemePanelRadioCardInput", type: "radio", name: "scaling", value: t35, checked: x4 === t35, onChange: (o59) => j(o59.target.value) }), e42.createElement(p12, { align: "center", justify: "center", height: "32px" }, e42.createElement(R2, { asChild: true, scaling: t35 }, e42.createElement(p12, { align: "center", justify: "center" }, e42.createElement(p, { size: "1", weight: "medium" }, C6(t35)))))))), e42.createElement(p12, { mt: "5", align: "center", gap: "2" }, e42.createElement(p, { id: "panel-background-title", as: "p", size: "2", weight: "medium" }, "Panel background"), e42.createElement(popover_exports.Root, null, e42.createElement(popover_exports.Trigger, null, e42.createElement(o29, { size: "1", variant: "ghost", color: "gray" }, e42.createElement(s, { label: "Learn more about panel background options" }, e42.createElement("svg", { width: "15", height: "15", viewBox: "0 0 15 15", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg" }, e42.createElement("path", { d: "M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z", fillRule: "evenodd", clipRule: "evenodd" }))))), e42.createElement(popover_exports.Content, { size: "1", style: { maxWidth: 220 }, side: "top", align: "center" }, e42.createElement(p, { as: "p", size: "2" }, "Whether Card and Table panels are translucent, showing some of the background behind them.")))), e42.createElement(o19, { columns: "2", gap: "2", mt: "3", role: "group", "aria-labelledby": "panel-background-title" }, s4.panelBackground.values.map((t35) => e42.createElement("label", { key: t35, className: "rt-ThemePanelRadioCard" }, e42.createElement("input", { className: "rt-ThemePanelRadioCardInput", type: "radio", name: "panelBackground", value: t35, checked: T6 === t35, onChange: (o59) => O2(o59.target.value) }), e42.createElement(p12, { align: "center", justify: "center", height: "32px", gap: "2" }, t35 === "solid" ? e42.createElement("svg", { width: "15", height: "15", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg", style: { margin: "0 -2px" } }, e42.createElement("path", { d: "M0.877075 7.49988C0.877075 3.84219 3.84222 0.877045 7.49991 0.877045C11.1576 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49988ZM7.49991 1.82704C4.36689 1.82704 1.82708 4.36686 1.82708 7.49988C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49991 1.82704Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" })) : e42.createElement("svg", { width: "15", height: "15", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg", style: { margin: "0 -2px" } }, e42.createElement("path", { opacity: ".05", d: "M6.78296 13.376C8.73904 9.95284 8.73904 5.04719 6.78296 1.62405L7.21708 1.37598C9.261 4.95283 9.261 10.0472 7.21708 13.624L6.78296 13.376Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" }), e42.createElement("path", { opacity: ".1", d: "M7.28204 13.4775C9.23929 9.99523 9.23929 5.00475 7.28204 1.52248L7.71791 1.2775C9.76067 4.9119 9.76067 10.0881 7.71791 13.7225L7.28204 13.4775Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" }), e42.createElement("path", { opacity: ".15", d: "M7.82098 13.5064C9.72502 9.99523 9.72636 5.01411 7.82492 1.50084L8.26465 1.26285C10.2465 4.92466 10.2451 10.085 8.26052 13.7448L7.82098 13.5064Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" }), e42.createElement("path", { opacity: ".2", d: "M8.41284 13.429C10.1952 9.92842 10.1957 5.07537 8.41435 1.57402L8.85999 1.34729C10.7139 4.99113 10.7133 10.0128 8.85841 13.6559L8.41284 13.429Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" }), e42.createElement("path", { opacity: ".25", d: "M9.02441 13.2956C10.6567 9.8379 10.6586 5.17715 9.03005 1.71656L9.48245 1.50366C11.1745 5.09919 11.1726 9.91629 9.47657 13.5091L9.02441 13.2956Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" }), e42.createElement("path", { opacity: ".3", d: "M9.66809 13.0655C11.1097 9.69572 11.1107 5.3121 9.67088 1.94095L10.1307 1.74457C11.6241 5.24121 11.6231 9.76683 10.1278 13.2622L9.66809 13.0655Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" }), e42.createElement("path", { opacity: ".35", d: "M10.331 12.7456C11.5551 9.52073 11.5564 5.49103 10.3347 2.26444L10.8024 2.0874C12.0672 5.42815 12.0659 9.58394 10.7985 12.9231L10.331 12.7456Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" }), e42.createElement("path", { opacity: ".4", d: "M11.0155 12.2986C11.9938 9.29744 11.9948 5.71296 11.0184 2.71067L11.4939 2.55603C12.503 5.6589 12.502 9.35178 11.4909 12.4535L11.0155 12.2986Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" }), e42.createElement("path", { opacity: ".45", d: "M11.7214 11.668C12.4254 9.01303 12.4262 5.99691 11.7237 3.34116L12.2071 3.21329C12.9318 5.95292 12.931 9.05728 12.2047 11.7961L11.7214 11.668Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" }), e42.createElement("path", { opacity: ".5", d: "M12.4432 10.752C12.8524 8.63762 12.8523 6.36089 12.4429 4.2466L12.9338 4.15155C13.3553 6.32861 13.3554 8.66985 12.9341 10.847L12.4432 10.752Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" }), e42.createElement("path", { d: "M0.877075 7.49988C0.877075 3.84219 3.84222 0.877045 7.49991 0.877045C11.1576 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49988ZM7.49991 1.82704C4.36689 1.82704 1.82708 4.36686 1.82708 7.49988C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49991 1.82704Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" })), e42.createElement(p, { size: "1", weight: "medium" }, C6(t35)))))), e42.createElement(o15, { mt: "5", style: { width: "100%" }, onClick: U }, W2 === "copied" ? "Copied" : "Copy Theme")))));
});
z.displayName = "ThemePanelImpl";
function a92() {
  const n26 = document.createElement("style");
  return n26.appendChild(document.createTextNode("*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")), document.head.appendChild(n26), () => {
    window.getComputedStyle(document.body), setTimeout(() => {
      document.head.removeChild(n26);
    }, 1);
  };
}
function C6(n26) {
  return n26.charAt(0).toUpperCase() + n26.slice(1);
}
function l92(n26) {
  const a39 = document.documentElement, l13 = a39.classList.contains("light-theme"), c5 = a39.classList.contains("dark-theme"), h4 = a39.classList.contains("light"), v11 = a39.classList.contains("dark");
  (l13 || c5) && (a39.classList.remove("light-theme", "dark-theme"), a39.style.colorScheme = n26, a39.classList.add(`${n26}-theme`)), (h4 || v11) && (a39.classList.remove("light", "dark"), a39.style.colorScheme = n26, a39.classList.add(n26)), !l13 && !c5 && !h4 && !v11 && (a39.style.colorScheme = n26, a39.classList.add(n26));
}

// node_modules/@radix-ui/themes/dist/esm/components/tooltip.js
var o58 = __toESM(require_react(), 1);
var import_classnames54 = __toESM(require_classnames(), 1);

// node_modules/@radix-ui/themes/dist/esm/components/tooltip.props.js
var e44 = { content: { type: "ReactNode", required: true }, width: t.width, minWidth: t.minWidth, maxWidth: { ...t.maxWidth, default: "360px" } };

// node_modules/@radix-ui/themes/dist/esm/components/tooltip.js
var e43 = o58.forwardRef((i24, p37) => {
  const { children: r46, className: n26, open: s26, defaultOpen: l13, onOpenChange: m16, delayDuration: a39, disableHoverableContent: f21, content: P9, container: T6, forceMount: c5, ...d10 } = v(i24, e44), C7 = { open: s26, defaultOpen: l13, onOpenChange: m16, delayDuration: a39, disableHoverableContent: f21 };
  return o58.createElement(dist_exports26.Root, { ...C7 }, o58.createElement(dist_exports26.Trigger, { asChild: true }, r46), o58.createElement(dist_exports26.Portal, { container: T6, forceMount: c5 }, o58.createElement(R2, { asChild: true }, o58.createElement(dist_exports26.Content, { sideOffset: 4, collisionPadding: 10, ...d10, asChild: false, ref: p37, className: (0, import_classnames54.default)("rt-TooltipContent", n26) }, o58.createElement(p, { as: "p", className: "rt-TooltipText", size: "1" }, P9), o58.createElement(dist_exports26.Arrow, { className: "rt-TooltipArrow" })))));
});
e43.displayName = "Tooltip";
export {
  s as AccessibleIcon,
  alert_dialog_exports as AlertDialog,
  i2 as AspectRatio,
  i3 as Avatar,
  e14 as Badge,
  e15 as Blockquote,
  p9 as Box,
  o15 as Button,
  callout_exports as Callout,
  o17 as Card,
  c as Checkbox,
  checkbox_cards_exports as CheckboxCards,
  checkbox_group_exports as CheckboxGroup,
  i7 as ChevronDownIcon,
  p16 as Code,
  p18 as Container,
  context_menu_exports as ContextMenu,
  data_list_exports as DataList,
  dialog_exports as Dialog,
  dropdown_menu_exports as DropdownMenu,
  e27 as Em,
  p12 as Flex,
  o19 as Grid,
  r6 as Heading,
  hover_card_exports as HoverCard,
  o29 as IconButton,
  e29 as Inset,
  r28 as Kbd,
  e31 as Link,
  popover_exports as Popover,
  r30 as Portal,
  s21 as Progress,
  e32 as Quote,
  e33 as Radio,
  radio_cards_exports as RadioCards,
  radio_group_exports as RadioGroup,
  o43 as Reset,
  c2 as ScrollArea,
  r33 as Section,
  segmented_control_exports as SegmentedControl,
  select_exports as Select,
  o48 as Separator,
  r38 as Skeleton,
  s23 as Slider,
  e16 as Slot,
  r9 as Slottable,
  s9 as Spinner,
  r39 as Strong,
  i20 as Switch,
  tab_nav_exports as TabNav,
  table_exports as Table,
  tabs_exports as Tabs,
  p as Text,
  r44 as TextArea,
  text_field_exports as TextField,
  R2 as Theme,
  P as ThemeContext,
  N7 as ThemePanel,
  t12 as ThickCheckIcon,
  l7 as ThickChevronRightIcon,
  r18 as ThickDividerHorizontalIcon,
  e43 as Tooltip,
  d4 as VisuallyHidden,
  H as useThemeContext
};
/*! Bundled license information:

classnames/index.js:
  (*!
  	Copyright (c) 2018 Jed Watson.
  	Licensed under the MIT License (MIT), see
  	http://jedwatson.github.io/classnames
  *)
*/
//# sourceMappingURL=@radix-ui_themes.js.map
