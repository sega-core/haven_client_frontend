import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postMood, TMoodReq } from "../api";
import { GET_PROGRESS } from "./useProgress";

export const useCreateMood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: TMoodReq) => postMood(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_PROGRESS] });
    },
  });
};
