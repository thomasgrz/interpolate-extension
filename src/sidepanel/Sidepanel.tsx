import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./Sidepanel.css";

import "@radix-ui/themes/styles.css";

import { Dashboard } from "@/components/Dashboard/Dashboard";
import { Theme } from "@radix-ui/themes";

const node = document.getElementById("root");
if (node instanceof HTMLElement) {
  createRoot(node).render(
    <StrictMode>
      <Theme style={{ backgroundColor: "#FFDE21" }} radius="large">
        <Dashboard />
      </Theme>
    </StrictMode>,
  );
}
