import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getQuestion, postQuestion } from "../api";

const GET_QUESTION = "GET_QUESTION";

export const useGetQuestion = () => {
  return useQuery({ queryKey: [GET_QUESTION], queryFn: () => getQuestion() });
};

export const useCreateAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (answer: string) => postQuestion(answer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_QUESTION] });
    },
  });
};
