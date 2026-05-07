import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postPayment, TReqPayment } from "../api";
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
    onSuccess: ({ url }) => {
      if (url) {
        navigate(ROUTES.PAYMENT, {
          state: { url },
        });
        return
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
