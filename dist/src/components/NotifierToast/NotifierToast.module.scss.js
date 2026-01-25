import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/components/NotifierToast/NotifierToast.module.scss.js");import { updateStyle as __vite__updateStyle, removeStyle as __vite__removeStyle } from "/vendor/vite-client.js"
const __vite__id = "/Users/tommygrzesiakowski/Developer/interpolate-extension.git/maintenance/fix-ci/src/components/NotifierToast/NotifierToast.module.scss"
const __vite__css = "._ToastViewport_fosw9_1 {\n  --viewport-padding: 0.25rem;\n  display: flex;\n  flex-direction: column;\n  padding: var(--viewport-padding);\n  gap: 10px;\n  max-width: 100vw;\n  margin: 0;\n  list-style: none;\n  z-index: 2147483647;\n  outline: none;\n}\n\n._ToastRoot_fosw9_14 {\n  display: flex;\n  border-radius: 6px;\n  box-shadow: hsla(206, 22%, 7%, 0.35) 0px 10px 38px -10px, hsla(206, 22%, 7%, 0.2) 0px 10px 20px -15px;\n  column-gap: 15px;\n  align-items: center;\n}\n\n._ToastRoot_fosw9_14[data-state=open] {\n  animation: _slideIn_fosw9_1 150ms cubic-bezier(0.16, 1, 0.3, 1);\n}\n\n._ToastRoot_fosw9_14[data-state=closed] {\n  animation: _hide_fosw9_1 100ms ease-in;\n}\n\n._ToastRoot_fosw9_14[data-swipe=move] {\n  transform: translateX(var(--radix-toast-swipe-move-x));\n}\n\n._ToastRoot_fosw9_14[data-swipe=cancel] {\n  transform: translateX(0);\n  transition: transform 200ms ease-out;\n}\n\n._ToastRoot_fosw9_14[data-swipe=end] {\n  animation: _swipeOut_fosw9_1 100ms ease-out;\n}\n\n@keyframes _hide_fosw9_1 {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n@keyframes _slideIn_fosw9_1 {\n  from {\n    transform: translateX(calc(100% + var(--viewport-padding)));\n  }\n  to {\n    transform: translateX(0);\n  }\n}\n@keyframes _swipeOut_fosw9_1 {\n  from {\n    transform: translateX(var(--radix-toast-swipe-end-x));\n  }\n  to {\n    transform: translateX(calc(100% + var(--viewport-padding)));\n  }\n}\n._ToastTitle_fosw9_67 {\n  grid-area: title;\n  margin-bottom: 5px;\n  font-weight: 500;\n  color: var(--slate-12);\n  font-size: 15px;\n}\n\n._ToastDescription_fosw9_75 {\n  box-sizing: content-box;\n  grid-area: description;\n  margin: 0;\n  color: var(--slate-11);\n  font-size: 13px;\n  line-height: 1.3;\n}"
__vite__updateStyle(__vite__id, __vite__css)
export const ToastViewport = "_ToastViewport_fosw9_1";
export const ToastRoot = "_ToastRoot_fosw9_14";
export const slideIn = "_slideIn_fosw9_1";
export const hide = "_hide_fosw9_1";
export const swipeOut = "_swipeOut_fosw9_1";
export const ToastTitle = "_ToastTitle_fosw9_67";
export const ToastDescription = "_ToastDescription_fosw9_75";
export default {
	ToastViewport: ToastViewport,
	ToastRoot: ToastRoot,
	slideIn: slideIn,
	hide: hide,
	swipeOut: swipeOut,
	ToastTitle: ToastTitle,
	ToastDescription: ToastDescription
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id))