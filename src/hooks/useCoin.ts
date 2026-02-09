import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCoin, postCoin } from "../api";
import { addToast } from "@heroui/toast";

export const GET_COIN = "GET_COIN";

export const useGetCoin = () => {
  return useQuery({ queryKey: [GET_COIN], queryFn: () => getCoin() });
};

export const useCreateDailyCoin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postCoin(),
    onSuccess: ({ bonus }) => {
      queryClient.invalidateQueries({ queryKey: [GET_COIN] });
      addToast({
        title: `Вам начислено ${bonus} zen`,
      });
    }
  });
};
