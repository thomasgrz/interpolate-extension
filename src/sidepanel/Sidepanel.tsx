import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@radix-ui/themes/styles.css";
import "./Sidepanel.css";

import { Dashboard } from "@/components/Dashboard/Dashboard";
import { Theme } from "@radix-ui/themes";
import { InterpolateProvider } from "@/contexts/interpolate-context";

const node = document.getElementById("root");
if (node instanceof HTMLElement) {
  createRoot(node).render(
    <StrictMode>
      <Theme style={{ backgroundColor: "#FFDE21" }} radius="large">
        <InterpolateProvider>
          <Dashboard />
        </InterpolateProvider>
      </Theme>
    </StrictMode>,
  );
}
