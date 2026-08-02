import { axiosClient } from "../config";

export type TNotification = {
  id: number;
  message: string;
  status: string;
  recipientCount: number;
  successCount: number;
  failCount: number;
  createdAt: string;
  error: string;
};

export const postNotification = async (body: {
  message: string;
  recipients: "all" | "test";
}) => {
  return (await axiosClient.post(`/notification/send`, { ...body })).data;
};

export const getNotification = async () => {
  return (await axiosClient.get<TNotification[]>(`/notification/history`)).data;
};
