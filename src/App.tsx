import { Layout } from "./components/Layout";
import { TabBar } from "./components/TabBar";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./modules/Header";
import { QueryClientProvider, AppRoutes } from "./containers";

function App() {
  return (
    <QueryClientProvider>
      <Layout>
        <BrowserRouter>
          <Header />
          <AppRoutes />
          <TabBar />
        </BrowserRouter>
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
