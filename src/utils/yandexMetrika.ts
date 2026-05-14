/* eslint-disable @typescript-eslint/ban-ts-comment */
declare global {
  interface Window {
    ym: (counterId: number, action: string, options?: unknown) => void;
  }
}

const COUNTER_ID = 109215283;

export const initYandexMetrika = () => {
  if (typeof window === "undefined") return;

  if (import.meta.env.MODE !== "production") {
    console.log("📊 Yandex Metrika: disabled in development");
    return;
  }
  
  //@ts-ignore
  if (window.ym) return;

  // Вставляем скрипт как в оригинальном коде
  const script = document.createElement('script');
  script.innerHTML = `
    (function(m,e,t,r,i,k,a){
      m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j++) {
        if (document.scripts[j].src === r) { return; }
      }
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js', 'ym');

    ym(${COUNTER_ID}, 'init', {
      ssr: false,
      webvisor: true,
      clickmap: true,
      ecommerce: "dataLayer",
      referrer: document.referrer,
      url: location.href,
      accurateTrackBounce: true,
      trackLinks: true
    });
  `;
  document.head.appendChild(script);
};