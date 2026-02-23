import { expect, test } from "./fixtures/expect";
import { Dialog } from "@playwright/test";
import { createTestScriptInterpolation } from "./fixtures/createTestScriptInterpolation";

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

  await createTestScriptInterpolation({
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
  await createTestScriptInterpolation({
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
