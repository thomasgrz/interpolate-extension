import { describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { AddHeaderForm } from "./AddHeaderForm";
import { renderInBrowser } from "../../../test-utils/renderInBrowser";

describe("AddHeaderForm", () => {
  it("should allow input of rule name", async () => {
    renderInBrowser(<AddHeaderForm />);
    await page.getByPlaceholder(/Test Header/).fill("Test Header Name");
    expect(page.getByText("Test Header Name")).toBeDefined();
  });
  it("should allow input of header key", async () => {
    renderInBrowser(<AddHeaderForm />);
    await page.getByPlaceholder(/x-test-header/).fill("x-something");
    expect(page.getByText("x-something")).toBeDefined();
  });
  it("should allow input of header value", async () => {
    renderInBrowser(<AddHeaderForm />);
    await page.getByPlaceholder(/foo/).fill("Foo");
    expect(page.getByText("Foo")).toBeDefined();
  });
});
