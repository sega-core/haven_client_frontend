import { Typography } from "../Typography";

type DayCheckboxProps = {
  checked: boolean;
  label: string;
  name?: string;
  value?: string;
  onChange: (checked: boolean) => void;
};

export const DayCheckbox = ({
  checked,
  label,
  name,
  value,
  onChange,
}: DayCheckboxProps) => {
  return (
    <label className="cursor-pointer flex flex-1">
      <input
        type="checkbox"
        className="hidden"
        checked={checked}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.checked)}
      />

      <div
        className={`
          px-3 py-2 rounded-full min-w-0 flex items-center justify-center gap-2
          transition-all flex-1
          ${
            checked
              ? "border border-(--stroke-beige-primary) bg-beige-tertiary"
              : "border border-transparent bg-beige-tertiary"
          }
        `}
      >
        <Typography type="body-s" className="text-brown-primary">
          {label}
        </Typography>
      </div>
    </label>
  );
};
