import { TimeInput } from "@heroui/date-input";
import { useField } from "react-final-form";
import { ETargetField } from "../form";
import { DEFAULT_ERROR_MSG } from "../../../constats";

export const InputTime = () => {
  const { input, meta } = useField(ETargetField.NOTIFICATION_TIME, {
    validate: (v) => {
      if (!v) return "InputTimeError";
    },
  });
  return (
    <TimeInput
      label="Время уведомлений"
      hourCycle={24}
      size="sm"
      {...input}
      {...(meta.touched && meta.error && { isRequired: true })}
      errorMessage={DEFAULT_ERROR_MSG}
    />
  );
};
