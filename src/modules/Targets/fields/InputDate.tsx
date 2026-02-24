import { useField } from "react-final-form";
import { ETargetField, TTargetForm } from "../form/FormTarget.types";
import { DEFAULT_ERROR_MSG } from "../../../constats";
import { DatePicker } from "../../../components/Input";
import { format, startOfDay } from "date-fns";

const fieldMap = {
  start: {
    placeholder: "Дата от",
    field: ETargetField.START_DATE,
  },
  end: {
    placeholder: "Дата по",
    field: ETargetField.END_DATE,
  },
};

export const InputDate = ({ type }: { type: "start" | "end" }) => {
  const { input, meta } = useField(fieldMap[type].field, {
    validate: (value, allValues) => {
      if (!value) return DEFAULT_ERROR_MSG;

      const today = format(startOfDay(new Date()), "yyyy-MM-dd");
      const values = allValues as TTargetForm;

      const startDate = values?.[ETargetField.START_DATE];
      const endDate = values?.[ETargetField.END_DATE];

      if (type === "start") {
        if (value < today) {
          return "Дата начала не может быть раньше сегодняшнего дня";
        }
        if (endDate && value > endDate) {
          return "Дата начала не может быть позже даты окончания";
        }
      }

      if (type === "end") {
        if (startDate && value < startDate) {
          return "Дата окончания не может быть раньше даты начала";
        }
      }

      return undefined;
    },
  });

  const { input: startDateValue } = useField(ETargetField.START_DATE);

  const minDate =
    type === "start"
      ? format(startOfDay(new Date()), "yyyy-MM-dd")
      : startDateValue.value;

  return (
    <DatePicker
      input={input}
      meta={meta}
      placeholder={fieldMap[type].placeholder}
      minDate={minDate}
    />
  );
};
