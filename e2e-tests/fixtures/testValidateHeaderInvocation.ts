import { Page } from "@playwright/test";
import { expect } from "./expect";

export const testValidateHeaderInvocation = async ({
  headers,
  page,
}: {
  headers: {
    enabled: boolean;
    headerName: string;
    headerValue: string;
  }[];
  page: Page;
}) => {
  await page.goto("https://httpbin.org/headers");
  headers.forEach(({ enabled, headerName, headerValue }) => {
    if (enabled) {
      expect(page.getByText(`${headerName}: ${headerValue}`)).toBeVisible;
    } else {
      expect(page.getByText(`${headerName}: ${headerValue}`)).toHaveCount(0);
    }
  });
};
