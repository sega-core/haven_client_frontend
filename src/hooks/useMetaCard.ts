import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { handleApiError } from "../utils";
import { getMetaCard, postMetaCard } from "../api/metacard";

export const GET_META_CARD = "GET_META_CARD";

export const useGetMetaCard = () => {
  return useQuery({ queryKey: [GET_META_CARD], queryFn: () => getMetaCard() });
};

export const useCreateMetaCardAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: { felt: string; seen: string; understood: string }) =>
      postMetaCard(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_META_CARD] });
      /*       queryClient.invalidateQueries({ queryKey: [GET_PROGRESS_RANGE] });
       */
    },
    onError: (error) => {
      const errorMessage = handleApiError(error);
      alert(errorMessage);
    },
  });
};
