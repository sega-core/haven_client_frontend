import { Block } from "../Block";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { CircleCheckbox } from "../CircleCheckbox";
import { Typography } from "../Typography";
import { formatDateRange } from "../../utils";
import { TTarget } from "../../api";

type Props = {
  onChange: () => void;
} & TTarget;

export const Circle = (props: Props) => {
  const {
    startDate,
    endDate,
    title,
    onChange,
    isCompletedToday,
    completionRate,
  } = props;
  const period = formatDateRange(startDate, endDate);

  //TODO: доделать цвет
  return (
    <Block className="max-w-[170px] h-[170px] shrink-0">
      <div className="flex justify-between">
        <div style={{ width: 78, height: 78 }}>
          <CircularProgressbar
            value={completionRate}
            text={`${completionRate}%`}
          />
        </div>
        <CircleCheckbox onChange={onChange} checked={isCompletedToday} />
      </div>
      <div>
        <Typography
          type="heading-xs"
          className="text-brown-primary overflow-hidden text-ellipsis whitespace-nowrap inline-block max-w-full"
        >
          {title}
        </Typography>
        <Typography type="body-xs" className="text-brown-secondary">
          {period}
        </Typography>
      </div>
    </Block>
  );
};
