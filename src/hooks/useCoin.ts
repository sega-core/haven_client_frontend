import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCoin, postCoin, TCoin } from "../api";
import { havenToast } from "../components/Toast";

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

  return useMutation({
    mutationFn: () => postCoin(),
    onSuccess: ({ bonus }) => {
      queryClient.invalidateQueries({ queryKey: [GET_COIN] });
      havenToast.coins(bonus);
    },
  });
};
