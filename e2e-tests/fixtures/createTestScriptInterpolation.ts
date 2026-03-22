import { UserScriptFormPlaceholder } from "#src/components/UserScriptForm/UserScriptForm.types.ts";
import { openInterpolationOptionsModal } from "./openInterpolationOptionsModal";

export const createTestScriptInterpolation = async (arg: {
  page: any;
  name: string;
  script: string;
  extensionId: string;
  runAt?: "document_start" | "document_idle" | "document_end";
  endOnOptionsPage?: boolean;
}) => {
  const { extensionId, name, page, script, endOnOptionsPage } = arg;
  await page.goto(`chrome-extension://${extensionId}/src/options/index.html`);

  await openInterpolationOptionsModal({ extensionId, page });
  await page.getByText("Create user script").click();

  await page
    .getByPlaceholder(UserScriptFormPlaceholder.INTERPOLATION_NAME)
    .fill(name);
  // fill interpolation script
  await page
    .getByPlaceholder(UserScriptFormPlaceholder.SCRIPT_BODY)
    .fill(script);
  // select run at value
  // await page.getByText(UserScriptFormPlaceholder.RUN_AT).click();
  await page.getByText("Create script").click();

  await page.getByTestId(/script-preview-.*/).waitFor();

  if (endOnOptionsPage) return;
  await page.goto("https://example.com");
};
