import { useState } from "react";

export const CircleCheckbox = () => {
  const [checked, setChecked] = useState(false);

  //TODO: border-(--stroke-color-1-secondary) в плагин

  return (
    <button
      type="button"
      onClick={() => setChecked(!checked)}
      className={`
        relative flex justify-center items-center
        w-6 h-6 p-1
        rounded-full
        border-1.5 border-(--stroke-color-1-secondary)
        transition-all duration-300 ease-in-out
        ${checked ? "bg-blue-500 border-blue-500 border-none" : "bg-white"}
        hover:ring-2 hover:ring-blue-300
        active:scale-90
      `}
    >
      {checked && (
        <span className="absolute w-full h-full rounded-full bg-blue-400 opacity-30"></span>
      )}
      <svg
        className={`
          w-3 h-3 text-white
          transition-transform duration-300 ease-in-out
          ${checked ? "scale-100 opacity-100" : "scale-0 opacity-0"}
        `}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </button>
  );
};
