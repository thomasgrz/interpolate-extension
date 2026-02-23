import { HeaderFormPlaceholder } from "#src/components/HeaderForm/HeaderForm.tsx";
import { FormType } from "#src/constants.ts";

export const createTestHeaderInterpolation = async (arg: {
  page: any;
  name: string;
  headerName: string;
  headerValue: string;
  extensionId: string;
}) => {
  const { name, headerName, headerValue, page } = arg;
  await page.goto(
    `chrome-extension://${arg.extensionId}/src/options/index.html`,
  );
  const dashboard = await page.getByTestId("dashboard");
  await dashboard.waitFor({ state: "attached" });
  await dashboard.waitFor({ state: "visible" });
  await page.getByRole("radio", { name: FormType.HEADER }).click();
  // fill interpolation name field
  await page
    .getByPlaceholder(HeaderFormPlaceholder.INTERPOLATION_NAME)
    .fill(name);
  // fill interpolation header name
  await page
    .getByPlaceholder(HeaderFormPlaceholder.HEADER_KEY)
    .fill(headerName);
  // file interpolation header value
  await page
    .getByPlaceholder(HeaderFormPlaceholder.HEADER_VALUE)
    .fill(headerValue);
  await page.getByText("Create Interpolation").click();
  await page.getByTestId(/headers-preview-.*/).waitFor();

  await page.goto("https://httpbin.org/headers");
  await page.goto(
    `chrome-extension://${arg.extensionId}/src/options/index.html`,
  );
};
