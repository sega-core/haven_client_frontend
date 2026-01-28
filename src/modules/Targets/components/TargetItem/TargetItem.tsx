import { Button } from "@heroui/button";
import { Block } from "../../../../components/Block";
import { Typography } from "../../../../components/Typography";
import { Icon } from "../../../../components/Icon";
import { ProgressLine } from "../../../../components/ProgressLine";
import { TTarget } from "../../../../api";
import { formatDateRange } from "../../../../utils";
import { DAYS } from "../DayPanel/DayPanel.constant";
import { useDeleteTarget } from "../../../../hooks";

export const TargetItem = (target: TTarget) => {
  const { title, startDate, endDate, notifyTime, weekdays,completionRate, id } = target;

  const {mutate} = useDeleteTarget();

  return (
    <Block>
      <div className="flex justify-between items-center">
        <Typography
          type="body-md"
          className="text-brown-primary flex-1"
          weight="medium"
        >
          {title}
        </Typography>
        <div>
          <Button
            isIconOnly
            onPress={() => alert("edit")}
            variant="light"
            size="sm"
            radius="full"
          >
            <Icon name="PenSquare" width={20} height={20} />
          </Button>
          <Button
            isIconOnly
            onPress={() => mutate(id)}
            variant="light"
            size="sm"
            radius="full"
          >
            <Icon name="Trash" width={20} height={20} />
          </Button>
        </div>
      </div>
      <Typography type="body-s" className="text-brown-primary">
        {formatDateRange(startDate, endDate)}
      </Typography>
      <div className="flex items-center gap-1.5">
        <div>
          <Icon name="AlarmClock" />
        </div>
        <div>
          <Typography type="body-s" className="text-brown-primary">
            {notifyTime.slice(0, 5)}{" "}
            {weekdays.map((item) => DAYS.find((day) => day.id === item)?.title).join(', ')}
          </Typography>
        </div>
      </div>
      <ProgressLine
        value={completionRate}
        colorClass="bg-(--plots-progress-2)"
        height={3}
      />
    </Block>
  );
};
