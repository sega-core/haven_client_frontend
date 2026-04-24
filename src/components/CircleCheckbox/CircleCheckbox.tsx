import { getColorWithOpacity } from "../../utils";

export const CircleCheckbox = ({
  checked,
  onChange,
  color,
  isCanCompletedToday
}: {
  checked: boolean;
  onChange: () => void;
  color: string;
  isCanCompletedToday: boolean;
}) => {
  const isDisabled = checked || !isCanCompletedToday;

  const handleClick = () => {
    if (!isDisabled) {
      onChange();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isDisabled}
      className={`
        relative flex justify-center items-center
        w-6 h-6 p-1
        rounded-full
        border-1.5
        transition-all duration-300 ease-in-out
        ${isDisabled 
          ? "opacity-50 cursor-not-allowed" 
          : "hover:ring-2 active:scale-90 cursor-pointer"
        }
      `}
      style={{
        backgroundColor: checked ? color : 'white',
        borderColor: checked ? color : 'var(--stroke-color-1-secondary)',
        borderWidth: checked ? '0px' : '1.5px',
        borderStyle: 'solid',
        ...(checked ? { border: 'none' } : {}),
      }}
/*       aria-disabled={isDisabled}
 */    >
      {checked && (
        <span 
          className="absolute w-full h-full rounded-full animate-pulse"
          style={{ 
            backgroundColor: getColorWithOpacity(color, 0.3),
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}
        />
      )}
      
      {checked && isDisabled && (
        <span 
          className="absolute w-full h-full rounded-full"
          style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
        />
      )}

      {!checked && !isCanCompletedToday && (
        <svg
          className="w-3 h-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ color: getColorWithOpacity(color, 0.5) }}
        >
          <rect x="5" y="11" width="14" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      )}
      
      <svg
        className={`
          w-3 h-3
          transition-all duration-300 ease-in-out
          ${checked ? "scale-100 opacity-100" : "scale-0 opacity-0"}
          absolute
        `}
        style={{
          color: checked ? 'white' : color,
        }}
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