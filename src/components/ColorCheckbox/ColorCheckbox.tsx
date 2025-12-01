type ColorCheckboxProps = {
  checked: boolean;
  label: string;
  name?: string;
  value?: string;
  onChange: (checked: boolean) => void;
};

export const ColorCheckbox = ({
  checked,
  value,
  onChange,
}: ColorCheckboxProps) => {
  console.log(value);
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
        className={`
          w-7 h-7 rounded-full min-w-0 flex items-center justify-center gap-2
          transition-all flex-1
          ${
            checked
              ? "border border-(--stroke-beige-primary)"
              : "border border-transparent"
          }
          ${value}
        `}
      ></div>
    </label>
  );
};
