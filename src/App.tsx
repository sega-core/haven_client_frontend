/* eslint-disable @typescript-eslint/ban-ts-comment */
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

  // App.tsx
useEffect(() => {
  if (/Android/i.test(navigator.userAgent)) {
    // Фикс для Android WebView
    const setHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setHeight();
    window.addEventListener('resize', setHeight);
    
    //@ts-ignore
    if (window.Telegram?.WebApp) {
          //@ts-ignore

      window.Telegram.WebApp.expand();
          //@ts-ignore

      window.Telegram.WebApp.onEvent('viewportChanged', setHeight);
    }
    
    return () => {
      window.removeEventListener('resize', setHeight);
    };
  }
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
