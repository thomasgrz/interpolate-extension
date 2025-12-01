import { Theme } from "@radix-ui/themes";
import "../src/sidepanel/Sidepanel.css";
import { InterpolateProvider } from "../src/contexts/interpolate-context";
import { render } from "@testing-library/react";

export const AllProviders = ({ children }: { children: React.ReactNode }) => {
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
  return render(ui, { wrapper: AllProviders, ...options });
};
