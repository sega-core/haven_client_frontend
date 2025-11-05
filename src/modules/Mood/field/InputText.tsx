import { useField } from "react-final-form";
import { TextArea } from "../../../components/Input";
import { EMoodField } from "../form/FormMood.types";

export const InputText = () => {
  const { input, meta } = useField(EMoodField.COMMENT, {
    validate: (v) => {
      if (!v) return "InputTextError";
    },
  });

  return (
    <TextArea
      {...input}
      {...(meta.touched && meta.error && { isInvalid: true })}
    />
  );
};
