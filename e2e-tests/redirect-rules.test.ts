import { Page } from "@playwright/test";
import { expect, test } from "./fixtures/expect";

const createRedirectRule = async (arg: {
  page: Page;
  ruleName: string;
  source: string;
  destination: string;
  extensionId: string;
}) => {
  const { source, destination, page, extensionId, ruleName } = arg;
  await page.goto(`chrome-extension://${extensionId}/src/options/index.html`);
  const dashboard = page.getByTestId("dashboard");
  await dashboard.waitFor({ state: "attached" });
  await dashboard.waitFor({ state: "visible" });
  await page.getByPlaceholder(/example/).fill(source);
  await page.getByPlaceholder(/Cool Redirect/).fill(ruleName);
  await page.getByPlaceholder(/google/).fill(destination);
  await page.getByText("Create redirect").click();
  const preview = page.getByText(ruleName);
  await preview.waitFor({ state: "visible" });
};

test("should apply redirect rule", async ({ page, network, extensionId }) => {
  await createRedirectRule({
    page,
    source: ".*something.*",
    destination: "https://example.com/*",
    extensionId,
    ruleName: "rule #1",
  });

  await page.goto("https://something.com");
  await expect(page.getByText(/Example Domain/)).toBeVisible();
});

test("should not apply paused redirect rule", async ({ page, extensionId }) => {
  await createRedirectRule({
    page,
    source: ".*something.*",
    destination: "https://example.com/*",
    extensionId,
    ruleName: "rule #2",
  });

  // Pause the extension
  await page.locator("data-testid=pause-rule-toggle").click();

  await page.goto("https://something.com");
  await expect(page).toHaveURL("https://something.com/");
});

test("should selectively apply redirect rule if enabled", async ({
  page,
  extensionId,
}) => {
  await createRedirectRule({
    page,
    source: ".*something.*",
    destination: "https://example.com/test",
    extensionId,
    ruleName: "rule #3",
  });

  await createRedirectRule({
    page,
    source: ".*google.*",
    destination: "https://example.com/test2",
    extensionId,
    ruleName: "rule #4",
  });

  // Pause the extension
  await page.locator("data-testid=pause-rule-toggle").nth(0).click();

  // await page.goto("https://something.com");
  // await expect(page).toHaveURL("https://example.com/test");
  // await page.goto("https://google.com");
  // await expect(page).toHaveURL(/https:\/\/www.google.com/);
});

test("should disable all rules when global pause is activated", async ({
  extensionId,
  page,
}) => {
  await createRedirectRule({
    page,
    source: ".*something.*",
    destination: "https://example.com/test",
    extensionId,
    ruleName: "rule #5",
  });

  await createRedirectRule({
    page,
    source: ".*google.*",
    destination: "https://example.com/test2",
    extensionId,
    ruleName: "rule #6",
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

test("should re-enable rules when global pause is deactivated", async ({
  extensionId,
  page,
}) => {
  await createRedirectRule({
    page,
    source: ".*something.*",
    destination: "https://example.com/test",
    extensionId,
    ruleName: "rule #7",
  });

  await createRedirectRule({
    page,
    source: ".*google.*",
    destination: "https://example.com/test2",
    extensionId,
    ruleName: "rule #8",
  });

  // Activate global pause
  await page.getByRole("button", { name: /Pause/ }).click();
  // Deactivate global pause
  await page.getByRole("button", { name: /Resume/ }).click();

  await page.goto("https://something.com");
  await expect(page).toHaveURL("https://example.com/test");

  await page.goto("https://www.google.com");
  expect(page.url()).toContain("https://example.com/test2");
});
