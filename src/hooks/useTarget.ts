import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTarget,
  postTarget,
  TTargetCreate,
  postTargetDone,
  deleteTarget,
} from "../api";

export const GET_TARGET = "GET_TARGET";

export const useGetTarget = () => {
  return useQuery({ queryKey: [GET_TARGET], queryFn: () => getTarget() });
};

export const useCreateTarget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: TTargetCreate) => postTarget(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_TARGET] });
    },
  });
};

export const useDoneTarget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (targetId: number) => postTargetDone(targetId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_TARGET] });
    },
  });
};

export const useDeleteTarget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (targetId: number) => deleteTarget(targetId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_TARGET] });
    },
  });
};
