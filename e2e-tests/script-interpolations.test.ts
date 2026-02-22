import { expect, test } from "./fixtures/expect";
import { ScriptFormPlaceholder } from "../src/components/ScriptForm/ScriptForm.types";
import { Dialog } from "@playwright/test";

const createScriptInterpolation = async (arg: {
  page: any;
  name: string;
  script: string;
  extensionId: string;
  runAt: "document_start" | "document_idle" | "document_end";
}) => {
  const { extensionId, name, page, script } = arg;

  await page.goto("chrome://extensions");
  await page.getByText("Details").click();
  const allowScriptsBox = await page.locator("[id='allow-user-scripts']");
  await allowScriptsBox.getByRole("button").click();
  await page.goto(`chrome-extension://${extensionId}/src/options/index.html`);
  const dashboard = page.getByTestId("dashboard");
  await dashboard.waitFor({ state: "attached" });
  await dashboard.waitFor({ state: "visible" });
  const scriptFormLabel = await page.getByTestId("script-form-option").first();
  // fill interpolation name field
  await scriptFormLabel.click();
  await page
    .getByPlaceholder(ScriptFormPlaceholder.INTERPOLATION_NAME)
    .fill(name);
  // fill interpolation script
  await page.getByPlaceholder(ScriptFormPlaceholder.SCRIPT_BODY).fill(script);
  // select run at value
  // await page.getByText(ScriptFormPlaceholder.RUN_AT).click();
  await page.getByText("Create interpolation").click();
  await page.getByTestId(/script-preview-.*/).waitFor();
  await page.goto("https://example.com");
};

test("should apply script interpolation", async ({
  page,
  network,
  extensionId,
}) => {
  page.on("dialog", async (dialog: Dialog) => {
    const message = dialog.message();

    expect(message).toBe("hello world");
    dialog.accept();
  });

  await createScriptInterpolation({
    page,
    extensionId,
    runAt: "document_start",
    script: "alert('hello world');",
    name: "test script",
  });
});

test("should pause a script", async ({ page, extensionId }) => {
  page.on("dialog", async (dialog: Dialog) => {
    const message = dialog.message();

    expect(message).toBe("hello world");
    dialog.accept();
  });

  await createScriptInterpolation({
    page,
    extensionId,
    runAt: "document_start",
    script: "alert('hello world');",
    name: "test script",
  });

  await page.getByText("Pause").click();

  let invokedWhilePaused = false;
  page.on("dialog", async (dialog: Dialog) => {
    invokedWhilePaused = true;
    dialog.accept();
  });

  await page.reload();

  expect(invokedWhilePaused).toBe(false);
});

test("should resume a script", async ({ page, extensionId }) => {
  await createScriptInterpolation({
    page,
    extensionId,
    runAt: "document_start",
    script: "alert('hello world');",
    name: "test script",
  });

  await page.getByText("Pause").click();

  let invokedWhilePaused = false;
  page.on("dialog", async (dialog: Dialog) => {
    invokedWhilePaused = true;
    dialog.accept();
  });

  await page.reload();

  expect(invokedWhilePaused).toBe(false);

  await page.getByText("Resume").click();

  await page.reload();

  expect(invokedWhilePaused).toBe(true);
});
