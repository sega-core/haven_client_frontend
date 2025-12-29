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
        label="Период"
        aria-label="Период"
        size="sm"
        onChange={(e) => input.onChange(e)}
        minValue={today(getLocalTimeZone())}
        {...(input.value && { value: input.value })}
        {...(meta.touched && meta.error && { isRequired: true })}
      />
    </I18nProvider>
  );
};
