import { describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { HeaderForm } from "./HeaderForm";
import { renderInBrowser } from "../../../test-utils/renderInBrowser";

describe("HeaderForm", () => {
  it("should allow input of rule name", async () => {
    renderInBrowser(<HeaderForm />);
    await page.getByPlaceholder(/Test Header/).fill("Test Header Name");
    expect(page.getByText("Test Header Name")).toBeDefined();
  });
  it("should allow input of header key", async () => {
    renderInBrowser(<HeaderForm />);
    await page.getByPlaceholder(/x-test-header/).fill("x-something");
    expect(page.getByText("x-something")).toBeDefined();
  });
  it("should allow input of header value", async () => {
    renderInBrowser(<HeaderForm />);
    await page.getByPlaceholder(/foo/).fill("Foo");
    expect(page.getByText("Foo")).toBeDefined();
  });
});
