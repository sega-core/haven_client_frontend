import { Layout } from "./components/Layout";
import { TabBar } from "./components/TabBar";
import { AppRoutes } from "./containers/Routes/Routes";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./modules/Header";

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Header />
        <AppRoutes />
        <TabBar />
      </BrowserRouter>
    </Layout>
  );
}

export default App;
