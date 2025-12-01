import { useField } from "react-final-form";
import { ETargetField } from "../form/FormTarget.types";
import { DateRangePicker } from "@heroui/date-picker";
import { getLocalTimeZone, today } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";

export const InputDate = () => {
  const { input, meta } = useField(ETargetField.START_DATE, {
    validate: (v) => {
      if (!v) return "InputDateError";
    },
  });

  return (
    <I18nProvider locale="ru-RU">
      <DateRangePicker
        label="Выберите период"
        aria-label="Выберите период"
        {...(meta.touched && meta.error && { isRequired: true })}
        onChange={(e) => input.onChange(e)}
        minValue={today(getLocalTimeZone())}
        {...(input.value && { value: input.value })}
      />
    </I18nProvider>
  );
};
