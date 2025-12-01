import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ContentView } from "./ContentView.tsx";

const container = document.createElement("div");
container.id = "crxjs-app";
container.style.position = "fixed";
document.body.appendChild(container);
createRoot(container).render(
  <StrictMode>
    <Theme>
      <h1>hello</h1>
      <ContentView />
    </Theme>
  </StrictMode>,
);
