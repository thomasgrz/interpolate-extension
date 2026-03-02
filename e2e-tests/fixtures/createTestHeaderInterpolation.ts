import { HeaderFormPlaceholder } from "#src/components/HeaderForm/HeaderForm.tsx";
import { FormType } from "#src/constants.ts";
import { openInterpolationOptionsModal } from "./openInterpolationOptionsModal";

export const createTestHeaderInterpolation = async (arg: {
  page: any;
  name: string;
  headerName: string;
  headerValue: string;
  extensionId: string;
}) => {
  const { name, headerName, headerValue, page, extensionId } = arg;

  await openInterpolationOptionsModal({ extensionId, page });
  await page.getByText("Add headers").click();
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
  await page.getByText("Create header interpolation").click();
  await page.getByTestId(`headers-preview-${name}`).waitFor();
  await page.goto("https://httpbin.org/headers");
  await page.goto(
    `chrome-extension://${arg.extensionId}/src/options/index.html`,
  );
};
