import { Layout } from "./components/Layout";
import { TabBar } from "./components/TabBar";
import { AppRoutes } from "./containers/Routes/Routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <AppRoutes />
        <TabBar />
      </BrowserRouter>
    </Layout>
  );
}

export default App;
