import { useMutation } from "@tanstack/react-query";
import { getAuth } from "../api/auth";
import { useRawLaunchParamsTelegram } from "./useTelegramApi";
import { tokenService } from "../utils/tokenService";
import { useNavigate } from "react-router";
import { ROUTES } from "../containers";
import { formatError } from "../utils";

export const GET_AUTH = "GET_AUTH";

export const useAuth = () => {
  const rawData = useRawLaunchParamsTelegram();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => getAuth(rawData),
    onSuccess: ({ accessToken }) => {
      tokenService.setJwtToken(accessToken);
      navigate(ROUTES.MAIN);
    },
    onError: (err: unknown) => {
      const errorMessage = formatError(err);

      navigate(ROUTES.ERROR, {
        state: {
          error: errorMessage,
          timestamp: Date.now(),
          type: 'auth_error'
        }
      });
    },
  });
};
