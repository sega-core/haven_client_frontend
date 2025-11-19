import { Block } from "../Block";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { CircleCheckbox } from "../CircleCheckbox";
import { Typography } from "../Typography";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

type Props = {
  value: number;
  color: string;
  name: string;
  period: Date[];
};

export const Circle = ({ value, color, name, period }: Props) => {
  const formattedDates = period.map((d) => format(d, "d LLL", { locale: ru }));

  const result = `${formattedDates[0]} — ${formattedDates[1]}`;

  //TODO: доделать цвет
  return (
    <Block className="max-w-[170px] h-[170px] shrink-0">
      <div className="flex justify-between">
        <div style={{ width: 78, height: 78 }}>
          <CircularProgressbar value={value} text={`${value}%`} />
        </div>
        <CircleCheckbox />
      </div>
      <div>
        <Typography type="heading-xs" className="text-brown-primary">
          {name}
        </Typography>
        <Typography type="body-xs" className="text-brown-secondary">
          {result}
        </Typography>
      </div>
    </Block>
  );
};
