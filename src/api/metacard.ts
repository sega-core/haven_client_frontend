import { axiosClient } from "../config";

export type TMetaCard = {
  id: number;
  metaCard: {
    title: string;
    description: string;
    imgUrl: string;
  };
  answer: {
    felt?: string;
    seen?: string;
    understood?: string;
  };
  hasAnsweredToday: boolean;
  createdAt: string;
};

export const getMetaCard = async () => {
  return (await axiosClient.get<TMetaCard>(`/metacard`)).data;
};

export const postMetaCard = async (body: {
  felt: string;
  seen: string;
  understood: string;
}) => {
  return (await axiosClient.post(`/metacard`, { ...body })).data;
};
