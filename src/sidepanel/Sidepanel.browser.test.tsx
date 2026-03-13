import { describe, it } from "vitest";

import { renderWithProviders } from "../../test-utils/renderWithProviders";
import { DashboardView } from "@/components/DashboardView/DashboardView";

describe("Sidepanel", () => {
  it("should render the sidepanel", () => {
    renderWithProviders(<DashboardView />);
  });
});
