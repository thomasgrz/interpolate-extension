import { RedirectFormPlaceholder } from "#src/components/RedirectForm/RedirectForm.tsx";

export const createTestRedirectInterpolation = async (arg: {
  page: any;
  name: string;
  source: string;
  destination: string;
  extensionId: string;
}) => {
  const { source, destination, page, extensionId, name } = arg;
  await page.goto("https://google.com");

  await page.goto(`chrome-extension://${extensionId}/src/options/index.html`);
  const dashboard = page.getByTestId("dashboard");
  await dashboard.waitFor({ state: "attached" });
  await dashboard.waitFor({ state: "visible" });
  await page
    .getByPlaceholder(RedirectFormPlaceholder.INTERPOLATION_NAME)
    .fill(name);
  await page
    .getByPlaceholder(RedirectFormPlaceholder.REDIRECT_FROM)
    .fill(source);
  await page
    .getByPlaceholder(RedirectFormPlaceholder.REDIRECT_TO)
    .fill(destination);
  await page.getByText("Create Interpolation").click();
  const preview = page.getByText(name);
  await preview.waitFor({ state: "visible" });
};
