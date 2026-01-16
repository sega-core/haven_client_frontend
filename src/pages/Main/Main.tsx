import { ProgressLineZen } from "../../components/ProgressLineZen";
import { GratitudeCard } from "../../modules/Gratitude";
import { MoodCard } from "../../modules/Mood";
import { TargetsBlock } from "../../modules/Targets";
import { DailyQuestionCard } from "../../modules/DailyQuestion";

export const Main = () => {
  return (
    <div className="grid gap-4 w-full">
      <ProgressLineZen goal={2} />
      <TargetsBlock />
      <MoodCard />
      <GratitudeCard />
      <DailyQuestionCard />
    </div>
  );
};
