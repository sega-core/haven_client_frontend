import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCoin, postCoin, TCoin } from "../api";
import { useToast } from "../components/Toast";

export const GET_COIN = "GET_COIN";

export const useGetCoin = () => {
  return useQuery({ queryKey: [GET_COIN], queryFn: () => getCoin() });
};

export const useGetCoinState = () => {
  const queryClient = useQueryClient();

  const data = queryClient.getQueryData([GET_COIN]) as TCoin;

  return {
    balance: data.balance,
  };
};

export const useCreateDailyCoin = () => {
  const queryClient = useQueryClient();

  const { success } = useToast();

  return useMutation({
    mutationFn: () => postCoin(),
    onSuccess: ({ bonus }) => {
      queryClient.invalidateQueries({ queryKey: [GET_COIN] });
      success(`Вам начислено ${bonus} zen`);
    },
  });
};
