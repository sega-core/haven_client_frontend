import { axiosClient } from "../config";

export type TCoin = {
  total: number;
  dailyStreak: number;
};

export const getCoin = async () => {
  return (await axiosClient.get<TCoin>(`/coin`)).data;
};

export const postCoin = async () => {
  return (await axiosClient.post(`/coin`)).data;
};
