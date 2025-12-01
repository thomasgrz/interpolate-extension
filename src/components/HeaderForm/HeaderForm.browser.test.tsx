import { describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { HeaderForm } from "./HeaderForm";
import { useInterpolationForm } from "@/hooks/useInterpolationForm/useInterpolationForm";
import { renderInBrowser } from "../../../test-utils/renderInBrowser";

const Container = () => {
  const form = useInterpolationForm();
  return <HeaderForm form={form} />;
};

describe("HeaderForm", () => {
  it("should display all inputs", () => {
    renderInBrowser(<Container />);
  });
  it("should allow input of header key", async () => {
    renderInBrowser(<Container />);
    await page.getByPlaceholder(/x-Forwarded/).fill("Test Name");
    expect(page.getByText("Test Name")).toBeDefined();
  });
  it("should allow input of header value", async () => {
    renderInBrowser(<Container />);
    await page.getByPlaceholder(/test.domain/).fill("Test Value");
    expect(page.getByText("Test Value")).toBeDefined();
  });
});
