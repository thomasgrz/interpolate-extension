import { vi } from "vitest";
import { ChromeStorage } from "./e2e-tests/fixtures/ChromeStorage.mock";

vi.stubGlobal("chrome", {
  storage: new ChromeStorage(),
});
