import { Page } from "@playwright/test";
import { http, HttpResponse } from "msw";
import { expect, test } from "../fixtures/expect";

const createRedirectRule = async (arg: {
  page: Page;
  source: string;
  destination: string;
  extensionId: string;
}) => {
  const { source, destination, page, extensionId } = arg;
  await page.goto(`chrome-extension://${extensionId}/src/options/index.html`);

  await page.getByPlaceholder(/example/).fill(source);
  await page.getByPlaceholder(/google/).fill(destination);
  await page.getByText("Create redirect").click();
};

test("should apply redirect rule", async ({ page, network, extensionId }) => {
  network.use(
    http.get("https://example.com/*", (args) => {
      return HttpResponse.text(
        `<html><body><h1>Example Domain</h1></body></html>`,
      );
    }),
  );
  await createRedirectRule({
    page,
    source: ".*something.*",
    destination: "https://example.com/*",
    extensionId,
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
  });

  await createRedirectRule({
    page,
    source: ".*google.*",
    destination: "https://example.com/test2",
    extensionId,
  });

  // Pause the extension
  await page.locator("data-testid=pause-rule-toggle").nth(0).click();

  await page.goto("https://something.com");
  await expect(page).toHaveURL("https://example.com/test");
  await page.goto("https://google.com");
  await expect(page).toHaveURL(/https:\/\/www.google.com/);
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
  });

  await createRedirectRule({
    page,
    source: ".*google.*",
    destination: "https://example.com/test2",
    extensionId,
  });

  // Activate global pause
  await page.getByRole("button", { name: /Pause/ }).click();
  await page.goto("https://something.com");
  await expect(page).toHaveURL("https://something.com/");

  await page.goto("https://www.google.com");
  await expect(page).toHaveURL("https://www.google.com/");
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
  });

  await createRedirectRule({
    page,
    source: ".*google.*",
    destination: "https://example.com/test2",
    extensionId,
  });

  // Activate global pause
  await page.getByRole("button", { name: /Pause/ }).click();
  // Deactivate global pause
  await page.getByRole("button", { name: /Resume/ }).click();

  await page.goto("https://something.com");
  await expect(page).toHaveURL("https://example.com/test");

  await page.goto("https://www.google.com");
  await expect(page).toHaveURL("https://example.com/test2");
});
