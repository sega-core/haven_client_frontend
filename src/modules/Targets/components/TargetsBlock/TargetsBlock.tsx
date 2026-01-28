import { useCallback } from "react";
import { Circle } from "../../../../components/CircleBlock";
import { useDoneTarget, useGetTarget } from "../../../../hooks";
import { SkeletonTargetCircle } from "../../../../components/Skeleton";

export const TargetsBlock = () => {
  const { data, isLoading } = useGetTarget();

  const { mutate } = useDoneTarget();

  const renderCircle = useCallback(
    () =>
      data
        ?.filter((item) => item.isCanCompletedToday)
        .map((item, index) => (
          <Circle {...item} key={index} onChange={() => mutate(item.id)} />
        )),
    [data],
  );

  return (
    <div className="flex gap-4 overflow-x-scroll scrollbar-hide w-full">
      <SkeletonTargetCircle isLoading={isLoading}>
        {renderCircle()}
      </SkeletonTargetCircle>
    </div>
  );
};
