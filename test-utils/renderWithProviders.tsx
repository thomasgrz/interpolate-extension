import { Theme } from "@radix-ui/themes";
import { render } from "vitest-browser-react";
import "../src/sidepanel/Sidepanel.css";
import { InterpolateProvider } from "@/contexts/interpolate-context";

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Theme>
      <InterpolateProvider>{children}</InterpolateProvider>
    </Theme>
  );
};

export const renderWithProviders = (
  ui: React.ReactNode,
  options?: Record<string, unknown>,
) => {
  render(ui, { wrapper: AllProviders, ...options });
};
