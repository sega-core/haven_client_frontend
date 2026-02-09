import { axiosClient } from "../config";

export type TPractice = {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  tags: string[];
  priceZen: number;
  isPurchased: boolean;
  isActive: boolean;
};

export type TPraciteBundle = {
  priceRubWithDiscount: number;
  isApplyDiscount: boolean;
  isPurchasedBundle: boolean;
  id: number;
  title: string;
  subTitle: string;
  description: string;
  priceRub: number;
  isActive: boolean;
  tags: string[];
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

export const getPracticeInstructions = async (pratcticeId:number) => {
  return (await axiosClient.get<{instructions:string}>(`/practice/${pratcticeId}`)).data;
};