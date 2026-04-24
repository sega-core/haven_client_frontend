import { axiosClient } from "../config";

export const postRegistration = async (rawData?: string) => {
  return (
    await axiosClient.post<{ bonus: number }>(
      `/registration`,
      {},
      {
        headers: {
          "X-Telegram-Init-Data": rawData,
        },
      },
    )
  ).data;
};
