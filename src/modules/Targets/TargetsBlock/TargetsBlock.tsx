import { Circle } from "../../../components/CircleBlock";

export const TargetsBlock = () => {
  return (
    <div className="flex gap-4 overflow-x-scroll scrollbar-hide w-full">
      <Circle
        value={30}
        name="Пробежка"
        color=""
        period={[new Date(), new Date()]}
      />
      <Circle
        value={40}
        name="Yoga"
        color={""}
        period={[new Date(), new Date()]}
      />
      <Circle
        value={50}
        name="Что-то еще"
        color={""}
        period={[new Date(), new Date()]}
      />
    </div>
  );
};
