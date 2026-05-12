import {
  init,
  postEvent,
  retrieveRawInitData,
  useLaunchParams,
} from "@tma.js/sdk-react";

export const initTelegramApi = () => {
  try {
    init();
    postEvent("web_app_setup_swipe_behavior", { allow_vertical_swipe: false });
    postEvent("web_app_request_fullscreen");
  } catch (error) {
    console.error(error);
  }
};

export const useRawLaunchParamsTelegram = () => {
  try {
    return retrieveRawInitData();
  } catch {
    return undefined;
  }
};

export const useLaunchParamsTelegram = () => {
  try {
    const params = useLaunchParams(true);
    return {
      ...params,
      firstName: params.tgWebAppData?.user?.firstName,
      photoUrl: params.tgWebAppData?.user?.photoUrl,
      username: params.tgWebAppData?.user?.username,
      isWebApp: true,
      error: null,
    };
  } catch (error) {
    console.warn("Telegram Mini App hook failed:", error);
    return {
      firstName: undefined,
      photoUrl: undefined,
      username: undefined,
      isWebApp: false,
      error: error as Error,
    };
  }
};
