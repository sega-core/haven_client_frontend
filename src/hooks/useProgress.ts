import { useQuery } from "@tanstack/react-query";
import { getProgress } from "../api";

export const GET_PROGRESS = "GET_PROGRESS";

export const useProgress = () => {
  return useQuery({ queryKey: [GET_PROGRESS], queryFn: () => getProgress() });
};
