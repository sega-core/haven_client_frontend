import { axiosClient } from "../config";

export type TTarget = {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  weekdays: string[];
  notifyTime: string;
  completionRate: number;
  isCompletedToday: boolean;
  isCanCompletedToday:boolean;
};

export type TTargetCreate = {
  title: string;
  startDate: string;
  endDate: string;
  weekdays: string[];
  notifyTime?: string;
};

export const getTarget = async () => {
  return (await axiosClient.get<TTarget[]>(`/target`)).data;
};

export const postTarget = async (body: TTargetCreate) => {
  return (await axiosClient.post(`/target`, { ...body })).data;
};

export const postTargetDone = async (targetId: number) => {
  return (await axiosClient.post(`/target/${targetId}/done`)).data;
};

export const deleteTarget = async (targetId: number) => {
  return (await axiosClient.delete(`/target/${targetId}`)).data;
};
