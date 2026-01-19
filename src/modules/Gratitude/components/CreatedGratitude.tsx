import { TGratitude } from "../../../api";
import { Typography } from "../../../components/Typography";
import { getTime } from "../../../utils";

export const CreatedGratitude = (item: TGratitude) => {
  const { text, createdAt } = item;
  return (
    <div
      className={`p-4 flex flex-col w-full gap-3 
      bg-beige-quaternary rounded-3xl cursor-pointer`}
    >
      <Typography type="body-s" className="text-brown-secondary">{text}</Typography>
      <div className="flex justify-end"><Typography type="body-s" className="text-brown-secondary">{getTime(createdAt)}</Typography></div>
    </div>
  );
};
