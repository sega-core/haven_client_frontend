import { Button } from "@heroui/button";
import { Block } from "../../../../components/Block";
import { Typography } from "../../../../components/Typography";
import { Icon } from "../../../../components/Icon";
import { ProgressLine } from "../../../../components/ProgressLine";

export const TargetItem = () => {
  return (
    <Block>
      <div className="flex justify-between items-center">
        <Typography
          type="body-md"
          className="text-brown-primary"
          weight="medium"
        >
          Вечереняя пробежка
        </Typography>
        <div>
          <Button
            isIconOnly
            onPress={() => alert("dasd")}
            variant="light"
            size="sm"
            radius="full"
          >
            <Icon name="PenSquare" width={20} height={20} />
          </Button>
          <Button
            isIconOnly
            onPress={() => alert("dasd")}
            variant="light"
            size="sm"
            radius="full"
          >
            <Icon name="Trash" width={20} height={20} />
          </Button>
        </div>
      </div>
      <Typography type="body-s" className="text-brown-primary">
        1 окт. — 30 ноя.
      </Typography>
      <div className="flex items-center gap-1.5">
        <div>
          <Icon name="AlarmClock" />
        </div>
        <div>
          <Typography type="body-s" className="text-brown-primary">
            17:00 пн–пт
          </Typography>
        </div>
      </div>
      <ProgressLine
        value={50}
        colorClass="bg-(--plots-progress-2)"
        height={3}
      />
    </Block>
  );
};
