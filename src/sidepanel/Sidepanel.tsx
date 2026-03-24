import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@radix-ui/themes/styles.css";
import "./Sidepanel.css";

import { DashboardView } from "@/components/DashboardView/DashboardView";
import { Theme } from "@radix-ui/themes";
import { InterpolateProvider } from "@/contexts/interpolate-context";

const node = document.getElementById("root");
if (node instanceof HTMLElement) {
  createRoot(node).render(
    <StrictMode>
      <Theme style={{ backgroundColor: "#FFDE21" }} radius="large">
        <InterpolateProvider>
          <DashboardView />
        </InterpolateProvider>
      </Theme>
    </StrictMode>,
  );
}
