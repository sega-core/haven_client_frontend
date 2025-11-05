import { axiosClient } from "../config";

export type TGratitude = {
  id: number;
  comment: string;
  createdAt: string;
};

export const postGratitude = async (comment: string) => {
  return (await axiosClient.post<TGratitude[]>(`/gratitude`, { comment })).data;
};
