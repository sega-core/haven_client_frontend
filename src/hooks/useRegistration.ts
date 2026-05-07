import { useMutation } from "@tanstack/react-query";
import { postRegistration } from "../api";
import { handleApiError } from "../utils";
import { useRawLaunchParamsTelegram } from "./useTelegramApi";
import { useNavigate } from "react-router";
import { ROUTES } from "../containers";
import { havenToast } from "../components/Toast";

export const useRegistration = () => {
  const rawData = useRawLaunchParamsTelegram();

  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => postRegistration(rawData),
    onSuccess: () => {
      localStorage.setItem("is_new_user", "true");
      navigate(ROUTES.MAIN);
      havenToast.coins(
        5,
        "за регистрацию",
        'Потратьте их на первую вводную практику "Эмоции и чувства"',
      );
    },
    onError: (error) => {
      const errorMessage = handleApiError(error);
      alert(errorMessage);
    },
  });
};
