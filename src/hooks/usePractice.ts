import { useQuery } from "@tanstack/react-query";
import {
  getPracticeBundles,
  getPractices,
  getPracticeInstructions,
} from "../api";

export const GET_PRACTICE = "GET_PRACTICE";
export const GET_PRACTICE_BUNDLE = "GET_PRACTICE_BUNDLE";
export const GET_PRACTICE_INSTRUCTIONS = "GET_PRACTICE_INSTRUCTIONS";

export const useGetPractice = () => {
  return useQuery({
    queryKey: [GET_PRACTICE],
    queryFn: () => getPractices(),
  });
};

export const useGetPracticeBundle = () => {
  return useQuery({
    queryKey: [GET_PRACTICE_BUNDLE],
    queryFn: () => getPracticeBundles(),
  });
};

export const useGetPracticeInstructions = (
  practiceId: number,
  enabled: boolean,
) => {
  return useQuery({
    queryKey: [GET_PRACTICE_INSTRUCTIONS, practiceId],
    queryFn: () => getPracticeInstructions(practiceId),
    enabled,
  });
};
