import { getTime } from "../../utils";
import { Typography } from "../Typography";

export const BlockAnswer = ({
  text,
  date,
}: {
  text: string;
  date: string;
}) => {
  return (
    <div
      className={`p-4 flex flex-col w-full gap-3 
      bg-beige-quaternary rounded-3xl cursor-pointer`}
    >
      <Typography type="body-s" className="text-brown-secondary">
        {text}
      </Typography>
      <div className="flex justify-end">
        <Typography type="body-s" className="text-brown-secondary">
          {getTime(date)}
        </Typography>
      </div>
    </div>
  );
};
