import React from "react";
import { Typography } from "../Typography";
import { getColorWithOpacity } from "../../utils";

type ProgressLineProps = {
  value: number;
  height?: number;
  color?: string;
  className?: string;
  showPercentage?: boolean;
};

export const ProgressLine: React.FC<ProgressLineProps> = ({
  value,
  height = 8,
  color = "#4F8A8C",
  className = "",
  showPercentage = true,
}) => {
  const clamped = Math.max(0, Math.min(100, Number(value ?? 0)));

  return (
    <div className={`grid gap-1 ${className}`}>
      {showPercentage && (
        <Typography type="body-s" className="text-brown-primary">
          {clamped}%
        </Typography>
      )}
      
      <div
        className="relative flex-1 rounded-full"
        style={{ 
          height, 
          backgroundColor: getColorWithOpacity(color,0.2)
        }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}
        aria-label="Progress"
      >
        <div
          className="absolute left-0 top-0 bottom-0 rounded-full transition-all duration-500 ease-in-out"
          style={{ 
            width: `${clamped}%`,
            backgroundColor: color
          }}
        />
      </div>
    </div>
  );
};

export default ProgressLine;