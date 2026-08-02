import { axiosClient } from "../config";

type TAuth = {
  accessToken: string;
  onboardingCompleted: boolean;
  isAdmin: boolean;
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
