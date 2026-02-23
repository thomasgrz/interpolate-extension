import { createHeaderInterpolation } from "@/utils/factories/createHeaderInterpolation/createHeaderInterpolation";
import { renderInBrowser } from "../../../test-utils/renderInBrowser";
import { describe, it, expect } from "vitest";
import { page } from "vitest/browser";
import { Dashboard } from "./Dashboard";

describe("Dashboard", () => {
  it("should display existing rules", async () => {
    const interpolation = createHeaderInterpolation({
      headerKey: "test header key",
      headerValue: "test header value",
      name: "test rule",
    });
    chrome.storage?.local?.set({
      [`interpolation-config-${interpolation.details.id}`]: interpolation,
    });

    renderInBrowser(<Dashboard />);
    const preview = page.getByTestId(/headers-preview-.*/);
    await expect.element(preview).toBeVisible();
  });
});
