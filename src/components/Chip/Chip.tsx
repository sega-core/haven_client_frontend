import React from "react";
import { Typography } from "../Typography";

type TChip = {
  label: string;
  size?: "sm" | "md" | "lg"; //NOTE: пока нет
  /* color?: "bg-beige-tertiary";  */ //NOTE: пока один
  variant?: "solid" | "flat"; //NOTE: пока нет
  icon?: React.ReactNode;
  onClick?: () => void;
};

export const Chip = ({ label, icon, variant = "solid", onClick }: TChip) => {
  const getStyles = () => {
    switch (variant) {
      case "solid":
        return {
          bg: "bg-beige-tertiary",
          text: "text-beige-primary",
          icon: "text-beige-primary",
        };
      case "flat":
        return {
          bg: "bg-beige-primary",
          text: "text-white-primary",
          icon: "text-white-primary",
        };
      default:
        return {
          bg: "",
          text: "",
          icon: "",
        };
    }
  };

  const styles = getStyles();

  const coloredIcon =
    icon &&
    React.cloneElement(icon as React.ReactElement, {
      fill: `var(--${getStyles().icon})`,
    });

  return (
    <button type="button"
      className={`${styles.bg} ${styles.text} backdrop-blur-md flex py-2 px-4 justify-center items-center rounded-full gap-2 transition-colors`}
      onClick={onClick}
    >
      {coloredIcon}
      <Typography type="body-s">{label}</Typography>
    </button>
  );
};
