import { expect, test } from "./fixtures/expect";
import { createTestRedirectInterpolation } from "./fixtures/createTestRedirectInterpolation";

test("should apply redirect interpolation", async ({
  page,
  network,
  extensionId,
}) => {
  await createTestRedirectInterpolation({
    page,
    source: ".*something.*",
    destination: "https://example.com/*",
    extensionId,
    name: "rule #1",
  });

  await page.goto("https://something.com");
  await expect(page.getByText(/Example Domain/)).toBeVisible();
});

test("should not apply paused redirect interpolation", async ({
  page,
  extensionId,
}) => {
  await createTestRedirectInterpolation({
    page,
    source: ".*something.*",
    destination: "https://example.com/*",
    extensionId,
    name: "rule #2",
  });

  // Pause the extension
  await page.locator("data-testid=pause-rule-toggle").click();

  await page.goto("https://something.com");
  await expect(page).toHaveURL("https://something.com/");
});

test("should selectively apply redirect interpolation if enabled", async ({
  page,
  extensionId,
}) => {
  await createTestRedirectInterpolation({
    page,
    source: ".*something.*",
    destination: "https://example.com/test",
    extensionId,
    name: "rule #3",
  });

  await createTestRedirectInterpolation({
    page,
    source: ".*google.*",
    destination: "https://example.com/test2",
    extensionId,
    name: "rule #4",
  });

  // Pause the extension
  await page.locator("data-testid=pause-rule-toggle").nth(0).click();

  // await page.goto("https://something.com");
  // await expect(page).toHaveURL("https://example.com/test");
  // await page.goto("https://google.com");
  // await expect(page).toHaveURL(/https:\/\/www.google.com/);
});

test("should disable all interpolations when global pause is activated", async ({
  extensionId,
  page,
}) => {
  await createTestRedirectInterpolation({
    page,
    source: ".*something.*",
    destination: "https://example.com/test",
    extensionId,
    name: "rule #5",
  });

  await createTestRedirectInterpolation({
    page,
    source: ".*google.*",
    destination: "https://example.com/test2",
    extensionId,
    name: "rule #6",
  });

  // Activate global pause
  await page.getByText(/Pause/).click();
  // validate that the rule has been paused (play icon is shown)
  // const resumeToggle = await page.("data-testid=play-rule-toggle");
  // await resumeToggle.waitFor({ state: "visible" });
  await page.goto("https://something.com");
  await expect(page).toHaveURL("https://something.com/");

  await page.goto("https://www.google.com");
  expect(page.url()).toContain("https://www.google.com/");
});

test("should re-enable intperolations when global pause is deactivated", async ({
  extensionId,
  page,
}) => {
  await createTestRedirectInterpolation({
    page,
    source: ".*something.*",
    destination: "https://example.com/test",
    extensionId,
    name: "rule #7",
  });

  await createTestRedirectInterpolation({
    page,
    source: ".*google.*",
    destination: "https://example.com/test2",
    extensionId,
    name: "rule #8",
  });

  // Activate global pause
  await page.getByRole("button", { name: /Pause/ }).click();
  // Deactivate global pause
  await page.getByRole("button", { name: /Resume/ }).click();

  await page.goto("https://something.com");

  await page.goto("https://www.google.com");
  expect(page.getByText("Example Domain")).toBeVisible();
});
