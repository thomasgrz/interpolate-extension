import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./Sidepanel.css";

import { DashboardView } from "@/components/DashboardView/DashboardView";
import { Theme } from "@radix-ui/themes";
import { InterpolateProvider } from "@/contexts/interpolate-context";
import { AlertDialog } from "radix-ui";

const node = document.getElementById("root");
if (node instanceof HTMLElement) {
  createRoot(node).render(
    <StrictMode>
      <Theme
        style={{
          height: "100vh",
          maxHeight: "100vh",
          overflow: "hidden",
        }}
        radius="large"
        appearance="inherit"
        hasBackground
        panelBackground="solid"
        scaling="90%"
      >
        <AlertDialog.Root>
          <InterpolateProvider>
            <DashboardView />
          </InterpolateProvider>
        </AlertDialog.Root>
      </Theme>
    </StrictMode>,
  );
}
