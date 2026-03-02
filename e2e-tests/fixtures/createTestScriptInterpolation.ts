import { ScriptFormPlaceholder } from "#src/components/ScriptForm/ScriptForm.types.ts";
import { enableUserScriptsForExtension } from "./enableUserScriptsForExtension";
import { openInterpolationOptionsModal } from "./openInterpolationOptionsModal";

export const createTestScriptInterpolation = async (arg: {
  page: any;
  name: string;
  script: string;
  extensionId: string;
  runAt?: "document_start" | "document_idle" | "document_end";
}) => {
  const { extensionId, name, page, script } = arg;
  await openInterpolationOptionsModal({ extensionId, page });
  await page.getByText("Create user script").click();
  await page
    .getByPlaceholder(ScriptFormPlaceholder.INTERPOLATION_NAME)
    .fill(name);
  // fill interpolation script
  await page.getByPlaceholder(ScriptFormPlaceholder.SCRIPT_BODY).fill(script);
  // select run at value
  // await page.getByText(ScriptFormPlaceholder.RUN_AT).click();
  await page.getByText("Create script interpolation").click();
  await page.getByTestId(/script-preview-.*/).waitFor();
  await page.goto("https://example.com");
};
