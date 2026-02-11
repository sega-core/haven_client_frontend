import { Layout } from "./components/Layout";
import { TabBar } from "./components/TabBar";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./modules/Header";
import { QueryClientProvider, AppRoutes, DrawerProvider } from "./containers";
import { init, postEvent } from "@tma.js/sdk-react";

function App() {
  try {
    init();
    postEvent('web_app_setup_swipe_behavior', { allow_vertical_swipe: false })
  } catch (error) {
    console.log(error);
  }

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
