import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Notifier } from "./Notifier.tsx";
import styles from "./Notifier.module.scss";
import { Theme } from "@radix-ui/themes";
import { ToastNotificationsContainer } from "#src/components/ToastNotifications/ToastNotificationsContainer.component.tsx";
import { InterpolateStorage } from "#src/utils/storage/InterpolateStorage/InterpolateStorage.ts";

const container = document.createElement("div");
container.id = "crxjs-app";
container.className = styles.Root;
document.body.prepend(container);
await chrome.storage.local
  .get(InterpolateStorage.BROWSER_UI_TOGGLE_KEY)
  .then(async (value) => {
    if (value?.[InterpolateStorage.BROWSER_UI_TOGGLE_KEY] !== true) return;

    // conditionally importing the radix ui styles
    // because they seem to conflict with websites using radix ui styles..
    // will figure out a true fix later, but for now the ui can be toggled off to bypass the issue

    createRoot(container).render(
      <StrictMode>
        <Theme radius="full">
          <ToastNotificationsContainer>
            <Notifier />
          </ToastNotificationsContainer>
        </Theme>
      </StrictMode>,
    );
  });
