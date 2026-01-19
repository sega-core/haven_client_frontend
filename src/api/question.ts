import { axiosClient } from "../config";

export type TQuestion = {
  questionId: number;
  question: string;
  userAnswer: string;
  hasAnswered: boolean;
  createdAt: string;
};

export const getQuestion = async () => {
  return (await axiosClient.get<TQuestion>(`/question`)).data;
};

export const postQuestion = async (answer: string) => {
  return (await axiosClient.post(`/question`, { answer })).data;
};
