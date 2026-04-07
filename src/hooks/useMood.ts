import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postMood, TMoodReq } from "../api";
import { GET_PROGRESS, GET_PROGRESS_RANGE } from "./useProgress";

export const GET_ALL_MOOD = "GET_ALL_MOOD";

export const useCreateMood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: TMoodReq) => postMood(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_PROGRESS] });
      queryClient.invalidateQueries({ queryKey: [GET_PROGRESS_RANGE] });
    },
  });
};
