import { axiosClient } from "../config";

type TAuth = {
  accessToken: string;
  onboardingCompleted: boolean;
};

export const getAuth = async (rawData?: string) => {
  return (
    await axiosClient.get<TAuth>(`/me`, {
      headers: {
        "X-Telegram-Init-Data": rawData,
      },
    })
  ).data;
};
