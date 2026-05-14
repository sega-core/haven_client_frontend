/* eslint-disable @typescript-eslint/ban-ts-comment */
declare global {
  interface Window {
    ym: (counterId: number, action: string, options?: unknown) => void;
  }
}

const COUNTER_ID = 109215283;

export const initYandexMetrika = () => {
  if (import.meta.env.MODE !== "production") {
    console.log("📊 Yandex Metrika: disabled in development");
    return;
  }

  if (typeof window === "undefined") return;

  //@ts-ignore
  if (window.ym) return;

  // Добавляем скрипт
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.async = true;
  script.src = "https://mc.yandex.ru/metrika/tag.js";
  document.head.appendChild(script);

  // Инициализируем
  script.onload = () => {
    window.ym(COUNTER_ID, "init", {
      ssr: false,
      webvisor: true,
      clickmap: true,
      ecommerce: "dataLayer",
      referrer: document.referrer,
      url: window.location.href,
      accurateTrackBounce: true,
      trackLinks: true,
    });
  };
};
