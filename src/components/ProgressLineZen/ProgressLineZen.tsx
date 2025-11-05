import { Icon } from "../Icon";
import { useModal } from "../../hooks";
import { Typography } from "../Typography";

const PROGRESS_SEGMENTS = 4;
const ZEN_SEGMENT_INDEX = 3;

const DayBonus = ({ index, bonus }: { index: number; bonus: number }) => {
  return (
    <div
      key={index}
      className={`
              flex flex-col gap-4 items-center p-2 rounded-lg shadow-sm transition-all hover:scale-105
              bg-beige-tertiary
            `}
    >
      <Typography
        type="body-s"
        className="text-beige-primary text-center line-clamp-2 h-8 flex items-center justify-center"
      >
        {`${index + 1} день`}
      </Typography>
      <div className="flex justify-end w-full">
        <Typography type="body-s" className="text-beige-primary">
          {bonus}
        </Typography>
        <Icon
          name="ZenFilled"
          className="fill-(--stroke-beige-primary)"
          width={20}
          height={20}
        />
      </div>
    </div>
  );
};

const ZenInfoModalContent = () => (
  <div className="pb-6 px-2">
    <div className="space-y-4">
      <Typography
        type="body-s"
        className="text-brown-secondary text-center mb-2"
      >
        Заполняйте трекеры каждый день и забирайте награду
      </Typography>

      <div className="flex flex-wrap justify-center gap-2.5">
        {[5, 5, 10, 15, 20, 25, 50].map((bonus, index) => (
          <div key={index}>{DayBonus({ bonus, index })}</div>
        ))}
      </div>

      <Typography
        type="body-xs"
        className="text-brown-secondary text-center italic pt-1"
      >
        * Серия сбрасывается при пропуске дня
      </Typography>
    </div>
  </div>
);

const Segment = ({
  index,
  isActive,
  isZenSegment,
}: {
  index: number;
  isActive: boolean;
  isZenSegment: boolean;
}) => {
  return (
    <div key={index} className="flex items-center w-full gap-1">
      <div
        className={`rounded-2xl w-full h-1 ${isActive ? "bg-(--stroke-white-primary)" : "bg-(--stroke-white-secondary)"}`}
      />
      <Icon
        name={isZenSegment ? "ZenFilled" : "CheckFilled"}
        className={`shrink-0 ${isActive ? "fill-(--stroke-white-primary)" : "fill-(--stroke-white-secondary)"}`}
        width={20}
        height={20}
      />
    </div>
  );
};

export const ProgressLineZen = ({ goal = 0 }: { goal?: number }) => {
  const segments = Array.from({ length: PROGRESS_SEGMENTS }, (_, i) => i);
  const { onOpen, Modal } = useModal();
  const isGoalCompleted = goal >= 3;

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center w-full gap-1" role="progressbar">
        {segments.map((segmentIndex) => (
          <Segment
            key={segmentIndex}
            index={segmentIndex}
            isActive={goal > segmentIndex || isGoalCompleted}
            isZenSegment={segmentIndex === ZEN_SEGMENT_INDEX}
          />
        ))}
      </div>
      <div onClick={onOpen} className="pointer pl-2">
        <Icon
          name="Info"
          width={20}
          height={20}
          className="fill-(--stroke-white-primary)"
        />
      </div>
      <Modal
        title="Зарабатывай Zen"
        size="lg"
        body={<div>{ZenInfoModalContent()}</div>}
      />
    </div>
  );
};
