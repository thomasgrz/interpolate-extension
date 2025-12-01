import "../src/sidepanel/Sidepanel.css";
import { render } from "vitest-browser-react";
import { AllProviders } from "./renderWithProviders";

export const renderInBrowser = async (
  ui: React.ReactNode,
  options?: Record<string, unknown>,
) => {
  return render(ui, { wrapper: AllProviders, ...options });
};
