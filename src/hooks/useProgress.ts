import { useQuery } from "@tanstack/react-query";
import { getProgress } from "../api";
import { useCreateDailyCoin } from "./useCoin";
import { useEffect } from "react";
import { format } from "date-fns";

export const GET_PROGRESS = "GET_PROGRESS";

export const useGetProgress = () => {
  const { mutate } = useCreateDailyCoin();

  const { data, isLoading } = useQuery({
    queryKey: [GET_PROGRESS],
    queryFn: () => getProgress(),
  });

  useEffect(() => {
    const today = format(new Date(), "yyyy-MM-dd");
    const lastAutoClaimDate = localStorage.getItem("lastBonusAt");

    if (data?.isAllDone && today !== lastAutoClaimDate) {
      localStorage.setItem("lastBonusAt", today);
      mutate();
    }
  }, [data]);

  return { data, isLoading };
};
