import { Typography } from "../Typography";

type TChip = {
  name: string;
  size?: "sm" | "md" | "lg"; //NOTE: пока нет
  color: "--background-beige-tertiary"; //NOTE: пока один
  variant?: "solid" | "bordered"; //NOTE: пока нет
  icon?: React.ReactNode;
};

export const Chip = ({ name, color, icon }: TChip) => {
  return (
    <div
      className={`text-[var(--plots-text-beige-primary)] bg-[var(${color})] backdrop-blur-md flex py-2 px-4 justify-center items-center
      rounded-full gap-2`}
    >
      {icon}
      <Typography type="body-s">{name}</Typography>
    </div>
  );
};
