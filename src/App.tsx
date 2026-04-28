import { Layout } from "./components/Layout";
import { TabBar } from "./components/TabBar";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./modules/Header";
import { QueryClientProvider, AppRoutes, DrawerProvider } from "./containers";
import { initTelegramApi } from "./hooks";

function App() {
  initTelegramApi();

  return (
    <QueryClientProvider>
      <Layout>
        <BrowserRouter>
          <DrawerProvider>
            <Header />
            <AppRoutes />
            <TabBar />
          </DrawerProvider>
        </BrowserRouter>
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
