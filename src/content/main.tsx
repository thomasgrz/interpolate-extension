import "@radix-ui/themes/styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Notifier } from "./Notifier.tsx";
import styles from "./Notifier.module.scss";
import { InterpolateProvider } from "#src/contexts/interpolate-context.tsx";
import { Theme } from "@radix-ui/themes";
import { ToastNotificationsContainer } from "#src/components/ToastNotifications/ToastNotificationsContainer.component.tsx";

const container = document.createElement("div");
container.id = "crxjs-app";
container.className = styles.Root;
document.body.prepend(container);
createRoot(container).render(
  <StrictMode>
    <Theme>
      <ToastNotificationsContainer>
        <Notifier />
      </ToastNotificationsContainer>
    </Theme>
  </StrictMode>,
);
