import { Typography } from "../Typography";

type TChip = {
  label: string;
  size?: "sm" | "md" | "lg"; //NOTE: пока нет
  color: "--background-beige-tertiary"; //NOTE: пока один
  variant?: "solid" | "bordered"; //NOTE: пока нет
  icon?: React.ReactNode;
  onClick?: () => void;
};

export const Chip = ({ label, color, icon, onClick }: TChip) => {
  return (
    <button
      className={`text-(--plots-text-beige-primary) bg-[var(${color})] backdrop-blur-md flex py-2 px-4 justify-center items-center
      rounded-full gap-2`}
      onClick={onClick}
    >
      {icon}
      <Typography type="body-s">{label}</Typography>
    </button>
  );
};
