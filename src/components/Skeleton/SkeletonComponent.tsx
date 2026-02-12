import cn from "../../utils/cn";

export const SkeletonComponent = ({ className = "" }: { className?: string }) => {
  return (
        <div className={cn(className, "bg-gray-200 animate-pulse rounded-full")} />

  );
};
