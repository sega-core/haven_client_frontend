import { ProgressLineZen } from "../../components/ProgressLineZen";
import { GratitudeCard } from "../../modules/Gratitude";
import { MoodCard } from "../../modules/Mood";
import { TargetCards } from "../../modules/Targets";
import { DailyQuestionCard } from "../../modules/DailyQuestion";
import { EOnboardingTargetId, useGetProgress } from "../../hooks";
import { SkeletonMetric } from "../../components/Skeleton";
import { Card } from "../../components/Card";

export const Main = () => {
  const { data, isLoading } = useGetProgress();

  return (
    <div className="grid gap-4 w-full">
      <Card />
      <div id={EOnboardingTargetId.PROGRESS_LINE}>
        <ProgressLineZen goal={data?.progressPoint} />
      </div>
      <TargetCards />
      <SkeletonMetric isLoading={isLoading}>
        <div id={EOnboardingTargetId.MOOD}>
          <MoodCard data={data?.mood} />
        </div>
        <div id={EOnboardingTargetId.GRATITUDE}>
          <GratitudeCard data={data?.gratitude.listOfGratitude} />
        </div>
        <div id={EOnboardingTargetId.DAILY_QUESTION}>
          <DailyQuestionCard data={data?.dailyQuestion} />
        </div>
      </SkeletonMetric>
    </div>
  );
};
