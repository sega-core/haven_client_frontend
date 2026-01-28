export const CircleCheckbox = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) => {
  const disabled = checked;

  return (
    <button
      type="button"
      onClick={() => !disabled && onChange()}
      disabled={disabled}
      className={`
        relative flex justify-center items-center
        w-6 h-6 p-1
        rounded-full
        border-1.5
        transition-all duration-300 ease-in-out
        ${
          checked
            ? "bg-blue-500 border-blue-500 border-none"
            : "bg-white border-(--stroke-color-1-secondary)"
        }
        ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:ring-2 hover:ring-blue-300 active:scale-90 cursor-pointer"
        }
      `}
      aria-disabled={disabled}
    >
      {checked && !disabled && (
        <span className="absolute w-full h-full rounded-full bg-blue-400 opacity-30"></span>
      )}
      {checked && disabled && (
        <span className="absolute w-full h-full rounded-full bg-gray-400 opacity-30"></span>
      )}
      <svg
        className={`
          w-3 h-3
          transition-transform duration-300 ease-in-out
          ${checked ? "scale-100 opacity-100" : "scale-0 opacity-0"}
          ${disabled ? "text-gray-100" : "text-white"}
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
