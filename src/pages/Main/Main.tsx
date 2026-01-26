import { ProgressLineZen } from "../../components/ProgressLineZen";
import { GratitudeCard } from "../../modules/Gratitude";
import { MoodCard } from "../../modules/Mood";
import { TargetsBlock } from "../../modules/Targets";
import { DailyQuestionCard } from "../../modules/DailyQuestion";
import { useProgress } from "../../hooks";
import { Suspense } from "react";
import { SkeletonMain } from "../../components/Skeleton/SkeletonMain";

export const Main = () => {
  const { data, isLoading } = useProgress();

  return (
    <Suspense fallback={<div>fallback</div>}>
      <div className="grid gap-4 w-full">
        <ProgressLineZen goal={data?.progressPoint || 0} />
        <TargetsBlock />
        <SkeletonMain isLoading={isLoading}>
          <MoodCard data={data?.mood} />
          <GratitudeCard data={data?.gratitude.listOfGratitude} />
          <DailyQuestionCard data={data?.dailyQuestion} />
        </SkeletonMain>
      </div>
    </Suspense>
  );
};
