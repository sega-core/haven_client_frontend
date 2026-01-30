import { Button } from "@heroui/button";
import { Icon } from "../Icon";
import { useModal } from "../../hooks";
import { Typography } from "../Typography";

const PROGRESS_SEGMENTS = 4;
const ZEN_SEGMENT_INDEX = 3;

const ZenInfoModalContent = () => (
  <div className="pb-10 px-4">
    <div className="space-y-4">
      <Typography type="body-s" className="text-brown-secondary text-center">
        Заполняйте трекеры каждый день и забирайте Zen
      </Typography>

      <div className="space-y-3">
        {[5, 5, 10, 15, 20, 25, 50].map((bonus, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-white/50 rounded-lg shadow-md"
          >
            <div className="flex items-center gap-3">
              <div
                className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${
                  index === 6
                    ? "bg-gradient-to-br from-yellow-400 to-orange-500 text-white"
                    : "bg-amber-100 text-amber-700"
                }
              `}
              >
                {index + 1}
              </div>
              <Typography type="body-s" className="text-brown-primary">
                {index === 0
                  ? "Первый день"
                  : index === 1
                    ? "Второй день подряд"
                    : `День ${index + 1} подряд`}
              </Typography>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg text-beige-primary">+{bonus}</div>
              <Typography type="body-s" className="text-brown-secondary">
                Zen
              </Typography>
            </div>
          </div>
        ))}
      </div>

      <Typography
        type="body-s"
        className="text-brown-secondary text-center italic pt-2"
      >
        * Серия сбрасывается, если пропустить день
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
      <Button
        isIconOnly
        onPress={() => onOpen()}
        variant="light"
        size="sm"
        radius="full"
      >
        <Icon
          name="Info"
          width={20}
          height={20}
          className="fill-(--stroke-white-primary)"
        />
      </Button>
      <Modal
        title="Зарабатывай Zen"
        size="lg"
        body={<div>{ZenInfoModalContent()}</div>}
      />
    </div>
  );
};
