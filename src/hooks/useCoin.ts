import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCoin, postCoin, spendCoin } from "../api";
import { addToast } from "@heroui/toast";
import { GET_PRACTICE } from "./usePractice";

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
    },
  });
};

export const useSpendCoin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: { amount: number; practiceId: number }) => spendCoin(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_COIN] });
      queryClient.invalidateQueries({ queryKey: [GET_PRACTICE] });
    },
  });
};
