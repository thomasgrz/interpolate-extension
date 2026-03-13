import { AddHeaderFormPlaceholder } from "#src/components/AddHeaderForm/AddHeaderForm.tsx";
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
    .getByPlaceholder(AddHeaderFormPlaceholder.INTERPOLATION_NAME)
    .fill(name);
  // fill interpolation header name
  await page
    .getByPlaceholder(AddHeaderFormPlaceholder.HEADER_KEY)
    .fill(headerName);
  // file interpolation header value
  await page
    .getByPlaceholder(AddHeaderFormPlaceholder.HEADER_VALUE)
    .fill(headerValue);
  await page.getByText("Create header interpolation").click();
  await page.getByTestId(`headers-preview-${name}`).waitFor();
  await page.goto("https://httpbin.org/headers");
  await page.goto(
    `chrome-extension://${arg.extensionId}/src/options/index.html`,
  );
};
