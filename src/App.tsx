import { Layout } from "./components/Layout";
import { TabBar } from "./components/TabBar";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./modules/Header";
import { QueryClientProvider, AppRoutes, DrawerProvider } from "./containers";
import { initTelegramApi } from "./hooks";
import { OnboardingProvider } from "./components/Onbording/OnboardingContext";

function App() {
  initTelegramApi();

  return (
    <QueryClientProvider>
      <Layout>
        <BrowserRouter>
        <OnboardingProvider>
          <DrawerProvider>
            <Header />
            <AppRoutes />
            <TabBar />
          </DrawerProvider>
          </OnboardingProvider>
        </BrowserRouter>
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
