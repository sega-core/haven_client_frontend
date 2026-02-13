import { Layout } from "./components/Layout";
import { TabBar } from "./components/TabBar";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./modules/Header";
import { QueryClientProvider, AppRoutes, DrawerProvider } from "./containers";
import { initTelegramApi, useRawLaunchParamsTelegram } from "./hooks";
import { setHeader } from "./config";

function App() {
  initTelegramApi();

  const rawData = useRawLaunchParamsTelegram();

  setHeader("X-Telegram-Init-Data", `${rawData}`);

  return (
    <QueryClientProvider>
      <Layout>
        <DrawerProvider>
          <BrowserRouter>
            <Header />
            <AppRoutes />
            <TabBar />
          </BrowserRouter>
        </DrawerProvider>
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
