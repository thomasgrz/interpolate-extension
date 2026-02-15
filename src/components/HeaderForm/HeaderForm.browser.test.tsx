import { describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { HeaderForm } from "./HeaderForm";
import { renderInBrowser } from "../../../test-utils/renderInBrowser";

describe("HeaderForm", () => {
  it("should allow input of rule name", async () => {
    renderInBrowser(<HeaderForm />);
    await page.getByPlaceholder(/Cool Header/).fill("Cool Header");
    expect(page.getByText("Cool Header")).toBeDefined();
  });
  it("should allow input of header key", async () => {
    renderInBrowser(<HeaderForm />);
    await page.getByPlaceholder(/x-Forwarded/).fill("Test Name");
    expect(page.getByText("Test Name")).toBeDefined();
  });
  it("should allow input of header value", async () => {
    renderInBrowser(<HeaderForm />);
    await page.getByPlaceholder(/test.domain/).fill("Test Value");
    expect(page.getByText("Test Value")).toBeDefined();
  });
});
