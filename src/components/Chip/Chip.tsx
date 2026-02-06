import React from "react";
import { Typography } from "../Typography";
import { CHIP_COLOR_MAP } from "./Chip.constant";

type TChip = {
  label: string;
  color?: "beige" | "green" | 'mustard'|'white';
  variant?: "solid" | "flat";
  icon?: React.ReactNode;
  onClick?: () => void;
};

export const Chip = ({
  label,
  icon,
  color = "beige",
  variant = "solid",
  onClick,
}: TChip) => {

  const styles = CHIP_COLOR_MAP[color][variant];

  const coloredIcon =
    icon &&
    React.cloneElement(icon as React.ReactElement, {
      fill: `var(--${styles.icon})`,
    });

  return (
    <button
      type="button"
      className={`${styles.bg} ${styles.text} backdrop-blur-md flex py-2 px-4 justify-center items-center rounded-full gap-2 transition-colors`}
      onClick={onClick}
    >
      {coloredIcon}
      <Typography type="body-s">{label}</Typography>
    </button>
  );
};
