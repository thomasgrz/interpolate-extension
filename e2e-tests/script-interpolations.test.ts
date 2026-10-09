import { expect, test, TestInterface } from "./fixtures/expect";
import { createTestScriptInterpolation } from "./fixtures/createTestScriptInterpolation";
import { enableUserScriptsForExtension } from "./fixtures/enableUserScriptsForExtension";

test.beforeEach(async ({ page }) => {
  await enableUserScriptsForExtension({ page });
});

const createHelloWorldScript = async ({ extensionId, page }: TestInterface) => {
  const script = `const el = document.createElement('h1'); el.innerHTML = "<h1>hello world!</h1>";document.body.prepend(el)`;
  await createTestScriptInterpolation({
    endOnOptionsPage: true,
    page,
    extensionId,
    runAt: "document_end",
    script,
    name: "test script",
  });
};

test("should apply script interpolation", async ({ page, extensionId }) => {
  await createHelloWorldScript({ extensionId, page });
  page.goto("http://localhost:8080/index.html");
  expect(page.getByText("hello world")).toBeVisible();
});

test("should pause a script", async ({ page, extensionId }) => {
  await page.goto(`chrome-extension://${extensionId}/src/options/index.html`);
  await page.getByTestId("browser-ui-toggle").click();
  await createHelloWorldScript({ extensionId, page });
  await page.goto("http://localhost:8080/index.html");
  await page.getByText("hello world!").isVisible();

  await page.goto(`chrome-extension://${extensionId}/src/options/index.html`);
  const pauseAll = page.getByTestId("pause-all");
  await expect(pauseAll).toBeVisible();
  await pauseAll.scrollIntoViewIfNeeded();
  await pauseAll.click();
  await page.reload();

  expect(page.getByText("hello world")).toHaveCount(0);
});

test("should resume a script", async ({ page, extensionId }) => {
  await page.goto(`chrome-extension://${extensionId}/src/options/index.html`);
  await page.getByTestId("browser-ui-toggle").click();
  await createHelloWorldScript({ extensionId, page });
  await page.goto("http://localhost:8080/index.html");
  await page.getByText("hello world!").isVisible();

  await page.goto(`chrome-extension://${extensionId}/src/options/index.html`);
  const pauseAll = page.getByTestId("pause-all");
  await expect(pauseAll).toBeVisible();
  await pauseAll.scrollIntoViewIfNeeded();
  await pauseAll.click();
  await page.reload();

  expect(page.getByText("hello world")).toHaveCount(0);
  await page.goto(`chrome-extension://${extensionId}/src/options/index.html`);
  const resumeAll = page.getByTestId("re-enable");
  await expect(resumeAll).toBeVisible();
  await resumeAll.scrollIntoViewIfNeeded();
  await resumeAll.click();
  await page.goto("http://localhost:8080/index.html");
  await page.getByText("hello world!").isVisible();
});

test("should edit a script in place", async ({ page, extensionId }) => {
  await page.goto(`chrome-extension://${extensionId}/src/options/index.html`);
  await createHelloWorldScript({ extensionId, page });

  const options = page.getByTestId("script-preview-test script");

  await options.isVisible();

  await options.click({ button: "right" });

  const edit = page.getByText("Edit");

  await edit.click();

  const body = page.getByLabel("Script:");

  await expect(body).toBeVisible();
  await body.click();
  const script = `const el = document.createElement('h1');
el.innerHTML = "<h1>changed!</h1>";document.body.prepend(el)`;

  await body.fill(script);

  await page.getByText("Save script").click();
  await page.goto("http://localhost:8080/index.html");
  await page.getByText("changed!").isVisible();
});
