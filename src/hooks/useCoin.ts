import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCoin, postCoin, spendCoin, TCoin } from "../api";
import { addToast } from "@heroui/toast";
import { GET_PRACTICE, GET_PRACTICE_BUNDLE } from "./usePractice";

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
      addToast({
        title: `Вам начислено ${bonus} zen`,
      });
    },
  });
};

export const useSpendCoin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: { amount: number; practiceId: number }) =>
      spendCoin(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_COIN] });
      queryClient.invalidateQueries({ queryKey: [GET_PRACTICE] });
      queryClient.invalidateQueries({ queryKey: [GET_PRACTICE_BUNDLE] });
    },
  });
};
