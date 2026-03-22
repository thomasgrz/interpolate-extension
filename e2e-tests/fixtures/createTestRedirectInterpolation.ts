import { openInterpolationOptionsModal } from "./openInterpolationOptionsModal";
import { RedirectFormPlaceholder } from "../../src/components/RedirectForm/RedirectForm.constants.ts";

export const createTestRedirectInterpolation = async (arg: {
  page: any;
  name: string;
  source: string;
  destination: string;
  extensionId: string;
}) => {
  const { source, destination, page, extensionId, name } = arg;

  await openInterpolationOptionsModal({ extensionId, page });
  await page.getByText("Redirect requests").click();
  await page
    .getByPlaceholder(RedirectFormPlaceholder.INTERPOLATION_NAME)
    .fill(name);
  await page
    .getByPlaceholder(RedirectFormPlaceholder.REDIRECT_FROM)
    .fill(source);
  await page
    .getByPlaceholder(RedirectFormPlaceholder.REDIRECT_TO)
    .fill(destination);
  await page.getByText("Create redirect").click();
  const preview = page.getByText(name);
  await preview.waitFor({ state: "visible" });
};
