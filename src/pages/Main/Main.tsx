import { ProgressLineZen } from "../../components/ProgressLineZen";
import { GratitudeCard } from "../../modules/Gratitude";
import { MoodCard } from "../../modules/Mood";
import { TargetCards } from "../../modules/Targets";
import { DailyQuestionCard } from "../../modules/DailyQuestion";
import { useGetProgress } from "../../hooks";
import { SkeletonMetric } from "../../components/Skeleton";

export const Main = () => {
  const { data, isLoading } = useGetProgress();

  return (
    <div className="grid gap-4 w-full">
      <ProgressLineZen goal={data?.progressPoint} />
      <TargetCards />
      <SkeletonMetric isLoading={isLoading}>
        <MoodCard data={data?.mood} />
        <GratitudeCard data={data?.gratitude.listOfGratitude} />
        <DailyQuestionCard data={data?.dailyQuestion} />
      </SkeletonMetric>
    </div>
  );
};
