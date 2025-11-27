import { describe, it } from "vitest";

import { renderWithProviders } from "../../test-utils/renderWithProviders";
import { Dashboard } from "@/components/Dashboard/Dashboard";

describe("Sidepanel", () => {
  it("should render the sidepanel", () => {
    renderWithProviders(<Dashboard />);
  });
});
