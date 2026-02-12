import { useField } from "react-final-form";
import { ETargetField } from "../form/FormTarget.types";
import { DEFAULT_ERROR_MSG } from "../../../constats";
import { DatePicker } from "../../../components/Input";

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
    validate: (v) => {
      if (!v) return DEFAULT_ERROR_MSG;
    },
  });

  return (
    <DatePicker
      input={input}
      meta={meta}
      placeholder={fieldMap[type].placeholder}
    />
  );
};
