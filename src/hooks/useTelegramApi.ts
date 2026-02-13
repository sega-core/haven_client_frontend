import {
  init,
  postEvent,
  useLaunchParams,
  useRawLaunchParams,
} from "@tma.js/sdk-react";

export const initTelegramApi = () => {
  try {
    init();
    postEvent("web_app_setup_swipe_behavior", { allow_vertical_swipe: false });
  } catch (error) {
    console.log(error);
  }
};

export const useRawLaunchParamsTelegram = () => {
  try {
    return useRawLaunchParams();
  } catch {
    return undefined;
  }
};

export const useLaunchParamsTelegram = () => {
  try {
    // Пытаемся использовать хук
    const params = useLaunchParams(true);
    return {
      ...params,
      isWebApp: true,
      error: null,
    };
  } catch (error) {
    // Если упал - возвращаем мок
    console.warn("Telegram Mini App hook failed:", error);
    return {
      tgWebAppData: null,
      tgWebAppVersion: "7.0",
      tgWebAppPlatform: "web",
      tgWebAppThemeParams: {},
      tgWebAppStartParam: null,
      isWebApp: false,
      error: error as Error,
    };
  }
};
