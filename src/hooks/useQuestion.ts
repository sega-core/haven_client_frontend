import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postQuestion } from "../api";
import { GET_PROGRESS } from "./useProgress";

export const useCreateAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (answer: string) => postQuestion(answer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_PROGRESS] });
    },
  });
};
