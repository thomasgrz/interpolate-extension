import { expect, test } from "./fixtures/expect";
import { FormType } from "../src/constants";

const createHeaderRule = async (arg: {
  page: any;
  ruleName: string;
  headerName: string;
  headerValue: string;
  extensionId: string;
}) => {
  const { ruleName, headerName, headerValue, page } = arg;
  await page.goto(
    `chrome-extension://${arg.extensionId}/src/options/index.html`,
  );
  const dashboard = await page.getByTestId("dashboard");
  await dashboard.waitFor({ state: "attached" });
  await dashboard.waitFor({ state: "visible" });
  await page.getByRole("radio", { name: FormType.HEADER }).click();
  await page.getByPlaceholder(/Forwarded/).fill(headerName);
  await page.getByPlaceholder(/Cool Header/).fill(ruleName);
  await page.getByPlaceholder(/http/).fill(headerValue);
  await page.getByText("Create header").click();
  await page.goto("https://httpbin.org/headers");
  await page.goto(
    `chrome-extension://${arg.extensionId}/src/options/index.html`,
  );
};

test("should apply header rule", async ({ page, extensionId, network }) => {
  // Create a header modification rule
  await createHeaderRule({
    page,
    headerName: "X-Test-Header",
    headerValue: "ModRequest",
    extensionId,
    ruleName: "rule #1",
  });

  await page.getByTestId(/headers-preview-.*/).waitFor();
  // Navigate to a test page
  await page.goto("https://httpbin.org/headers");

  // Verify that the header has been added
  expect(await page.locator("pre").innerText()).toContain(
    '"X-Test-Header": "ModRequest"',
  );
});

test("should not apply header rule when paused", async ({
  page,
  extensionId,
}) => {
  // Create a header modification rule
  await createHeaderRule({
    page,
    headerName: "X-Test-Header",
    headerValue: "ModRequest",
    extensionId,
    ruleName: "rule #2",
  });

  // Pause the header rule
  await page.locator("data-testid=pause-rule-toggle").click();

  // Navigate to a test page
  await page.goto("https://httpbin.org/headers");

  // Verify that the header has NOT been added
  const headerContent = await page.locator("pre").innerText();
  expect(headerContent).not.toContain('"X-Test-Header": "ModRequest"');
});

test("should selectively apply header rule if enabled", async ({
  page,
  extensionId,
}) => {
  // Create a header modification rule
  await createHeaderRule({
    page,
    headerName: "X-Test-Header",
    headerValue: "ModRequest",
    extensionId,
    ruleName: "rule #3",
  });

  await createHeaderRule({
    page,
    headerName: "X-Another-Header",
    headerValue: "ShouldNotApply",
    extensionId,
    ruleName: "rule #4",
  });

  // Pause the second header rule
  const secondRuleToggle = page.locator("data-testid=pause-rule-toggle").nth(0); // 0th index is most recently added rule
  await secondRuleToggle.click();

  const firstRuleToggle = page.getByTestId("play-rule-toggle");
  await firstRuleToggle.waitFor({ state: "visible" });

  // Navigate to a test page
  await page.goto("https://httpbin.org/headers");

  // Verify that the first header has been added
  const headerContent = await page.locator("pre").innerText();
  expect(headerContent).not.toContain('"X-Test-Header": "ShouldNotApply"');

  // Verify that the second header has NOT been added
  expect(headerContent).not.toContain('"X-Another-Header": "Should Apply"');
});

test("should disable all header rules when global pause is activated", async ({
  page,
  extensionId,
}) => {
  // Create a header modification rule
  await createHeaderRule({
    page,
    headerName: "X-Test-Header",
    headerValue: "ModRequest",
    extensionId,
    ruleName: "rule #5",
  });

  await createHeaderRule({
    page,
    headerName: "X-Another-Header",
    headerValue: "ShouldNotApply",
    extensionId,
    ruleName: "rule #6",
  });

  // Activate global pause
  await page.getByRole("button", { name: "Pause" }).click();

  // Navigate to a test page
  await page.goto("https://httpbin.org/headers");

  // Verify that the header has NOT been added
  const headerContent = await page.locator("pre").innerText();
  expect(headerContent).not.toContain('"X-Test-Header": "ModRequest"');
});

test("should re-enable header rules when global pause is deactivated", async ({
  page,
  extensionId,
}) => {
  // Create a header modification rule
  await createHeaderRule({
    page,
    headerName: "X-Test-Header",
    headerValue: "ModRequest",
    extensionId,
    ruleName: "rule #7",
  });

  await createHeaderRule({
    page,
    headerName: "X-Another-Header",
    headerValue: "ShouldNotApply",
    extensionId,
    ruleName: "rule #8",
  });

  // Activate global pause
  await page.getByRole("button", { name: /Pause/ }).click();
  // Deactivate global pause
  await page.getByRole("button", { name: /Resume/ }).click();

  // Navigate to a test page
  await page.goto("https://httpbin.org/headers");

  // Verify that the header has been added
  const headerContent = await page.locator("pre").innerText();
  expect(headerContent).toContain('"X-Test-Header": "ModRequest"');
});
