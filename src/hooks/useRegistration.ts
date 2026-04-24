import { useMutation } from "@tanstack/react-query";
import { postRegistration } from "../api";
import { handleApiError } from "../utils";
import { useRawLaunchParamsTelegram } from "./useTelegramApi";
import { useNavigate } from "react-router";
import { ROUTES } from "../containers";

export const useRegistration = () => {
  const rawData = useRawLaunchParamsTelegram();

  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => postRegistration(rawData),
    onSuccess: () => {
      navigate(ROUTES.MAIN);
    },
    onError: (error) => {
      const errorMessage = handleApiError(error);
      alert(errorMessage);
    },
  });
};
