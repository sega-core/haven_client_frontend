import { cn } from "../../utils";

type ColorCheckboxProps = {
  checked: boolean;
  name?: string;
  value?: string;
  color:string;
  onChange: (checked: boolean) => void;
};

export const ColorCheckbox = ({
  checked,
  value,
  color,
  onChange,
}: ColorCheckboxProps) => {
  return (
    <label className="cursor-pointer">
      <input
        type="checkbox"
        className="hidden"
        checked={checked}
        name={value}
        value={value}
        onChange={(e) => onChange(e.target.checked)}
      />

      <div
        className={cn(
          "w-7 h-7 rounded-full min-w-0 flex items-center justify-center gap-2 transition-all flex-1",
          checked
            ? "border-2 border-(--stroke-beige-primary)"
            : "border border-transparent",
            color
        )}
      ></div>
    </label>
  );
};
