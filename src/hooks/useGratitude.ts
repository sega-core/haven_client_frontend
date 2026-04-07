import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postGratitude } from "../api";
import { GET_PROGRESS, GET_PROGRESS_RANGE } from "./useProgress";

export const useCreateGratitude = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comment: string) => postGratitude(comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_PROGRESS] });
      queryClient.invalidateQueries({ queryKey: [GET_PROGRESS_RANGE] });
    },
  });
};
