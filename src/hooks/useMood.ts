import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMood, getMoodTags, postMood, TMoodReq } from "../api";

const GET_MOOD = "GET_MOOD";
const GET_MOOD_TAGS = "GET_MOOD_TAGS";

export const useGetMood = () => {
  return useQuery({ queryKey: [GET_MOOD], queryFn: () => getMood() });
};
export const useGetMoodTags = () => {
  return useQuery({ queryKey: [GET_MOOD_TAGS], queryFn: () => getMoodTags() });
};

export const useCreateMood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: TMoodReq) => postMood(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_MOOD] });
    },
  });
};
