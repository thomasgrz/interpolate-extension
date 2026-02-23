import { createTestHeaderInterpolation } from "./fixtures/createTestHeaderInterpolation.ts";
import { createTestRedirectInterpolation } from "./fixtures/createTestRedirectInterpolation.ts";
import { createTestScriptInterpolation } from "./fixtures/createTestScriptInterpolation.ts";
import { expect, test } from "./fixtures/expect.ts";

test("should display toast notification for script interpolation", async ({
  page,
  extensionId,
}) => {
  await createTestScriptInterpolation({
    page,
    extensionId,
    script: "console.log(null);",
    name: "no op script",
  });

  const toast = page.getByTestId("script-preview-no op script");

  await toast.scrollIntoViewIfNeeded();
  expect(toast).toBeVisible();
});

test("should display toast noticications for header interpolation", async ({
  page,
  extensionId,
}) => {
  await createTestHeaderInterpolation({
    page,
    extensionId,
    headerName: "x-foo",
    headerValue: "bar",
    name: "foobar",
  });

  const toast = page.getByTestId("headers-preview-foobar");

  await toast.scrollIntoViewIfNeeded();
  expect(toast).toBeVisible();
});

test("should display toast notifications for redirect interpolations", async ({
  page,
  extensionId,
}) => {
  await createTestRedirectInterpolation({
    page,
    extensionId,
    name: "boobaz",
    destination: "https://example.com",
    source: ".*google.com.*",
  });

  await page.goto("https://google.com");
  await page.reload();
  const content = page.getByText("Example domain");

  await content.waitFor({ state: "visible" });
  const toast = page.getByTestId("redirect-preview-boobaz");

  await toast.scrollIntoViewIfNeeded();
  expect(toast).toBeVisible();
});
