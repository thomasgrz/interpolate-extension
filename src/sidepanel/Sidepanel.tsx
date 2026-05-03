import { createRoot } from "react-dom/client";

import "./Sidepanel.css";

import { DashboardView } from "@/components/DashboardView/DashboardView";
import { Box, Flex, Theme, ThemePanel } from "@radix-ui/themes";
import { InterpolateProvider } from "@/contexts/interpolate-context";
import { AlertDialog } from "radix-ui";

const node = document.getElementById("root");
if (node instanceof HTMLElement) {
  createRoot(node).render(
    <AlertDialog.Root>
      <InterpolateProvider>
        <DashboardView />
      </InterpolateProvider>
    </AlertDialog.Root>,
  );
}
