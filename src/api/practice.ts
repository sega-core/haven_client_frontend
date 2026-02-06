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

export const getPractice = async () => {
  return (await axiosClient.get<TPractice[]>(`/practices`)).data;
};
export const getPracticeBundle = async () => {
  return (await axiosClient.get<TPraciteBundle[]>(`/practice-bundles`)).data;
};
