import { axiosClient } from "../config";

export type TCoin = {
  balance: number;
  dailyStreak: number;
};

export const getCoin = async () => {
  return (await axiosClient.get<TCoin>(`/coin`)).data;
};

export const postCoin = async () => {
  return (await axiosClient.post<{ bonus: number }>(`/coin`)).data;
};

export const spendCoin = async (body: { amount: number; practiceId: number }) => {
  return (await axiosClient.post(`/coin-spend`, { ...body })).data;
};
