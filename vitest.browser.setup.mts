import { ChromeStorage } from "./e2e-tests/fixtures/ChromeStorage.mock";
if (globalThis.chrome === undefined) {
  globalThis.chrome = {
    // @ts-expect-error -- ignore ---
    storage: new ChromeStorage(),
  };
} else {
  // @ts-expect-error -- ignore ---
  chrome["storage"] = new ChromeStorage();
}
