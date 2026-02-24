import React, { useState } from "react";

type SwitchProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
};

export const Switch: React.FC<SwitchProps> = ({
  checked = false,
  onChange,
  disabled = false,
  size = "md",
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    if (disabled) return;
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange?.(newValue);
  };

  const sizes = {
    sm: {
      width: "w-9",
      height: "h-5",
      circle: "w-3 h-3",
      translate: "translate-x-4",
    },
    md: {
      width: "w-12",
      height: "h-6",
      circle: "w-4 h-4",
      translate: "translate-x-6",
    },
    lg: {
      width: "w-14",
      height: "h-7",
      circle: "w-5 h-5",
      translate: "translate-x-7",
    },
  };

  const currentSize = sizes[size];

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={disabled}
      className={`
        relative ${currentSize.width} ${currentSize.height}
        rounded-full p-1
        transition-all duration-300 ease-in-out
        outline-none focus:outline-none
        focus-visible:ring-2 focus-visible:ring-beige-primary focus-visible:ring-offset-2
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${isChecked ? "bg-beige-primary" : "bg-beige-tertiary"}
      `}
      role="switch"
      aria-checked={isChecked}
    >
      <span
        className={`
          block
          ${currentSize.circle}
          rounded-full
          shadow-md
          transition-all duration-300 ease-in-out
          ${isChecked ? currentSize.translate : "translate-x-0"}
        `}
        style={{
          backgroundColor: "#FEFADF",
        }}
      />
    </button>
  );
};
