import { expect, test } from "./fixtures/expect";
import { Dialog } from "@playwright/test";
import { createTestScriptInterpolation } from "./fixtures/createTestScriptInterpolation";
import { enableUserScriptsForExtension } from "./fixtures/enableUserScriptsForExtension";

test.beforeEach(async ({ page }) => {
  await enableUserScriptsForExtension({ page });
});

test("should apply script interpolation", async ({ page, extensionId }) => {
  page.on("dialog", async (dialog: Dialog) => {
    const message = dialog.message();

    expect(message).toBe("hello world");
    dialog.accept();
  });

  await createTestScriptInterpolation({
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
  await page.goto(`chrome-extension://${extensionId}/src/options/index.html`);
  await page.getByText("Browser UI").click();
  await createTestScriptInterpolation({
    page,
    extensionId,
    runAt: "document_start",
    script: "alert('hello world');",
    name: "test script",
  });

  const pauseAll = page.getByText("Pause all");
  await pauseAll.scrollIntoViewIfNeeded();
  await pauseAll.click();

  let invokedWhilePaused = false;
  page.on("dialog", async (dialog: Dialog) => {
    invokedWhilePaused = true;
    dialog.accept();
  });

  await page.reload();

  expect(invokedWhilePaused).toBe(false);
});

test("should resume a script", async ({ page, extensionId }) => {
  let invokedWhilePaused = false;

  page.on("dialog", async (dialog: Dialog) => {
    invokedWhilePaused = true;
    dialog.accept();
  });

  await page.goto(`chrome-extension://${extensionId}/src/options/index.html`);
  await page.getByText("Browser UI").click();
  await createTestScriptInterpolation({
    page,
    extensionId,
    runAt: "document_start",
    script: "alert('hello world');",
    name: "test script",
  });

  const globalPause = page.getByText("Pause all");
  invokedWhilePaused = false;

  await globalPause.scrollIntoViewIfNeeded();

  await globalPause.click();
  await page.reload();

  expect(invokedWhilePaused).toBe(false);

  await page.getByText("Resume").click();

  await page.reload();

  expect(invokedWhilePaused).toBe(true);
});

test.only("should edit a script in place", async ({ page, extensionId }) => {
  await createTestScriptInterpolation({
    page,
    extensionId,
    runAt: "document_start",
    script: "alert('hello world');",
    name: "test script",
    endOnOptionsPage: true,
  });

  const options = page.getByTestId("interpolation-options-trigger");

  await options.isVisible();

  await options.click();

  const edit = page.getByText("Edit");

  await edit.click();

  const editForm = page.getByText("Script interpolation");

  const name = page.getByLabel("Name:");

  await expect(name).toBeVisible();
  await name.click();

  await name.fill("example 2");

  await page.getByText("Create script interpolation").click();
  await page.getByTestId(/script-preview-example 2/).waitFor();
  expect(page.getByText("test script")).not.toBeInViewport();
});
