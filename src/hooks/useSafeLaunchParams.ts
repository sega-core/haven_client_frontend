import { useLaunchParams } from "@tma.js/sdk-react";

export const useSafeLaunchParams = () => {
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
    console.warn('Telegram Mini App hook failed:', error);
    return {
      tgWebAppData: null,
      tgWebAppVersion: '7.0',
      tgWebAppPlatform: 'web',
      tgWebAppThemeParams: {},
      tgWebAppStartParam: null,
      isWebApp: false,
      error: error as Error,
    };
  }
};