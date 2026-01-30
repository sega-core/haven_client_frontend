import { ProgressLineZen } from "../../components/ProgressLineZen";
import { GratitudeCard } from "../../modules/Gratitude";
import { MoodCard } from "../../modules/Mood";
import { TargetsBlock } from "../../modules/Targets";
import { DailyQuestionCard } from "../../modules/DailyQuestion";
import { useGetProgress } from "../../hooks";
import { Suspense } from "react";
import { SkeletonMetric } from "../../components/Skeleton";

export const Main = () => {
  const { data, isLoading } = useGetProgress();

  return (
    <Suspense fallback={<div>fallback</div>}>
      <div className="grid gap-4 w-full">
        <ProgressLineZen goal={data?.progressPoint} />
        <TargetsBlock />
        <SkeletonMetric isLoading={isLoading}>
          <MoodCard data={data?.mood} />
          <GratitudeCard data={data?.gratitude.listOfGratitude} />
          <DailyQuestionCard data={data?.dailyQuestion} />
        </SkeletonMetric>
      </div>
    </Suspense>
  );
};
