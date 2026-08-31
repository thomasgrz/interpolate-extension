import { expect, test } from "./fixtures/expect";
import { openInterpolationOptionsModal } from "./fixtures/openInterpolationOptionsModal";
import {
  MockResponseFormLabel,
  MockResponseFormPlaceholder,
} from "../src/components/MockResponseForm/MockResponseForm.constants.ts";
import { createTestHeaderInterpolation } from "./fixtures/createTestHeaderInterpolation.ts";

test("should redirect requests without a matcher", async ({
  page,
  network,
  extensionId,
}) => {
  await openInterpolationOptionsModal({
    extensionId,
    page,
  });
  await page.getByText("Mock API response").click();
  await page
    .getByPlaceholder(MockResponseFormPlaceholder.INTERPOLATION_NAME)
    .fill("nonexistent endpoint");
  await page
    .getByPlaceholder(MockResponseFormPlaceholder.MATCHER)
    .fill(".*example.com");
  await page
    .getByPlaceholder(MockResponseFormPlaceholder.BODY_HTML)
    .fill("<h1>hello world</h1>");

  await page.getByText("Create mock", { exact: false }).click();
  await page.goto("https://example.com");
  await page.reload();
  expect(page.getByText("hello world")).toBeVisible();
});

test("should redirect requests with a matcher", async ({
  page,
  network,
  extensionId,
}) => {
  await openInterpolationOptionsModal({
    extensionId,
    page,
  });
  await page.getByText("Mock API response").click();
  await page
    .getByPlaceholder(MockResponseFormPlaceholder.INTERPOLATION_NAME)
    .fill("without body matcher");
  await page
    .getByPlaceholder(MockResponseFormPlaceholder.MATCHER)
    .fill(".*example.com");
  await page
    .getByPlaceholder(MockResponseFormPlaceholder.BODY_HTML)
    .fill(
      `<script> (() => { fetch('https://something.com/test', { body: JSON.stringify({ "testString": 1}), method: 'POST' }).then((res) => res.json()).then((value) => { document.getElementById('heading').textContent = value[0] }); })(); </script> <h1 id="heading">hello world</h1>`,
    );

  await page.getByText("Create mock", { exact: false }).click();

  await createTestHeaderInterpolation({
    headerValue: "*",
    headerName: "Access-Control-Allow-Origin",
    name: "CORS",
    extensionId,
    page,
  });

  await openInterpolationOptionsModal({
    extensionId,
    page,
  });
  await page.getByText("Mock API response").click();
  await page
    .getByPlaceholder(MockResponseFormPlaceholder.INTERPOLATION_NAME)
    .fill("with body matcher");
  await page
    .getByPlaceholder(MockResponseFormPlaceholder.MATCHER)
    .fill(".*something.com/test");
  await page
    .getByPlaceholder(MockResponseFormPlaceholder.BODY_MATCHER)
    .fill(".*testString");

  await page.getByText(/JSON/).first().click();

  await page
    .getByPlaceholder(MockResponseFormPlaceholder.BODY_JSON)
    .fill('["fetched string"]');

  await page.getByText("Create mock", { exact: false }).click();

  await page.goto("https://example.com");
  expect(page.getByText("fetched string")).toBeVisible();
});
