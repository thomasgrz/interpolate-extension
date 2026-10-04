import { TestInterface } from "./expect";

export const testGoToOptionsPage = ({ extensionId, page }: TestInterface) =>
  page.goto(`chrome-extension://${extensionId}/src/options/index.html`);
