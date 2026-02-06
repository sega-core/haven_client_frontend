import { useQuery } from "@tanstack/react-query";
import { getPracticeBundle, getPractice } from "../api";

export const GET_PRACTICE = "GET_PRACTICE";
export const GET_PRACTICE_BUNDLE = "GET_PRACTICE_BUNDLE";

export const useGetPractice = () => {
  return useQuery({
    queryKey: [GET_PRACTICE],
    queryFn: () => getPractice(),
  });
};

export const useGetPracticeBundle = () => {
  return useQuery({
    queryKey: [GET_PRACTICE_BUNDLE],
    queryFn: () => getPracticeBundle(),
  });
};
