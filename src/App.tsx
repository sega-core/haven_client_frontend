import { Layout } from "./components/Layout";
import { TabBar } from "./components/TabBar";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./modules/Header";
import { QueryClientProvider, AppRoutes, DrawerProvider } from "./containers";
import { init } from "@tma.js/sdk-react";

function App() {
  try {
    init();
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
