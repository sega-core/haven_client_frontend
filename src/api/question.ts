import { axiosClient } from "../config";

export type TDailyQuestion = {
  questionId: number;
  question: string;
  userAnswer: string;
  hasAnswered: boolean;
  createdAt: string;
};

export const postQuestion = async (answer: string) => {
  return (await axiosClient.post(`/question`, { answer })).data;
};
