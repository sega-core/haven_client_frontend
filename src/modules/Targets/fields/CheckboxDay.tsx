import { useField } from "react-final-form";
import { DayCheckbox } from "../../../components/DayCheckbox";
import { ETargetField } from "../form";

type Props = {
  label: string;
  value: string;
};

export const CheckboxDay = ({ label, value }: Props) => {
  const fieldName = `${ETargetField.WEEKDAYS}.${value}`;
  
  const { input } = useField(fieldName, {
    type: "checkbox",
    initialValue: false,
  });

  return (
    <DayCheckbox
      checked={input.checked || false}
      label={label}
      name={input.name}
      value={input.value}
      onChange={(checked) => input.onChange(checked)}
    />
  );
};