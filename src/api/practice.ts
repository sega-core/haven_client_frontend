import { axiosClient } from "../config";

export type TPractice = {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  tags: string[];
  priceZen: number;
  priceRub?: number;
  isPurchased: boolean;
  isActive: boolean;
  imgUrl?: string;
};

export type TPraciteBundle = {
  isPurchased: boolean;
  id: number;
  title: string;
  subTitle: string;
  description: string;
  priceRub: number;
  priceRubWithDiscount: number;
  isActive: boolean;
  tags: string[];
  imgUrl?: string;
  practiceBundleItems: {
    practice: TPractice;
    practiceId: number;
    position: number;
  }[];
};

export const getPractices = async () => {
  return (await axiosClient.get<TPractice[]>(`/practices`)).data;
};

export const getPracticeBundles = async () => {
  return (await axiosClient.get<TPraciteBundle[]>(`/practice-bundles`)).data;
};

export const getPracticeInstructions = async (pratcticeId: number) => {
  return (
    await axiosClient.get<{ instructions: string }>(`/practice/${pratcticeId}`)
  ).data;
};
