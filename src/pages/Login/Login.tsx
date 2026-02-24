import { useAuth } from "../../hooks";
import { SkeletonMetric } from "../../components/Skeleton";
import { useEffect } from "react";

export const Login = () => {
  const { isPending, mutate } = useAuth();

  useEffect(() => {
    mutate();
  }, []);

  return (
    <div className="grid gap-4 w-full">
      <SkeletonMetric isLoading={isPending} children={undefined} />
    </div>
  );
};
