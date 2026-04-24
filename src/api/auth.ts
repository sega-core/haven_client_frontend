import { axiosClient } from "../config";

export const getAuth = async (rawData?: string) => {
  return (
    await axiosClient.get<{ accessToken: string; termsAccepted: string }>(
      `/me`,
      {
        headers: {
          "X-Telegram-Init-Data": rawData,
        },
      },
    )
  ).data;
};
