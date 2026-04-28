import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../api";
import { handleApiError, tokenService } from "../utils";
import { useNavigate } from "react-router";
import { ROUTES } from "../containers";

export const useDeleteUser = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => deleteUser(),
    onSuccess: () => {
      tokenService.removeJwtToken();
      navigate(ROUTES.REGISTRATION);
    },
    onError: (error) => {
      const errorMessage = handleApiError(error);
      alert(errorMessage);
    },
  });
};
