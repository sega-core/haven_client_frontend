import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { HeroUIProvider } from "@heroui/system";

createRoot(document.getElementById("root")!).render(
  <>
    <HeroUIProvider>
      <App />
    </HeroUIProvider>
  </>
);
