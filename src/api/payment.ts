import { axiosClient } from "../config";

export type TPayment = {
  url: string;
  invId: string;
};

export type TReqPayment = {
  currency: "zen" | "rub";
  type: "practice" | "bundle";
  id: number;
};

export const postPayment = async (body: TReqPayment) => {
  return (await axiosClient.post<TPayment>(`/create-payment`, { ...body }))
    .data;
};

export const getPayment = async (id: number) => {
  return (await axiosClient.get<{status:string}>(`/status-payment/${id}`)).data;
};
