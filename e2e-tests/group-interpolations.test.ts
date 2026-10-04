import { createTestGroup } from "./fixtures/createTestGroup";
import { createTestHeaderInterpolation } from "./fixtures/createTestHeaderInterpolation";
import { expect, test, TestInterface } from "./fixtures/expect";
import { createTestRedirectInterpolation } from "./fixtures/createTestRedirectInterpolation";
import { testValidateHeaderInvocation } from "./fixtures/testValidateHeaderInvocation";
import { Page } from "@playwright/test";
import { testGoToOptionsPage } from "./fixtures/testGoToOptionsPage";

const scenarios = [
  {
    type: "headers",
    interpolationName: "my header interpolation",
    createInterpolation: async ({ page, extensionId }: TestInterface) =>
      createTestHeaderInterpolation({
        page,
        headerName: "X-Test-Header",
        headerValue: "header value",
        extensionId,
        name: "my header interpolation",
      }),
    validateInvocation: async ({ page }: TestInterface) =>
      testValidateHeaderInvocation({
        headers: [
          {
            enabled: true,
            headerName: "X-Test-Header",
            headerValue: "header value",
          },
        ],
        page,
      }),
    validateDeletion: async ({ page }: TestInterface) => {
      expect(page.getByText("my header interpolation")).toHaveCount(0);
      await testValidateHeaderInvocation({
        headers: [
          {
            enabled: false,
            headerName: "X-Test-Header",
            headerValue: "header value",
          },
        ],
        page,
      });
    },
  },
  {
    type: "redirect",
    interpolationName: "redirect interpolation",
    createInterpolation: async ({ extensionId, page }: TestInterface) =>
      createTestRedirectInterpolation({
        page,
        extensionId,
        name: "redirect interpolation",
        source: ".*index.html.*",
        destination: "http://localhost:8080/alt.html",
      }),
    validateInvocation: async ({ page }: { page: Page }) => {
      await page.goto("http://localhost:8080/index.html");
      expect(await page.getByText("page two").isVisible());
    },
    validateDeletion: async ({ page }: { page: Page }) => {
      expect(page.getByText("redirect interpolation")).toHaveCount(0);
      await page.goto("http://localhost:8080/index.html");
      expect(await page.getByText("index page").isVisible());
    },
  },
];

scenarios.forEach(
  ({
    type,
    createInterpolation,
    interpolationName,
    validateDeletion,
    validateInvocation,
  }) =>
    test(`should allow user to delete ${type} interpolations from a group view`, async ({
      extensionId,
      page,
    }) => {
      await createInterpolation({ extensionId, page });
      await validateInvocation({ extensionId, page });
      await testGoToOptionsPage({ extensionId, page });
      await createTestGroup({
        page,
        interpolations: [
          {
            checkboxTestId: `checkbox-${type}-${interpolationName}`,
          },
        ],
      });
      await page.getByText("1 config").click();
      await page.getByTestId(`delete-${type}-${interpolationName}`).click();
      await validateDeletion({ extensionId, page });
    }),
);
