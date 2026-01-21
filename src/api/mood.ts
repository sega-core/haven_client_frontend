import { axiosClient } from "../config";

export type TMood = {
  id: number;
  level: string;
  tags: string[];
  comment: string;
  createdAt: string;
};

export type TMoodTag = {
  [key: string]: {
    label: string;
    level: string;
  };
};

export type TMoodReq = {
  level: number;
  tags: string[];
  comment: string;
};

export const getMood = async () => {
  return (await axiosClient.get<TMood>(`/mood`)).data;
};
export const getMoodTags = async () => {
  return (await axiosClient.get<TMoodTag>(`/mood/tags`)).data;
};

export const postMood = async (body: TMoodReq) => {
  return (await axiosClient.post(`/mood`, { body })).data;
};
