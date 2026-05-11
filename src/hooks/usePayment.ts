import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getPayment, postPayment, TReqPayment } from "../api";
import { useNavigate } from "react-router";
import { ROUTES } from "../containers";
import { havenToast } from "../components/Toast";
import { GET_COIN } from "./useCoin";
import { GET_PRACTICE, GET_PRACTICE_BUNDLE } from "./usePractice";

export const useCreatePayment = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (props: TReqPayment) => postPayment(props),
    onSuccess: ({ url, invId }) => {
      if (url && invId) {
        navigate(ROUTES.PAYMENT, {
          state: { url, invId },
        });
        return;
      }
      queryClient.invalidateQueries({ queryKey: [GET_COIN] });
      queryClient.invalidateQueries({ queryKey: [GET_PRACTICE] });
      queryClient.invalidateQueries({ queryKey: [GET_PRACTICE_BUNDLE] });
    },
    onError: () => {
      havenToast.error("Не получен ответ от кассы");
    },
  });
};

export const useGetPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => getPayment(id),
    onSuccess: ({ status }) => {
      if (status === "paid") {
        queryClient.invalidateQueries({ queryKey: [GET_PRACTICE] });
        queryClient.invalidateQueries({ queryKey: [GET_PRACTICE_BUNDLE] });
      }
    },
  });
};
