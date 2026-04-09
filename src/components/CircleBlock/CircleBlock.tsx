import { Block } from "../Block";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { CircleCheckbox } from "../CircleCheckbox";
import { Typography } from "../Typography";
import { cn, formatDateRange } from "../../utils";
import { TTarget } from "../../api";
import { getColorWithOpacity } from "../../utils";

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
    isCanCompletedToday,
    completionRate,
    color,
  } = props;
  const period = formatDateRange(startDate, endDate);

  return (
    <Block
      className={cn(
        "max-w-[170px] h-[170px] shrink-0 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group cursor-pointer",
      )}
    >
      <div className="flex justify-between relative">
        <div className="relative" style={{ width: 78, height: 78 }}>
          <div
            className="absolute inset-0 rounded-full blur-sm opacity-20 group-hover:opacity-30 transition-opacity"
            style={{ backgroundColor: color }}
          />

          <CircularProgressbar
            value={completionRate}
            text={`${completionRate}%`}
            styles={buildStyles({
              textColor: color,
              pathColor: color,
              trailColor: getColorWithOpacity(color, 0.2),
            })}
          />
        </div>

        <CircleCheckbox
          onChange={onChange}
          checked={isCompletedToday}
          color={color}
          isCanCompletedToday={isCanCompletedToday}
        />
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <Typography
            type="heading-xs"
            className="text-brown-primary overflow-hidden text-ellipsis whitespace-nowrap inline-block max-w-full group-hover:text-[color] transition-colors"
          >
            {title}
          </Typography>
        </div>

        <div className="flex items-center gap-1">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <Typography type="body-xs" style={{ color: color }}>
            {period}
          </Typography>
        </div>
      </div>
    </Block>
  );
};
