import { axiosClient } from "../config";
import { TGratitude } from "./gratitude";
import { TMetaCard } from "./metacard";
import { TMood } from "./mood";
import { TDailyQuestion } from "./question";

export type TProgress = {
  mood: TMood & { isDone: boolean };
  gratitude: {
    isDone: boolean;
    listOfGratitude: TGratitude[];
  };
  dailyQuestion: TDailyQuestion & { isDone: boolean };
  isAllDone: boolean;
  progressPoint: number;
};

export const getProgress = async () => {
  return (await axiosClient.get<TProgress>(`/progress`)).data;
};

export const getProgressRange = async (params: {
  startdDate?: string;
  endDate?: string;
}) => {
  return (
    await axiosClient.get<{
      mood: TMood[];
      gratitude: TGratitude[];
      dailyQuestion: TDailyQuestion[];
      metaCard: TMetaCard[];
    }>(`/progress-range`, { params })
  ).data;
};
