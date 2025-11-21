import React from "react";
import { Typography } from "../Typography";

type ProgressLineProps = {
  value: number;
  height?: number;
  colorClass?: string;
  className?: string;
};

export const ProgressLine: React.FC<ProgressLineProps> = ({
  value,
  height = 8,
  colorClass = "bg-(--stroke-white-primary)",
  className = "",
}) => {
  const clamped = Math.max(0, Math.min(100, Number(value ?? 0)));

  return (
    <div className={`grid gap-1 ${className}`}>
      <Typography type="body-s" className="text-brown-primary">
        {clamped}%
      </Typography>
      <div
        className={`relative flex-1 rounded-full bg-gray-400/20`}
        style={{ height }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}
        aria-label="Progress"
      >
        <div
          className={`rounded-full ${colorClass} transition-all duration-500 ease-in-out
          absolute left-0 top-0 bottom-0`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressLine;
