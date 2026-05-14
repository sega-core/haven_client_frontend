import { Layout } from "./components/Layout";
import { TabBar } from "./components/TabBar";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./modules/Header";
import { QueryClientProvider, AppRoutes, DrawerProvider } from "./containers";
import { initTelegramApi } from "./hooks";
import { OnboardingProvider } from "./components/Onbording";
import { ToastContainer } from "./components/Toast";
import { useEffect } from "react";
import { initYandexMetrika } from "./utils";

function App() {
  initTelegramApi();
  useEffect(() => {
    initYandexMetrika();
  }, []);

  return (
    <QueryClientProvider>
      <Layout>
        <BrowserRouter>
          <OnboardingProvider>
            <DrawerProvider>
              <Header />
              <AppRoutes />
              <TabBar />
              <ToastContainer />
            </DrawerProvider>
          </OnboardingProvider>
        </BrowserRouter>
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
