import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { HeroUiProvider } from "./containers";
import { ErrorBoundary } from "./components/ErrorBoundary";

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <HeroUiProvider>
      <App />
    </HeroUiProvider>
  </ErrorBoundary>,
);
