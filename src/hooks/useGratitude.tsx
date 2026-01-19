import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getGratitude,
  postGratitude
} from "../api";

const GET_GRATITUDE = "GET_GRATITUDE";

export const useGetGratitude = () => {
  return useQuery({ queryKey: [GET_GRATITUDE], queryFn: () => getGratitude() });
};

export const useCreateGratitude = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (text: string) => postGratitude(text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_GRATITUDE] });
    },
  });
}

/* export const useDeleteNewsArt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteNewsArt(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_NEWS_ART] });
    },
  });
};

export const useCreateNewsArt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: TNewsArt) => createNewsArt(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_NEWS_ART] });
    },
  });
}; */