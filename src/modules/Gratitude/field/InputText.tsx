import { useField } from "react-final-form";
import { EGratitudeField } from "../form/FormGratitude.types";
import { TextArea } from "../../../components/Input";

export const InputText = () => {
  const { input, meta } = useField(EGratitudeField.COMMENT, {
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
