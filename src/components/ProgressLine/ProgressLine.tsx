import { Icon } from "../Icon";

export const ProgressLine = ({
  goal,
}: {
  goal: "0" | "1" | "2" | "3" | "4";
}) => {
  const map = {
    "0": "ZenLineStage0",
    "1": "ZenLineStage1",
    "2": "ZenLineStage2",
    "3": "ZenLineStage3",
    "4": "ZenLineStage4",
  };
  return (
    <div className="flex gap-1 items-center bg-rose-200 pt-2 pb-2 border-solid borded-0 border-cyan-300">
      <Icon name={map[goal]} />
      <Icon name={"Info"} width={16} height={16} />
    </div>
  );
};
