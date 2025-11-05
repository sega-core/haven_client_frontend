import { DAYS } from "./DayPanel.constant";

import { CheckboxDay } from "../../fields";
import { FieldErrorText } from "../../../../components/FieldErrorText";
import { useField } from "react-final-form";
import { ETargetField } from "../../form";

export const DayPanel = () => {
  const { meta } = useField(ETargetField.WEEKDAYS, {
    subscription: { touched: true, error: true, dirty: true },
    validate: (value) => {
      if (!value) return "Выберите хотя бы один день";
      const hasSelectedDay = Object.values(value).some(Boolean);
      if (!hasSelectedDay) return "Выберите хотя бы один день";
      return undefined;
    },
  });

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {DAYS.map(({ title, id }) => (
        <CheckboxDay key={id} value={id} label={title} />
      ))}
      <FieldErrorText
        isError={meta.error && meta.touched}
        message={meta.error}
      />
    </div>
  );
};
