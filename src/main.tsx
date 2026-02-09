import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { HeroUiProvider } from "./containers";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUiProvider>
      <App />
    </HeroUiProvider>
  </StrictMode>,
);
