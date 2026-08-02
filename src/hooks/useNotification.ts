import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotification, postNotification } from "../api";
import { handleApiError } from "../utils";

export const GET_HISTORY_NOTIFICATION = "GET_HISTORY_NOTIFICATION";

export const useSendNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: { message: string; recipients: "all" | "test" }) =>
      postNotification(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_HISTORY_NOTIFICATION] });
    },
    onError: (error) => {
      const errorMessage = handleApiError(error);
      alert(errorMessage);
    },
  });
};

export const useGetHistoryNotification = () => {
  return useQuery({
    queryKey: [GET_HISTORY_NOTIFICATION],
    queryFn: getNotification,
  });
};
