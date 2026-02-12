import { useField } from "react-final-form";
import { ETargetField } from "../form";
import { DEFAULT_ERROR_MSG } from "../../../constats";
import { TimePicker } from "../../../components/Input";

export const InputTime = () => {
  const { input, meta } = useField(ETargetField.NOTIFICATION_TIME, {
    validate: (v) => {
      if (!v) return DEFAULT_ERROR_MSG;
    },
  });
  return <TimePicker label="Время уведомлений" input={input} meta={meta} />;
};
