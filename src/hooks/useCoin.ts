import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCoin, postCoin } from "../api";

export const GET_COIN = "GET_COIN";

export const useGetCoin = () => {
  return useQuery({ queryKey: [GET_COIN], queryFn: () => getCoin() });
};

export const useCreateDailyCoin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postCoin(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_COIN] });
    },
  });
};
