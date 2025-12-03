import { Field } from "react-final-form";
import { DayCheckbox } from "../../../components/DayCheckbox";
import { ETargetField } from "../form";

type Props = {
  label: string;
  value: string;
};

export const CheckboxDay = ({ label, value }: Props) => {
  return (
    <Field
      name={`${ETargetField.NOTIFICATION_DAYS}.${value}`}
      label={label}
      component={({ input }) => (
        <DayCheckbox
          checked={input.value || false}
          label={label}
          name={input.name}
          value={input.value}
          onChange={(checked) => input.onChange(checked)}
        />
      )}
    />
  );
};
