import { axiosClient } from "../config";

export type TGratitude = {
  id: number;
  text: string;
  createdAt: string;
};

export const getGratitude = async () => {
  return (await axiosClient.get<TGratitude[]>(`/gratitude`)).data;
};

export const postGratitude = async (text: string) => {
  return (await axiosClient.post<TGratitude[]>(`/gratitude`, { text })).data;
};
